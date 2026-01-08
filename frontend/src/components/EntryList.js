import React from 'react';

function EntryList({ entries, onDeleteEntry, loading }) {
  if (loading) {
    return (
      <div className="card-warm p-12 text-center">
        <p className="text-gray-600">Loading entries...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="card-warm p-12 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">No entries yet</h3>
        <p className="text-gray-600">
          Click "New Entry" to start your gratitude journey
        </p>
      </div>
    );
  }

  return (
    <div className="card-warm p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Past Entries
      </h2>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="group bg-warm-50/30 border border-warm-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </h3>
              </div>
              <button
                onClick={() => onDeleteEntry(entry.date)}
                className="text-gray-400 hover:text-red-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Delete
              </button>
            </div>

            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {entry.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EntryList;
