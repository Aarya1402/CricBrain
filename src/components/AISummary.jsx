import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, RefreshCw, Volume2, Share2, Sparkles } from 'lucide-react';

export default function AISummary({ matchData }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState('');

  const generateSummary = () => {
    setIsGenerating(true);
    // Simulate AI thinking
    setTimeout(() => {
      const summaries = [
        `What a turnaround at the Eden Gardens! KKR looked down and out after Rashid Khan's double strike in the middle overs, but the 'Russell Storm' has completely shifted the momentum. With 15 needed off 16 balls and two set finishers at the crease, the win probability has swung 30% in KKR's favor in just the last 12 deliveries.`,
        `KKR's aggressive approach against pace is paying dividends. Despite GT's disciplined bowling earlier, the pressure of the death overs is starting to show. Andre Russell's 42 off 15 is one of the highest impact cameos of the season so far, leaving GT's captain needing a tactical masterclass to pull this back.`,
        `The narrative of the match changed the moment KKR decided to target the 16th over. From a required rate of nearly 10, they've brought it down to a manageable 5.63. Rashid Khan's spell is over, and GT's secondary bowlers now face the daunting task of stopping a rampant Rinku and Russell.`
      ];
      setSummary(summaries[Math.floor(Math.random() * summaries.length)]);
      setIsGenerating(false);
    }, 1500);
  };

  useEffect(() => {
    generateSummary();
  }, []);

  return (
    <div className="glass-card bg-slate-900/40 border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-blue-400" size={18} />
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200">AI Match Summary</h3>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={generateSummary}
            className={`p-1.5 hover:bg-white/10 rounded-md transition-all ${isGenerating ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={14} />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-md transition-all">
            <Volume2 size={14} />
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
              className="flex items-center gap-3 text-blue-400/60"
            >
              <Sparkles className="animate-pulse" size={20} />
              <p className="text-sm font-medium animate-pulse italic">CricBrain AI is processing match dynamics...</p>
            </motion.div>
          ) : (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <p className="text-sm leading-relaxed text-slate-300 font-medium italic">
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
