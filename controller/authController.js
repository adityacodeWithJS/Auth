// controllers/authController.js
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);  // Static method of User model
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.login(email, password);  // Static method of User model
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
