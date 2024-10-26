// src/controllers/slackController.js
const { getOpenAIResponse } = require('../services/openaiService');
const { sendSlackMessage } = require('../services/slackService');
const { queryVectorDb } = require('../models/vectorDbModel');
const axios = require('axios');
const { n8nWebhookUrl } = require('../config');

async function handleSlackEvent(req, res) {
  const { text, channel } = req.body.event;

  try {
    // 1. Query the vector database
    const vectorResponse = await queryVectorDb(text);
    
    // 2. Extract relevant context from the vector DB response
    const relevantContext = vectorResponse; // Adjust based on your response structure

    // 3. Create a prompt for OpenAI
    const prompt = `Based on the following context, please provide an appropriate action: ${relevantContext}`;

    // 4. Get OpenAI response
    const openAIResponse = await getOpenAIResponse(prompt);

    // 5. Trigger n8n to send an email
    const emailAction = {
      to: 'specific_user@example.com', // Placeholder for user's email
      subject: 'Action Required',
      body: openAIResponse,
    };
    await axios.post(n8nWebhookUrl, emailAction);

    // 6. Send response back to Slack
    await sendSlackMessage(channel, openAIResponse);

    // 7. Acknowledge the event
    res.status(200).send('OK');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { handleSlackEvent };
