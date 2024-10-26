// src/routes/health.js
const express = require('express');
const router = express.Router();

// Health check route
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Service is up and running',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

module.exports = router;
