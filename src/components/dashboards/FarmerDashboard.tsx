import React from 'react';
import { motion } from 'motion/react';

export const FarmerDashboard = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="p-8"
  >
    <h2 className="text-3xl font-black text-white mb-6">Farmer Dashboard</h2>
    <p className="text-slate-500">Welcome to your dashboard. Here you can manage your farm and track your produce.</p>
  </motion.div>
);
