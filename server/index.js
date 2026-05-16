const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data Route
app.get('/api/match-data', (req, res) => {
  const matchData = require('./data/mockMatch.json');
  res.json(matchData);
});

// AI Insights Route
app.get('/api/insights', (req, res) => {
  const insights = require('./data/aiInsights.json');
  res.json(insights);
});

// AI Summaries Route
app.get('/api/summaries', (req, res) => {
  const summaries = require('./data/aiSummaries.json');
  res.json(summaries);
});

app.listen(PORT, () => {
  console.log(`CricBrain Server running on port ${PORT}`);
});
