import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Zap, TrendingUp } from 'lucide-react';

export default function PlayerCard({ player }) {
  const isKKR = player.team === 'KKR';
  const accentColor = isKKR ? 'from-purple-500 to-indigo-600' : 'from-blue-600 to-cyan-500';
  const glowColor = isKKR ? 'shadow-purple-500/20' : 'shadow-blue-500/20';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`glass-card p-0 overflow-hidden border-white/5 hover:border-white/20 transition-all ${glowColor}`}
    >
      {/* Player Header with Gradient */}
      <div className={`h-24 bg-gradient-to-br ${accentColor} relative`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -bottom-10 left-4 w-20 h-20 rounded-xl overflow-hidden border-4 border-slate-900 shadow-xl bg-slate-800">
          <img 
            src={player.image} 
            alt={player.name} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
          />
        </div>
        <div className="absolute top-2 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
          <Star className="text-amber-400 fill-amber-400" size={12} />
          <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Impact: {player.impact}</span>
        </div>
      </div>

      {/* Player Info */}
      <div className="pt-12 pb-6 px-5 space-y-4">
        <div>
          <h3 className="text-lg font-black tracking-tight">{player.name}</h3>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-2">
            <span className={isKKR ? 'text-purple-400' : 'text-blue-400'}>{player.team}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{player.role}</span>
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/5 p-2 rounded-lg border border-white/5">
            <p className="text-[9px] text-muted-foreground uppercase mb-1">Performance</p>
            <p className="text-sm font-bold">{player.stats}</p>
          </div>
          <div className="bg-white/5 p-2 rounded-lg border border-white/5">
            <p className="text-[9px] text-muted-foreground uppercase mb-1">Status</p>
            <p className={`text-sm font-bold ${player.status === 'Batting' ? 'text-green-400' : 'text-blue-400'}`}>
              {player.status}
            </p>
          </div>
        </div>

        {/* Impact Meter */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[9px] font-bold uppercase text-muted-foreground">
            <span>Match Impact</span>
            <span>{player.impact * 10}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${player.impact * 10}%` }}
              className={`h-full bg-gradient-to-r ${accentColor}`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
