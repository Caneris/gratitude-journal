const express = require('express');
const cors = require('cors');
const entryRoutes = require('./routes/entries');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/entries', entryRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gratitude Journal API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
