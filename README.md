# Gratitude Journal Web App

A warm, inviting web application for tracking daily gratitude entries. Designed to feel like a cozy, personal space for reflection rather than a corporate app.

## Features

### Core Functionality
- Add daily gratitude entries with encouraging prompts
- View past entries in beautiful journal-like cards
- Interactive calendar view with heart icons for completed entries
- Update existing entries by submitting a new entry for the same date
- Delete entries with gentle confirmation
- Fully responsive design that works on all devices

### Design Highlights
- **Minimalist & Cozy**: Clean interface with warm, peachy-cream color palette
- **Custom Typography**: Playfair Display for headings, Inter for body text
- **Subtle Interactions**: Gentle hover effects and smooth transitions
- **Encouraging Prompts**: Random gratitude prompts to inspire reflection
- **Warm Accents**: Soft peach tones that feel inviting without being overwhelming
- **Clean Calendar**: Simple, readable calendar with clear visual indicators
- **Rounded Corners**: Soft 2xl-3xl border radius throughout for a friendly feel
- **Minimal Shadows**: Light shadows that add depth without visual noise

## Tech Stack

**Backend:**
- Node.js
- Express.js
- In-memory storage (ready for PostgreSQL migration)

**Frontend:**
- React (with Hooks)
- Tailwind CSS (with custom configuration)
- Google Fonts (Playfair Display & Inter)
- Custom animations and transitions

## Project Structure

```
gratitude-journal/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Database configuration (TODO)
│   │   ├── controllers/
│   │   │   └── entryController.js   # Entry business logic
│   │   ├── models/
│   │   │   └── dataStore.js         # In-memory data storage
│   │   ├── routes/
│   │   │   └── entries.js           # API routes
│   │   └── server.js                # Express server setup
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── CalendarView.js      # Calendar visualization
│   │   │   ├── EntryForm.js         # Form for adding entries
│   │   │   └── EntryList.js         # List of past entries
│   │   ├── services/
│   │   │   └── api.js               # API service layer
│   │   ├── App.js                   # Main app component
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Tailwind CSS imports
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check endpoint |
| POST | `/api/entries` | Create or update an entry |
| GET | `/api/entries` | Get all entries |
| GET | `/api/entries/:date` | Get entry by date (YYYY-MM-DD) |
| DELETE | `/api/entries/:date` | Delete entry by date |
| GET | `/api/entries/range?startDate=X&endDate=Y` | Get entries in date range |

### Example Request

```bash
# Create an entry
curl -X POST http://localhost:5000/api/entries \
  -H "Content-Type: application/json" \
  -d '{"date": "2026-01-08", "content": "I am grateful for..."}'

# Get all entries
curl http://localhost:5000/api/entries
```

## Database Migration Guide

The application currently uses in-memory storage. To migrate to PostgreSQL:

### Step 1: Install PostgreSQL Dependencies

```bash
cd backend
npm install pg
```

### Step 2: Create PostgreSQL Database

```sql
CREATE DATABASE gratitude_journal;

CREATE TABLE entries (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_entries_date ON entries(date);
```

### Step 3: Configure Database Connection

1. Create a `.env` file in the backend directory:
   ```
   DB_USER=your_username
   DB_HOST=localhost
   DB_NAME=gratitude_journal
   DB_PASSWORD=your_password
   DB_PORT=5432
   ```

2. Uncomment and configure `backend/src/config/database.js`

### Step 4: Update Data Store

Replace the in-memory methods in `backend/src/models/dataStore.js` with PostgreSQL queries. All methods are marked with `// TODO: DATABASE MIGRATION` comments showing the exact SQL queries to use.

Example migration for `getEntryByDate`:

```javascript
// Before (in-memory)
async getEntryByDate(date) {
  return this.entries.get(date) || null;
}

// After (PostgreSQL)
async getEntryByDate(date) {
  const pool = require('../config/database');
  const result = await pool.query(
    'SELECT * FROM entries WHERE date = $1',
    [date]
  );
  return result.rows[0] || null;
}
```

### Step 5: Test the Migration

1. Restart the backend server
2. Test all API endpoints to ensure they work with PostgreSQL
3. Update any error handling as needed

## TODO: Future Enhancements

- User authentication and multi-user support
- Rich text editor for entries
- Tags and categories for entries
- Search functionality
- Export entries to PDF or JSON
- Mobile app version
- Dark mode
- Email reminders to write daily entries

## Development Notes

- The backend uses a singleton pattern for the data store
- All dates should be in `YYYY-MM-DD` format
- The frontend uses React hooks for state management
- Tailwind CSS is configured with default settings

## License

MIT
