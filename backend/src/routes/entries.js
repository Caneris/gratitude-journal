const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');

router.post('/', entryController.createEntry);
router.get('/', entryController.getAllEntries);
router.get('/range', entryController.getEntriesInRange);
router.get('/:date', entryController.getEntryByDate);
router.delete('/:date', entryController.deleteEntry);

module.exports = router;
