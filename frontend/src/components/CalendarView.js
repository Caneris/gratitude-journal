import React, { useState, useEffect } from 'react';

function CalendarView({ entries, onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    generateCalendar();
  }, [currentDate, entries]);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const hasEntry = entries.some(entry => entry.date === dateString);
      days.push({ day, date: dateString, hasEntry });
    }

    setCalendarDays(days);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={previousMonth}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition duration-200"
        >
          Previous
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{monthName}</h2>
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition duration-200"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}

        {calendarDays.map((dayObj, index) => (
          <div
            key={index}
            className={`aspect-square flex items-center justify-center rounded-lg ${
              dayObj
                ? dayObj.hasEntry
                  ? 'bg-green-100 border-2 border-green-500 cursor-pointer hover:bg-green-200'
                  : 'bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100'
                : ''
            } transition duration-200`}
            onClick={() => dayObj && onDateSelect && onDateSelect(dayObj.date)}
          >
            {dayObj && (
              <span className={`text-lg ${dayObj.hasEntry ? 'font-bold text-green-800' : 'text-gray-700'}`}>
                {dayObj.day}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded mr-2"></div>
          <span className="text-gray-600">Has Entry</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded mr-2"></div>
          <span className="text-gray-600">No Entry</span>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
