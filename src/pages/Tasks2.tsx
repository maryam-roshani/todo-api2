import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { useEffect, useState } from 'react';
import { fetchTasks, addTask, editTask, deleteTask } from '../store/tasksSlice';
import TaskForm from '../components/taskForm';
import type { Task } from '../types/Task';

const TasksPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading } = useSelector((state: RootState) => state.tasks);
  const auth = useSelector((state: RootState) => state.auth);
  const [editTarget, setEditTarget] = useState<Task | null>(null);

  useEffect(() => {
    if (auth.user?.id) dispatch(fetchTasks(auth.user.id));
  }, [auth.user?.id, dispatch]);

  const handleAdd = (task: Task) => {
    dispatch(addTask(task));
  };

  const handleEdit = (task: Task) => {
    dispatch(editTask(task));
    setEditTarget(null);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl mb-4">Your Tasks</h2>

      <TaskForm
        initial={editTarget || undefined}
        onSubmit={editTarget ? handleEdit : handleAdd}
        userId={auth.user!.id}
      />

      {/* <ul className="mt-6 space-y-2">
        {items.map(task => (
          <li key={task.id} className="border rounded p-3 shadow">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm">{task.date} - {task.time}</p>
            <p className="text-sm italic">Priority: {task.priority}</p>
            {task.description && <p className="text-sm mt-1">{task.description}</p>}

            <div className="mt-2 space-x-2">
              <button
                onClick={() => setEditTarget(task)}
                className="bg-yellow-400 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul> */}
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(task => (
            <li key={task.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h4 className="font-bold text-lg">{task.title}</h4>
            <p className="text-sm text-gray-600">{task.date} - {task.time}</p>
            <p className="italic text-sm text-gray-700">
                Priority: 
                <span className={
                task.priority === 'high' ? 'text-red-500' : 
                task.priority === 'medium' ? 'text-yellow-500' : 
                'text-green-500'
                }>
                {task.priority}
                </span>
            </p>
            {task.description && <p className="mt-2 text-gray-800">{task.description}</p>}
            <div className="mt-3 flex space-x-2">
                <button className="bg-yellow-400 px-2 py-1 rounded text-white hover:bg-yellow-500" onClick={() => setEditTarget(task)} >Edit</button>
                <button className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600" onClick={() => handleDelete(task.id)} >Delete</button>
            </div>
            </li>
        ))}
      </ul>
      <table className="w-full border-collapse mt-4">
        <thead>
            <tr className="bg-primary text-white">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Time</th>
            <th className="py-2 px-4">Priority</th>
            <th className="py-2 px-4">Actions</th>
            </tr>
        </thead>
        <tbody>
            {items.map(task => (
            <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{task.title}</td>
                <td className="py-2 px-4">{task.date}</td>
                <td className="py-2 px-4">{task.time}</td>
                <td className="py-2 px-4 capitalize">{task.priority}</td>
                <td className="py-2 px-4">
                <button className="bg-yellow-400 px-2 py-1 rounded text-white mr-2" onClick={() => setEditTarget(task)} >Edit</button>
                <button className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600" onClick={() => handleDelete(task.id)} >Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
      </table>


    </div>
  );
};

export default TasksPage;
