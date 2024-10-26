// src/config/index.js
require('dotenv').config();

module.exports = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  vectorDbApiKey: process.env.VECTOR_DB_API_KEY,
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL,
  slackBotToken: process.env.SLACK_BOT_TOKEN,
  slackSigningSecret: process.env.SLACK_SIGNING_SECRET,
  port: process.env.PORT || 3000,
};
