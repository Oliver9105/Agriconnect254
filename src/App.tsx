import React, { useState } from 'react';
import {
  ShoppingBag,
  Package,
  History,
  MessageSquare,
  Settings as SettingsIcon,
  Bell,
  TrendingUp,
  LayoutDashboard,
  CloudSun,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { useTheme } from './context/ThemeContext';
import { Marketplace } from './components/Marketplace';
import { Inventory } from './components/Inventory';
import { Transactions } from './components/Transactions';
import { Messaging } from './components/Messaging';
import { Settings } from './components/Settings';
import { NeuralAgri } from './components/NeuralAgri';
import { GrowthMomentum } from './components/GrowthMomentum';
import { WeatherForecast } from './components/WeatherForecast';
import { NotificationDrawer } from './components/NotificationDrawer';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'market', label: 'Marketplace', icon: ShoppingBag },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'transactions', label: 'Ledger', icon: History },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

export default function App() {
  const [view, setView] = useState('dashboard');
  const [notifOpen, setNotifOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const renderView = () => {
    switch (view) {
      case 'market': return <Marketplace />;
      case 'inventory': return <Inventory />;
      case 'transactions': return <Transactions />;
      case 'messages': return <Messaging />;
      case 'settings': return <Settings />;
      default: return (
        <div className="space-y-12">
          <GrowthMomentum />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            <div className="xl:col-span-2">
              <NeuralAgri batchId="K-TEA-01" />
            </div>
            <WeatherForecast />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-[120] w-72 bg-slate-950/80 backdrop-blur-2xl border-r border-white/5 flex flex-col transition-transform duration-500",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-8 border-b border-white/5">
          <h1 className="text-2xl font-black italic text-[#B87333] tracking-tight">AgriConnect</h1>
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mt-1">Kericho Supply Network</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setView(id); setSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-5 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 border",
                view === id
                  ? "bg-emerald-900/40 border-emerald-500/30 text-emerald-400 shadow-glow-emerald"
                  : "border-transparent text-slate-500 hover:bg-slate-900/40 hover:text-slate-300 hover:border-white/5"
              )}
            >
              <Icon className="w-5 h-5 flex-none" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-4 px-4 py-3 bg-slate-900/40 rounded-2xl border border-white/5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-glow-emerald" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Node AG-KERICHO-04</span>
          </div>
        </div>
      </aside>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[110] bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-[100] bg-slate-950/40 backdrop-blur-2xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-3 bg-slate-900 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
              {NAV.find(n => n.id === view)?.label}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-3 bg-slate-900 border border-white/5 rounded-xl text-slate-500 hover:text-emerald-400 transition-all shadow-neumorphic"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setNotifOpen(true)}
              className="relative p-3 bg-slate-900 border border-white/5 rounded-xl text-slate-500 hover:text-emerald-400 transition-all shadow-neumorphic"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full shadow-glow-emerald" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-10 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <NotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
}
