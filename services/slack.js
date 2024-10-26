// src/services/slackService.js
const { getOpenAIResponse } = require('./openai');
const { sendSlackMessage } = require('../utils/slack'); // Updated import
const { queryVectorDb } = require('../models/vectors');
const axios = require('axios');
const { n8nWebhookUrl } = require('../config');

async function handleSlackEventWorkflow(text, channel) {
  const vectorResponse = await queryVectorDb(text);
  const relevantContext = vectorResponse;

  const prompt = `Based on the following context, please provide an appropriate action: ${relevantContext}`;
  const openAIResponse = await getOpenAIResponse(prompt);

  const emailAction = {
    to: 'specific_user@example.com',
    subject: 'Action Required',
    body: openAIResponse,
  };
  await axios.post(n8nWebhookUrl, emailAction);

  await sendSlackMessage(channel, openAIResponse); // Now calling the new sendSlackMessage function
  return openAIResponse;
}

module.exports = { handleSlackEventWorkflow };
