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
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


const selectedDateStr = selectedDate ? formatDate(selectedDate) : '';

  // Filter tasks for selected date
  const tasksForDate: Task[] = tasks.filter(
    task => task.date === selectedDateStr
  );

  console.log('Selected:', selectedDateStr);
  console.log('Tasks:', tasks.map((t) => t.date));


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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {tasksForDate.map((task) => {
                const priorityStyles = {
                  high: 'border-red-500 bg-red-100',
                  medium: 'border-yellow-500 bg-yellow-100',
                  low: 'border-green-500 bg-green-100',
                };

                return (
                  <div
                    key={task.id}
                    className={`w-full p-4 border-l-4 rounded shadow text-left hover:shadow-lg transition-shadow duration-300 ${priorityStyles[task.priority] || ''}`}
                  >
                    <h4 className="text-center font-bold text-lg text-gray-800 mb-2">{task.title}</h4>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Time:</span> {task.time}
                    </p>
                    {task.description && (
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-semibold">Description:</span> {task.description}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-semibold">Priority:</span> {task.priority}
                    </p>
                  </div>
                );
              })}
            </div>

          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;


