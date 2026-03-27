import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Truck, MapPin, ShieldCheck, Clock, Package, User, Hash, Phone, MessageSquare, Leaf } from 'lucide-react';
import { cn } from '../lib/utils';
import { calculateDistance, calculateCarbonFootprint } from '../services/sustainabilityService';

interface Batch {
  id: string;
  product: string;
  status: 'In Transit' | 'Processing' | 'Delivered' | 'Delayed' | 'Loading';
  origin: string;
  destination: string;
  originCoords: [number, number];
  destCoords: [number, number];
  progress: number;
  temp: string;
  humidity: string;
  eta: string;
  lastUpdate: string;
  driver: string;
  driverPhone: string;
  vehicle: string;
  securityHash?: string;
}

interface BatchDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  batch: Batch | null;
}

export const BatchDetailModal = ({ isOpen, onClose, batch }: BatchDetailModalProps) => {
  if (!batch) return null;

  const safePhone = batch.driverPhone.replace(/[^0-9+\-\s()]/g, '');

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
            className="relative w-full max-w-2xl bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
            
            <div className="p-10 border-b border-white/5 flex items-center justify-between bg-slate-950/20 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-glow-emerald">
                  <Package className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tighter">Batch Details</h3>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">ID: {batch.id}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-slate-900 border border-white/5 rounded-2xl text-slate-500 hover:text-white transition-all shadow-neumorphic active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-10 space-y-8 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Origin', value: batch.origin, icon: MapPin },
                  { label: 'Destination', value: batch.destination, icon: MapPin },
                  { label: 'Status', value: batch.status, icon: Clock },
                  { label: 'ETA', value: batch.eta, icon: Clock },
                  { label: 'Driver', value: batch.driver, icon: User },
                  { label: 'Vehicle', value: batch.vehicle, icon: Truck },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 shadow-neumorphic-inset-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className="w-4 h-4 text-slate-600" />
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">{item.label}</span>
                    </div>
                    <p className="text-sm font-black text-white tracking-tight">{item.value}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 shadow-neumorphic-inset-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
                    <Phone className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Driver Contact</span>
                    <p className="text-sm font-black text-white tracking-tight">{batch.driverPhone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${batch.driverPhone}`} className="p-3 bg-emerald-500 rounded-xl text-white hover:bg-emerald-600 transition-all shadow-glow-emerald">
                    <Phone className="w-5 h-5" />
                  </a>
                  <a href={`sms:${batch.driverPhone}`} className="p-3 bg-cyan-500 rounded-xl text-white hover:bg-cyan-600 transition-all shadow-glow-cyan">
                    <MessageSquare className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 shadow-neumorphic-inset-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Leaf className="w-4 h-4 text-emerald-500" />
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">Sustainability Impact</span>
                </div>
                <p className="text-sm font-black text-white tracking-tight">
                  {calculateCarbonFootprint(calculateDistance(batch.originCoords[0], batch.originCoords[1], batch.destCoords[0], batch.destCoords[1]), 'Truck').toFixed(2)} kg CO2e
                </p>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mt-1">Estimated Carbon Footprint</p>
              </div>

              <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 shadow-neumorphic-inset-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Hash className="w-4 h-4 text-emerald-500" />
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">Security Hash</span>
                </div>
                <p className="text-xs font-black font-mono text-slate-400 break-all">{batch.securityHash}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
