import React from 'react';
import { motion } from 'motion/react';

export const SkeletonBento = () => {
  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-[2.5rem] p-8 overflow-hidden relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
      />
      <div className="space-y-4">
        <div className="h-6 w-3/4 bg-slate-800 rounded-lg" />
        <div className="h-4 w-1/2 bg-slate-800 rounded-lg" />
        <div className="h-12 w-full bg-slate-800 rounded-2xl" />
      </div>
    </div>
  );
};
