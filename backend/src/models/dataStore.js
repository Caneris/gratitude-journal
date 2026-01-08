// TODO: DATABASE MIGRATION
// This file contains in-memory storage that should be replaced with PostgreSQL
//
// Migration steps:
// 1. Install pg package: npm install pg
// 2. Create database connection pool in config/database.js
// 3. Replace the methods below with SQL queries
// 4. Create migrations folder and initial schema:
//    CREATE TABLE entries (
//      id SERIAL PRIMARY KEY,
//      date DATE NOT NULL UNIQUE,
//      content TEXT NOT NULL,
//      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//    );
// 5. Update all methods to use async/await with database queries

class DataStore {
  constructor() {
    // In-memory storage: Map of date (YYYY-MM-DD) to entry object
    this.entries = new Map();
  }

  // TODO: Replace with: SELECT * FROM entries WHERE date = $1
  async getEntryByDate(date) {
    return this.entries.get(date) || null;
  }

  // TODO: Replace with: SELECT * FROM entries ORDER BY date DESC
  async getAllEntries() {
    return Array.from(this.entries.values()).sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    );
  }

  // TODO: Replace with:
  // INSERT INTO entries (date, content) VALUES ($1, $2)
  // ON CONFLICT (date) DO UPDATE SET content = $2, updated_at = CURRENT_TIMESTAMP
  // RETURNING *
  async createOrUpdateEntry(date, content) {
    const entry = {
      id: this.entries.has(date) ? this.entries.get(date).id : Date.now().toString(),
      date,
      content,
      createdAt: this.entries.has(date) ? this.entries.get(date).createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.entries.set(date, entry);
    return entry;
  }

  // TODO: Replace with: DELETE FROM entries WHERE date = $1 RETURNING *
  async deleteEntry(date) {
    const entry = this.entries.get(date);
    if (entry) {
      this.entries.delete(date);
      return entry;
    }
    return null;
  }

  // TODO: Replace with:
  // SELECT date FROM entries
  // WHERE date >= $1 AND date <= $2
  async getEntriesInDateRange(startDate, endDate) {
    const entries = Array.from(this.entries.values()).filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
    });
    return entries;
  }
}

// Singleton instance
const dataStore = new DataStore();

module.exports = dataStore;
