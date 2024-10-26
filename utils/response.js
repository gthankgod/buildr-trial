// src/utils/response.js
const logger = require('./logger');

// Success response function
function successResponse(message = 'Successfully processed', data = null, method = '') {
  const response = {
    status: 'success',
    message,
    data,
  };
  
  // Log only for non-GET requests
  if (method !== 'GET') {
    logger.info(`Success: ${message}`, { data });
  }

  return response;
}

// Error response function
function errorResponse(message = 'Error processing request', data = null, method = '') {
  const response = {
    status: 'error',
    message,
    data,
  };

  // Log only for non-GET requests
  if (method !== 'GET') {
    logger.error(`Error: ${message}`, { data });
  }

  return response;
}

module.exports = {
  successResponse,
  errorResponse,
};
