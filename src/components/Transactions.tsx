import React, { useState, useMemo } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  CreditCard,
  Smartphone,
  Banknote,
  ChevronRight,
  Calendar,
  X,
  TrendingUp,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { fadeInUp, staggerContainer, smoothTransition, tactileHover, tactileTap, scaleIn } from '../lib/animations';

const TRANSACTIONS = [
  { id: 'TXN-9842', timestamp: new Date().toISOString(), type: 'Escrow Release', amount: 'KES 124,500', amountRaw: 124500, method: 'M-Pesa', status: 'Completed', farmer: 'John Kamau' },
  { id: 'TXN-9841', timestamp: new Date(Date.now() - 3600000).toISOString(), type: 'Market Sale', amount: 'KES 45,200', amountRaw: 45200, method: 'Bank Transfer', status: 'Pending', farmer: 'Sarah Wanjiku' },
  { id: 'TXN-9840', timestamp: new Date(Date.now() - 86400000).toISOString(), type: 'Escrow Lock', amount: 'KES 850,000', amountRaw: 850000, method: 'M-Pesa', status: 'Completed', farmer: 'Peter Maina' },
  { id: 'TXN-9839', timestamp: new Date(Date.now() - 172800000).toISOString(), type: 'Market Sale', amount: 'KES 12,400', amountRaw: 12400, method: 'Cash', status: 'Completed', farmer: 'Mary Atieno' },
  { id: 'TXN-9838', timestamp: new Date(Date.now() - 259200000).toISOString(), type: 'Escrow Release', amount: 'KES 320,000', amountRaw: 320000, method: 'M-Pesa', status: 'Failed', farmer: 'David Kipkorir' },
];

const TransactionStat = ({ label, value, trend, icon: Icon, color }: { label: string, value: string, trend: string, icon: any, color: 'emerald' | 'rose' | 'amber' }) => (
  <motion.div 
    whileHover={tactileHover}
    whileTap={tactileTap}
    variants={fadeInUp}
    className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 group relative overflow-hidden shadow-neumorphic"
  >
    <div className={cn(
      "absolute top-0 right-0 w-24 h-24 blur-3xl rounded-full -mr-12 -mt-12 transition-all duration-700 opacity-20",
      color === 'emerald' ? "bg-emerald-500" : color === 'rose' ? "bg-rose-500" : "bg-amber-500"
    )} />
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="p-4 bg-slate-950 shadow-tactile rounded-2xl group-hover:shadow-glow-emerald transition-all duration-500 border border-white/5">
        <Icon className={cn("w-6 h-6", color === 'emerald' ? "text-emerald-500" : color === 'rose' ? "text-rose-500" : "text-amber-500")} />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border shadow-tactile",
        trend.startsWith('+') ? "text-emerald-500 bg-emerald-500/5 border-emerald-500/10 shadow-glow-emerald" : "text-rose-500 bg-rose-500/5 border-rose-500/10 shadow-glow-rose"
      )}>
        {trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trend}
      </div>
    </div>
    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2 relative z-10">{label}</p>
    <p className="text-3xl font-black text-white font-mono tracking-tighter relative z-10">{value}</p>
  </motion.div>
);

export const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });
  const [selectedTxn, setSelectedTxn] = useState<typeof TRANSACTIONS[0] | null>(null);

  const exportToCSV = () => {
    const headers = ['ID', 'Timestamp', 'Type', 'Amount', 'Method', 'Status', 'Farmer'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => [t.id, t.timestamp, t.type, t.amountRaw, t.method, t.status, t.farmer].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const filteredTransactions = useMemo(() => {
    return TRANSACTIONS.filter(txn => {
      const matchesSearch = 
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === 'All' || txn.type === typeFilter;
      const matchesStatus = statusFilter === 'All' || txn.status === statusFilter;
      
      let matchesDate = true;
      if (dateRange.start) {
        matchesDate = matchesDate && new Date(txn.timestamp) >= new Date(dateRange.start);
      }
      if (dateRange.end) {
        const endDate = new Date(dateRange.end);
        endDate.setHours(23, 59, 59, 999);
        matchesDate = matchesDate && new Date(txn.timestamp) <= endDate;
      }

      return matchesSearch && matchesType && matchesStatus && matchesDate;
    });
  }, [searchQuery, typeFilter, statusFilter, dateRange]);

  const resetFilters = () => {
    setTypeFilter('All');
    setStatusFilter('All');
    setDateRange({ start: '', end: '' });
    setSearchQuery('');
  };

  const hasActiveFilters = typeFilter !== 'All' || statusFilter !== 'All' || dateRange.start !== '' || dateRange.end !== '';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tighter mb-2">Financial Ledger</h2>
          <p className="text-slate-500 text-sm font-medium tracking-wide">Blockchain-verified transactions and escrow settlement history</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "px-5 py-3 flex items-center gap-3 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 border border-white/5 shadow-neumorphic",
              (showFilters || hasActiveFilters) ? "bg-slate-950 shadow-neumorphic-inset-sm text-emerald-500" : "bg-slate-900 text-slate-400 hover:text-white"
            )}
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide' : 'Filters'}
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-glow-emerald" />
            )}
          </button>
          <button 
            onClick={exportToCSV}
            className="p-3 bg-slate-900 border border-white/5 rounded-[1.5rem] shadow-neumorphic hover:shadow-glow-emerald transition-all group"
          >
            <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* Transaction Details Modal */}
      <AnimatePresence>
        {selectedTxn && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedTxn(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black text-white tracking-tighter">Transaction Details</h3>
                <button onClick={() => setSelectedTxn(null)} className="text-slate-600 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between py-4 border-b border-white/5">
                  <span className="text-slate-500 font-medium">TXN ID</span>
                  <span className="text-white font-mono font-bold">{selectedTxn.id}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-white/5">
                  <span className="text-slate-500 font-medium">Farmer</span>
                  <span className="text-white font-bold">{selectedTxn.farmer}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-white/5">
                  <span className="text-slate-500 font-medium">Amount</span>
                  <span className="text-emerald-400 font-mono font-bold text-lg">{selectedTxn.amount}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-white/5">
                  <span className="text-slate-500 font-medium">Status</span>
                  <span className={cn("font-bold", selectedTxn.status === 'Completed' ? 'text-emerald-500' : 'text-amber-500')}>{selectedTxn.status}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Summary */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <TransactionStat label="Total Volume" value="KES 4.8M" trend="+8.2%" icon={TrendingUp} color="emerald" />
        <TransactionStat label="Active Escrow" value="KES 1.2M" trend="+12.4%" icon={ShieldCheck} color="emerald" />
        <TransactionStat label="Failed TXNs" value="2" trend="-1.5%" icon={Activity} color="rose" />
      </motion.div>

      {/* Filters & Search */}
      <div className="space-y-8">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by ID, farmer or type..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 py-4 bg-slate-950/50 border border-white/5 rounded-2xl text-xs font-black uppercase tracking-[0.1em] text-white placeholder:text-slate-800 focus:outline-none focus:border-emerald-500/50 transition-all shadow-neumorphic-inset"
          />
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 grid grid-cols-1 md:grid-cols-4 gap-10 shadow-neumorphic">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Transaction Type</label>
                  <select 
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 px-6 text-sm font-medium focus:outline-none focus:border-emerald-500/50 shadow-neumorphic-inset-sm text-white appearance-none"
                  >
                    <option value="All">All Types</option>
                    <option value="Escrow Lock">Escrow Lock</option>
                    <option value="Escrow Release">Escrow Release</option>
                    <option value="Market Sale">Market Sale</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Status</label>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 px-6 text-sm font-medium focus:outline-none focus:border-emerald-500/50 shadow-neumorphic-inset-sm text-white appearance-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>

                <div className="space-y-4 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Date Range</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="date" 
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="flex-1 bg-slate-950 border border-white/5 rounded-2xl py-4 px-6 text-xs font-medium focus:outline-none focus:border-emerald-500/50 shadow-neumorphic-inset-sm text-white"
                    />
                    <span className="text-slate-700 text-[10px] font-black uppercase tracking-widest">TO</span>
                    <input 
                      type="date" 
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="flex-1 bg-slate-950 border border-white/5 rounded-2xl py-4 px-6 text-xs font-medium focus:outline-none focus:border-emerald-500/50 shadow-neumorphic-inset-sm text-white"
                    />
                  </div>
                </div>

                <div className="md:col-span-4 flex justify-end pt-8 border-t border-white/5">
                  <button 
                    onClick={resetFilters}
                    className="flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] hover:text-rose-500 transition-all active:scale-95"
                  >
                    <X className="w-4 h-4" />
                    Reset All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-neumorphic">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-slate-950/50">
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">TXN ID / Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Type</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Method</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Farmer</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Status</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((txn) => (
                    <motion.tr 
                      key={txn.id}
                      layout
                      variants={fadeInUp}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono text-emerald-500/70 mb-1 font-black">{txn.id}</span>
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                            {format(new Date(txn.timestamp), 'MMM dd, HH:mm')}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-black text-white uppercase tracking-[0.1em] group-hover:text-emerald-400 transition-colors">
                          {txn.type}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-white font-mono">{txn.amount}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "p-2.5 rounded-xl shadow-tactile border border-white/5",
                            txn.method === 'M-Pesa' ? "bg-emerald-500/10 text-emerald-500" : 
                            txn.method === 'Bank Transfer' ? "bg-blue-500/10 text-blue-500" : 
                            "bg-amber-500/10 text-amber-500"
                          )}>
                            {txn.method === 'M-Pesa' ? <Smartphone className="w-4 h-4" /> :
                             txn.method === 'Bank Transfer' ? <CreditCard className="w-4 h-4" /> :
                             <Banknote className="w-4 h-4" />}
                          </div>
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{txn.method}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-slate-400 tracking-tight">{txn.farmer}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className={cn(
                          "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border w-fit shadow-tactile",
                          txn.status === 'Completed' ? "text-emerald-500 bg-emerald-500/5 border-emerald-500/20 shadow-glow-emerald" :
                          txn.status === 'Pending' ? "text-amber-500 bg-amber-500/5 border-amber-500/20 shadow-glow-amber" :
                          "text-rose-500 bg-rose-500/5 border-rose-500/20 shadow-glow-rose"
                        )}>
                          {txn.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                           txn.status === 'Pending' ? <Clock className="w-3.5 h-3.5" /> :
                           <AlertCircle className="w-3.5 h-3.5" />}
                          {txn.status}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => setSelectedTxn(txn)}
                          className="p-3 text-slate-600 hover:text-white transition-all neumorphic-button-sm border border-white/5"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td colSpan={7} className="px-8 py-24 text-center">
                      <div className="flex flex-col items-center gap-8">
                        <div className="p-10 bg-slate-950 rounded-[2.5rem] shadow-neumorphic-inset-sm border border-white/5">
                          <History className="w-16 h-16 text-slate-800" />
                        </div>
                        <div>
                          <p className="text-2xl font-black text-white tracking-tighter">No matching transactions</p>
                          <p className="text-sm text-slate-600 font-medium mt-2 tracking-wide">Try adjusting your filters or search criteria</p>
                        </div>
                        <button 
                          onClick={resetFilters}
                          className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] hover:text-emerald-400 transition-all active:scale-95"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
