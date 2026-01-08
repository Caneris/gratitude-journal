import React, { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import CalendarView from './components/CalendarView';
import { api } from './services/api';

function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('form');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await api.getAllEntries();
      setEntries(data);
    } catch (error) {
      console.error('Failed to load entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEntryCreated = async (date, content) => {
    await api.createEntry(date, content);
    await loadEntries();
  };

  const handleDeleteEntry = async (date) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await api.deleteEntry(date);
        await loadEntries();
      } catch (error) {
        console.error('Failed to delete entry:', error);
        alert('Failed to delete entry');
      }
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setActiveView('form');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-800">
            Gratitude Journal
          </h1>
          <p className="text-gray-600">
            Cultivate gratitude, one day at a time
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveView('form')}
            className={`btn-warm ${
              activeView === 'form'
                ? 'bg-warm-500 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-warm-50 border border-warm-200'
            }`}
          >
            New Entry
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`btn-warm ${
              activeView === 'list'
                ? 'bg-warm-500 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-warm-50 border border-warm-200'
            }`}
          >
            Past Entries
          </button>
          <button
            onClick={() => setActiveView('calendar')}
            className={`btn-warm ${
              activeView === 'calendar'
                ? 'bg-warm-500 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-warm-50 border border-warm-200'
            }`}
          >
            Calendar
          </button>
        </div>

        <div className="mb-8">
          {activeView === 'form' && (
            <EntryForm onEntryCreated={handleEntryCreated} selectedDate={selectedDate} />
          )}
          {activeView === 'list' && (
            <EntryList
              entries={entries}
              onDeleteEntry={handleDeleteEntry}
              loading={loading}
            />
          )}
          {activeView === 'calendar' && (
            <CalendarView entries={entries} onDateSelect={handleDateSelect} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
