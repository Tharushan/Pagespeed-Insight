const cors = require('cors');
const express = require('express');

const PerformanceScore = require('./models/PerformanceScore');

const app = express();
require('dotenv').config()
app.use(cors());

const { SERVER_PORT } = process.env;
const PORT = SERVER_PORT || 8000;

app.get('/performance-score', async (req, res) => {
  try {
    const performances = await PerformanceScore.query()
    .orderBy('date_performance', 'desc')
    .limit(10);
    res.json(performances);
  } catch (error) {
    console.error(error.message);
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log('Listening on port %d', PORT);
});