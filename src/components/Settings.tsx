import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Shield, 
  Key, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  Settings as SettingsIcon,
  ChevronRight,
  Camera,
  Check,
  Plus,
  Smartphone,
  Database,
  ShoppingBag,
  Map as MapIcon,
  Users
} from 'lucide-react';
import { cn } from '../lib/utils';

const SETTINGS_TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Glassmorphic Header / Tab Scroller */}
      <div className="sticky top-0 z-40 w-full bg-slate-950/40 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
              <div className="p-2 bg-emerald-900/40 rounded-xl border border-emerald-500/20 shadow-glow-emerald">
                <SettingsIcon className="w-5 h-5 text-emerald-400" />
              </div>
              Node Settings
            </h2>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-glow-emerald" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">Live Sync</span>
            </div>
          </div>

          {/* Horizontal Category Scroller - Thumb Optimized */}
          <div className="flex overflow-x-auto scrollbar-hide gap-3 pb-2 -mx-2 px-2">
            {SETTINGS_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-none flex items-center gap-3 px-6 py-3.5 rounded-[1.25rem] transition-all duration-500 relative overflow-hidden whitespace-nowrap shadow-neumorphic-sm active:scale-95",
                  activeTab === tab.id 
                    ? "bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 shadow-glow-emerald" 
                    : "bg-slate-900/40 text-slate-500 border border-white/5 hover:bg-slate-900/60 hover:text-slate-300"
                )}
              >
                <tab.icon className={cn("w-4 h-4 transition-transform duration-500", activeTab === tab.id ? "scale-110" : "")} />
                <span className="font-black text-[10px] uppercase tracking-[0.2em]">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-emerald-500/5 blur-xl pointer-events-none"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Width Form Area */}
      <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-10 space-y-8 sm:space-y-12 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* Trust Stack Section */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-neumorphic space-y-8">
                <h3 className="text-xl font-black text-white tracking-tighter flex items-center gap-3">
                  <Shield className="w-6 h-6 text-emerald-500" />
                  Trust Stack
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* KIAMIS ID Verification */}
                  <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 shadow-neumorphic-inset-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">KIAMIS ID</span>
                      <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">Verified</span>
                    </div>
                    <p className="text-sm font-bold text-white mb-4">Farmer ID: KIAMIS-882910</p>
                    <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all border border-white/5">
                      Re-verify ID
                    </button>
                  </div>

                  {/* M-Pesa KYC Auto-fetch */}
                  <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 shadow-neumorphic-inset-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">M-Pesa KYC</span>
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Auto-fetched</span>
                    </div>
                    <p className="text-sm font-bold text-white mb-4">Linked: +254 712 345 678</p>
                    <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all border border-emerald-400/30">
                      Sync KYC Data
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Bento Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-neumorphic group">
                    <div className="relative mb-6">
                      <div className="w-32 h-32 rounded-[2.5rem] bg-slate-950 border border-white/5 overflow-hidden shadow-tactile group-hover:shadow-glow-emerald transition-all duration-700 p-1">
                        <div className="w-full h-full rounded-[2.2rem] overflow-hidden border border-white/5">
                          <img src="https://picsum.photos/seed/farmer/400/400" alt="Profile" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-3 bg-emerald-600 text-white rounded-2xl shadow-glow-emerald hover:scale-110 transition-all border border-white/20">
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                    <h4 className="text-2xl font-black text-white tracking-tighter">Kericho Hub</h4>
                    <p className="text-emerald-500/60 text-[9px] font-black uppercase tracking-[0.4em] mt-2">Logistics Manager</p>
                  </div>

                  {/* Node Health Gauge */}
                  <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 shadow-neumorphic">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Node Health</span>
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">98%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden shadow-neumorphic-inset-sm p-0.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '98%' }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-emerald-600 to-cyan-500 rounded-full shadow-glow-emerald"
                      />
                    </div>
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mt-3 text-center">Optimal Performance Range</p>
                  </div>
                </div>

                <div className="md:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-neumorphic space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { label: 'Full Name', value: 'Kericho Hub Logistics', type: 'text', icon: User },
                      { label: 'Email Address', value: 'hub@kericho.agri', type: 'email', icon: Globe },
                      { label: 'Phone Number', value: '+254 712 345 678', type: 'text', icon: Smartphone },
                      { label: 'Location', value: 'Kericho West, Rift Valley', type: 'text', icon: MapIcon },
                    ].map((field) => (
                      <div key={field.label} className="space-y-3">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2 flex items-center gap-2">
                          <field.icon className="w-3 h-3 text-emerald-500/50" />
                          {field.label}
                        </label>
                        <div className="relative group">
                          <input 
                            type={field.type} 
                            defaultValue={field.value} 
                            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-sm font-black tracking-tight focus:outline-none focus:border-cyan-500/30 focus:shadow-glow-cyan transition-all text-white shadow-neumorphic-inset-sm" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <button className="w-full sm:w-auto bg-emerald-600 text-white px-12 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:shadow-glow-emerald hover:scale-[1.02] active:scale-95 transition-all shadow-neumorphic border border-white/10">
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div 
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {[
                { title: 'Market Alerts', desc: 'Price fluctuations > 5%', icon: ShoppingBag, color: 'emerald' },
                { title: 'Logistics Updates', desc: 'Real-time batch tracking', icon: MapIcon, color: 'cyan' },
                { title: 'Security Alerts', desc: 'Account login activity', icon: Shield, color: 'rose' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] shadow-neumorphic group hover:border-white/10 transition-all duration-500">
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "p-4 rounded-2xl shadow-tactile transition-all duration-500",
                      item.color === 'emerald' ? "bg-emerald-500/10 text-emerald-500 group-hover:shadow-glow-emerald" :
                      item.color === 'cyan' ? "bg-cyan-500/10 text-cyan-500 group-hover:shadow-glow-cyan" :
                      "bg-rose-500/10 text-rose-500 group-hover:shadow-glow-rose"
                    )}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-1">{item.title}</h5>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest opacity-80">{item.desc}</p>
                    </div>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-12 h-7 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-slate-600 after:border-slate-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-neumorphic-inset-sm"></div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div 
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-neumorphic space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="p-5 bg-cyan-500/10 rounded-2xl shadow-tactile border border-cyan-500/20">
                      <Shield className="w-8 h-8 text-cyan-500 shadow-glow-cyan" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white tracking-tighter">Security Protocol</h4>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Node Encryption: AES-256 Enabled</p>
                    </div>
                  </div>
                  
                  {/* Security Score Gauge */}
                  <div className="hidden sm:flex flex-col items-end">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-slate-950 shadow-neumorphic-inset"
                        />
                        <motion.circle
                          cx="40"
                          cy="40"
                          r="34"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray="213.6"
                          initial={{ strokeDashoffset: 213.6 }}
                          animate={{ strokeDashoffset: 213.6 * (1 - 0.85) }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-black text-white">85%</span>
                      </div>
                    </div>
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-2">Trust Score</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: '2FA Authentication', status: 'Active', icon: Smartphone },
                    { title: 'Biometric Unlock', status: 'Disabled', icon: Lock },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-950/50 rounded-2xl border border-white/5 shadow-neumorphic-inset-sm">
                      <div className="flex items-center gap-4">
                        <item.icon className="w-4 h-4 text-slate-500" />
                        <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{item.title}</span>
                      </div>
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border",
                        item.status === 'Active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-slate-800 text-slate-500 border-white/5"
                      )}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'billing' && (
            <motion.div 
              key="billing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 backdrop-blur-xl border border-emerald-500/20 p-10 rounded-[3rem] shadow-neumorphic relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-all duration-1000" />
                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Current Tier</p>
                      <h4 className="text-4xl font-black text-white tracking-tighter">Enterprise Hub</h4>
                    </div>
                    <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/10 shadow-tactile">
                      <CreditCard className="w-8 h-8 text-emerald-500" />
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-white font-mono tracking-tighter">KES 12,500</span>
                    <span className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">/ month</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl">Upgrade Plan</button>
                    <button className="flex-1 bg-slate-950/50 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] border border-white/10 hover:bg-slate-950 transition-all shadow-neumorphic">Billing History</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terminate Session Button - Red Glassmorphism */}
        <div className="pt-10">
          <button className="w-full flex items-center justify-center gap-4 px-8 py-5 rounded-[2rem] bg-rose-500/10 backdrop-blur-md border border-rose-500/20 text-rose-500 hover:bg-rose-500/20 hover:border-rose-500/40 transition-all duration-500 font-black text-[11px] uppercase tracking-[0.4em] shadow-glow-rose active:scale-95 group">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Terminate Secure Session
          </button>
          <p className="text-center text-slate-700 text-[9px] font-black uppercase tracking-[0.2em] mt-6 opacity-50">
            Node ID: AG-KERICHO-04 • Last Sync: 2m ago
          </p>
        </div>
      </div>
    </div>
  );
};
