// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); 
const taskRoutes = require('./routes/taskRoutes');
const superAdminRoutes = require('./routes/adminRoutes')

dotenv.config(); 

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use auth routes
app.use('/api', authRoutes);
// Use auth routes
app.use('/api/tasks', taskRoutes);

//use for admin create
app.use('/api/user',superAdminRoutes)



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
