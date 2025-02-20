// controllers/authController.js
const User = require('../models/User');

// Register new user
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await User.login(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
