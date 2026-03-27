import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Tag, 
  MapPin, 
  Star, 
  ArrowRight,
  ChevronRight,
  Package,
  Truck,
  ShieldCheck,
  Clock,
  X,
  Smartphone,
  Heart
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../lib/utils';
import { fadeInUp, staggerContainer, smoothTransition, tactileHover, tactileTap, scaleIn, fadeIn } from '../lib/animations';
import { SkeletonBento } from './SkeletonBento';
import { AgriMap } from './AgriMap';

const CATEGORIES = ['All', 'Tea', 'Coffee', 'Maize', 'Vegetables', 'Fruits'];

const SELLER_DETAILS: Record<string, any> = {
  'Samuel Koech': {
    farm: 'Kericho Highlands Tea Estate',
    verification: 'Verified Organic',
    performance: '98% On-time delivery',
    bio: 'Third generation tea farmer focusing on sustainable high-altitude farming.'
  },
  'David Langat': {
    farm: 'Sotik Arabica Farms',
    verification: 'Fair Trade Certified',
    performance: '95% Quality rating',
    bio: 'Specializing in premium Arabica beans with a focus on soil health.'
  },
  'Mary Chepkorir': {
    farm: 'Bomet Valley Maize',
    verification: 'Pending Certification',
    performance: '92% Fulfillment rate',
    bio: 'Dedicated to high-yield maize production for local markets.'
  },
  'Grace Mutai': {
    farm: 'Kericho Organic Orchard',
    verification: 'Verified Organic',
    performance: '100% Quality rating',
    bio: 'Passionate about organic Hass avocados and biodiversity.'
  }
};

const LISTINGS = [
  {
    id: 1,
    title: 'Premium Kericho Gold Tea',
    category: 'Tea',
    price: 'KES 185/kg',
    quantity: '500kg available',
    seller: 'Samuel Koech',
    location: 'Kericho West',
    rating: 4.9,
    image: 'https://picsum.photos/seed/tea_market/400/300',
    verified: true,
    delivery: '2-3 days',
    originCoords: [-0.3689, 35.2863],
    priceHistory: [
      { date: 'Jan', price: 170 },
      { date: 'Feb', price: 175 },
      { date: 'Mar', price: 185 },
      { date: 'Apr', price: 182 },
      { date: 'May', price: 185 }
    ]
  },
  {
    id: 2,
    title: 'Arabica Coffee Beans',
    category: 'Coffee',
    price: 'KES 420/kg',
    quantity: '200kg available',
    seller: 'David Langat',
    location: 'Sotik',
    rating: 4.7,
    image: 'https://picsum.photos/seed/coffee_market/400/300',
    verified: true,
    delivery: '3-5 days',
    originCoords: [-0.6789, 35.1234],
    priceHistory: [
      { date: 'Jan', price: 400 },
      { date: 'Feb', price: 410 },
      { date: 'Mar', price: 420 },
      { date: 'Apr', price: 415 },
      { date: 'May', price: 420 }
    ]
  },
  {
    id: 3,
    title: 'Yellow Maize (Grade A)',
    category: 'Maize',
    price: 'KES 95/kg',
    quantity: '2.5 Tons available',
    seller: 'Mary Chepkorir',
    location: 'Bomet Central',
    rating: 4.8,
    image: 'https://picsum.photos/seed/maize_market/400/300',
    verified: false,
    delivery: '1-2 days',
    originCoords: [-0.7890, 35.3456],
    priceHistory: [
      { date: 'Jan', price: 85 },
      { date: 'Feb', price: 90 },
      { date: 'Mar', price: 95 },
      { date: 'Apr', price: 92 },
      { date: 'May', price: 95 }
    ]
  },
  {
    id: 4,
    title: 'Organic Hass Avocados',
    category: 'Fruits',
    price: 'KES 120/kg',
    quantity: '150kg available',
    seller: 'Grace Mutai',
    location: 'Kericho East',
    rating: 5.0,
    image: 'https://picsum.photos/seed/avo_market/400/300',
    verified: true,
    delivery: 'Next day',
    originCoords: [-0.3800, 35.3000],
    priceHistory: [
      { date: 'Jan', price: 100 },
      { date: 'Feb', price: 110 },
      { date: 'Mar', price: 120 },
      { date: 'Apr', price: 115 },
      { date: 'May', price: 120 }
    ]
  }
];

const PriceTrendChart = ({ data }: { data: any[] }) => (
  <div className="h-64 w-full bg-slate-950/50 rounded-[2rem] p-6 border border-white/5 shadow-neumorphic-inset">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis 
          dataKey="date" 
          stroke="#475569" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          tick={{ fill: '#475569', fontWeight: 'bold' }}
        />
        <YAxis 
          stroke="#475569" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          tick={{ fill: '#475569', fontWeight: 'bold' }}
          tickFormatter={(value) => `KES ${value}`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#0f172a', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#fff'
          }}
          itemStyle={{ color: '#10b981' }}
        />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#10b981" 
          strokeWidth={3} 
          dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#0f172a' }}
          activeDot={{ r: 6, fill: '#10b981', strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showMap, setShowMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agri_favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('agri_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const filteredListings = LISTINGS.filter(item => 
    (activeCategory === 'All' || item.category === activeCategory) &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.seller.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'IDLE' | 'REQUESTING' | 'SUCCESS' | 'FAILED'>('IDLE');
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (paymentStatus === 'REQUESTING' && checkoutRequestId) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/v1/purchase/status/${checkoutRequestId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.status === 'SUCCESS') {
            setPaymentStatus('SUCCESS');
            clearInterval(interval);
          } else if (data.status === 'FAILED') {
            setPaymentStatus('FAILED');
            clearInterval(interval);
          }
        } catch (error) {
          console.error('Polling error:', error);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [paymentStatus, checkoutRequestId]);

  const handlePurchase = async () => {
    setPaymentStatus('REQUESTING');
    setIsPaymentModalOpen(true);
    try {
      const response = await fetch('/api/v1/purchase/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: selectedProduct.id, phoneNumber: '254700000000' })
      });
      const data = await response.json();
      setCheckoutRequestId(data.CheckoutRequestID);
    } catch (error) {
      console.error('Purchase initiation error:', error);
      setPaymentStatus('FAILED');
    }
  };

  return (
    <motion.div 
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30"
    >
      {/* Sticky Glass Header */}
      <div className="sticky top-0 z-[100] bg-slate-950/40 backdrop-blur-2xl border-b border-white/5 px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-emerald-900/40 rounded-[1.5rem] border border-emerald-500/20 shadow-glow-emerald">
                <ShoppingBag className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-1 drop-shadow-2xl">Marketplace</h2>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 w-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-glow-emerald" />
                  <p className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.3em]">Live Trade Terminal • 2.4k Active</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative group flex-1 lg:flex-none">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-700 group-focus-within:text-cyan-500 transition-all duration-500" />
                <input 
                  type="text" 
                  placeholder="Search produce, sellers..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-950/50 border border-white/5 rounded-2xl w-full lg:w-80 pl-14 pr-6 py-4.5 text-xs font-black uppercase tracking-[0.1em] focus:outline-none focus:border-cyan-500/50 transition-all shadow-neumorphic-inset-sm text-white placeholder:text-slate-700"
                />
              </div>
              <button className="p-4.5 bg-slate-900/40 border border-white/5 rounded-2xl hover:bg-slate-900/60 transition-all shadow-neumorphic active:shadow-neumorphic-inset group">
                <Filter className="w-5 h-5 text-slate-500 group-hover:text-cyan-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Categories Scroller - Thumb Optimized */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex-none px-8 py-4 rounded-[1.25rem] text-[9px] font-black transition-all duration-500 whitespace-nowrap border uppercase tracking-[0.2em] shadow-neumorphic active:scale-95 relative overflow-hidden",
                  activeCategory === cat 
                    ? "bg-emerald-900/40 border-emerald-500/30 text-emerald-400 shadow-glow-emerald" 
                    : "bg-slate-900/40 border-white/5 text-slate-500 hover:text-slate-300 hover:bg-slate-900/60"
                )}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="active-cat-pill"
                    className="absolute inset-0 bg-emerald-500/5 blur-xl pointer-events-none"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 space-y-10 sm:space-y-16 pb-32">
        {/* Featured Banner */}
        <motion.div 
          variants={fadeInUp}
          className="relative h-48 sm:h-72 lg:h-[28rem] rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden group cursor-pointer border border-white/5 shadow-tactile-premium"
        >
          <img 
            src="https://picsum.photos/seed/agri_banner/1600/600" 
            alt="Featured" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 grayscale-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent flex flex-col justify-center p-5 sm:p-12 lg:p-20">
            <div className="bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase tracking-[0.4em] px-3 py-1.5 rounded-full w-fit mb-3 sm:mb-6 shadow-glow-emerald backdrop-blur-md">
              Seasonal Special
            </div>
            <h3 className="text-xl sm:text-5xl lg:text-7xl font-black text-white mb-2 sm:mb-6 tracking-tighter leading-none drop-shadow-2xl">Kericho Gold Harvest</h3>
            <p className="hidden sm:block text-slate-400 max-w-lg mb-6 sm:mb-10 text-sm sm:text-lg font-black uppercase tracking-widest opacity-70 leading-relaxed">Bulk orders for the 2026 tea season are now open.</p>
            <button className="bg-emerald-600 text-white px-4 sm:px-10 py-2.5 sm:py-5 rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 w-fit hover:shadow-glow-emerald transition-all shadow-neumorphic border border-white/10 active:scale-95">
              View Collection <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>

        {/* Listings Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredListings.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={fadeInUp}
                whileHover={tactileHover}
                whileTap={tactileTap}
                onClick={() => setSelectedProduct(item)}
                className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 flex flex-col cursor-pointer shadow-neumorphic"
              >
                <div className="relative h-60 overflow-hidden p-1">
                  <div className="w-full h-full rounded-[2.2rem] overflow-hidden border border-white/5">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                    />
                  </div>
                  <div className="absolute top-6 left-6 bg-slate-950/80 backdrop-blur-xl text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/10 shadow-2xl">
                    {item.category}
                  </div>
                  {item.verified && (
                    <div className="absolute top-6 right-6 bg-emerald-600 p-2.5 rounded-2xl shadow-glow-emerald border border-white/20 flex items-center gap-2 px-4">
                      <ShieldCheck className="w-4 h-4 text-white" />
                      <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Verified</span>
                    </div>
                  )}
                  <button 
                    onClick={(e) => toggleFavorite(e, item.id)}
                    className={cn(
                      "absolute bottom-6 right-6 p-3.5 rounded-2xl backdrop-blur-xl border transition-all duration-500 shadow-2xl active:scale-90",
                      favorites.includes(item.id)
                        ? "bg-rose-500 border-rose-400 text-white shadow-glow-rose"
                        : "bg-slate-950/60 border-white/10 text-slate-400 hover:text-rose-400"
                    )}
                  >
                    <Heart className={cn("w-5 h-5", favorites.includes(item.id) && "fill-current")} />
                  </button>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors tracking-tighter leading-tight">{item.title}</h4>
                    <div className="flex items-center gap-1.5 text-amber-500 bg-amber-500/5 px-2.5 py-1.5 rounded-xl border border-amber-500/10 shadow-glow-amber">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-[10px] font-black font-mono">{item.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">
                      <div className="p-2.5 bg-slate-950 rounded-xl shadow-neumorphic-inset-sm border border-white/5">
                        <MapPin className="w-3.5 h-3.5 text-slate-600" />
                      </div>
                      {item.location}
                    </div>
                    <div className="flex items-center gap-4 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">
                      <div className="p-2.5 bg-slate-950 rounded-xl shadow-neumorphic-inset-sm border border-white/5">
                        <Package className="w-3.5 h-3.5 text-slate-600" />
                      </div>
                      {item.quantity}
                    </div>
                  </div>

                  <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.4em] mb-1 opacity-80">Unit Price</p>
                      <p className="text-2xl font-black text-white font-mono tracking-tighter">{item.price}</p>
                    </div>
                    <button 
                      onClick={() => { setSelectedProduct(item); setShowMap(true); }}
                      className="p-4 bg-slate-950 border border-white/5 rounded-2xl text-emerald-500 hover:shadow-glow-emerald transition-all shadow-neumorphic active:shadow-neumorphic-inset group"
                    >
                      <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setSelectedProduct(item)}
                      className="p-4 bg-slate-950 border border-white/5 rounded-2xl text-emerald-500 hover:shadow-glow-emerald transition-all shadow-neumorphic active:shadow-neumorphic-inset group"
                    >
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Empty State */}
      {filteredListings.length === 0 && (
        <div className="py-40 text-center space-y-10">
          <div className="w-32 h-32 bg-slate-900/40 backdrop-blur-xl rounded-[3rem] flex items-center justify-center mx-auto shadow-neumorphic border border-white/5">
            <Search className="w-12 h-12 text-slate-700" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-white tracking-tighter">No listings found</h3>
            <p className="text-slate-600 max-w-sm mx-auto mt-3 font-black uppercase tracking-[0.2em] opacity-80">Try adjusting your filters or search query to find what you're looking for.</p>
          </div>
          <button 
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] hover:text-emerald-400 transition-all hover:scale-105 active:scale-95"
          >
            Reset all search filters
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && !showMap && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl"
            />
            <motion.div
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative w-full max-w-6xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row"
            >
              <div className="w-full lg:w-1/2 h-96 lg:h-auto relative p-4">
                <div className="w-full h-full rounded-[3.5rem] overflow-hidden border border-white/5 shadow-tactile">
                  <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover grayscale-[0.1]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-r pointer-events-none" />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-10 left-10 p-5 bg-slate-950/80 backdrop-blur-xl rounded-2xl text-white hover:bg-slate-950 transition-all lg:hidden shadow-2xl border border-white/10"
                >
                  <ChevronRight className="w-7 h-7 rotate-180" />
                </button>
              </div>
              
              <div className="flex-1 p-5 sm:p-12 lg:p-20 overflow-y-auto max-h-[60vh] lg:max-h-none scrollbar-hide">
                <div className="flex items-center justify-between mb-10">
                  <span className="px-8 py-3 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-emerald-500/20 shadow-glow-emerald backdrop-blur-md">
                    {selectedProduct.category}
                  </span>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="hidden lg:block p-4 bg-slate-950/50 border border-white/5 rounded-2xl text-slate-500 hover:text-white transition-all shadow-neumorphic group"
                  >
                    <X className="w-7 h-7 group-hover:rotate-90 transition-transform duration-500" />
                  </button>
                </div>

                <h3 className="text-3xl sm:text-6xl font-black text-white tracking-tighter mb-5 sm:mb-8 leading-tight drop-shadow-2xl">{selectedProduct.title}</h3>
                
                <div className="flex flex-wrap items-center gap-4 sm:gap-10 mb-8 sm:mb-12">
                  <div className="flex items-center gap-4 bg-amber-500/5 px-6 py-3 rounded-2xl border border-amber-500/10 shadow-glow-amber">
                    <Star className="w-7 h-7 text-amber-500 fill-amber-500" />
                    <span className="text-2xl font-black text-white font-mono tracking-tighter">{selectedProduct.rating}</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                  <div className="flex items-center gap-4 text-slate-500 font-black text-[11px] uppercase tracking-[0.3em]">
                    <MapPin className="w-6 h-6 text-slate-700" />
                    {selectedProduct.location}
                  </div>
                  <button 
                    onClick={(e) => toggleFavorite(e, selectedProduct.id)}
                    className={cn(
                      "flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-500",
                      favorites.includes(selectedProduct.id)
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-500 shadow-glow-rose"
                        : "bg-slate-950 border-white/5 text-slate-500 hover:text-rose-500"
                    )}
                  >
                    <Heart className={cn("w-4 h-4", favorites.includes(selectedProduct.id) && "fill-current")} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {favorites.includes(selectedProduct.id) ? 'Favorited' : 'Favorite'}
                    </span>
                  </button>
                </div>

                <div className="mb-12">
                  <h4 className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-80">Price Trend (Last 5 Months)</h4>
                  <PriceTrendChart data={selectedProduct.priceHistory} />
                </div>

                <div className="mb-12">
                  <h4 className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-80">Bidding History</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-[11px] font-black text-white p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                      <span>Buyer: John D.</span>
                      <span className="text-emerald-400">KES 190/kg</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-black text-white p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                      <span>Buyer: Sarah M.</span>
                      <span className="text-emerald-400">KES 188/kg</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-10 mb-8 sm:mb-12">
                  <div className="p-5 sm:p-10 bg-slate-950/50 border border-white/5 rounded-[2rem] shadow-neumorphic-inset">
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-3 opacity-80">Price</p>
                    <p className="text-2xl sm:text-4xl font-black text-emerald-400 tracking-tighter font-mono drop-shadow-glow-emerald">{selectedProduct.price}</p>
                  </div>
                  <div className="p-5 sm:p-10 bg-slate-950/50 border border-white/5 rounded-[2rem] shadow-neumorphic-inset">
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-3 opacity-80">Availability</p>
                    <p className="text-2xl font-black text-white tracking-tight uppercase tracking-widest text-xs">{selectedProduct.quantity}</p>
                  </div>
                </div>

                <div className="space-y-8 mb-16">
                  <div className="flex items-center gap-6 text-slate-500">
                    <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 shadow-tactile">
                      <Truck className="w-7 h-7 text-cyan-500 shadow-glow-cyan" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Estimated Delivery: <span className="text-white ml-2">{selectedProduct.delivery}</span></span>
                  </div>
                  <div className="flex items-center gap-6 text-slate-500">
                    <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-tactile">
                      <ShieldCheck className="w-7 h-7 text-emerald-500 shadow-glow-emerald" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Quality Guaranteed by <span className="text-white ml-2">KEPHIS</span></span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={handlePurchase}
                    className="flex-1 bg-emerald-600 text-white py-5 sm:py-8 rounded-[2rem] font-black text-xs sm:text-sm hover:shadow-glow-emerald transition-all uppercase tracking-[0.3em] active:scale-95 border border-white/10 shadow-neumorphic"
                  >
                    Initiate Trade
                  </button>
                  <button className="p-5 sm:p-8 bg-slate-950/50 text-white rounded-[2rem] font-black transition-all border border-white/5 shadow-neumorphic active:shadow-neumorphic-inset group">
                    <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700 group-hover:text-emerald-500 transition-colors" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Map Modal */}
      <AnimatePresence>
        {showMap && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMap(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl"
            />
            <motion.div
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative w-full max-w-6xl h-[600px] bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.6)]"
            >
              <AgriMap batches={[selectedProduct]} />
              <button 
                onClick={() => setShowMap(false)}
                className="absolute top-8 left-8 p-4 bg-slate-950/60 backdrop-blur-2xl border border-white/10 rounded-2xl text-white hover:bg-slate-950/80 transition-all z-10 shadow-2xl active:scale-95"
              >
                Close Map
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-slate-900 border border-white/10 p-12 rounded-[3rem] text-center max-w-sm w-full shadow-2xl">
              {paymentStatus === 'REQUESTING' && (
                <div className="space-y-8">
                  <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-glow-emerald">
                    <Smartphone className="w-10 h-10 text-emerald-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white tracking-tighter">Enter M-Pesa PIN</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Check your phone for the STK prompt</p>
                  </div>
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-4 h-4 rounded-full bg-slate-700 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              )}
              {paymentStatus === 'SUCCESS' && (
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-black text-white">Blockchain-Verified!</h3>
                  <button onClick={() => { setIsPaymentModalOpen(false); setSelectedProduct(null); setPaymentStatus('IDLE'); }} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Close</button>
                </div>
              )}
              {paymentStatus === 'FAILED' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-rose-500">Payment Failed</h3>
                  <button onClick={() => setIsPaymentModalOpen(false)} className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Retry</button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
