import React from 'react';
import { motion } from 'motion/react';

export const MyOrders = () => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-neumorphic">
      <h2 className="text-2xl font-black text-white mb-6">My Orders</h2>
      <div className="space-y-4">
        <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
          <h3 className="font-bold text-white mb-2">Premium Kericho Tea</h3>
          <p className="text-sm text-slate-500 mb-4">98 days to harvest</p>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} className="h-full bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
