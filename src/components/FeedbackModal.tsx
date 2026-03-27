import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Bug, Lightbulb, Send, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

type FeedbackType = 'bug' | 'feature' | 'general';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const [type, setType] = useState<FeedbackType>('general');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/v1/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          comment,
          userEmail: 'olivercheruiyot09@gmail.com' // Mocked user email
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setComment('');
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            className="relative w-full max-w-lg bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
            
            {isSuccess ? (
              <div className="p-16 text-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-glow-emerald"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </motion.div>
                <h3 className="text-3xl font-black text-white tracking-tighter mb-3">Transmission Successful</h3>
                <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em]">Thank you for helping us grow AgriConnect.</p>
              </div>
            ) : (
              <>
                <div className="p-10 border-b border-white/5 flex items-center justify-between bg-slate-950/20 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-glow-emerald">
                      <MessageSquare className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tighter">Node Feedback</h3>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Direct System Communication</p>
                    </div>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-3 bg-slate-900 border border-white/5 rounded-2xl text-slate-500 hover:text-white transition-all shadow-neumorphic active:scale-90"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-10 relative z-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] ml-2">Feedback Protocol</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'general', icon: MessageSquare, label: 'General' },
                        { id: 'bug', icon: Bug, label: 'Bug' },
                        { id: 'feature', icon: Lightbulb, label: 'Feature' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setType(item.id as FeedbackType)}
                          className={cn(
                            "flex flex-col items-center gap-3 p-5 rounded-[1.5rem] border transition-all duration-500 shadow-neumorphic active:scale-95",
                            type === item.id 
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-glow-emerald" 
                              : "bg-slate-950/50 border-white/5 text-slate-600 hover:text-slate-400"
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end px-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Transmission Data</label>
                      <span className={cn(
                        "text-[9px] font-black font-mono tracking-widest",
                        comment.length >= 450 ? "text-amber-500" : "text-slate-700"
                      )}>
                        {comment.length} / 500
                      </span>
                    </div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      maxLength={500}
                      placeholder="Initialize transmission..."
                      className="w-full h-40 bg-slate-950/50 border border-white/5 rounded-[2rem] p-6 text-white placeholder:text-slate-800 focus:outline-none focus:border-emerald-500/30 focus:shadow-glow-emerald transition-all resize-none shadow-neumorphic-inset-sm text-sm font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !comment.trim()}
                    className="w-full py-6 bg-emerald-600 text-white rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.4em] shadow-glow-emerald hover:bg-emerald-500 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center gap-4 border border-emerald-400/30"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin shadow-glow-emerald" />
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Initialize Submission
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
