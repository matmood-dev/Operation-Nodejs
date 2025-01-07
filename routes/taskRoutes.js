const express = require('express');
const { getTasksController, addTaskController, updateTaskController, deleteTaskController } = require('../controllers/taskController');
const path = require('path');

const router = express.Router();

router.get('/tasks', getTasksController);
router.post('/tasks', addTaskController);
router.put('/tasks/:id', updateTaskController);
router.delete('/tasks/:id', deleteTaskController);

// Endpoint to download the SQLite database file
router.get('/download-database', (req, res) => {
  const dbPath = path.resolve(__dirname, '../op1.db'); // Adjust the path to your database file
  res.download(dbPath, 'op1.db', (err) => {
    if (err) {
      console.error('Error downloading database:', err);
      res.status(500).send('Error downloading database.');
    }
  });
});

module.exports = router;
