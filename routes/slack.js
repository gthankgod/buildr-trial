const express = require('express');
const router = express.Router();

const slackController = require('../controllers/slack'); // Corrected import path
const verifySlackRequest = require('../middlewares/slack'); // Corrected import path

router.post('/events', verifySlackRequest, slackController.handleSlackEvent);

module.exports = router;
