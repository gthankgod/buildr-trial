// src/models/vectorDbModel.js
const { PineconeClient } = require('@pinecone-database/pinecone');
const { vectorDbApiKey } = require('../config');

const client = new PineconeClient();

async function initVectorDb() {
  await client.init({
    apiKey: vectorDbApiKey,
    environment: 'https://demo-qa8wyiw.svc.aped-4627-b74a.pinecone.io', // Adjust based on your setup
  });
}

async function queryVectorDb(query) {
  const response = await client.query({ query }); // Adjust based on the library's API
  return response.data;
}

module.exports = { initVectorDb, queryVectorDb };
