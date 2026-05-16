import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, HelpCircle, X, Lightbulb } from 'lucide-react';
import explanations from '../data/explanations.json';

export default function TermExplainer({ term, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const data = explanations[term];

  if (!data) return children;

  return (
    <div className="relative inline-block w-full">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-help transition-all hover:opacity-80 active:scale-95"
      >
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Transparent backdrop to catch clicks outside the card */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/5" 
              onClick={() => setIsOpen(false)} 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-4 w-[calc(100vw-2rem)] sm:w-80 p-5 glass-card bg-slate-900/95 border-blue-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-blue-400">
                  <HelpCircle size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">{data.title}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }} 
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {data.explanation}
              </p>

              <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Lightbulb className="text-amber-400 shrink-0" size={16} />
                <p className="text-[11px] text-blue-300 italic">
                  <span className="font-bold text-amber-400 not-italic mr-1">PRO TIP:</span>
                  {data.beginnerTip}
                </p>
              </div>

              {/* Triangle pointer (Top) */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-l border-t border-blue-500/30 rotate-45" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
