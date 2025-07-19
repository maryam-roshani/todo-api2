import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { Task } from '../types/Task';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
        setSelectedDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
        setSelectedDate(value[0]);
    } else {
        setSelectedDate(null);
    }
  };



  const tasks = useSelector((state: RootState) => state.tasks.items);

  // Convert date to YYYY-MM-DD
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

const selectedDateStr = selectedDate ? formatDate(selectedDate) : '';

  // Filter tasks for selected date
  const tasksForDate: Task[] = tasks.filter(
    task => task.date === selectedDateStr
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl mb-4">📅 Calendar</h2>

      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="mb-6 md:mb-0">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="rounded border shadow"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-xl mb-2">
            Tasks on {selectedDateStr}
          </h3>
          {tasksForDate.length === 0 ? (
            <p className="text-gray-500">No tasks for this date.</p>
          ) : (
            <ul className="space-y-2">
              {tasksForDate.map(task => (
                <li key={task.id} className="border rounded p-3 shadow">
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-sm">{task.time}</p>
                  <p className="text-sm italic">Priority: {task.priority}</p>
                  {task.description && (
                    <p className="text-sm mt-1">{task.description}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
