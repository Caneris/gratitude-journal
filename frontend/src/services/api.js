const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  async createEntry(date, content) {
    const response = await fetch(`${API_BASE_URL}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date, content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create entry');
    }

    return response.json();
  },

  async getAllEntries() {
    const response = await fetch(`${API_BASE_URL}/entries`);

    if (!response.ok) {
      throw new Error('Failed to fetch entries');
    }

    return response.json();
  },

  async getEntryByDate(date) {
    const response = await fetch(`${API_BASE_URL}/entries/${date}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch entry');
    }

    return response.json();
  },

  async deleteEntry(date) {
    const response = await fetch(`${API_BASE_URL}/entries/${date}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete entry');
    }

    return response.json();
  },

  async getEntriesInRange(startDate, endDate) {
    const response = await fetch(
      `${API_BASE_URL}/entries/range?startDate=${startDate}&endDate=${endDate}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch entries');
    }

    return response.json();
  },
};
