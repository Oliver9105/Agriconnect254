import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, Lock, Phone, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { initiateStkPush } from '../services/mpesaService';

interface StkPushModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (phone: string, success: boolean) => void;
  batchId: string;
}

export const StkPushModal = ({ isOpen, onClose, onConfirm, batchId }: StkPushModalProps) => {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'initiating' | 'waiting' | 'success' | 'failed'>('idle');
  const [message, setMessage] = useState('');

  const handleInitiate = async () => {
    setStatus('initiating');
    setMessage('Initiating STK Push...');
    
    try {
      const result = await initiateStkPush(45000, phone, batchId, 'Unknown');
      if (result.success) {
        setStatus('waiting');
        setMessage('Waiting for PIN on your phone...');
        
        // Simulate PIN entry
        setTimeout(() => {
          setStatus('success');
          setMessage('Funds locked successfully!');
          setTimeout(() => {
            onConfirm(phone, true);
            setStatus('idle');
            setPhone('');
          }, 2000);
        }, 3000);
      } else {
        setStatus('failed');
        setMessage(result.message || 'STK Push failed');
      }
    } catch (error) {
      setStatus('failed');
      setMessage('Failed to initiate STK Push. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] p-10"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-4 rounded-2xl border border-emerald-500/20 shadow-glow-emerald",
                  status === 'failed' ? "bg-rose-500/10 border-rose-500/20 shadow-glow-rose" : "bg-emerald-500/10"
                )}>
                  {status === 'initiating' || status === 'waiting' ? <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" /> : 
                   status === 'success' ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> :
                   status === 'failed' ? <AlertTriangle className="w-6 h-6 text-rose-400" /> :
                   <Smartphone className="w-6 h-6 text-emerald-400" />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tighter">M-Pesa STK Push</h3>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Batch: {batchId}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 bg-slate-900 border border-white/5 rounded-2xl text-slate-500 hover:text-white transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {status === 'idle' && (
                <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 shadow-neumorphic-inset-sm">
                  <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-3 block">Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 XXX XXX XXX"
                    className="w-full bg-transparent text-white font-black text-lg tracking-tight focus:outline-none"
                  />
                </div>
              )}

              {status !== 'idle' && (
                <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 shadow-neumorphic-inset-sm text-center">
                  <p className={cn(
                    "text-sm font-black tracking-tighter",
                    status === 'failed' ? "text-rose-400" : "text-emerald-400"
                  )}>{message}</p>
                </div>
              )}

              {status === 'idle' && (
                <button 
                  onClick={handleInitiate}
                  className="w-full py-6 bg-emerald-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all shadow-glow-emerald flex items-center justify-center gap-4 active:scale-[0.98]"
                >
                  <Lock className="w-5 h-5" />
                  Initiate STK Push
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
