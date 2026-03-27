import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, QrCode, CheckCircle } from 'lucide-react';

export const EscrowModal = ({ isOpen, onClose, amount }: { isOpen: boolean, onClose: () => void, amount: string }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]" />
        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-white/10 rounded-t-[3rem] p-8 z-[201] max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-white">Secure Escrow</h3>
            <button onClick={onClose} className="p-2 bg-slate-800 rounded-full"><X className="w-5 h-5" /></button>
          </div>
          <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 mb-8">
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Amount Held</p>
            <p className="text-3xl font-black text-white font-mono">{amount}</p>
          </div>
          <div className="flex items-center gap-4 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 mb-8">
            <QrCode className="w-10 h-10 text-emerald-500" />
            <p className="text-emerald-400 text-sm font-medium">Funds held securely. Release upon QR code delivery handshake.</p>
          </div>
          <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest">
            Confirm Handshake
          </button>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
