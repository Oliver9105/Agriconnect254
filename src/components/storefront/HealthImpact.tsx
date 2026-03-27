import React from 'react';
import { Activity } from 'lucide-react';

export const HealthImpact = () => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-neumorphic">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          <Activity className="w-6 h-6 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-black text-white">Health Impact</h2>
      </div>
      <p className="text-slate-400 text-sm mb-4">Projected nutrient intake based on your orders.</p>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Vitamin C</span>
          <span className="text-emerald-400 font-bold">+15%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Fiber</span>
          <span className="text-emerald-400 font-bold">+20%</span>
        </div>
      </div>
    </div>
  );
};
