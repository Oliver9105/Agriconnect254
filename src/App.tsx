import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('market');

  return (
    <div className="min-h-screen bg-[#0B1120] text-white font-sans">
      {/* Header */}
      <header className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold italic text-[#B87333]">AgriConnect</h1>
      </header>

      {/* Marketplace View */}
      {view === 'market' && (
        <main className="p-6">
          <div className="bg-[#1E293B] p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Hass Avocado</h2>
            <div className="flex items-center gap-2 text-[#00F5FF] text-sm mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>KIAMIS Verified</span>
            </div>
            <div className="space-y-2 text-sm text-gray-300 mb-6">
              <p>Location: Kericho Ward</p>
              <p>Quantity: 50 Bags</p>
              <p>Grade: Grade A</p>
            </div>
            <div className="text-2xl font-bold text-[#B87333]">KSh 3,200/Bag</div>
          </div>
        </main>
      )}

      {/* Nudge Banner */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-orange-500 flex items-center justify-between">
        <span className="font-bold">Sign up to start trading!</span>
        <button className="bg-white text-orange-500 px-4 py-2 rounded-lg font-bold">JOIN</button>
      </div>
    </div>
  );
}
