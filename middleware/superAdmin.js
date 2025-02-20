// middleware/superAdminMiddleware.js
const jwt = require('jsonwebtoken');

const superAdminMiddleware = (req, res, next) => {
  // Check for token in request headers
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded payload to the request

    // Check if the user has superAdmin role
    if (req.user.role !== 'superAdmin') {
      return res.status(403).json({ message: 'Access denied. Only superAdmin can create admin.' });
    }
    next(); // Continue to the next middleware or controller
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = superAdminMiddleware;
