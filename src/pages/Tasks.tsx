import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { useEffect, useState } from 'react';
import { fetchTasks, addTask, editTask, deleteTask } from '../store/tasksSlice';
import TaskForm from '../components/taskForm';
import type { Task } from '../types/Task';
import { BsFillTrash3Fill, BsPencil } from "react-icons/bs";

const TasksPage = () => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-gradient-to-r from-red-100 to-white';
      case 'medium':
        return 'border-yellow-400 bg-gradient-to-r from-yellow-100 to-white';
      case 'low':
        return 'border-green-400 bg-gradient-to-r from-green-100 to-white';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  function formatDateWithDay(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  const dispatch: AppDispatch = useDispatch();
  const { items, loading } = useSelector((state: RootState) => state.tasks);
  const auth = useSelector((state: RootState) => state.auth);

  const [editTarget, setEditTarget] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'table' | 'card'>('card');
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (auth.user?.id) dispatch(fetchTasks(auth.user.id));
  }, [auth.user?.id, dispatch]);

  const toggleDescription = (id: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
        <button onClick={() => setActiveTab('card')} className={`px-4 py-2 rounded ${activeTab === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Card View</button>
        <button onClick={() => setActiveTab('table')} className={`px-4 py-2 rounded ${activeTab === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Table View</button>
      </div>

      {/* Card View */}
      {activeTab === 'card' && (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map(task => {
            const isExpanded = expandedDescriptions[task.id];
            const descPreview = task.description?.slice(0, 50) ?? '';
            return (
              <li key={task.id} className={`border-2 rounded-lg p-4 shadow hover:shadow-lg transition relative ${getPriorityStyles(task.priority)}`}>
                <h4 className="font-bold text-xl text-center mb-2">{task.title}</h4>
                <div className="text-left text-sm space-y-1 mt-8">
                  <p className="text-gray-600">Date: {formatDateWithDay(task.date)}</p>
                  <p className="text-gray-600">Time: {task.time}</p>
                  {task.description && (
                    <p className="text-gray-800">
                      Description: {isExpanded ? task.description : descPreview}
                      {task.description.length > 50 && (
                        <button onClick={() => toggleDescription(task.id)} className="text-blue-500 ml-1">
                          {isExpanded ? ' Show less' : '...'}
                        </button>
                      )}
                    </p>
                  )}
                  <p className="italic">
                    Priority: <span className="capitalize font-semibold">{task.priority}</span>
                  </p>
                </div>
                <div className="float-left pt-2 w-35">
                  <button onClick={() => {
                    setEditTarget(task);
                    setShowForm(true);
                  }} className="bg-yellow-400 py-2 w-full rounded text-white hover:bg-yellow-500">
                    <BsPencil />
                  </button>
                </div>
                <div className="float-right pt-2 w-35">
                  <button onClick={() => handleDelete(task.id)} className="bg-red-500 py-2 w-full rounded text-white hover:bg-red-600">
                    <BsFillTrash3Fill />
                  </button>
                </div>
              </li>
            );
          })}

          {/* Add Card */}
          <li onClick={() => {
            setEditTarget(null);
            setShowForm(true);
          }} className="border-4 border-dashed flex items-center justify-center cursor-pointer rounded-lg h-40 text-4xl font-bold text-gray-400 hover:text-blue-600">
            +
          </li>
        </ul>
      )}

      {/* Table View */}
      {activeTab === 'table' && (
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr className="bg-primary text-black">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Priority</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Edit</th>
              <th className="py-2 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map(task => {
              const isExpanded = expandedDescriptions[task.id];
              const descPreview = task.description?.slice(0, 50) ?? '';
              return (
                <tr key={task.id} className={`border-b hover:bg-gray-50 ${task.priority === 'high' ? 'bg-red-100' : task.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'}`}>
                  <td className="py-2 px-4 text-center font-semibold">{task.title}</td>
                  <td className="py-2 px-4 text-center">{formatDateWithDay(task.date)}</td>
                  <td className="py-2 px-4 text-center">{task.time}</td>
                  <td className="py-2 px-4 text-center capitalize">{task.priority}</td>
                  <td className="py-2 px-4 text-center">
                    {isExpanded ? task.description : descPreview}
                    {task.description && task.description.length > 50 && (
                      <button onClick={() => toggleDescription(task.id)} className="text-blue-500 ml-1">
                        {isExpanded ? ' Show less' : '...'}
                      </button>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button className="bg-yellow-400 px-2 py-1 rounded text-white mr-2" onClick={() => {
                      setEditTarget(task);
                      setShowForm(true);
                    }}>
                      <BsPencil />
                    </button>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600" onClick={() => handleDelete(task.id)}>
                      <BsFillTrash3Fill />
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr onClick={() => { setEditTarget(null); setShowForm(true) }} className="cursor-pointer bg-gray-100 hover:bg-blue-100 text-center font-bold text-blue-500"
            >
              <td colSpan={7} className="py-4 text-3xl">+</td>
            </tr>

          </tbody>
        </table>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-start pt-20 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl relative">
            <button onClick={() => setShowForm(false)} className="absolute top-2 right-2 text-gray-500 hover:text-black">✕</button>
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
