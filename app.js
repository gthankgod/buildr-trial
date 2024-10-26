var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { port } = require('./config');

const { initVectorDb } = require('./models/vectors');
const { handleSlackEvent } = require('./controllers/slack');
const { verifySlackRequest } = require('./middlewares/slack');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

(async () => {
  await initVectorDb();
})();

app.post('/slack/events', verifySlackRequest, handleSlackEvent);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


module.exports = app;
