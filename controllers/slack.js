// src/controllers/slackController.js
const slackService = require('../services/slack');
const { successResponse, errorResponse } = require('../utils/response');

async function handleSlackEvent(req, res) {
  const { text, channel } = req.body.event;

  try {
    const openAIResponse = await slackService.handleSlackEventWorkflow(text, channel);
    res.status(200).json(successResponse('Slack event processed successfully', openAIResponse, req.method));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to process Slack event', null, req.method));
  }
}

module.exports = { handleSlackEvent };
