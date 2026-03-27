import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Package, Tag, Layers, BarChart3, DollarSign, Save, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: any) => void;
}

export const AddItemModal = ({ isOpen, onClose, onAdd }: AddItemModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Coffee',
    stock: '',
    unit: 'KG',
    price: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newItem = {
        id: `SKU-${Math.floor(100 + Math.random() * 900)}`,
        ...formData,
        stock: parseInt(formData.stock) || 0,
        status: parseInt(formData.stock) > 0 ? 'In Stock' : 'Out of Stock',
        price: `KES ${formData.price}/${formData.unit}`,
        lastUpdated: 'Just now'
      };

      onAdd(newItem);
      setIsSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          category: 'Coffee',
          stock: '',
          unit: 'KG',
          price: '',
        });
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.6)]"
          >
            {isSuccess ? (
              <div className="p-16 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-24 h-24 bg-emerald-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-glow-emerald border border-emerald-500/30"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </motion.div>
                <h3 className="text-3xl font-black text-white mb-3 tracking-tighter drop-shadow-2xl">Item Registered</h3>
                <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] opacity-80">Inventory SKU has been successfully synchronized.</p>
              </div>
            ) : (
              <>
                <div className="p-10 border-b border-white/5 flex items-center justify-between bg-slate-950/40 backdrop-blur-3xl">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-slate-900 rounded-2xl shadow-tactile border border-white/5">
                      <Package className="w-6 h-6 text-emerald-500 shadow-glow-emerald" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white tracking-tighter drop-shadow-2xl">Register New SKU</h3>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mt-1">Inventory Management Node</p>
                    </div>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-4 hover:bg-slate-900 rounded-2xl transition-all text-slate-600 hover:text-white shadow-neumorphic active:shadow-neumorphic-inset border border-white/5"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Item Name */}
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] flex items-center gap-3 px-2">
                        <Tag className="w-3.5 h-3.5" /> Item Specification
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Premium Arabica Coffee"
                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-wider text-white placeholder:text-slate-800 focus:outline-none focus:border-emerald-500/50 focus:shadow-glow-emerald transition-all shadow-neumorphic-inset"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] flex items-center gap-3 px-2">
                        <Layers className="w-3.5 h-3.5" /> Classification
                      </label>
                      <div className="relative">
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white focus:outline-none focus:border-emerald-500/50 focus:shadow-glow-emerald transition-all shadow-neumorphic-inset appearance-none cursor-pointer"
                        >
                          <option value="Coffee">Coffee</option>
                          <option value="Tea">Tea</option>
                          <option value="Nuts">Nuts</option>
                          <option value="Fruit">Fruit</option>
                          <option value="Vegetables">Vegetables</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-700">
                          <Layers className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Unit */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] flex items-center gap-3 px-2">
                        <BarChart3 className="w-3.5 h-3.5" /> Metric Unit
                      </label>
                      <div className="relative">
                        <select
                          value={formData.unit}
                          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                          className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white focus:outline-none focus:border-emerald-500/50 focus:shadow-glow-emerald transition-all shadow-neumorphic-inset appearance-none cursor-pointer"
                        >
                          <option value="KG">Kilograms (KG)</option>
                          <option value="Units">Units</option>
                          <option value="Boxes">Boxes</option>
                          <option value="Tonnes">Tonnes</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-700">
                          <BarChart3 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Stock Level */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] flex items-center gap-3 px-2">
                        <Package className="w-3.5 h-3.5" /> Initial Volume
                      </label>
                      <input
                        required
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="0"
                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-sm font-black text-white placeholder:text-slate-800 focus:outline-none focus:border-emerald-500/50 focus:shadow-glow-emerald transition-all shadow-neumorphic-inset font-mono"
                      />
                    </div>

                    {/* Price */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] flex items-center gap-3 px-2">
                        <DollarSign className="w-3.5 h-3.5" /> Unit Valuation
                      </label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 font-black text-[10px] uppercase tracking-widest">KES</span>
                        <input
                          required
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="0.00"
                          className="w-full bg-slate-950/50 border border-white/5 rounded-2xl pl-16 pr-6 py-4 text-sm font-black text-white placeholder:text-slate-800 focus:outline-none focus:border-emerald-500/50 focus:shadow-glow-emerald transition-all shadow-neumorphic-inset font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex gap-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-5 bg-slate-950 border border-white/5 text-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:text-white transition-all shadow-neumorphic active:shadow-neumorphic-inset"
                    >
                      Abort
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] py-5 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-glow-emerald hover:bg-emerald-500 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center gap-4 border border-emerald-400/30 group"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          Commit to Ledger
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
