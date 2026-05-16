const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const matchData = require('../data/mockMatch.json');
const insightsData = require('../data/aiInsights.json');
const summariesData = require('../data/aiSummaries.json');

// Static Data Routes
router.get('/match-data', (req, res) => res.json(matchData));
router.get('/insights', (req, res) => res.json(insightsData));
router.get('/summaries', (req, res) => res.json(summariesData));

// AI Routes
router.post('/ai/generate', aiController.generateCommentary);
router.post('/ai/insights', aiController.generateInsights);

module.exports = router;
