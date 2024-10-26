// src/middleware/slackMiddleware.js
const crypto = require('crypto');
const { slackSigningSecret } = require('../config');

function verifySlackRequest(req, res, next) {
  const signature = req.headers['x-slack-signature'];
  const timestamp = req.headers['x-slack-request-timestamp'];
  const body = JSON.stringify(req.body);

  const hmac = crypto.createHmac('sha256', slackSigningSecret);
  const sigBaseString = `v0:${timestamp}:${body}`;
  const mySignature = `v0=${hmac.update(sigBaseString).digest('hex')}`;

  if (crypto.timingSafeEqual(Buffer.from(mySignature), Buffer.from(signature))) {
    next();
  } else {
    res.status(401).send('Verification failed');
  }
}

module.exports = { verifySlackRequest };
