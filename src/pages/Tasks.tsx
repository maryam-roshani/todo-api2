import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { useEffect, useState } from 'react';
import { fetchTasks, addTask, editTask, removeTask } from '../store/tasksSlice';
import TaskForm from '../components/TaskForm';
import { Task } from '../types/Task';

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
    dispatch(removeTask(id));
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

      <ul className="mt-6 space-y-2">
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
      </ul>
    </div>
  );
};

export default TasksPage;
