import React, { useState, useEffect, useCallback } from 'react';

function CalendarView({ entries, onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  const generateCalendar = useCallback(() => {
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
  }, [currentDate, entries]);

  useEffect(() => {
    generateCalendar();
  }, [generateCalendar]);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const isToday = (dateString) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  return (
    <div className="card-warm p-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={previousMonth}
          className="btn-warm bg-white hover:bg-warm-50 border border-warm-200 text-gray-700 px-4 py-2"
        >
          ← Previous
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {monthName}
        </h2>
        <button
          onClick={nextMonth}
          className="btn-warm bg-white hover:bg-warm-50 border border-warm-200 text-gray-700 px-4 py-2"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium text-gray-600 py-2 text-sm">
            {day}
          </div>
        ))}

        {calendarDays.map((dayObj, index) => (
          <div
            key={index}
            className={`aspect-square flex items-center justify-center rounded-xl transition-all ${
              dayObj
                ? dayObj.hasEntry
                  ? 'bg-warm-200 border border-warm-300 cursor-pointer hover:bg-warm-300 font-medium text-warm-700'
                  : isToday(dayObj.date)
                  ? 'bg-warm-50 border-2 border-warm-300 cursor-pointer hover:bg-warm-100 font-medium text-gray-700'
                  : 'bg-white border border-gray-200 cursor-pointer hover:bg-warm-50 text-gray-700'
                : ''
            }`}
            onClick={() => dayObj && onDateSelect && onDateSelect(dayObj.date)}
          >
            {dayObj && (
              <span className="text-sm">
                {dayObj.day}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-warm-200 border border-warm-300 rounded"></div>
          <span>Has entry</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-warm-50 border-2 border-warm-300 rounded"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;