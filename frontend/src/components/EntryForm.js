import React, { useState, useEffect } from 'react';

function EntryForm({ onEntryCreated, selectedDate }) {
  const [date, setDate] = useState(selectedDate || new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await onEntryCreated(date, content);
      setContent('');
      setDate(new Date().toISOString().split('T')[0]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const gratitudePrompts = [
    "Three things that made me smile today...",
    "Someone who brightened my day...",
    "A small moment of joy I experienced...",
    "Something beautiful I noticed today...",
    "An act of kindness I witnessed or received...",
    "A challenge that helped me grow...",
  ];

  const randomPrompt = gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)];

  return (
    <div className="card-warm p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        New Entry
      </h2>
      <p className="text-gray-600 mb-6 text-sm italic">
        {randomPrompt}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-warm"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            What are you grateful for?
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            className="textarea-warm text-gray-700 leading-relaxed"
            placeholder="Write your thoughts here..."
            required
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
            Entry saved successfully
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-warm bg-warm-500 hover:bg-warm-600 text-white font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
}

export default EntryForm;
