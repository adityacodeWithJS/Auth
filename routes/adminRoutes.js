// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { createAdmin, updateUserRole } = require('../controller/userController');
const superAdminMiddleware = require('../middleware/superAdmin');

// Route to create a new admin (only accessible by superAdmins)
router.post('/createAdmin', superAdminMiddleware, createAdmin);

// // Route to update user role (only accessible by superAdmins)
// router.put('/updateUserRole', authMiddleware, adminMiddleware, updateUserRole);

module.exports = router;
