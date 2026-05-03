import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, open ? 260 : 0);
  };

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-[#0B0B0B]/82 backdrop-blur-xl border-b border-[#C6A96B]/8 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">
        {/* Logo */}
        <button
          onClick={() => go('#hero')}
          className="flex items-center gap-2.5 flex-shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-[#C6A96B]/10 flex items-center justify-center">
            <span className="text-[#C6A96B] font-black text-sm leading-none">TH</span>
          </div>
          <span className="text-[#F5F5F5] font-bold text-base tracking-wide">
            TRIBE<span className="text-[#C6A96B]">HUNT</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => go(l.href)}
              className="text-[#F5F5F5]/55 hover:text-[#C6A96B] text-sm font-medium transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C6A96B] group-hover:w-full transition-all duration-250" />
            </button>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={() => go('#contact')}
            className="btn-outline text-xs px-4 py-2.5"
          >
            Join as Creator
          </button>
          <button
            onClick={() => go('#contact')}
            className="btn-gold text-xs px-4 py-2.5"
          >
            Work with Us
          </button>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 rounded-lg border border-[#C6A96B]/18 flex items-center justify-center text-[#F5F5F5]/70 hover:border-[#C6A96B]/35 transition-colors"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#0B0B0B]/96 backdrop-blur-xl border-t border-[#C6A96B]/8"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.button
                  key={l.label}
                  onClick={() => go(l.href)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-left text-[#F5F5F5]/65 hover:text-[#C6A96B] text-sm font-medium py-3 border-b border-white/5 transition-colors"
                >
                  {l.label}
                </motion.button>
              ))}
              <div className="flex flex-col gap-2.5 pt-4">
                <button
                  onClick={() => go('#contact')}
                  className="btn-outline text-sm py-3 w-full"
                >
                  Join as Creator
                </button>
                <button
                  onClick={() => go('#contact')}
                  className="btn-gold text-sm py-3 w-full"
                >
                  Work with Us
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
