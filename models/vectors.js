// src/models/vectorDbModel.js
const { PineconeClient } = require('@pinecone-database/pinecone');
const { vectorDbApiKey } = require('../config');

const client = new PineconeClient();

async function initVectorDb() {
  await client.init({
    apiKey: vectorDbApiKey,
    environment: 'us-west1-gcp', // Adjust based on your setup
  });
}

async function queryVectorDb(query) {
  const response = await client.query({ query }); // Adjust based on the library's API
  return response.data;
}

module.exports = { initVectorDb, queryVectorDb };
