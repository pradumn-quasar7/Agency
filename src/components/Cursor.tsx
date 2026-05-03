import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
    setIsMobile(mobile);
    if (mobile) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!(t.closest('a') || t.closest('button') || t.tagName === 'A' || t.tagName === 'BUTTON'));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [visible]);

  useEffect(() => {
    if (!isMobile) {
      document.body.style.cursor = 'none';
      return () => { document.body.style.cursor = ''; };
    }
  }, [isMobile]);

  if (isMobile || !visible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        animate={{ x: pos.x - 5, y: pos.y - 5, scale: hover ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 900, damping: 38, mass: 0.4 }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#C6A96B]" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        animate={{ x: pos.x - 18, y: pos.y - 18, scale: hover ? 1.7 : 1 }}
        transition={{ type: 'spring', stiffness: 210, damping: 24, mass: 0.7 }}
      >
        <div
          className={`w-9 h-9 rounded-full border transition-all duration-200 ${
            hover ? 'border-[#C6A96B] bg-[#C6A96B]/10' : 'border-[#C6A96B]/50'
          }`}
        />
      </motion.div>
    </>
  );
}
