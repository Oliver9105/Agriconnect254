import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Package, 
  MapPin, 
  Navigation, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Thermometer, 
  Droplets, 
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Activity,
  Zap,
  Box,
  TrendingUp,
  Search,
  Filter,
  Maximize2,
  Minimize2,
  AlertTriangle,
  Shield,
  Leaf,
  Phone,
  Lock,
  QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AgriMap } from '../AgriMap';
import { BatchDetailModal } from '../BatchDetailModal';
import { StkPushModal } from '../StkPushModal';
import { cn } from '../../lib/utils';
import { fadeInUp, staggerContainer, smoothTransition, tactileHover, tactileTap, scaleIn, fadeIn } from '../../lib/animations';

// Types
interface HistoryItem {
  status: string;
  location: string;
  time: string;
  iconName: 'Truck' | 'Package' | 'Shield' | 'Leaf' | 'CheckCircle2';
}

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
  history: HistoryItem[];
}

const BATCHES: Batch[] = [
  {
    id: 'B-102',
    product: 'Premium Kericho Tea',
    status: 'In Transit',
    origin: 'Kericho Hub',
    destination: 'Nairobi Market',
    originCoords: [-0.3689, 35.2863],
    destCoords: [-1.2864, 36.8172],
    progress: 65,
    temp: '18.4°C',
    humidity: '62%',
    eta: '2h 15m',
    lastUpdate: '2 mins ago',
    driver: 'John Kamau',
    driverPhone: '+254 712 345 678',
    vehicle: 'KDA 452L',
    securityHash: '0x8f...2e4a',
    history: [
      { status: 'In Transit', location: 'Nairobi-Mombasa Highway', time: 'Today, 10:45 AM', iconName: 'Truck' },
      { status: 'Hub Processing', location: 'Nairobi Logistics Hub', time: 'Yesterday, 04:20 PM', iconName: 'Package' },
      { status: 'KEPHIS Verified', location: 'Quality Control Office', time: 'Mar 18, 09:15 AM', iconName: 'Shield' },
      { status: 'Batch Created', location: 'Kericho Farm Hub', time: 'Mar 17, 02:30 PM', iconName: 'Leaf' },
    ]
  },
  {
    id: 'B-105',
    product: 'Organic Avocados',
    status: 'Loading',
    origin: 'Bomet Central',
    destination: 'Nairobi Hub',
    originCoords: [-0.7813, 35.3416],
    destCoords: [-1.2921, 36.8219],
    progress: 10,
    temp: '21.2°C',
    humidity: '58%',
    eta: '6h 45m',
    lastUpdate: '15 mins ago',
    driver: 'Sarah Wanjiku',
    driverPhone: '+254 723 456 789',
    vehicle: 'KCB 981X',
    securityHash: '0x3a...9b1c',
    history: [
      { status: 'Loading', location: 'Bomet Central Farm', time: 'Today, 08:00 AM', iconName: 'Package' },
    ]
  },
  {
    id: 'B-098',
    product: 'Specialty Coffee',
    status: 'Delivered',
    origin: 'Kericho East',
    destination: 'Mombasa Port',
    originCoords: [-0.3750, 35.3500],
    destCoords: [-4.0435, 39.6682],
    progress: 100,
    temp: '24.1°C',
    humidity: '70%',
    eta: 'Completed',
    lastUpdate: '1 hour ago',
    driver: 'Peter Maina',
    driverPhone: '+254 734 567 890',
    vehicle: 'KDD 223M',
    securityHash: '0x7d...5f2e',
    history: [
      { status: 'Delivered', location: 'Mombasa Port', time: 'Mar 20, 02:00 PM', iconName: 'CheckCircle2' },
      { status: 'In Transit', location: 'Nairobi-Mombasa Highway', time: 'Mar 19, 10:00 AM', iconName: 'Truck' },
      { status: 'Batch Created', location: 'Kericho East Farm', time: 'Mar 17, 09:00 AM', iconName: 'Leaf' },
    ]
  }
];

type GaugeColor = 'cyan' | 'blue' | 'emerald' | 'amber';

const GAUGE_COLOR_MAP: Record<GaugeColor, { text: string; bg: string; bgMuted: string }> = {
  cyan:    { text: 'text-cyan-400',    bg: 'bg-cyan-400',    bgMuted: 'bg-cyan-400/10' },
  blue:    { text: 'text-blue-400',    bg: 'bg-blue-400',    bgMuted: 'bg-blue-400/10' },
  emerald: { text: 'text-emerald-500', bg: 'bg-emerald-500', bgMuted: 'bg-emerald-500/10' },
  amber:   { text: 'text-amber-400',   bg: 'bg-amber-400',   bgMuted: 'bg-amber-400/10' },
};

const VisualGauge = ({ value, max, label, icon: Icon, color }: { value: number, max: number, label: string, icon: any, color: GaugeColor }) => {
  const percentage = (value / max) * 100;
  const c = GAUGE_COLOR_MAP[color] ?? GAUGE_COLOR_MAP.cyan;
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-neumorphic-inset-sm group hover:bg-slate-900/60 transition-all">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className={cn('p-1.5 rounded-lg bg-slate-950 shadow-tactile border border-white/5', c.bgMuted)}>
            <Icon className={cn('w-3.5 h-3.5', c.text)} />
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
        </div>
        <span className={cn('text-xs font-mono font-bold', c.text)}>{value}{label === 'Temp' ? '°C' : '%'}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden shadow-neumorphic-inset-sm p-0.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={cn('h-full rounded-full shadow-glow-emerald', c.bg)}
        />
      </div>
    </div>
  );
};

export const SupplyChain = () => {
  const [selectedBatch, setSelectedBatch] = useState<Batch>(BATCHES[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveData, setLiveData] = useState(BATCHES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStkModalOpen, setIsStkModalOpen] = useState(false);
  const [batchToLock, setBatchToLock] = useState<Batch | null>(null);

  // Real-time data streaming simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(current => current.map(batch => {
        if (batch.status !== 'In Transit') return batch;
        
        const newProgress = Math.min(100, batch.progress + (Math.random() * 0.5));
        const currentTemp = parseFloat(batch.temp);
        const newTemp = (currentTemp + (Math.random() - 0.5) * 0.2).toFixed(1) + '°C';
        const currentHumidity = parseFloat(batch.humidity);
        const newHumidity = Math.min(100, Math.max(0, currentHumidity + (Math.random() - 0.5) * 1)).toFixed(0) + '%';

        const updatedBatch = {
          ...batch,
          progress: parseFloat(newProgress.toFixed(1)),
          temp: newTemp,
          humidity: newHumidity,
          status: newProgress === 100 ? 'Delivered' : 'In Transit' as any
        };

        if (selectedBatch.id === batch.id) {
          setSelectedBatch(updatedBatch);
        }

        return updatedBatch;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedBatch.id]);

  const [sortOption, setSortOption] = useState<'eta' | 'progress' | 'lastUpdate'>('progress');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const parseEta = (eta: string) => {
    if (eta === 'Completed') return 0;
    const parts = eta.split(' ');
    let mins = 0;
    parts.forEach(part => {
      if (part.includes('h')) mins += parseInt(part) * 60;
      if (part.includes('m')) mins += parseInt(part);
    });
    return mins;
  };

  const parseLastUpdate = (lastUpdate: string) => {
    const parts = lastUpdate.split(' ');
    const val = parseInt(parts[0]);
    if (parts[1] === 'hour' || parts[1] === 'hours') return val * 60;
    return val; // mins
  };

  const sortedBatches = [...liveData].sort((a, b) => {
    let valA: number, valB: number;
    if (sortOption === 'eta') {
      valA = parseEta(a.eta);
      valB = parseEta(b.eta);
    } else if (sortOption === 'progress') {
      valA = a.progress;
      valB = b.progress;
    } else {
      valA = parseLastUpdate(a.lastUpdate);
      valB = parseLastUpdate(b.lastUpdate);
    }
    return sortDirection === 'asc' ? valA - valB : valB - valA;
  });

  const filteredBatches = sortedBatches.filter(b => 
    b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30"
    >
      {/* Sticky Glass Header */}
      <div className="sticky top-0 z-[100] bg-slate-950/40 backdrop-blur-2xl border-b border-white/5 px-4 sm:px-6 lg:px-12 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
            <div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter mb-2 drop-shadow-2xl">Logistics Hub</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full shadow-glow-emerald">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Live Tracking</span>
                </div>
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{liveData.filter(b => b.status === 'In Transit').length} Active Shipments</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button className="p-3 sm:p-4 bg-slate-900 border border-white/5 rounded-2xl hover:bg-slate-800 transition-all shadow-neumorphic-sm active:shadow-neumorphic-inset-sm group">
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-cyan-500 transition-colors" />
              </button>
              <div className="relative group flex-1 sm:flex-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 group-focus-within:text-cyan-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900/50 border border-white/5 rounded-2xl w-full sm:w-48 lg:w-64 pl-10 pr-4 py-3 text-xs font-black uppercase tracking-[0.1em] focus:outline-none focus:border-cyan-500/50 transition-all shadow-neumorphic-inset-sm text-white placeholder:text-slate-800"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-slate-900 border border-white/5 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 focus:outline-none focus:border-cyan-500/50 shadow-neumorphic-inset-sm"
                >
                  <option value="eta">ETA</option>
                  <option value="progress">Progress</option>
                  <option value="lastUpdate">Last Update</option>
                </select>
                <button
                  onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-2 bg-slate-900 border border-white/5 rounded-xl hover:bg-slate-800 transition-all shadow-neumorphic-sm active:shadow-neumorphic-inset-sm"
                >
                  {sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
              </div>
              <button className="p-3 sm:p-4 bg-slate-900 border border-white/5 rounded-2xl hover:bg-slate-800 transition-all shadow-neumorphic-sm active:shadow-neumorphic-inset-sm group">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-cyan-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Batch Scroller */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {['All Batches', 'In Transit', 'Processing', 'Delivered', 'Delayed'].map((filter) => (
              <button
                key={filter}
                className={cn(
                  "px-8 py-3 rounded-xl text-[9px] font-black transition-all whitespace-nowrap border uppercase tracking-[0.2em] shadow-neumorphic-sm active:shadow-neumorphic-inset-sm",
                  filter === 'All Batches' 
                    ? "bg-emerald-500 border-emerald-400 text-white shadow-glow-emerald" 
                    : "bg-slate-900 border-white/5 text-slate-500 hover:text-slate-300 hover:border-slate-700"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Map & Active Batch Detail */}
          <div className="lg:col-span-8 space-y-12">
            {/* Map Container */}


            {/* Batch Detailed Stats */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <VisualGauge value={parseFloat(selectedBatch.temp)} max={40} label="Temp" icon={Thermometer} color="cyan" />
              <VisualGauge value={parseFloat(selectedBatch.humidity)} max={100} label="Humidity" icon={Droplets} color="blue" />
              <motion.div 
                variants={fadeInUp}
                className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-neumorphic-inset-sm flex flex-col justify-between group hover:bg-slate-900/60 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-950 shadow-tactile rounded-xl border border-white/5">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Blockchain Proof</span>
                </div>
                <p className="text-[11px] font-black font-mono text-slate-600 break-all bg-slate-950/50 p-4 rounded-2xl border border-white/5 group-hover:text-emerald-400 transition-colors shadow-neumorphic-inset-sm">
                  {selectedBatch.securityHash || '0x7d...5f2e'}
                </p>
              </motion.div>
            </motion.div>

            {/* Logistics Timeline */}
            <motion.div 
              variants={fadeInUp}
              className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-12 shadow-neumorphic"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tighter mb-2 drop-shadow-2xl">Immutable Timeline</h3>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Blockchain-verified movement tracking for Batch {selectedBatch.id}</p>
                </div>
                <div className="flex items-center gap-4 px-8 py-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-glow-emerald">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-glow-emerald animate-pulse" />
                  Live Network Sync
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-10 top-0 bottom-0 w-px bg-slate-950 shadow-neumorphic-inset-sm" />
                <div className="space-y-16">
                  {selectedBatch.history.map((step, i) => {
                    const Icon = {
                      Truck,
                      Package,
                      Shield,
                      Leaf,
                      CheckCircle2
                    }[step.iconName];
                    const isCurrent = i === 0;
                    return (
                      <div key={i} className="relative flex items-start gap-16 group">
                        <div className={cn(
                          "relative z-10 w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 shadow-tactile border border-white/5",
                          isCurrent ? "bg-emerald-500 text-white scale-110 shadow-glow-emerald border-emerald-400/50" : "bg-slate-950 text-slate-700 shadow-neumorphic-sm"
                        )}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1 pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className={cn("text-xl font-black tracking-tighter uppercase tracking-[0.1em] drop-shadow-2xl", isCurrent ? "text-white" : "text-slate-700")}>{step.status}</h4>
                            <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] font-mono">{step.time}</span>
                          </div>
                          <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] opacity-80">{step.location}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Batch List */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] opacity-80">Active Shipments</h3>
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest font-mono">Sort: Progress</span>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-6 max-h-[900px] overflow-y-auto pr-4 scrollbar-hide"
            >
              {filteredBatches.map((batch) => (
                <motion.div
                  key={batch.id}
                  variants={fadeInUp}
                  whileHover={tactileHover}
                  whileTap={tactileTap}
                  onClick={() => {
                    setSelectedBatch(batch);
                    setIsModalOpen(true);
                  }}
                  className={cn(
                    "bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 cursor-pointer border-l-4 transition-all duration-500 shadow-neumorphic",
                    selectedBatch.id === batch.id 
                      ? "border-l-emerald-500 bg-emerald-500/5 shadow-glow-emerald" 
                      : "border-l-transparent hover:border-l-white/10"
                  )}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-lg font-black text-white mb-2 tracking-tighter drop-shadow-2xl">{batch.product}</h4>
                      <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] font-mono">Node ID: {batch.id}</p>
                    </div>
                    <div className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-tactile w-fit",
                      batch.status === 'In Transit' ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20 shadow-glow-emerald" :
                      batch.status === 'Delayed' ? "bg-rose-500/5 text-rose-500 border-rose-500/20 shadow-glow-rose" :
                      batch.status === 'Loading' ? "bg-amber-500/5 text-amber-500 border-amber-500/20 shadow-glow-amber" :
                      batch.status === 'Processing' ? "bg-cyan-500/5 text-cyan-500 border-cyan-500/20 shadow-glow-cyan" :
                      "bg-blue-500/5 text-blue-500 border-blue-500/20 shadow-glow-blue"
                    )}>
                      {batch.status === 'In Transit' && <Truck className="w-3 h-3" />}
                      {batch.status === 'Processing' && <Activity className="w-3 h-3" />}
                      {batch.status === 'Delivered' && <CheckCircle2 className="w-3 h-3" />}
                      {batch.status === 'Delayed' && <AlertTriangle className="w-3 h-3" />}
                      {batch.status === 'Loading' && <Package className="w-3 h-3" />}
                      {batch.status}
                    </div>
                    <div className="flex items-center gap-2">
                      {batch.status === 'Loading' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setBatchToLock(batch);
                            setIsStkModalOpen(true);
                          }}
                          className="p-2 bg-emerald-500 text-white rounded-full shadow-glow-emerald hover:bg-emerald-600 transition-all"
                        >
                          <Lock className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-glow-emerald" />
                        <div className="w-0.5 h-8 bg-slate-950 shadow-neumorphic-inset-sm" />
                        <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-glow-cyan" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                          <span className="text-slate-700">Origin</span>
                          <span className="text-white">{batch.origin}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                          <span className="text-slate-700">Dest.</span>
                          <span className="text-white">{batch.destination}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual Timeline Indicator */}
                    <div className="flex items-center gap-1 pt-2">
                      {batch.history.map((_, idx) => (
                        <div 
                          key={idx}
                          className={cn(
                            "h-1 rounded-full flex-1",
                            idx < batch.history.length - 1 ? "bg-emerald-500/50" : "bg-slate-700"
                          )}
                        />
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Clock className="w-5 h-5 text-slate-700" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] font-mono">ETA: {batch.eta}</span>
                      </div>
                      <ChevronRight className={cn(
                        "w-6 h-6 transition-transform",
                        selectedBatch.id === batch.id ? "text-emerald-500 translate-x-1" : "text-slate-900"
                      )} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Actions */}
            <div className="bg-slate-900/20 backdrop-blur-xl border-dashed border-white/10 border rounded-[2.5rem] p-10 group shadow-neumorphic">
              <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-8 opacity-80">Logistics Terminal</h4>
              <div className="grid grid-cols-2 gap-6">
                <button className="flex flex-col items-center gap-4 p-6 bg-slate-950 rounded-[2.5rem] border border-white/5 shadow-tactile hover:shadow-glow-emerald transition-all group/btn active:scale-95">
                  <Box className="w-8 h-8 text-slate-800 group-hover/btn:text-emerald-500 transition-colors" />
                  <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">New Batch</span>
                </button>
                <button className="flex flex-col items-center gap-4 p-6 bg-slate-950 rounded-[2.5rem] border border-white/5 shadow-tactile hover:shadow-glow-cyan transition-all group/btn active:scale-95">
                  <TrendingUp className="w-8 h-8 text-slate-800 group-hover/btn:text-cyan-500 transition-colors" />
                  <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">Analytics</span>
                </button>
                <button className="flex flex-col items-center gap-4 p-6 bg-slate-950 rounded-[2.5rem] border border-white/5 shadow-tactile hover:shadow-glow-emerald transition-all group/btn active:scale-95 col-span-2">
                  <QrCode className="w-8 h-8 text-slate-800 group-hover/btn:text-emerald-500 transition-colors" />
                  <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">Scan QR Code</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BatchDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        batch={selectedBatch} 
      />
      <StkPushModal 
        isOpen={isStkModalOpen} 
        onClose={() => setIsStkModalOpen(false)} 
        onConfirm={(phone, success) => {
          if (success && batchToLock) {
            setLiveData(current => current.map(b => 
              b.id === batchToLock.id ? { ...b, status: 'Processing' } : b
            ));
          }
          setIsStkModalOpen(false);
        }}
        batchId={batchToLock?.id || ''}
      />
    </motion.div>
  );
};
