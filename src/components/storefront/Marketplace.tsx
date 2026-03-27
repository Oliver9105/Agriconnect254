import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, PlusCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const PRODUCTS = [
  { id: 1, name: 'Premium Kericho Tea', healthGoals: ['Immunity', 'Heart Health'], price: 15 },
  { id: 2, name: 'Organic Avocados', healthGoals: ['High Fiber', 'Heart Health'], price: 8 },
  { id: 3, name: 'Specialty Coffee', healthGoals: ['Immunity', 'Vitamin C'], price: 20 },
];

const FILTERS = ['Immunity', 'High Fiber', 'Vitamin C', 'Heart Health'];

export const Marketplace = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [marketPrices, setMarketPrices] = useState<Record<number, number>>({});

  React.useEffect(() => {
    const fetchMarketPrices = async () => {
      try {
        // REPLACE WITH ACTUAL KILIMOSTAT API ENDPOINT
        // const response = await fetch('https://api.kilimostat.org/prices');
        // const data = await response.json();
        
        // Simulating API response for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockPrices = { 1: 16.5, 2: 7.5, 3: 22 };
        setMarketPrices(mockPrices);
      } catch (err) {
        console.error('Failed to fetch market prices', err);
      }
    };
    fetchMarketPrices();
  }, []);

  const filteredProducts = selectedFilter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.healthGoals.includes(selectedFilter));

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-neumorphic">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-white">Marketplace</h2>
        <button 
          onClick={() => setIsSellModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-xs font-bold hover:bg-emerald-600 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Sell Product
        </button>
      </div>
      
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button onClick={() => setSelectedFilter('All')} className={cn("px-4 py-2 rounded-full text-xs font-bold", selectedFilter === 'All' ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400")}>All</button>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setSelectedFilter(f)} className={cn("px-4 py-2 rounded-full text-xs font-bold", selectedFilter === f ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400")}>{f}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.map(p => (
          <div key={p.id} className="bg-slate-950 p-6 rounded-2xl border border-white/5 shadow-tactile flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-white mb-2">{p.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-sm text-slate-500">List: ${p.price}</p>
                {marketPrices[p.id] && (
                  <p className="text-xs text-emerald-400 font-bold">Market: ${marketPrices[p.id]}</p>
                )}
              </div>
              <div className="flex gap-2 mb-4">
                {p.healthGoals.map(g => <span key={g} className="text-[10px] bg-slate-800 px-2 py-1 rounded-full text-emerald-400">{g}</span>)}
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 w-full py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors">
              <ShoppingBag className="w-4 h-4" />
              Buy
            </button>
          </div>
        ))}
      </div>


      {isSellModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 p-8 rounded-3xl border border-white/10 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-white">List New Product</h3>
              <button onClick={() => setIsSellModalOpen(false)} className="text-slate-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-4">
              <input type="text" placeholder="Product Name" className="w-full p-3 bg-slate-950 rounded-xl border border-white/5 text-white" />
              <input type="number" placeholder="Price" className="w-full p-3 bg-slate-950 rounded-xl border border-white/5 text-white" />
              <button type="submit" className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">
                List Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
