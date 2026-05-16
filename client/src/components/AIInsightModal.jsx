import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Brain, TrendingUp, Target } from 'lucide-react';
import insightsData from '../data/aiInsights.json';

const TypewriterText = ({ text, delay = 20 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return <p className="leading-relaxed text-slate-300">{displayedText}</p>;
};

export default function AIInsightModal({ isOpen, onClose, matchData }) {
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsGenerating(true);
      const timer = setTimeout(() => setIsGenerating(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const insights = insightsData.insights.map(item => ({
    ...item,
    icon: item.type === 'momentum' ? TrendingUp : Target,
    content: item.content.replace('{winProb}', matchData.winProbability.batting)
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Sparkles className="text-blue-400" size={20} />
                </div>
                <h2 className="text-xl font-bold tracking-tight">CricBrain AI Deep Dive</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="text-blue-500" size={48} />
                  </motion.div>
                  <p className="text-blue-400 font-medium animate-pulse">Analyzing match dynamics...</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {insights.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className={item.color} size={18} />
                        <h3 className="font-bold text-slate-100 uppercase tracking-widest text-xs">
                          {item.title}
                        </h3>
                      </div>
                      <TypewriterText text={item.content} delay={10} />
                    </motion.div>
                  ))}
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20"
                  >
                    <p className="text-xs text-blue-400 font-bold mb-2 uppercase tracking-tighter italic">AI Verdict</p>
                    <p className="text-sm italic text-slate-400">
                      "{insightsData.verdict}"
                    </p>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white/5 flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-sm transition-all"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
