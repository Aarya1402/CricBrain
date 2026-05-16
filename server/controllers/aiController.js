const genAI = require('../config/gemini');
const insightsData = require('../data/aiInsights.json');
const summariesData = require('../data/aiSummaries.json');

const MODEL_NAME = "gemini-3.1-flash-lite";

exports.generateCommentary = async (req, res) => {
  const { vibe, context } = req.body;
  
  if (!genAI) {
    const currentSummaries = summariesData[vibe || 'analyst'];
    return res.json({ text: currentSummaries[Math.floor(Math.random() * currentSummaries.length)] });
  }

  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `
      Match Stats: ${JSON.stringify(context)}
      Persona: ${vibe === 'fanatic' ? 'A die-hard, hyper-enthusiastic KKR fan who uses emojis and slang' : 'A professional, calm, data-driven sports analyst'}
      Task: Write a 2-3 sentence commentary. Focus on ${vibe === 'fanatic' ? 'hype/momentum' : 'run rates/win prob'}.
    `;
    const result = await model.generateContent(prompt);
    res.json({ text: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: "Commentary generation failed" });
  }
};

exports.generateInsights = async (req, res) => {
  const { context } = req.body;
  
  if (!genAI) return res.json(insightsData);

  try {
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      generationConfig: { responseMimeType: "application/json" }
    });
    const prompt = `Analyze: ${JSON.stringify(context)}. Return JSON: { insights: [{title, content, color, type}], verdict: string }. Types: momentum, strategy.`;
    const result = await model.generateContent(prompt);
    res.json(JSON.parse(result.response.text()));
  } catch (error) {
    res.json(insightsData);
  }
};

const explanationsData = require('../data/explanations.json');

exports.generateExplanation = async (req, res) => {
  const { text, context } = req.body;
  console.log("🔍 Explaining Insight:", text);
  
  const getMockExplanation = (input) => {
    const lowerText = input.toLowerCase();
    if (lowerText.includes('win')) return explanationsData.win_prob;
    if (lowerText.includes('rate') || lowerText.includes('rr')) return explanationsData.run_rate;
    if (lowerText.includes('momentum')) return explanationsData.momentum;
    if (lowerText.includes('wicket')) return explanationsData.wickets;
    if (lowerText.includes('clutch') || lowerText.includes('russell')) return explanationsData.clutch;
    return explanationsData.default;
  };

  if (!genAI) {
    const mock = getMockExplanation(text);
    console.log("💾 Offline Mode: Using Mock:", mock);
    return res.json({ text: mock });
  }

  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `
      Match Context: ${JSON.stringify(context)}
      Specific Insight: "${text}"
      Task: Explain this technical cricket insight like I'm 5 years old. 
      Keep it very simple, short (1-2 sentences), and use an analogy if possible.
    `;
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();
    console.log("🤖 Gemini Explanation Generated.");
    res.json({ text: generatedText });
  } catch (error) {
    console.error("❌ Explanation Error:", error);
    res.json({ text: getMockExplanation(text) });
  }
};
