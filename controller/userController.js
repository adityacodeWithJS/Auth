// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create an admin (only accessible by superAdmin)
exports.createAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user is superAdmin
    if (req.user.role !== 'superAdmin') {
      return res.status(403).json({ message: 'Permission denied. Only superAdmins can create admins.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with admin role
    const newAdmin = new User({
      email,
      password: hashedPassword,
      role: 'admin', // Assigning the role 'admin'
    });

    // Save user to DB
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully', user: { email, role: 'admin' } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user role (only superAdmin can update other admins to superAdmin or admin)
exports.updateUserRole = async (req, res) => {
  const { userId, role } = req.body;

  try {
    // Check if user is superAdmin
    if (req.user.role !== 'superAdmin') {
      return res.status(403).json({ message: 'Permission denied. Only superAdmins can update roles.' });
    }

    // Validate role
    if (!['superAdmin', 'admin', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role.' });
    }

    // Find and update the user role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.role = role;
    await user.save();
    res.status(200).json({ message: `User role updated to ${role}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
