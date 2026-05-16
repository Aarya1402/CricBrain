import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const matchApi = {
  getMatchData: () => api.get('/match-data'),
  getSummaries: () => api.get('/summaries'),
  generateAICommentary: (vibe, context) => api.post('/ai/generate', { vibe, context }),
  generateAIInsights: (context) => api.post('/ai/insights', { context }),
  explainStat: (text, context) => api.post('/ai/explain', { text, context }),
};

export default api;
