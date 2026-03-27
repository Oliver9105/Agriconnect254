import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Plus,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Download,
  Box,
  X,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { AddItemModal } from './AddItemModal';

const INITIAL_INVENTORY = [
  { id: 'SKU-001', name: 'Premium Arabica Coffee', category: 'Coffee', stock: 1240, unit: 'KG', status: 'In Stock', price: 'KES 450/KG', lastUpdated: '2h ago' },
  { id: 'SKU-002', name: 'Organic Tea Leaves', category: 'Tea', stock: 850, unit: 'KG', status: 'Low Stock', price: 'KES 320/KG', lastUpdated: '5h ago' },
  { id: 'SKU-003', name: 'Macadamia Nuts', category: 'Nuts', stock: 0, unit: 'KG', status: 'Out of Stock', price: 'KES 850/KG', lastUpdated: '1d ago' },
  { id: 'SKU-004', name: 'Hass Avocados', category: 'Fruit', stock: 2100, unit: 'Units', status: 'In Stock', price: 'KES 45/Unit', lastUpdated: '30m ago' },
  { id: 'SKU-005', name: 'Purple Passion Fruit', category: 'Fruit', stock: 450, unit: 'KG', status: 'In Stock', price: 'KES 120/KG', lastUpdated: '4h ago' },
];

export const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(INITIAL_INVENTORY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Simulate live stock sync
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 1000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleAddItem = (newItem: any) => {
    setItems([newItem, ...items]);
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-3 drop-shadow-2xl">Inventory Hub</h2>
          <p className="text-slate-600 text-sm font-black uppercase tracking-[0.2em] opacity-80">Real-time stock management & SKU tracking across the supply network</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className={cn(
            "flex items-center gap-3 px-4 py-3 bg-slate-950 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-neumorphic-inset-sm",
            isSyncing ? "text-emerald-500 shadow-glow-emerald" : "text-slate-700"
          )}>
            <RefreshCw className={cn("w-4 h-4", isSyncing && "animate-spin")} />
            {isSyncing ? "Syncing..." : "Live Sync"}
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 bg-slate-900 text-emerald-500 px-6 py-4 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] hover:shadow-glow-emerald hover:scale-[1.05] active:scale-95 transition-all shadow-neumorphic border border-white/5"
          >
            <Plus className="w-5 h-5" />
            Add New Item
          </button>
          <button className="p-4 bg-slate-950 border border-white/5 rounded-[1.5rem] hover:bg-slate-900 transition-all shadow-neumorphic active:shadow-neumorphic-inset group flex-none">
            <Download className="w-5 h-5 text-slate-700 group-hover:text-emerald-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-800 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search inventory by SKU, name or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 py-6 text-sm font-black uppercase tracking-[0.1em] rounded-[2rem] bg-slate-950/50 border border-white/5 text-white placeholder:text-slate-800 focus:outline-none focus:border-emerald-500/50 focus:shadow-glow-emerald transition-all shadow-neumorphic-inset"
          />
        </div>
        <div className="lg:col-span-3">
          <button className="w-full flex items-center justify-center gap-4 px-8 py-6 bg-slate-950 border border-white/5 rounded-[2rem] text-slate-700 hover:text-white transition-all shadow-neumorphic active:shadow-neumorphic-inset group">
            <Filter className="w-6 h-6 group-hover:text-emerald-500 transition-colors" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Filters</span>
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 overflow-hidden rounded-[2rem] sm:rounded-[4rem] shadow-neumorphic">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="border-b border-white/5 bg-slate-950/80 backdrop-blur-3xl">
                <th className="px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">SKU / Item</th>
                <th className="px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">Category</th>
                <th className="px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">Stock Level</th>
                <th className="px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">Status</th>
                <th className="px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">Unit Price</th>
                <th className="px-12 py-10 text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">Last Sync</th>
                <th className="px-12 py-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                    className="hover:bg-white/[0.03] transition-all group"
                  >
                    <td className="px-12 py-10">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-emerald-500/50 mb-2 font-black uppercase tracking-widest">{item.id}</span>
                        <span className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors tracking-tighter drop-shadow-2xl">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] bg-slate-950 border border-white/5 px-5 py-2.5 rounded-2xl shadow-neumorphic-inset">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-5">
                        <span className="text-xl font-black text-white font-mono tracking-tighter drop-shadow-2xl">{item.stock}</span>
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">{item.unit}</span>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className={cn(
                        "flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] px-6 py-3 rounded-full border w-fit shadow-tactile transition-all duration-500",
                        item.status === 'In Stock' ? "text-emerald-500 bg-emerald-500/5 border-emerald-500/20 shadow-glow-emerald" :
                        item.status === 'Low Stock' ? "text-amber-500 bg-amber-500/5 border-amber-500/20 shadow-glow-amber" :
                        "text-rose-500 bg-rose-500/5 border-rose-500/20 shadow-glow-rose"
                      )}>
                        {item.status === 'In Stock' ? <CheckCircle2 className="w-5 h-5" /> :
                         item.status === 'Low Stock' ? <Clock className="w-5 h-5" /> :
                         <AlertCircle className="w-5 h-5" />}
                        {item.status}
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <span className="text-base font-mono font-black text-white tracking-tight drop-shadow-2xl">{item.price}</span>
                    </td>
                    <td className="px-12 py-10">
                      <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">{item.lastUpdated}</span>
                    </td>
                    <td className="px-12 py-10 text-right">
                      <button className="p-4 text-slate-800 hover:text-white transition-all neumorphic-button-sm border border-white/5">
                        <MoreVertical className="w-6 h-6" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 shadow-neumorphic">
          <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
            <div className="p-3 bg-slate-950 rounded-2xl shadow-tactile border border-white/5">
              <AlertCircle className="w-6 h-6 text-amber-500 shadow-glow-amber" />
            </div>
            Critical Stock Alerts
          </h3>
          <div className="space-y-8">
            <div className="flex items-center justify-between p-6 bg-slate-950/50 border border-white/5 rounded-[2rem] shadow-neumorphic-inset-sm group hover:border-amber-500/30 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-tactile border border-amber-500/20">
                  <Package className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-base font-black text-white tracking-tight">Organic Tea Leaves</p>
                  <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.2em] mt-1.5">Stock below threshold (850 KG)</p>
                </div>
              </div>
              <button className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] hover:text-amber-400 transition-all px-6 py-3 bg-amber-500/5 rounded-xl border border-amber-500/10 shadow-neumorphic-sm active:scale-95">Restock</button>
            </div>
            <div className="flex items-center justify-between p-6 bg-slate-950/50 border border-white/5 rounded-[2rem] shadow-neumorphic-inset-sm group hover:border-rose-500/30 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 shadow-tactile border border-rose-500/20">
                  <Package className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-base font-black text-white tracking-tight">Macadamia Nuts</p>
                  <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.2em] mt-1.5">Out of Stock</p>
                </div>
              </div>
              <button className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] hover:text-rose-400 transition-all px-6 py-3 bg-rose-500/5 rounded-xl border border-rose-500/10 shadow-neumorphic-sm active:scale-95">Order Now</button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-center text-center relative overflow-hidden group shadow-neumorphic">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-1000" />
          <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] mb-12 flex items-center justify-center gap-4">
            <div className="p-3 bg-slate-950 rounded-2xl shadow-tactile border border-white/5">
              <ArrowUpRight className="w-6 h-6 text-emerald-500 shadow-glow-emerald" />
            </div>
            Inventory Valuation
          </h3>
          <div className="relative z-10">
            <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.4em] mb-4 opacity-80">Total Estimated Asset Value</p>
            <p className="text-7xl font-black text-white font-mono tracking-tighter drop-shadow-[0_20px_40px_rgba(16,185,129,0.2)]">KES 4.2M</p>
            <div className="mt-10 inline-flex items-center gap-4 text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] bg-emerald-500/5 px-6 py-3 rounded-full border border-emerald-500/20 shadow-tactile hover:shadow-glow-emerald transition-all cursor-default">
              <ArrowUpRight className="w-5 h-5" />
              <span>+12.4% vs Previous Cycle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Recommendations */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 shadow-neumorphic">
        <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
          <div className="p-3 bg-slate-950 rounded-2xl shadow-tactile border border-white/5">
            <RefreshCw className="w-6 h-6 text-cyan-500 shadow-glow-cyan" />
          </div>
          Inventory Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.filter(item => item.stock < 500).map(item => (
            <div key={item.id} className="p-6 bg-slate-950/50 border border-white/5 rounded-[2rem] shadow-neumorphic-inset-sm hover:border-cyan-500/30 transition-all">
              <p className="text-sm font-black text-white tracking-tight mb-2">{item.name}</p>
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] mb-6">Low stock: {item.stock} {item.unit} remaining</p>
              <button className="w-full text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] hover:text-cyan-400 transition-all px-6 py-3 bg-cyan-500/5 rounded-xl border border-cyan-500/10 shadow-neumorphic-sm active:scale-95">
                Suggest Reorder
              </button>
            </div>
          ))}
          <div className="p-6 bg-slate-950/50 border border-white/5 rounded-[2rem] shadow-neumorphic-inset-sm hover:border-emerald-500/30 transition-all">
            <p className="text-sm font-black text-white tracking-tight mb-2">Optimize Storage</p>
            <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] mb-6">Move Hass Avocados to cold storage</p>
            <button className="w-full text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] hover:text-emerald-400 transition-all px-6 py-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 shadow-neumorphic-sm active:scale-95">
              Apply Optimization
            </button>
          </div>
        </div>
      </div>

      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddItem}
      />
    </div>
  );
};
