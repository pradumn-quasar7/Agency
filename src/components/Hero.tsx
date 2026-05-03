import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const PARTICLE_COUNT = 50;

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.35 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198,169,107,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(198,169,107,${0.05 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };

    draw();
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.65 }} />;
}

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.18 + i * 0.14, ease: 'easeOut' as const },
});

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* BG layers */}
      <div className="absolute inset-0 bg-[#0B0B0B]">
        <div
          className="absolute inset-0 animate-glow-pulse"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(198,169,107,0.07) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80"
          style={{
            background:
              'radial-gradient(circle, rgba(198,169,107,0.04) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-72 h-72"
          style={{
            background:
              'radial-gradient(circle, rgba(198,169,107,0.04) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(198,169,107,1) 1px, transparent 1px), linear-gradient(90deg, rgba(198,169,107,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 text-center pt-28 pb-20">
        {/* Badge */}
        <motion.div {...stagger(0)} className="flex justify-center mb-7">
          <span className="badge">
            <Sparkles size={12} />
            Creator Agency · College Focused
          </span>
        </motion.div>

        {/* Headline — fluid, never wraps awkwardly */}
        <motion.h1
          {...stagger(1)}
          className="font-black tracking-tight leading-[1.05] mb-5"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}
        >
          <span className="text-[#F5F5F5]">Helping College</span>
          <br />
          <span className="gold-text">Creators Get Paid</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...stagger(2)}
          className="text-[#F5F5F5]/55 leading-relaxed mb-9 mx-auto"
          style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)', maxWidth: '38rem' }}
        >
          We turn small creators into earning creators through brand deals and
          growth strategy.{' '}
          <span className="text-[#C6A96B]/75">
            Find Creators. Build Tribes. Grow Brands.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...stagger(3)}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <button
            onClick={() => scrollTo('#contact')}
            className="btn-gold flex items-center gap-2 px-7 py-3.5 text-sm font-bold w-full sm:w-auto justify-center"
          >
            Join as Creator
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="btn-outline flex items-center gap-2 px-7 py-3.5 text-sm w-full sm:w-auto justify-center"
          >
            Work with Us
            <ArrowRight size={15} />
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-14 flex items-center justify-center gap-10 sm:gap-16"
        >
          {[
            { value: '50+', label: 'Creators' },
            { value: '100+', label: 'Brand Deals' },
            { value: '$0', label: 'Upfront Fees' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="font-black text-[#C6A96B] leading-none"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}
              >
                {s.value}
              </div>
              <div className="text-[#F5F5F5]/38 text-xs tracking-widest uppercase mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[#F5F5F5]/22 text-[10px] tracking-[0.2em] uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#C6A96B]/35 to-transparent"
        />
      </motion.div>
    </section>
  );
}
