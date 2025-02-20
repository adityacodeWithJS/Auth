// controllers/taskController.js
const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId; // Get user ID from JWT token

  try {
    const task = new Task({
      title,
      description,
      user_id: userId, // Assign the user ID to the task
    });

    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tasks created by the logged-in user or all tasks if the user is an admin
exports.getTasks = async (req, res) => {
  const userId = req.userId; // Get user ID from JWT token
  const role = req.role; // Get user role from JWT token

  try {
    let tasks;

    if (role === 'admin') {
      // Admin can see all tasks
      tasks = await Task.find();
    } else {
      // Regular user can only see their own tasks
      tasks = await Task.find({ user_id: userId });
    }

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
