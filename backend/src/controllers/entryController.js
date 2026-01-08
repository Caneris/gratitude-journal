const dataStore = require('../models/dataStore');

class EntryController {
  async createEntry(req, res) {
    try {
      const { date, content } = req.body;

      if (!date || !content) {
        return res.status(400).json({ error: 'Date and content are required' });
      }

      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
      }

      const entry = await dataStore.createOrUpdateEntry(date, content);
      res.status(201).json(entry);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create entry' });
    }
  }

  async getAllEntries(req, res) {
    try {
      const entries = await dataStore.getAllEntries();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch entries' });
    }
  }

  async getEntryByDate(req, res) {
    try {
      const { date } = req.params;
      const entry = await dataStore.getEntryByDate(date);

      if (!entry) {
        return res.status(404).json({ error: 'Entry not found' });
      }

      res.json(entry);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch entry' });
    }
  }

  async deleteEntry(req, res) {
    try {
      const { date } = req.params;
      const entry = await dataStore.deleteEntry(date);

      if (!entry) {
        return res.status(404).json({ error: 'Entry not found' });
      }

      res.json({ message: 'Entry deleted successfully', entry });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete entry' });
    }
  }

  async getEntriesInRange(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
      }

      const entries = await dataStore.getEntriesInDateRange(startDate, endDate);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch entries' });
    }
  }
}

module.exports = new EntryController();
