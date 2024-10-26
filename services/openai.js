// src/services/openaiService.js
const axios = require('axios');
const { openaiApiKey } = require('../config');

async function getOpenAIResponse(prompt) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4', // Adjust model as needed
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
}

module.exports = { getOpenAIResponse };
