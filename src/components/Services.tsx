import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Zap, PenTool, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: TrendingUp,
    num: '01',
    title: 'Creator Growth',
    description:
      'Personalized growth strategies tailored to your niche, content style, and college audience. We analyze what works and scale it systematically.',
    features: ['Audience analysis', 'Content calendar', 'Niche positioning', 'Growth hacking'],
    featured: false,
  },
  {
    icon: Zap,
    num: '02',
    title: 'Brand Deals',
    description:
      'We connect you with brands that match your values. No cold outreach — we handle negotiation, contracts, and delivery end-to-end.',
    features: ['Brand matching', 'Contract negotiation', 'Campaign management', 'Performance tracking'],
    featured: true,
  },
  {
    icon: PenTool,
    num: '03',
    title: 'Content Strategy',
    description:
      'Data-driven strategy that turns views into followers and followers into loyal fans. Post with purpose, not just frequency.',
    features: ['Viral content systems', 'Hook writing', 'Platform optimization', 'Analytics review'],
    featured: false,
  },
];

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(198,169,107,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="badge mb-5 inline-flex">What We Do</span>
          <h2
            className="font-black tracking-tight text-[#F5F5F5] mb-3"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
          >
            Everything You Need to{' '}
            <span className="gold-text">Grow & Earn</span>
          </h2>
          <p className="text-[#F5F5F5]/50 mx-auto" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', maxWidth: '34rem' }}>
            From strategy to paid deals — we handle the business side so you can focus on creating.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.13, ease: 'easeOut' }}
                className={`glass card-hover flex flex-col p-6 sm:p-7 relative overflow-hidden ${
                  svc.featured ? 'border !border-[#C6A96B]/30' : ''
                }`}
              >
                {svc.featured && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#C6A96B] text-[#0B0B0B] text-[10px] font-bold tracking-wide">
                    Most Popular
                  </div>
                )}

                {/* Icon row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#C6A96B]/10 flex items-center justify-center">
                    <Icon size={22} className="text-[#C6A96B]" />
                  </div>
                  <span className="text-[#C6A96B]/20 text-3xl font-black tabular-nums">{svc.num}</span>
                </div>

                <h3 className="text-[#F5F5F5] font-black text-xl mb-2.5">{svc.title}</h3>
                <p className="text-[#F5F5F5]/48 text-sm leading-relaxed mb-5">{svc.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {svc.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2.5 text-sm text-[#F5F5F5]/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C6A96B] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-1.5 text-[#C6A96B] text-sm font-semibold mt-auto group/link w-fit"
                >
                  Get Started
                  <ArrowUpRight
                    size={15}
                    className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                  />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

