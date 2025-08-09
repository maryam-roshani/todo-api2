import { useState, useEffect } from 'react';
import type { Task } from '../types/Task';

interface Props {
  initial?: Task;
  onSubmit: (task: Task) => void;
  userId: string;
}

const TaskForm = ({ initial, onSubmit, userId }: Props) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [date, setDate] = useState(initial?.date || '');
  const [time, setTime] = useState(initial?.time || '');
  const [duration, setDuration] = useState(initial?.duration || '00:00');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initial?.priority || 'low');
  const [status, setStatus] = useState<'in progress' | 'cancelled' | 'done' | undefined>(
  initial?.status || undefined
);


    useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDescription(initial.description || '');
      setDate(initial.date);
      setTime(initial.time);
      setDuration(initial.duration);
      setPriority(initial.priority);
      setStatus(initial.status);
    } else {
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setDuration('');
      setPriority('low');
      setStatus(undefined);
    }
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    e.preventDefault();
    onSubmit({
      id: initial?.id || crypto.randomUUID(),
      title,
      description,
      date: formattedDate,
      time,
      duration,
      priority,
      status,
      userId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 w-full"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border p-2 w-full"
      />
      <label className="block">
        Duration:
        <div className="flex gap-2 mt-1">
            <input
            type="number"
            value={Number(duration.split(':')[0])}
            min={0}
            max={23}
            onChange={(e) => {
                const hours = e.target.value.padStart(2, '0');
                const minutes = duration.split(':')[1] || '00';
                setDuration(`${hours}:${minutes}`);
            }}
            className="border p-2 w-20"
            placeholder="HH"
            />
            <span>:</span>
            <input
            type="number"
            value={Number(duration.split(':')[1] || 0)}
            min={0}
            max={59}
            onChange={(e) => {
                const minutes = e.target.value.padStart(2, '0');
                const hours = duration.split(':')[0] || '00';
                setDuration(`${hours}:${minutes}`);
            }}
            className="border p-2 w-20"
            placeholder="MM"
            />
        </div>
      </label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
        className="border p-2 w-full"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as 'in progress' | 'done' | 'cancelled')}
        className="border p-2 w-full"
      >
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initial ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
