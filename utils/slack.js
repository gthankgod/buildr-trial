// src/utils/slackUtils.js
const axios = require('axios');
const { slackApiUrl } = require('../config');

async function sendSlackMessage(channel, message) {
  const payload = { channel, text: message };
  return axios.post(slackApiUrl, payload, { headers: { 'Content-Type': 'application/json' } });
}

module.exports = { sendSlackMessage };
