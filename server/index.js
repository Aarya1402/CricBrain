require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini
console.log("Checking GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "FOUND (Starts with " + process.env.GEMINI_API_KEY.slice(0, 4) + ")" : "NOT FOUND");
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

app.use(cors());
app.use(express.json());

// Mock Data
const matchData = require('./data/mockMatch.json');
const insightsData = require('./data/aiInsights.json');
const summariesData = require('./data/aiSummaries.json');

app.get('/api/match-data', (req, res) => res.json(matchData));
app.get('/api/insights', (req, res) => res.json(insightsData));
app.get('/api/summaries', (req, res) => res.json(summariesData));

// Real-time AI Commentary Generation
app.post('/api/ai/generate', async (req, res) => {
  const { vibe, context } = req.body;
  if (!genAI) {
    const currentSummaries = summariesData[vibe || 'analyst'];
    return res.json({ text: currentSummaries[Math.floor(Math.random() * currentSummaries.length)] });
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Match Context: ${JSON.stringify(context)}. Vibe: ${vibe}. Generate a 2-sentence flashy match summary.`;
    const result = await model.generateContent(prompt);
    res.json({ text: result.response.text() });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate AI content" });
  }
});

// Real-time AI Deep Dive Insights
app.post('/api/ai/insights', async (req, res) => {
  const { context } = req.body;
  if (!genAI) return res.json(insightsData);

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    const prompt = `Analyze: ${JSON.stringify(context)}. Return JSON: { insights: [{title, content, color, type}], verdict: string }. Types: momentum, strategy.`;
    const result = await model.generateContent(prompt);
    res.json(JSON.parse(result.response.text()));
  } catch (error) {
    console.error("Insights Error:", error);
    res.json(insightsData);
  }
});

app.listen(PORT, () => {
  console.log(`CricBrain Server running on port ${PORT}`);
  if (!genAI) console.log("⚠️  GEMINI_API_KEY missing. Using mock fallbacks.");
});
