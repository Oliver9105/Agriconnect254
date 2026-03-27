import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Zap,
  Activity,
  PieChart,
  Target,
  Truck,
  Leaf
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';
import { cn } from '../../lib/utils';

const YIELD_DATA = [
  { month: 'Jan', yield: 4200, target: 4000 },
  { month: 'Feb', yield: 3800, target: 4000 },
  { month: 'Mar', yield: 5100, target: 4500 },
  { month: 'Apr', yield: 4900, target: 4500 },
  { month: 'May', yield: 6200, target: 5000 },
  { month: 'Jun', yield: 5800, target: 5000 },
  { month: 'Jul', yield: 7100, target: 6000 },
];

const LOGISTICS_DATA = [
  { name: 'Nairobi Hub', value: 45, color: '#10b981' },
  { name: 'Kericho Hub', value: 30, color: '#3b82f6' },
  { name: 'Mombasa Port', value: 25, color: '#f59e0b' },
];

const EFFICIENCY_DATA = [
  { day: 'Mon', efficiency: 88 },
  { day: 'Tue', efficiency: 92 },
  { day: 'Wed', efficiency: 85 },
  { day: 'Thu', efficiency: 94 },
  { day: 'Fri', efficiency: 90 },
  { day: 'Sat', efficiency: 96 },
  { day: 'Sun', efficiency: 98 },
];

const StatCard = ({ label, value, trend, icon: Icon, color = 'emerald' }: { label: string, value: string, trend: string, icon: any, color?: string }) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl hover:border-emerald-500/30 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={cn(
        "p-3 rounded-lg transition-colors",
        color === 'emerald' ? "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white" :
        color === 'blue' ? "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white" :
        "bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-mono font-bold",
        trend.startsWith('+') ? "text-emerald-500" : "text-rose-500"
      )}>
        {trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trend}
      </div>
    </div>
    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black text-white font-mono">{value}</p>
  </div>
);

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7D');
  const [isExporting, setIsExporting] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '2026-03-01', end: '2026-03-25' });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Mock download
      const content = `Date,Yield,Target\n${YIELD_DATA.map(d => `${d.month},${d.yield},${d.target}`).join('\n')}`;
      const blob = new Blob([content], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `agriconnect_analytics_${dateRange.start}_to_${dateRange.end}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tighter mb-3 drop-shadow-2xl">Analytics Engine</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-glow-emerald" />
            <p className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.3em]">Supply chain optimization & yield forecasting</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-[2rem] border border-white/5 shadow-neumorphic-inset">
            <input type="date" value={dateRange.start} onChange={(e) => setDateRange({...dateRange, start: e.target.value})} className="bg-transparent text-[10px] text-slate-400 font-black uppercase tracking-[0.1em] focus:outline-none" />
            <span className="text-slate-600">to</span>
            <input type="date" value={dateRange.end} onChange={(e) => setDateRange({...dateRange, end: e.target.value})} className="bg-transparent text-[10px] text-slate-400 font-black uppercase tracking-[0.1em] focus:outline-none" />
          </div>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="p-5 bg-slate-950 border border-white/5 rounded-2xl hover:bg-slate-900 transition-all shadow-neumorphic active:shadow-neumorphic-inset disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Download className={cn("w-6 h-6 text-slate-500 group-hover:text-emerald-500 transition-colors", isExporting && "animate-bounce")} />
          </button>
        </div>
      </div>

      {/* Predictive Insights Section */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 shadow-neumorphic">
        <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] mb-8">Predictive Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-950/50 rounded-[2rem] border border-white/5">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Predicted Yield (Next Month)</p>
            <p className="text-3xl font-black text-emerald-400 font-mono">6,800 Tons</p>
          </div>
          <div className="p-6 bg-slate-950/50 rounded-[2rem] border border-white/5">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Market Price Trend</p>
            <p className="text-3xl font-black text-amber-400 font-mono">+5.2%</p>
          </div>
          <div className="p-6 bg-slate-950/50 rounded-[2rem] border border-white/5">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Risk Assessment</p>
            <p className="text-3xl font-black text-rose-400 font-mono">Low</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Yield', value: '124.8 Tons', trend: '+12.4%', icon: Leaf, color: 'emerald' },
          { label: 'Logistics Efficiency', value: '94.2%', trend: '+2.1%', icon: Truck, color: 'cyan' },
          { label: 'Market Volatility', value: 'Low', trend: '-4.5%', icon: Activity, color: 'amber' },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 group shadow-neumorphic hover:border-emerald-500/30 transition-all duration-500">
            <div className="flex justify-between items-start mb-8">
              <div className={cn(
                "p-5 rounded-[2rem] shadow-tactile transition-all duration-700",
                stat.color === 'emerald' ? "bg-emerald-500/10 text-emerald-500 group-hover:shadow-glow-emerald" :
                stat.color === 'cyan' ? "bg-cyan-500/10 text-cyan-500 group-hover:shadow-glow-cyan" :
                "bg-amber-500/10 text-amber-500 group-hover:shadow-glow-amber"
              )}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className={cn(
                "flex items-center gap-2 text-[10px] font-mono font-black px-3 py-1.5 rounded-xl border shadow-glow-emerald",
                stat.trend.startsWith('+') ? "text-emerald-500 bg-emerald-500/5 border-emerald-500/10" : "text-rose-500 bg-rose-500/5 border-rose-500/10 shadow-glow-rose"
              )}>
                {stat.trend.startsWith('+') ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-3 opacity-80">{stat.label}</p>
            <p className="text-4xl font-black text-white font-mono tracking-tighter drop-shadow-2xl">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Yield Trends Chart */}
        <div className="lg:col-span-8 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 shadow-neumorphic">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-[0.4em]">Yield Performance</h3>
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-80">Actual vs Target (Metric Tons)</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-glow-emerald" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Actual</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-slate-950 border border-white/10" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Target</span>
              </div>
            </div>
          </div>
          <div className="h-[450px] min-h-[450px] w-full relative">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={YIELD_DATA}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  fontFamily="JetBrains Mono"
                  dy={15}
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  fontFamily="JetBrains Mono"
                  dx={-15}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', fontSize: '11px', fontFamily: 'JetBrains Mono', boxShadow: '0 30px 60px rgba(0,0,0,0.6)', padding: '16px' }}
                  itemStyle={{ color: '#10b981', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                />
                <Area type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorYield)" />
                <Area type="monotone" dataKey="target" stroke="#475569" strokeWidth={2} strokeDasharray="8 8" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Pie Chart */}
        <div className="lg:col-span-4 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 shadow-neumorphic">
          <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] mb-2">Hub Distribution</h3>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mb-12 opacity-80">Volume by Location</p>
          <div className="h-[320px] min-h-[320px] w-full relative">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <RePieChart>
                <Pie
                  data={LOGISTICS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={115}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {LOGISTICS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-2xl" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', fontSize: '11px', fontFamily: 'JetBrains Mono', padding: '12px' }}
                />
              </RePieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] mb-1">Total</p>
              <p className="text-3xl font-black text-white font-mono tracking-tighter">100%</p>
            </div>
          </div>
          <div className="space-y-5 mt-12">
            {LOGISTICS_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-white/5 shadow-neumorphic-inset group hover:border-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full shadow-glow-emerald" style={{ backgroundColor: item.color, color: item.color }} />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{item.name}</span>
                </div>
                <span className="text-sm font-mono font-black text-white tracking-tighter">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Efficiency Bar Chart */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 shadow-neumorphic">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.4em]">Logistics Efficiency</h3>
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-80">Daily Performance Index</p>
          </div>
          <div className="flex items-center gap-4 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] bg-emerald-500/5 px-6 py-3 rounded-full border border-emerald-500/20 shadow-tactile hover:shadow-glow-emerald transition-all cursor-default">
            <Zap className="w-5 h-5" />
            <span>Optimal Performance</span>
          </div>
        </div>
        <div className="h-[300px] min-h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={EFFICIENCY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="day" 
                stroke="#475569" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                fontFamily="JetBrains Mono"
                dy={15}
              />
              <YAxis 
                stroke="#475569" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                domain={[0, 100]} 
                fontFamily="JetBrains Mono"
                dx={-15}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 16 }}
                contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', fontSize: '11px', fontFamily: 'JetBrains Mono', padding: '16px' }}
              />
              <Bar dataKey="efficiency" radius={[12, 12, 0, 0]} barSize={50}>
                {EFFICIENCY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.efficiency > 90 ? '#10b981' : '#3b82f6'} className="drop-shadow-2xl" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
