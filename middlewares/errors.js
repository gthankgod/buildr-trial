// src/middleware/errorHandler.js
const logger = require('../utils/logger');
const { errorResponse } = require('../utils/response');

function errorHandler(err, req, res, next) {
  // Log error details using the logger utility
  logger.error(`${err.message} - ${req.method} ${req.originalUrl} - ${req.ip}`);

  // Send a standardized error response
  const statusCode = err.status || 500;
  res.status(statusCode).json(errorResponse(err.message || 'Internal Server Error', null));
}

module.exports = errorHandler;
