const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static method for signing up a new user
userSchema.statics.signup = async function (email, password) {
  // Check if user already exists
  const existingUser = await this.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new this({
    email,
    password: hashedPassword,
  });

  // Save the user and return it
  await user.save();
  return user;
};

// Static method for logging in a user
userSchema.statics.login = async function (email, password) {
  // Find user by email
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { user, token };
};

module.exports = mongoose.model('User', userSchema);
