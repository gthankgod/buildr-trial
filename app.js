// app.js
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const errorHandler = require('./middlewares/errors');
const slackRoutes = require('./routes/slack');
const healthRoutes = require('./routes/health'); // Import health check route

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/slack', slackRoutes);
app.use('/health', healthRoutes); // Register health check route

// Global error handler
app.use(errorHandler);

module.exports = app;
