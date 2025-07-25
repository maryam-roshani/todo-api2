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
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'table' | 'card'>('card');

  useEffect(() => {
    if (auth.user?.id) dispatch(fetchTasks(auth.user.id));
  }, [auth.user?.id, dispatch]);

  const handleAdd = (task: Task) => {
    dispatch(addTask(task));
    setShowForm(false);
  };

  const handleEdit = (task: Task) => {
    dispatch(editTask(task));
    setEditTarget(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('card')}
          className={`px-4 py-2 rounded ${activeTab === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Card View
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`px-4 py-2 rounded ${activeTab === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Table View
        </button>
      </div>

      {/* Card View */}
      {activeTab === 'card' && (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map(task => (
            <li key={task.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <h4 className="font-bold text-lg">{task.title}</h4>
              <p className="text-sm text-gray-600">{task.date} - {task.time}</p>
              <p className="italic text-sm text-gray-700">
                Priority:{' '}
                <span className={
                  task.priority === 'high' ? 'text-red-500' :
                  task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                }>
                  {task.priority}
                </span>
              </p>
              {task.description && <p className="mt-2 text-gray-800">{task.description}</p>}
              <div className="mt-3 flex space-x-2">
                <button className="bg-yellow-400 px-2 py-1 rounded text-white hover:bg-yellow-500" onClick={() => { setEditTarget(task); setShowForm(true); }}>Edit</button>
                <button className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600" onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </li>
          ))}
          {/* + Card */}
          <li
            onClick={() => { setEditTarget(null); setShowForm(true); }}
            className="border-4 border-dashed flex items-center justify-center cursor-pointer rounded-lg h-40 text-4xl font-bold text-gray-400 hover:text-blue-600"
          >
            +
          </li>
        </ul>
      )}

      {/* Table View */}
      {activeTab === 'table' && (
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
                  <button className="bg-yellow-400 px-2 py-1 rounded text-white mr-2" onClick={() => { setEditTarget(task); setShowForm(true); }}>Edit</button>
                  <button className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600" onClick={() => handleDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {/* + Row */}
            <tr
              className="cursor-pointer hover:bg-blue-100 text-blue-500 font-bold text-center"
              onClick={() => { setEditTarget(null); setShowForm(true); }}
            >
              <td colSpan={5} className="py-4 text-2xl">+</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Modal for TaskForm */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <TaskForm
              initial={editTarget || undefined}
              onSubmit={editTarget ? handleEdit : handleAdd}
              userId={auth.user!.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
