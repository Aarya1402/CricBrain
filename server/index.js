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

// Real-time AI Generation Route
app.post('/api/ai/generate', async (req, res) => {
  const { vibe, context } = req.body;
  
  if (!genAI) {
    // Fallback to mock data if no API key
    const currentSummaries = summariesData[vibe || 'analyst'];
    return res.json({ text: currentSummaries[Math.floor(Math.random() * currentSummaries.length)] });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
    
    const prompt = `
      You are an expert cricket analyst and commentator. 
      Context: ${JSON.stringify(context)}
      Vibe: ${vibe === 'fanatic' ? 'Passionate, hyped, slightly biased fan with emojis' : 'Professional, statistical, broadcast-quality analyst'}
      
      Task: Generate a short, 2-3 sentence match summary based on the current data. 
      Focus on momentum shifts and key players.
      Keep it punchy and engaging.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate AI content" });
  }
});

app.listen(PORT, () => {
  console.log(`CricBrain Server running on port ${PORT}`);
  if (!genAI) console.log("⚠️  GEMINI_API_KEY missing. Using mock fallbacks.");
});
