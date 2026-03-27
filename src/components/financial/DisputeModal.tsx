import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, Upload } from 'lucide-react';

export const DisputeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [photos, setPhotos] = useState<File[]>([]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]" />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-white/10 rounded-t-[3rem] p-8 z-[201] max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-white">Report Spoiled Batch</h3>
              <button onClick={onClose} className="p-2 bg-slate-800 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-slate-500 text-sm mb-8">Upload 3 photos of the spoiled batch to pause Escrow payments and initiate a dispute.</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-2">
                  <Camera className="w-6 h-6 text-slate-600" />
                  <span className="text-[10px] font-black text-slate-600 uppercase">Photo {i}</span>
                </div>
              ))}
            </div>
            <button className="w-full bg-rose-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest">
              Submit Evidence
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
