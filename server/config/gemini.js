const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

if (!genAI) {
  console.log("⚠️  GEMINI_API_KEY missing. Using mock fallbacks.");
} else {
  console.log("✅ Gemini AI Initialized successfully.");
}

module.exports = genAI;
