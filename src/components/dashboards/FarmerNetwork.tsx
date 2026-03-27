import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  MapPin, 
  Award, 
  Search, 
  Filter,
  Plus,
  Share2,
  ThumbsUp,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  X,
  CheckCircle2,
  Leaf
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../../lib/utils';
import { fadeInUp, staggerContainer, smoothTransition, tactileHover, tactileTap, scaleIn, fadeIn } from '../../lib/animations';

const MARKET_DATA = [
  { day: 'Mon', price: 175, volume: 1200 },
  { day: 'Tue', price: 178, volume: 1500 },
  { day: 'Wed', price: 182, volume: 1100 },
  { day: 'Thu', price: 180, volume: 1800 },
  { day: 'Fri', price: 185, volume: 2100 },
  { day: 'Sat', price: 188, volume: 900 },
  { day: 'Sun', price: 190, volume: 800 },
];

const FARMERS = [
  { id: 1, name: 'Samuel Koech', location: 'Kericho West', crop: 'Tea', rating: 4.9, image: 'https://picsum.photos/seed/farmer1/100/100' },
  { id: 2, name: 'Mary Chepkorir', location: 'Bomet Central', crop: 'Maize', rating: 4.8, image: 'https://picsum.photos/seed/farmer2/100/100' },
  { id: 3, name: 'David Langat', location: 'Sotik', crop: 'Coffee', rating: 4.7, image: 'https://picsum.photos/seed/farmer3/100/100' },
  { id: 4, name: 'Grace Mutai', location: 'Kericho East', crop: 'Tea', rating: 5.0, image: 'https://picsum.photos/seed/farmer4/100/100' },
];

const POSTS = [
  {
    id: 1,
    author: 'Samuel Koech',
    content: 'Just finished harvesting the first batch of high-altitude tea. The quality looks exceptional this season! Anyone else seeing similar results in Kericho West?',
    likes: 24,
    comments: 5,
    time: '2h ago',
    image: 'https://picsum.photos/seed/tea1/600/400'
  },
  {
    id: 2,
    author: 'Mary Chepkorir',
    content: 'Market prices in Nairobi are trending up for maize. Highly recommend checking the local hub logistics before shipping.',
    likes: 18,
    comments: 3,
    time: '5h ago'
  }
];

export const FarmerNetwork = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'market' | 'directory'>('feed');
  const [selectedFarmer, setSelectedFarmer] = useState<any>(null);
  const [requests, setRequests] = useState([
    { id: 1, name: 'John Kamau', image: 'https://picsum.photos/seed/req1/100/100' },
    { id: 2, name: 'Sarah Wanjiku', image: 'https://picsum.photos/seed/req2/100/100' },
  ]);

  const acceptRequest = (id: number) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <motion.div 
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-slate-950/20 text-slate-200"
    >
      {/* Sticky Glass Header */}
      <div className="sticky top-0 z-[100] bg-slate-950/60 backdrop-blur-3xl border-b border-white/5 px-8 lg:px-16 py-8 shadow-neumorphic">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-slate-950 rounded-[2rem] border border-white/5 shadow-tactile-premium group-hover:shadow-glow-emerald transition-all duration-700">
                <Users className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tighter drop-shadow-2xl">Farmer Network</h2>
                <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-[0.5em] mt-2">2,400+ Verified Members</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-700 group-focus-within:text-cyan-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search network..." 
                  className="bg-slate-950/60 border border-white/5 rounded-[2rem] w-full lg:w-80 pl-16 pr-6 py-4 text-[11px] font-black uppercase tracking-[0.1em] focus:outline-none focus:border-cyan-500/30 transition-all shadow-neumorphic-inset"
                />
              </div>
              <button className="p-4 bg-slate-950 rounded-2xl border border-white/5 shadow-tactile hover:bg-slate-900 transition-all group active:scale-90">
                <Plus className="w-6 h-6 text-slate-700 group-hover:text-cyan-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Tabs Scroller */}
          <div className="flex items-center gap-3 overflow-x-auto mt-10 pb-2 scrollbar-hide">
            <div className="flex items-center gap-3 p-2.5 bg-slate-950 rounded-[2rem] shadow-neumorphic-inset-sm border border-white/5">
              {(['feed', 'market', 'directory'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 relative overflow-hidden whitespace-nowrap",
                    activeTab === tab 
                      ? "bg-emerald-500 text-white shadow-glow-emerald border border-emerald-400/50" 
                      : "text-slate-600 hover:text-slate-400"
                  )}
                >
                  {tab}
                  {activeTab === tab && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-emerald-500/10 blur-xl" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-16">
            <AnimatePresence mode="wait">
              {activeTab === 'feed' && (
                <motion.div 
                  key="feed"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-16"
                >
                  {/* Create Post */}
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3.5rem] p-12 group shadow-neumorphic relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
                    <div className="flex gap-10">
                      <div className="w-20 h-20 rounded-[2rem] bg-slate-950 border border-white/5 shadow-tactile-premium overflow-hidden flex-shrink-0">
                        <img src="https://picsum.photos/seed/farmer/200/200" alt="Me" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1 space-y-6">
                        <textarea 
                          placeholder="What's happening on your farm today?"
                          className="w-full bg-slate-950/60 border border-white/5 rounded-[2.5rem] p-8 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/30 transition-all shadow-neumorphic-inset resize-none h-32 font-medium text-lg tracking-tight"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <button className="flex items-center gap-3 px-6 py-4 bg-slate-950 rounded-2xl border border-white/5 shadow-tactile hover:bg-slate-900 transition-all text-slate-500 hover:text-emerald-500">
                              <Share2 className="w-5 h-5" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Media</span>
                            </button>
                            <button className="flex items-center gap-3 px-6 py-4 bg-slate-950 rounded-2xl border border-white/5 shadow-tactile hover:bg-slate-900 transition-all text-slate-500 hover:text-cyan-500">
                              <MapPin className="w-5 h-5" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Location</span>
                            </button>
                          </div>
                          <button className="bg-emerald-600 text-white px-12 py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all shadow-glow-emerald flex items-center gap-5 active:scale-95 border border-emerald-400/30">
                            <Plus className="w-6 h-6" /> Share Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Feed Posts */}
                  {POSTS.map((post) => (
                    <motion.div 
                      key={post.id} 
                      variants={fadeInUp}
                      className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3.5rem] p-12 space-y-10 group shadow-neumorphic hover:border-emerald-500/20 transition-all duration-700 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-8">
                          <div className="w-20 h-20 rounded-[2rem] bg-slate-950 border border-white/5 shadow-tactile-premium overflow-hidden">
                            <img src={`https://picsum.photos/seed/${post.author}/200/200`} alt={post.author} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-black text-white tracking-tighter drop-shadow-2xl">{post.author}</h4>
                            <p className="text-slate-600 text-[11px] font-black uppercase tracking-[0.3em] mt-2 opacity-80">{post.time}</p>
                          </div>
                        </div>
                        <button className="p-4 bg-slate-950 rounded-2xl border border-white/5 shadow-tactile hover:bg-slate-900 transition-all group active:scale-90">
                          <TrendingUp className="w-6 h-6 text-slate-700 group-hover:text-emerald-500 transition-colors" />
                        </button>
                      </div>
                      
                      <p className="text-slate-300 text-xl leading-relaxed font-medium tracking-tight opacity-90 relative z-10">{post.content}</p>
                      
                      {post.image && (
                        <div className="rounded-[3rem] overflow-hidden border border-white/5 shadow-tactile-premium bg-slate-950 relative group/img">
                          <img src={post.image} alt="Post content" className="w-full h-auto object-cover opacity-80 group-hover/img:scale-105 transition-transform duration-1000" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
                        </div>
                      )}

                      <div className="flex items-center gap-12 pt-10 border-t border-white/5 relative z-10">
                        <button className="flex items-center gap-4 text-slate-600 hover:text-emerald-500 transition-all group/btn">
                          <div className="p-4 bg-slate-950 rounded-[1.5rem] border border-white/5 shadow-tactile group-hover/btn:bg-emerald-500/10 group-hover/btn:border-emerald-500/20 group-hover/btn:shadow-glow-emerald transition-all">
                            <ThumbsUp className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                          </div>
                          <span className="text-[12px] font-black uppercase tracking-widest">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-4 text-slate-600 hover:text-cyan-500 transition-all group/btn">
                          <div className="p-4 bg-slate-950 rounded-[1.5rem] border border-white/5 shadow-tactile group-hover/btn:bg-cyan-500/10 group-hover/btn:border-cyan-500/20 group-hover/btn:shadow-glow-cyan transition-all">
                            <MessageSquare className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                          </div>
                          <span className="text-[12px] font-black uppercase tracking-widest">{post.comments}</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'market' && (
                <motion.div 
                  key="market"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-16"
                >
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3.5rem] p-12 shadow-neumorphic relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
                    <div className="flex items-center justify-between mb-12 relative z-10">
                      <div>
                        <h3 className="text-3xl font-black text-white tracking-tighter drop-shadow-2xl">Price Trends (Tea/kg)</h3>
                        <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-[0.5em] mt-3">Last 7 Days Analysis</p>
                      </div>
                      <div className="flex items-center gap-3 text-emerald-500 font-black bg-emerald-500/10 px-6 py-3 rounded-full border border-emerald-500/20 shadow-glow-emerald">
                        <ArrowUpRight className="w-6 h-6" />
                        <span className="text-lg tracking-tighter">+12.4%</span>
                      </div>
                    </div>
                    <div className="h-[400px] w-full relative z-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MARKET_DATA}>
                          <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                          <XAxis dataKey="day" stroke="#475569" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} dy={15} fontFamily="JetBrains Mono" />
                          <YAxis stroke="#475569" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} tickFormatter={(value) => `KES ${value}`} dx={-15} fontFamily="JetBrains Mono" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', fontSize: '11px', fontFamily: 'JetBrains Mono', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', padding: '16px', backdropFilter: 'blur(20px)' }}
                            itemStyle={{ color: '#10b981', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                          />
                          <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorPrice)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-10"
                  >
                    <motion.div 
                      variants={fadeInUp}
                      className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3.5rem] p-12 group shadow-neumorphic relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />
                      <h4 className="text-white font-black mb-10 flex items-center gap-5 uppercase text-[11px] tracking-[0.4em] opacity-80 relative z-10">
                        <div className="p-4 bg-slate-950 rounded-[1.5rem] shadow-tactile-premium border border-white/10 group-hover:shadow-glow-cyan transition-all duration-500">
                          <BarChart3 className="w-6 h-6 text-cyan-500" />
                        </div>
                        Volume Analysis
                      </h4>
                      <div className="h-[250px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={MARKET_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="day" hide />
                            <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', fontSize: '11px', fontFamily: 'JetBrains Mono', backdropFilter: 'blur(20px)' }} />
                            <Line type="stepAfter" dataKey="volume" stroke="#06b6d4" strokeWidth={4} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>
                    <motion.div 
                      variants={fadeInUp}
                      className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3.5rem] p-12 flex flex-col justify-center text-center relative overflow-hidden group shadow-neumorphic"
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                      <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-80">Market Sentiment</p>
                      <h3 className="text-6xl font-black text-white mb-10 tracking-tighter italic drop-shadow-2xl">Bullish</h3>
                      <div className="space-y-6 max-w-xs mx-auto w-full">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em]">
                          <span className="text-slate-600">Demand Index</span>
                          <span className="text-emerald-500">88/100</span>
                        </div>
                        <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden shadow-neumorphic-inset p-1">
                          <div className="bg-emerald-500 h-full w-[88%] rounded-full shadow-glow-emerald" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 'directory' && (
                <motion.div 
                  key="directory"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-16"
                >
                  {/* Network Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                      { label: 'Total Connections', value: '1,240' },
                      { label: 'Active Today', value: '450' },
                      { label: 'New This Week', value: '85' },
                    ].map((stat) => (
                      <div key={stat.label} className="p-8 bg-slate-900/40 border border-white/5 rounded-[2.5rem] text-center shadow-neumorphic">
                        <p className="text-emerald-500/60 text-[9px] font-black uppercase tracking-[0.4em] mb-3 opacity-80">{stat.label}</p>
                        <p className="text-white font-black text-3xl tracking-tighter drop-shadow-2xl">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Connection Requests */}
                  {requests.length > 0 && (
                    <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3.5rem] p-12 shadow-neumorphic">
                      <h3 className="text-2xl font-black text-white tracking-tighter mb-10">Connection Requests</h3>
                      <div className="space-y-6">
                        {requests.map(req => (
                          <div key={req.id} className="flex items-center justify-between p-6 bg-slate-950 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4">
                              <img src={req.image} alt={req.name} className="w-12 h-12 rounded-full" />
                              <span className="text-sm font-black text-white">{req.name}</span>
                            </div>
                            <button onClick={() => acceptRequest(req.id)} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em]">Accept</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Farmer Directory */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {FARMERS.map((farmer) => (
                      <motion.div 
                        key={farmer.id} 
                        variants={fadeInUp}
                        whileHover={tactileHover}
                        whileTap={tactileTap}
                        onClick={() => setSelectedFarmer({
                          ...farmer,
                          avatar: farmer.image,
                          crops: [farmer.crop],
                          location: farmer.location,
                          rating: farmer.rating
                        })}
                        className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3.5rem] p-10 group hover:border-emerald-500/30 transition-all duration-700 cursor-pointer shadow-neumorphic relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />
                        <div className="flex items-center gap-8 mb-10 relative z-10">
                          <div className="w-24 h-24 rounded-[2rem] bg-slate-950 border border-white/5 shadow-tactile-premium overflow-hidden group-hover:scale-105 transition-transform duration-700">
                            <img src={farmer.image} alt={farmer.name} className="w-full h-full object-cover opacity-80 group-hover:grayscale-0 transition-all duration-700" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-black text-white tracking-tighter drop-shadow-2xl">{farmer.name}</h4>
                            <p className="text-slate-600 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3 mt-3 opacity-80">
                              <MapPin className="w-5 h-5 text-slate-700" /> {farmer.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-10 border-t border-white/5 relative z-10">
                          <div className="flex items-center gap-4">
                            <div className="p-3.5 bg-amber-500/10 rounded-[1.25rem] border border-amber-500/20 shadow-glow-amber">
                              <Award className="w-5 h-5 text-amber-500" />
                            </div>
                            <span className="text-2xl font-black text-white font-mono tracking-tighter drop-shadow-2xl">{farmer.rating}</span>
                            <div className="w-2 h-2 rounded-full bg-slate-800" />
                            <span className="text-emerald-500/60 text-[10px] font-black uppercase tracking-[0.3em]">{farmer.crop}</span>
                          </div>
                          <button className="bg-emerald-500/10 text-emerald-500 px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all shadow-glow-emerald active:scale-95">Connect</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3.5rem] p-12 group shadow-neumorphic relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />
              <h3 className="text-white font-black mb-10 flex items-center gap-5 uppercase text-[11px] tracking-[0.4em] opacity-80 relative z-10">
                <div className="p-4 bg-slate-950 rounded-[1.5rem] shadow-tactile-premium border border-white/10 group-hover:shadow-glow-emerald transition-all duration-500">
                  <TrendingUp className="w-6 h-6 text-emerald-500" />
                </div>
                Trending Topics
              </h3>
              <div className="space-y-8 relative z-10">
                {['#KerichoTea', '#NairobiMarket', '#AgriTech2026', '#MaizePrices'].map((tag) => (
                  <div key={tag} className="flex items-center justify-between group/item cursor-pointer">
                    <span className="text-slate-600 font-black uppercase tracking-[0.2em] group-hover/item:text-emerald-500 transition-all text-[12px]">{tag}</span>
                    <span className="text-slate-800 text-[10px] font-black font-mono uppercase tracking-widest">1.2k posts</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/40 backdrop-blur-2xl border border-emerald-500/10 rounded-[3.5rem] p-12 relative overflow-hidden group shadow-neumorphic">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[120px] rounded-full -mr-32 -mt-32 group-hover:bg-emerald-500/20 transition-all duration-1000 pointer-events-none" />
              <h3 className="text-2xl font-black text-white tracking-tighter mb-3 drop-shadow-2xl relative z-10">Network Growth</h3>
              <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-[0.4em] mb-10 opacity-80 relative z-10">12 new connections this week!</p>
              <div className="flex -space-x-6 mb-12 relative z-10">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-16 h-16 rounded-[1.5rem] border-4 border-slate-950 bg-slate-950 overflow-hidden shadow-tactile-premium hover:z-10 hover:scale-110 transition-all duration-500">
                    <img src={`https://picsum.photos/seed/new${i}/100/100`} alt="New" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
              <button className="w-full bg-emerald-600 text-white py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all shadow-glow-emerald active:scale-95 border border-emerald-400/30 relative z-10">
                Invite Colleagues
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Farmer Profile Modal */}
      <AnimatePresence>
        {selectedFarmer && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFarmer(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[4rem] overflow-hidden shadow-neumorphic"
            >
              <div className="h-64 bg-gradient-to-br from-emerald-500/20 to-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_70%)]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none" />
                <button 
                  onClick={() => setSelectedFarmer(null)}
                  className="absolute top-10 right-10 p-4 bg-slate-950/60 backdrop-blur-2xl rounded-2xl text-white hover:bg-slate-900 transition-all border border-white/10 shadow-tactile active:scale-90"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="px-16 pb-16">
                <div className="relative -mt-24 mb-10">
                  <div className="w-40 h-40 rounded-[3rem] bg-slate-950 border-[10px] border-slate-900 overflow-hidden shadow-tactile-premium relative group">
                    <img src={selectedFarmer.avatar} alt={selectedFarmer.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <div className="absolute bottom-4 left-32 bg-emerald-500 p-3 rounded-2xl border-[6px] border-slate-900 shadow-glow-emerald">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex items-start justify-between gap-10 mb-12">
                  <div>
                    <h3 className="text-4xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">{selectedFarmer.name}</h3>
                    <div className="flex flex-wrap items-center gap-6 text-slate-500 text-[11px] font-black uppercase tracking-[0.3em] opacity-80">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-slate-700" />
                        {selectedFarmer.location}
                      </div>
                      <div className="w-2 h-2 rounded-full bg-slate-800" />
                      <div className="flex items-center gap-3">
                        <Leaf className="w-5 h-5 text-slate-700" />
                        {selectedFarmer.crops.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-black text-emerald-400 tracking-tighter drop-shadow-glow-emerald font-mono">{selectedFarmer.rating}</div>
                    <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] mt-3">Farmer Rating</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8 mb-16">
                  {[
                    { label: 'Experience', value: '12 Years' },
                    { label: 'Farm Size', value: '45 Acres' },
                    { label: 'Success Rate', value: '98.2%' },
                  ].map((stat) => (
                    <div key={stat.label} className="p-8 bg-slate-950/60 border border-white/5 rounded-[2.5rem] text-center shadow-neumorphic-inset">
                      <p className="text-emerald-500/60 text-[9px] font-black uppercase tracking-[0.4em] mb-3 opacity-80">{stat.label}</p>
                      <p className="text-white font-black text-2xl tracking-tight drop-shadow-2xl">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-8">
                  <button className="flex-1 bg-emerald-600 text-white py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all shadow-glow-emerald border border-emerald-400/30 active:scale-95">
                    Message Farmer
                  </button>
                  <button className="flex-1 bg-slate-950 text-white py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] hover:bg-slate-900 transition-all border border-white/5 shadow-tactile active:scale-95">
                    View Listings
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
