import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  QrCode, 
  Smartphone, 
  CreditCard, 
  Wallet, 
  Zap, 
  Fingerprint,
  RefreshCw,
  Eye,
  EyeOff,
  Plus,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { initiateStkPush } from '../../services/mpesaService';

export const EscrowSystem = () => {
  const [view, setView] = useState<'escrow' | 'wallet'>('escrow');
  const [step, setStep] = useState<'idle' | 'locked' | 'released'>('idle');
  const [loading, setLoading] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);

  const handleLock = async () => {
    setLoading(true);
    try {
      await initiateStkPush(45000, '+254712345678');
      setStep('locked');
    } catch (error) {
      console.error('STK Push failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRelease = async () => {
    setLoading(true);
    // Mocking B2C Release
    setTimeout(() => {
      setStep('released');
      setLoading(false);
    }, 2000);
  };

  // Mocking sensor data monitoring
  React.useEffect(() => {
    if (step === 'locked') {
      const timer = setTimeout(() => {
        console.log("Sensor data verified: Quality standards met. Releasing escrow...");
        handleRelease();
      }, 5000); // Simulate sensor verification delay
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3.5rem] p-12 hover:border-emerald-500/20 transition-all duration-700 group relative overflow-hidden shadow-neumorphic">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full -mr-40 -mt-40 group-hover:bg-emerald-500/10 transition-all duration-1000 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full -ml-32 -mb-32 group-hover:bg-cyan-500/10 transition-all duration-1000 pointer-events-none" />
      
      {/* View Toggle */}
      <div className="flex items-center justify-between mb-16 relative z-10">
        <div className="flex items-center gap-3 p-2.5 bg-slate-950 rounded-[2rem] shadow-neumorphic-inset-sm border border-white/5">
          <button 
            onClick={() => setView('escrow')}
            className={cn(
              "px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 relative overflow-hidden",
              view === 'escrow' ? "bg-emerald-500 text-white shadow-glow-emerald border border-emerald-400/50" : "text-slate-600 hover:text-slate-400"
            )}
          >
            Escrow
            {view === 'escrow' && <motion.div layoutId="escrow-pill" className="absolute inset-0 bg-emerald-500/10 blur-xl" />}
          </button>
          <button 
            onClick={() => setView('wallet')}
            className={cn(
              "px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 relative overflow-hidden",
              view === 'wallet' ? "bg-cyan-500 text-white shadow-glow-cyan border border-cyan-400/50" : "text-slate-600 hover:text-slate-400"
            )}
          >
            Wallet
            {view === 'wallet' && <motion.div layoutId="escrow-pill" className="absolute inset-0 bg-cyan-500/10 blur-xl" />}
          </button>
        </div>
        
        <div className={cn(
          "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border shadow-tactile-premium transition-all duration-700",
          step === 'idle' && "bg-slate-950 text-slate-700 border-white/5",
          step === 'locked' && "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-glow-amber animate-pulse",
          step === 'released' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-glow-emerald"
        )}>
          {view === 'escrow' ? (step === 'idle' ? 'Ready' : step === 'locked' ? 'Secured' : 'Completed') : 'Active'}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'escrow' ? (
          <motion.div 
            key="escrow"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            className="space-y-10 relative z-10"
          >
            <div className="flex items-center gap-8 mb-12">
              <div className="p-6 bg-slate-950 rounded-[2rem] border border-white/5 shadow-tactile-premium group-hover:shadow-glow-emerald transition-all duration-700">
                <ShieldCheck className="w-10 h-10 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white tracking-tighter leading-none drop-shadow-2xl">M-Pesa Escrow</h3>
                <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-[0.5em] mt-3">Secured Settlements Protocol</p>
              </div>
            </div>

            {/* Step 1: Buyer Lock */}
            <div className={cn(
              "p-12 rounded-[3.5rem] border transition-all duration-700 relative overflow-hidden",
              step === 'idle' ? "bg-slate-950/60 border-white/5 shadow-neumorphic-inset" : "bg-slate-900/20 border-transparent opacity-30"
            )}>
              <div className="flex flex-col md:flex-row items-start gap-10">
                <div className={cn(
                  "p-6 rounded-3xl shadow-tactile-premium transition-all duration-700 border",
                  step === 'idle' ? "bg-emerald-600 text-white border-emerald-400/50 shadow-glow-emerald" : "bg-slate-900 text-slate-700 border-white/5"
                )}>
                  <Lock className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-black text-xl uppercase tracking-[0.2em] mb-4 drop-shadow-2xl">Secure Funds</p>
                  <p className="text-slate-500 text-sm font-medium mb-10 tracking-wide leading-relaxed opacity-80 max-w-xl">Buyer initiates a pre-order STK Push to secure the transaction funds in the Kericho Node.</p>
                  {step === 'idle' && (
                    <button 
                      onClick={handleLock}
                      disabled={loading}
                      className="bg-emerald-600 text-white px-12 py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all shadow-glow-emerald flex items-center gap-5 active:scale-95 border border-emerald-400/30"
                    >
                      {loading ? "Processing..." : "Lock KES 45,000"}
                      {!loading && <ArrowRight className="w-6 h-6" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Guaranteed Badge */}
            <div className={cn(
              "p-12 rounded-[3.5rem] border transition-all duration-700",
              step === 'locked' ? "bg-amber-500/5 border-amber-500/20 shadow-neumorphic-inset" : "bg-slate-900/20 border-transparent opacity-30"
            )}>
              <div className="flex flex-col md:flex-row items-start gap-10">
                <div className={cn(
                  "p-6 rounded-3xl shadow-tactile-premium transition-all duration-700 border",
                  step === 'locked' ? "bg-amber-500 text-white border-amber-400/50 shadow-glow-amber" : "bg-slate-900 text-slate-700 border-white/5"
                )}>
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-black text-xl uppercase tracking-[0.2em] mb-4 drop-shadow-2xl">Payment Guaranteed</p>
                  <p className="text-slate-500 text-sm font-medium tracking-wide leading-relaxed opacity-80 max-w-xl">Farmer receives a "Secured" notification. Harvesting and logistics begin immediately with full confidence.</p>
                </div>
              </div>
            </div>

            {/* Step 3: Release */}
            <div className={cn(
              "p-12 rounded-[3.5rem] border transition-all duration-700",
              step === 'locked' ? "bg-emerald-500/5 border-emerald-500/20 shadow-neumorphic-inset" : 
              step === 'released' ? "bg-emerald-500/10 border-emerald-500/30 shadow-neumorphic-inset" : "bg-slate-900/20 border-transparent opacity-30"
            )}>
              <div className="flex flex-col md:flex-row items-start gap-10">
                <div className={cn(
                  "p-6 rounded-3xl shadow-tactile-premium transition-all duration-700 border",
                  step === 'locked' || step === 'released' ? "bg-emerald-600 text-white border-emerald-400/50 shadow-glow-emerald" : "bg-slate-900 text-slate-700 border-white/5"
                )}>
                  <QrCode className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-black text-xl uppercase tracking-[0.2em] mb-4 drop-shadow-2xl">Instant Release</p>
                  <p className="text-slate-500 text-sm font-medium mb-10 tracking-wide leading-relaxed opacity-80 max-w-xl">Scan the delivery QR code to release the B2C payment to the farmer instantly via M-Pesa.</p>
                  {step === 'locked' && (
                    <button 
                      onClick={handleRelease}
                      disabled={loading}
                      className="bg-emerald-600 text-white px-12 py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all shadow-glow-emerald flex items-center gap-5 active:scale-95 border border-emerald-400/30"
                    >
                      {loading ? "Releasing..." : "Scan & Pay Farmer"}
                      {!loading && <Smartphone className="w-6 h-6" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="wallet"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-12 relative z-10"
          >
            {/* Visa Virtual Card (GlobalPay) */}
            <div className="relative h-[22rem] w-full rounded-[4rem] bg-gradient-to-br from-slate-900 to-black border border-white/10 p-16 overflow-hidden shadow-tactile-premium group/card">
              <div className="absolute top-0 right-0 w-[25rem] h-[25rem] bg-cyan-500/10 blur-[120px] rounded-full -mr-40 -mt-40 group-hover/card:bg-cyan-500/20 transition-all duration-1000 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-20">
                <div className="flex items-center gap-8">
                  <div className="p-5 bg-white/5 rounded-[2rem] backdrop-blur-md border border-white/10 shadow-tactile-premium">
                    <CreditCard className="w-10 h-10 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-xl uppercase tracking-[0.2em] drop-shadow-2xl">GlobalPay Virtual</h4>
                    <p className="text-cyan-500/60 text-[11px] font-black uppercase tracking-[0.5em] mt-1">Visa Platinum</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-600 text-[11px] font-black uppercase tracking-[0.4em] mb-3 opacity-80">Available Balance</p>
                  <p className="text-4xl font-black text-white font-mono tracking-tighter drop-shadow-glow-cyan">KES 124,500.00</p>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="space-y-8">
                  <div className="flex items-center gap-8">
                    <p className="text-3xl font-black text-white font-mono tracking-[0.3em] drop-shadow-glow-cyan">
                      {showCardDetails ? "4521 8821 0092 4412" : "•••• •••• •••• 4412"}
                    </p>
                    <button 
                      onClick={() => setShowCardDetails(!showCardDetails)}
                      className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/10 shadow-tactile active:scale-90"
                    >
                      {showCardDetails ? <EyeOff className="w-6 h-6 text-slate-400" /> : <Eye className="w-6 h-6 text-slate-400" />}
                    </button>
                  </div>
                  <div className="flex gap-16">
                    <div>
                      <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.5em] mb-2">Expiry</p>
                      <p className="text-lg font-black text-white font-mono">08/28</p>
                    </div>
                    <div>
                      <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.5em] mb-2">CVV</p>
                      <p className="text-lg font-black text-white font-mono">{showCardDetails ? "442" : "•••"}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-6">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8 opacity-40 grayscale group-hover/card:grayscale-0 transition-all duration-700" />
                  <div className="flex items-center gap-3 px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full shadow-glow-emerald">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-glow-emerald" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Active Node</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet Actions */}
            <div className="grid grid-cols-2 gap-10">
              <button className="bg-slate-950/60 border border-white/5 rounded-[3rem] p-10 flex items-center gap-8 group hover:border-emerald-500/30 transition-all shadow-neumorphic active:scale-95">
                <div className="p-5 bg-slate-900 rounded-[1.5rem] shadow-tactile-premium group-hover:bg-emerald-500 group-hover:text-white transition-all border border-white/5">
                  <ArrowDownLeft className="w-8 h-8 text-emerald-500 group-hover:text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-black text-lg uppercase tracking-[0.1em] drop-shadow-2xl">Deposit</p>
                  <p className="text-slate-600 text-[11px] font-black uppercase tracking-[0.2em] mt-2 opacity-80">Via M-Pesa STK</p>
                </div>
              </button>
              <button className="bg-slate-950/60 border border-white/5 rounded-[3rem] p-10 flex items-center gap-8 group hover:border-cyan-500/30 transition-all shadow-neumorphic active:scale-95">
                <div className="p-5 bg-slate-900 rounded-[1.5rem] shadow-tactile-premium group-hover:bg-cyan-500 group-hover:text-white transition-all border border-white/5">
                  <ArrowUpRight className="w-8 h-8 text-cyan-500 group-hover:text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-black text-lg uppercase tracking-[0.1em] drop-shadow-2xl">Withdraw</p>
                  <p className="text-slate-600 text-[11px] font-black uppercase tracking-[0.2em] mt-2 opacity-80">To Bank/M-Pesa</p>
                </div>
              </button>
            </div>

            {/* Transaction History */}
            <div className="bg-slate-950/60 border border-white/5 rounded-[3.5rem] p-12 shadow-neumorphic-inset">
              <h4 className="text-2xl font-black text-white tracking-tighter uppercase tracking-[0.1em] mb-12 drop-shadow-2xl">Transaction History</h4>
              <div className="space-y-6">
                {[
                  { type: 'Deposit', amount: '+ KES 50,000', date: 'Mar 25, 2026', icon: ArrowDownLeft, color: 'text-emerald-500' },
                  { type: 'Withdraw', amount: '- KES 12,000', date: 'Mar 24, 2026', icon: ArrowUpRight, color: 'text-cyan-500' },
                  { type: 'Deposit', amount: '+ KES 35,000', date: 'Mar 22, 2026', icon: ArrowDownLeft, color: 'text-emerald-500' },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-8 bg-slate-900/40 rounded-[2.5rem] border border-white/5 shadow-neumorphic-sm">
                    <div className="flex items-center gap-8">
                      <div className={cn("p-5 rounded-[1.5rem] bg-slate-950 border border-white/5 shadow-tactile", tx.color)}>
                        <tx.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-white font-black text-sm uppercase tracking-[0.2em] mb-1.5">{tx.type}</p>
                        <p className="text-slate-600 text-[11px] font-black uppercase tracking-widest opacity-80">{tx.date}</p>
                      </div>
                    </div>
                    <p className={cn("text-lg font-black font-mono tracking-tighter", tx.color)}>{tx.amount}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* M-Pesa STK Push Status */}
            <div className="bg-slate-950/60 border border-white/5 rounded-[3.5rem] p-12 shadow-neumorphic-inset">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-8">
                  <div className="p-5 bg-slate-900 rounded-[2rem] shadow-tactile-premium border border-white/5">
                    <Smartphone className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-white tracking-tighter uppercase tracking-[0.1em] drop-shadow-2xl">STK Push Protocol</h4>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mt-2 opacity-80">Real-time Transaction Monitoring</p>
                  </div>
                </div>
                <button className="p-4 bg-slate-900 rounded-2xl hover:bg-slate-800 transition-all border border-white/5 shadow-tactile group active:scale-90">
                  <RefreshCw className="w-6 h-6 text-slate-700 group-hover:rotate-180 transition-transform duration-700 group-hover:text-emerald-500" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between p-8 bg-slate-900/40 rounded-[2.5rem] border border-white/5 shadow-neumorphic-sm group/item hover:bg-slate-900/60 transition-all duration-500">
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-tactile">
                      <Fingerprint className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-white font-black text-sm uppercase tracking-[0.2em] mb-1.5 drop-shadow-2xl">Authentication</p>
                      <p className="text-slate-600 text-[11px] font-black uppercase tracking-widest opacity-80">Waiting for PIN confirmation...</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-amber-500 animate-pulse shadow-glow-amber" />
                </div>

                <div className="flex items-center justify-between p-8 bg-slate-900/40 rounded-[2.5rem] border border-white/5 opacity-40 grayscale group/item">
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center border border-white/5 shadow-tactile">
                      <Zap className="w-8 h-8 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-white font-black text-sm uppercase tracking-[0.2em] mb-1.5">Settlement</p>
                      <p className="text-slate-600 text-[11px] font-black uppercase tracking-widest opacity-80">Pending Auth Completion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
