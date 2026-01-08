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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gratitude Journal</h1>
          <p className="text-gray-600">Cultivate gratitude, one day at a time</p>
        </header>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveView('form')}
            className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
              activeView === 'form'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            New Entry
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
              activeView === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Past Entries
          </button>
          <button
            onClick={() => setActiveView('calendar')}
            className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
              activeView === 'calendar'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
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
