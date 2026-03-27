import React from 'react';
import { 
  TrendingUp, 
  Leaf, 
  Droplets, 
  Sun, 
  Wind, 
  ChevronRight, 
  Zap,
  Activity,
  ArrowUpRight,
  Sprout
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';

const MOCK_GROWTH_DATA = [
  { day: 'Mon', momentum: 65, health: 82 },
  { day: 'Tue', momentum: 68, health: 84 },
  { day: 'Wed', momentum: 75, health: 85 },
  { day: 'Thu', momentum: 72, health: 83 },
  { day: 'Fri', momentum: 85, health: 88 },
  { day: 'Sat', momentum: 88, health: 90 },
  { day: 'Sun', momentum: 94, health: 92 },
];

const BATCH_MOMENTUM = [
  { id: 'K-TEA-01', name: 'Kericho Gold A1', momentum: 92, status: 'Optimal', color: '#10b981' },
  { id: 'K-TEA-02', name: 'Highland Pekoe', momentum: 78, status: 'Steady', color: '#06b6d4' },
  { id: 'K-TEA-03', name: 'Purple Tea B2', momentum: 85, status: 'Optimal', color: '#8b5cf6' },
];

const MomentumGauge = ({ value, label, sublabel }: { value: number, label: string, sublabel: string }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative group">
      <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-all duration-1000" />
      <svg className="w-56 h-56 transform -rotate-90 relative z-10">
        <circle
          cx="112"
          cy="112"
          r={radius}
          stroke="currentColor"
          strokeWidth="14"
          fill="transparent"
          className="text-slate-950 shadow-neumorphic-inset-sm"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "circOut" }}
          cx="112"
          cy="112"
          r={radius}
          stroke="url(#momentumGradient)"
          strokeWidth="14"
          strokeDasharray={circumference}
          fill="transparent"
          strokeLinecap="round"
          className="drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]"
        />
        <defs>
          <linearGradient id="momentumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-5xl font-black text-white font-mono tracking-tighter drop-shadow-glow-emerald"
        >
          {value}%
        </motion.span>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2 opacity-80">{label}</span>
      </div>
    </div>
  );
};

export const GrowthMomentum = () => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3.5rem] p-12 relative overflow-hidden group shadow-neumorphic transition-all duration-700 hover:border-emerald-500/20">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-emerald-500/5 blur-[150px] rounded-full -mr-60 -mt-60 group-hover:bg-emerald-500/10 transition-all duration-1000 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-cyan-500/5 blur-[120px] rounded-full -ml-40 -mb-40 group-hover:bg-cyan-500/10 transition-all duration-1000 pointer-events-none" />
      
      <div className="flex flex-col xl:flex-row gap-20 relative z-10">
        {/* Left Section: Main Gauge & Stats */}
        <div className="xl:w-1/3 space-y-16">
          <div className="flex items-center gap-8 mb-4">
            <div className="p-5 bg-slate-950 rounded-[2rem] border border-white/5 shadow-tactile-premium group-hover:shadow-glow-emerald transition-all duration-700">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-4xl font-black text-white tracking-tighter drop-shadow-2xl">Growth Momentum</h3>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-glow-emerald" />
                <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-[0.4em]">Optimal Growth State</p>
              </div>
            </div>
          </div>

          <div className="py-8">
            <MomentumGauge value={88} label="Overall Momentum" sublabel="Kericho Enterprise Sector" />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-slate-950/50 p-8 rounded-[2.5rem] border border-white/5 shadow-neumorphic-inset-sm group/stat hover:bg-slate-950/80 transition-all duration-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl group-hover/stat:bg-emerald-500/20 transition-colors shadow-tactile">
                  <Leaf className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Soil Health</span>
              </div>
              <p className="text-3xl font-black text-white font-mono tracking-tighter drop-shadow-glow-emerald">94%</p>
            </div>
            <div className="bg-slate-950/50 p-8 rounded-[2.5rem] border border-white/5 shadow-neumorphic-inset-sm group/stat hover:bg-slate-950/80 transition-all duration-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-xl group-hover/stat:bg-cyan-500/20 transition-colors shadow-tactile">
                  <Droplets className="w-5 h-5 text-cyan-500" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Hydration</span>
              </div>
              <p className="text-3xl font-black text-white font-mono tracking-tighter drop-shadow-glow-cyan">82%</p>
            </div>
          </div>
        </div>

        {/* Middle Section: Chart */}
        <div className="xl:w-2/3 space-y-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <button className="text-[11px] font-black text-white uppercase tracking-[0.4em] border-b-2 border-emerald-500 pb-3 transition-all hover:text-emerald-400">Momentum Trend</button>
              <button className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em] hover:text-slate-400 transition-colors pb-3">Yield Forecast</button>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 bg-slate-950 rounded-2xl border border-white/5 shadow-tactile-premium">
              <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] font-mono">Live Telemetry</span>
            </div>
          </div>

          <div className="h-[400px] w-full bg-slate-950/60 rounded-[3.5rem] border border-white/5 shadow-neumorphic-inset relative group/chart">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none group-hover/chart:opacity-100 opacity-50 transition-opacity duration-1000 rounded-[3.5rem]" />
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorMomentum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: 900, letterSpacing: '0.1em' }} 
                  dy={15}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(2, 6, 23, 0.95)', 
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '24px',
                    fontSize: '11px',
                    fontWeight: '900',
                    color: '#fff',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                    padding: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                  itemStyle={{ color: '#10b981' }}
                  cursor={{ stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="momentum" 
                  stroke="#10b981" 
                  strokeWidth={6}
                  fillOpacity={1} 
                  fill="url(#colorMomentum)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Batch Momentum List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BATCH_MOMENTUM.map((batch) => (
              <motion.div 
                key={batch.id}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-slate-950/50 p-8 rounded-[2.5rem] border border-white/5 shadow-tactile-premium group/batch transition-all duration-700 hover:bg-slate-950/80"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-slate-900 rounded-2xl shadow-neumorphic-inset-sm group-hover/batch:shadow-glow-emerald transition-all duration-500 border border-white/5">
                    <Sprout className="w-6 h-6 text-slate-700 group-hover/batch:text-emerald-400 transition-colors" />
                  </div>
                  <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 uppercase tracking-[0.3em] shadow-glow-emerald">
                    {batch.status}
                  </span>
                </div>
                <h4 className="text-base font-black text-white mb-2 tracking-tight group-hover/batch:text-emerald-400 transition-colors">{batch.name}</h4>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] font-mono">{batch.id}</span>
                  <span className="text-xl font-black text-white font-mono tracking-tighter drop-shadow-glow-emerald">{batch.momentum}%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 shadow-neumorphic-inset-sm">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${batch.momentum}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-glow-emerald"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
