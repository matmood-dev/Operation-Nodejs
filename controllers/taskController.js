const { getTasks, addTask, updateTask, deleteTask } = require('../models/taskModel');

const getTasksController = async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addTaskController = async (req, res) => {
  try {
    const task = req.body;
    const addedTask = await addTask(task);
    res.status(201).json(addedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTaskController = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = req.body;
    const updatedTask = await updateTask(taskId, task);
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const taskId = req.params.id;
    await deleteTask(taskId);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTasksController,
  addTaskController,
  updateTaskController,
  deleteTaskController
};
