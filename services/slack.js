// src/services/slackService.js
const { WebClient } = require('@slack/web-api');
const { slackBotToken } = require('../config');

const slackClient = new WebClient(slackBotToken);

async function sendSlackMessage(channel, text) {
  await slackClient.chat.postMessage({ channel, text });
}

module.exports = { sendSlackMessage };
