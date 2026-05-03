import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingCTA() {
  const [show, setShow] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const fn = () => {
      if (!gone) setShow(window.scrollY > 380);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [gone]);

  if (gone) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className="fixed bottom-5 right-4 z-40 md:hidden flex items-center gap-2"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold flex items-center gap-2 px-5 py-3 text-sm shadow-xl shadow-[#C6A96B]/25"
          >
            <MessageCircle size={15} />
            Get Started
          </button>
          <button
            onClick={() => { setShow(false); setGone(true); }}
            className="w-8 h-8 rounded-full bg-[#161616] border border-[#C6A96B]/15 flex items-center justify-center text-[#F5F5F5]/40 hover:text-[#F5F5F5]/70 transition-colors"
          >
            <X size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
