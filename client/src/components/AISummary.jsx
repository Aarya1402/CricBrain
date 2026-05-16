import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, RefreshCw, Volume2, Share2, Sparkles } from 'lucide-react';
import summariesData from '../data/aiSummaries.json';

export default function AISummary({ matchData }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState('');
  const [vibe, setVibe] = useState('analyst'); // 'analyst' or 'fanatic'
  const [allSummaries, setAllSummaries] = useState(summariesData);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/summaries');
        const json = await response.json();
        setAllSummaries(json);
      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    };
    fetchSummaries();
  }, []);

  const generateSummary = (currentVibe = vibe, data = allSummaries) => {
    setIsGenerating(true);
    setTimeout(() => {
      const currentSummaries = data[currentVibe];
      setSummary(currentSummaries[Math.floor(Math.random() * currentSummaries.length)]);
      setIsGenerating(false);
    }, 1500);
  };

  useEffect(() => {
    if (allSummaries) {
      generateSummary(vibe, allSummaries);
    }
  }, [allSummaries]);

  const handleVibeChange = (newVibe) => {
    setVibe(newVibe);
    generateSummary(newVibe);
  };

  const isFanatic = vibe === 'fanatic';

  return (
    <div className={`glass-card transition-all duration-500 overflow-hidden ${
      isFanatic ? 'bg-purple-900/20 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'bg-slate-900/40 border-white/5'
    }`}>
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className={isFanatic ? 'text-purple-400' : 'text-blue-400'} size={18} />
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200">
            CricBrain {isFanatic ? 'Fanatic' : 'AI Summary'}
          </h3>
        </div>
        
        {/* Vibe Toggle */}
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/10 scale-90 sm:scale-100">
          <button 
            onClick={() => handleVibeChange('analyst')}
            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
              !isFanatic ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            ANALYST
          </button>
          <button 
            onClick={() => handleVibeChange('fanatic')}
            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
              isFanatic ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            FANATIC
          </button>
        </div>
      </div>

      <div className="p-6 relative min-h-[160px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <Sparkles className={`animate-pulse ${isFanatic ? 'text-purple-400' : 'text-blue-400'}`} size={20} />
              <p className={`text-sm font-medium animate-pulse italic ${isFanatic ? 'text-purple-300' : 'text-blue-400/60'}`}>
                {isFanatic ? 'Getting hyped for the chase...' : 'CricBrain AI is processing match dynamics...'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <p className={`text-sm leading-relaxed font-medium italic ${isFanatic ? 'text-slate-100' : 'text-slate-300'}`}>
                "{summary}"
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-slate-900 flex items-center justify-center text-[8px] font-bold">KKR</div>
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-slate-900 flex items-center justify-center text-[8px] font-bold">GT</div>
                </div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                  Generated based on live momentum spikes
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Social Footer */}
      <div className="px-6 py-3 bg-blue-500/5 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Live Commentary Stream</span>
        <button className="flex items-center gap-1.5 text-[10px] font-bold hover:text-blue-400 transition-colors uppercase">
          <Share2 size={12} /> Share Summary
        </button>
      </div>
    </div>
  );
}
