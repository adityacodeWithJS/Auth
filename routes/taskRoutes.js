
const express = require('express');
const router = express.Router();

const taskController = require('../controller/TaskController');
const {authMiddleware,adminMiddleware} = require('../middleware/auth'); // Protect routes
// Route to create a task
router.post('/create', authMiddleware, taskController.createTask);

// Route to get all tasks created by the logged-in user
router.get('/list', authMiddleware, taskController.getTasks);

router.get('/lists', authMiddleware, adminMiddleware, taskController.getTasks); // Apply adminMiddleware

module.exports = router;