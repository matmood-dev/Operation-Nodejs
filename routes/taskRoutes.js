const express = require('express');
const { getTasksController, addTaskController, updateTaskController, deleteTaskController } = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', getTasksController);
router.post('/tasks', addTaskController);
router.put('/tasks/:id', updateTaskController);
router.delete('/tasks/:id', deleteTaskController);

module.exports = router;
