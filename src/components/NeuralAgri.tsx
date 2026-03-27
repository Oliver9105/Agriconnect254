import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, Zap, Info, ChevronRight, Activity, Truck, Mic, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface PredictionData {
  batchId: string;
  crop: string;
  probability: string;
  status: string;
  graphData: any[];
  matrix: { label: string; value: string; color: string }[];
}

export const NeuralAgri = ({ batchId }: { batchId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);

  const runPrediction = async () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    
    setLoading(true);
    try {
      // Mocking API call for prediction
      await new Promise(resolve => setTimeout(resolve, 1500));
      const data: PredictionData = {
        batchId,
        crop: 'Hass Avocado',
        probability: '94.2',
        status: 'Optimal',
        graphData: Array.from({length: 12}, (_, i) => ({day: i, momentum: 40 + Math.random() * 40})),
        matrix: [
          { label: 'Soil pH', value: '6.4', color: 'text-emerald-500' },
          { label: 'Moisture', value: '78%', color: 'text-blue-500' },
          { label: 'Nutrients', value: 'High', color: 'text-amber-500' }
        ]
      };
      setPrediction(data);
      setIsOpen(true);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      layout
      className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 overflow-hidden relative group hover:border-emerald-500/30 transition-all duration-700 shadow-neumorphic"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-all duration-1000" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black font-mono uppercase tracking-[0.3em] rounded-full border border-emerald-500/20 shadow-glow-emerald">
              Batch #{batchId}
            </span>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-950 text-slate-500 text-[10px] font-black font-mono uppercase tracking-[0.3em] rounded-full border border-white/5 shadow-neumorphic-inset-sm">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-glow-emerald animate-pulse" />
              Active
            </div>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter leading-none">NeuralAgri Engine</h2>
          <p className="text-slate-600 text-[11px] font-black uppercase tracking-[0.3em] mt-3 opacity-80">Hass Avocado • Block A-12 • Kericho Highlands</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="p-6 bg-slate-950 rounded-[2rem] shadow-tactile hover:shadow-glow-emerald hover:scale-110 transition-all duration-700 border border-white/5">
            <Mic className="w-8 h-8 text-emerald-500" />
          </button>
          <button className="p-6 bg-slate-950 rounded-[2rem] shadow-tactile hover:shadow-glow-emerald hover:scale-110 transition-all duration-700 border border-white/5">
            <Download className="w-8 h-8 text-emerald-500" />
          </button>
          <div className="p-6 bg-slate-950 rounded-[2rem] shadow-tactile group-hover:shadow-glow-emerald group-hover:scale-110 transition-all duration-700 border border-white/5">
            <Activity className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>

      <div className="h-48 w-full mb-10 bg-slate-950/30 rounded-[2.5rem] border border-white/5 shadow-neumorphic-inset-sm">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={prediction?.graphData || Array.from({length: 12}, (_, i) => ({day: i, momentum: 30 + Math.random() * 30}))}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="50%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <Line 
              type="monotone" 
              dataKey="momentum" 
              stroke="url(#lineGradient)" 
              strokeWidth={4} 
              dot={false}
              animationDuration={2500}
              strokeLinecap="round"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                borderRadius: '24px', 
                fontSize: '11px', 
                fontFamily: 'monospace', 
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                padding: '16px'
              }}
              itemStyle={{ color: '#10b981', fontWeight: '900', textTransform: 'uppercase' }}
              cursor={{ stroke: 'rgba(16, 185, 129, 0.2)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button 
        onClick={runPrediction}
        disabled={loading}
        className={cn(
          "w-full py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] transition-all duration-700 flex items-center justify-center gap-4 relative z-10 active:scale-[0.98] shadow-neumorphic",
          isOpen 
            ? "bg-slate-950 text-slate-600 border border-white/5 shadow-neumorphic-inset" 
            : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-glow-emerald hover:shadow-glow-emerald-lg"
        )}
      >
        {loading ? (
          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin shadow-glow-emerald" />
        ) : (
          <>
            <Zap className={cn("w-5 h-5 transition-transform duration-500", !isOpen && "fill-current group-hover:scale-125")} />
            {isOpen ? "Terminate Analysis" : "Initialize Prediction Engine"}
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && prediction && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-12 pt-12 border-t border-white/5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {prediction.matrix.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-slate-950/50 p-6 rounded-[2rem] border border-white/5 shadow-neumorphic-inset-sm group/item hover:border-emerald-500/20 transition-all"
                  >
                    <p className="text-[9px] text-slate-700 uppercase font-black mb-2 tracking-[0.3em] group-hover/item:text-slate-500 transition-colors">{item.label}</p>
                    <p className={cn("text-xl font-black font-mono tracking-tighter", item.color)}>{item.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-emerald-500/5 rounded-[3rem] p-10 border border-emerald-500/10 shadow-neumorphic-inset">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-glow-emerald animate-pulse" />
                    <span className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em]">Yield Probability Matrix</span>
                  </div>
                  <span className="text-4xl font-black font-mono text-white tracking-tighter drop-shadow-glow-emerald">{prediction.probability}%</span>
                </div>
                <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden shadow-neumorphic-inset-sm p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${prediction.probability}%` }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-emerald-500 rounded-full shadow-glow-emerald relative overflow-hidden"
                  >
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  </motion.div>
                </div>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mt-6 text-center opacity-60">Confidence score based on 1.2M historical data points</p>
              </div>

              <div className="mt-10 p-10 bg-slate-950/50 rounded-[3rem] border border-white/5 shadow-neumorphic-inset-sm">
                <h4 className="text-white font-black text-lg uppercase tracking-[0.2em] mb-6">Predictive Harvest Window</h4>
                <p className="text-slate-400 text-sm mb-8">Optimal harvest window predicted for: <span className="text-emerald-400 font-bold">April 12 - April 15, 2026</span></p>
                <button className="w-full py-6 bg-cyan-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-cyan-500 transition-all shadow-glow-cyan flex items-center justify-center gap-4 active:scale-[0.98]">
                  <Truck className="w-5 h-5" />
                  Schedule Logistics Sync
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
