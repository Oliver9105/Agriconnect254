import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  X, 
  Leaf, 
  ShieldCheck, 
  BarChart3, 
  MessageSquare, 
  Truck,
  ArrowRight,
  Circle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { fetchNotifications, markAllNotificationsRead } from '../services/apiService';

const ICON_MAP: Record<string, any> = { ShieldCheck, MessageSquare, BarChart3, Truck };

export const NotificationDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications().then(setNotifications).catch(console.error);
    }
  }, [isOpen]);

  const handleClearAll = async () => {
    await markAllNotificationsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[150]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-950/40 backdrop-blur-3xl border-l border-white/5 z-[160] shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col"
          >
            <div className="p-10 border-b border-white/5 flex items-center justify-between bg-slate-950/20">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-glow-emerald">
                  <Bell className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tighter">System Alerts</h3>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Real-time Node Activity</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-slate-900 border border-white/5 rounded-2xl text-slate-500 hover:text-white transition-all shadow-neumorphic active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {notifications.map((notif, idx) => {
                const Icon = ICON_MAP[notif.iconName] ?? Bell;
                return (
                <motion.div 
                  key={notif.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "bg-slate-900/40 backdrop-blur-xl border p-8 rounded-[2.5rem] hover:border-emerald-500/30 transition-all group cursor-pointer shadow-neumorphic relative overflow-hidden",
                    notif.read ? "border-white/5" : "border-emerald-500/20"
                  )}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="flex gap-6 relative z-10">
                    <div className={cn(
                      "p-4 rounded-2xl h-fit shadow-tactile border border-white/5 transition-all duration-500",
                      notif.color === 'emerald' ? "bg-emerald-500/10 text-emerald-500 group-hover:shadow-glow-emerald" :
                      notif.color === 'blue' ? "bg-blue-500/10 text-blue-500" :
                      "bg-amber-500/10 text-amber-500 group-hover:shadow-glow-amber"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-emerald-400 transition-colors">{notif.title}</h4>
                        <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">
                          {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed font-medium opacity-80">{notif.message}</p>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </div>

            <div className="p-10 border-t border-white/5 bg-slate-950/20">
              <button onClick={handleClearAll} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all shadow-glow-emerald flex items-center justify-center gap-4 border border-emerald-400/30 active:scale-95">
                Clear All Nodes <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
