import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Zap, TrendingUp, Info, Menu, Share2, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import mockData from './data/mockMatch.json';
import AIInsightModal from './components/AIInsightModal';
import TermExplainer from './components/TermExplainer';
import PlayerCard from './components/PlayerCard';

const GlassCard = ({ children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`glass-card p-6 ${className}`}
  >
    {children}
  </motion.div>
);

const StatBadge = ({ icon: Icon, label, value, color = "text-blue-400" }) => (
  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
    <div className={`p-2 rounded-md bg-white/5 ${color}`}>
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  </div>
);

export default function App() {
  const [data, setData] = useState(mockData);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Premium Header */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Activity className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            CRICLYTICS <span className="text-blue-400">AI</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
          </button>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Match Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest">IPL 2024 • LIVE</span>
            </div>
            <h2 className="text-3xl font-extrabold">{data.matchInfo.title}</h2>
            <p className="text-muted-foreground">{data.matchInfo.status}</p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20">
              <Share2 size={16} /> Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium transition-all">
              <Info size={16} /> Match Info
            </button>
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard className="flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#3A225D]"></div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">{data.matchInfo.teams.batting.shortName}</p>
                <h3 className="text-4xl font-black">
                  {data.matchInfo.teams.batting.score}/
                  <span className="text-blue-400">{data.matchInfo.teams.batting.wickets}</span>
                </h3>
              </div>
              <p className="text-sm font-medium mb-1">{data.matchInfo.teams.batting.overs} Overs</p>
            </div>
            <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                className="h-full bg-gradient-to-r from-[#3A225D] to-[#74448B]"
              />
            </div>
          </GlassCard>

          <TermExplainer term="CRR">
            <StatBadge icon={TrendingUp} label="Current RR" value={data.liveStats.currentRunRate} />
          </TermExplainer>
          
          <TermExplainer term="RRR">
            <StatBadge icon={Zap} label="Required RR" value={data.liveStats.requiredRunRate} color="text-amber-400" />
          </TermExplainer>
          
          <TermExplainer term="Win Prob">
            <StatBadge icon={Activity} label="Win Prob" value={`${data.matchInfo.winProbability.batting}%`} color="text-green-400" />
          </TermExplainer>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Momentum Chart */}
          <GlassCard className="lg:col-span-2 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <TermExplainer term="Momentum">
                <h3 className="text-lg font-bold flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <TrendingUp className="text-blue-400" size={20} />
                  Momentum Timeline
                </h3>
              </TermExplainer>
              <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs outline-none">
                <option>Full Match</option>
                <option>Last 10 Overs</option>
              </select>
            </div>
            <div className="flex-1 w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.momentumTimeline}>
                  <defs>
                    <linearGradient id="colorMomentum" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis dataKey="over" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '8px' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="momentum" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorMomentum)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* AI Insights Card */}
          <GlassCard className="flex flex-col bg-blue-500/5 border-blue-500/20">
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Zap size={20} />
              </div>
              <h3 className="text-lg font-bold tracking-tight">AI Insights</h3>
            </div>
            
            <div className="space-y-4 flex-1">
              <AnimatePresence>
                {data.aiInsights.map((insight, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group"
                  >
                    <p className="text-sm leading-relaxed text-slate-300">
                      {insight}
                    </p>
                    <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[10px] uppercase font-bold text-blue-400 hover:underline">
                        Explain Stats
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={() => setIsAIModalOpen(true)}
              className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Generate Deep Dive
            </button>
          </GlassCard>
        </div>

        {/* Key Players Section */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Zap className="text-amber-400" size={24} />
              Key Match Performers
            </h3>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Dynamic Impact Ratings</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.players.map((player, i) => (
              <PlayerCard key={i} player={player} />
            ))}
          </div>
        </div>
      </main>

      <AIInsightModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        matchData={data.matchInfo}
      />
    </div>
  );
}
