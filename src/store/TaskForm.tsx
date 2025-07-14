import React, { useState, useEffect } from 'react';
import { Task } from '../types/Task';

interface Props {
  initial?: Task;
  onSubmit: (task: Task) => void;
  userId: string;
}

const TaskForm: React.FC<Props> = ({ initial, onSubmit, userId }) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [date, setDate] = useState(initial?.date || '');
  const [time, setTime] = useState(initial?.time || '');
  const [priority, setPriority] = useState(initial?.priority || 'low');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    const task: Task = {
      id: initial?.id || crypto.randomUUID(),
      userId,
      title,
      description,
      date,
      time,
      priority: priority as 'low' | 'medium' | 'high',
    };

    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 shadow rounded">
      <input
        type="text"
        placeholder="Task title"
        className="border px-3 py-2 w-full"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description (optional)"
        className="border px-3 py-2 w-full"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="border px-3 py-2 w-full"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        className="border px-3 py-2 w-full"
        value={time}
        onChange={e => setTime(e.target.value)}
        required
      />
      <select
        className="border px-3 py-2 w-full"
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initial ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
