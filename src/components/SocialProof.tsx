import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Handshake, Star, Users } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50+',
    label: 'Active Creators',
    description: 'College creators growing their audience with TribeHunt',
  },
  {
    icon: Handshake,
    value: '100+',
    label: 'Brand Deals',
    description: 'Successful partnerships secured for our creator network',
  },
  {
    icon: TrendingUp,
    value: '3x',
    label: 'Avg. Growth',
    description: 'Average follower growth within first 3 months',
  },
  {
    icon: Star,
    value: '$0',
    label: 'Upfront Fees',
    description: 'We only win when you win — zero risk for creators',
  },
];

export default function SocialProof() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(198,169,107,0.045) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="badge mb-5 inline-flex">Social Proof</span>
          <h2
            className="font-black tracking-tight text-[#F5F5F5] mb-3"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
          >
            Trusted by Growing{' '}
            <span className="gold-text">College Creators</span>
          </h2>
          <p className="text-[#F5F5F5]/50 mx-auto" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', maxWidth: '32rem' }}>
            We're building the most creator-focused agency for the next generation of digital talent.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
                className="glass card-hover p-5 sm:p-6 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C6A96B]/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#C6A96B]" />
                </div>
                <div>
                  <div
                    className="font-black text-[#C6A96B] leading-none mb-1"
                    style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[#F5F5F5] font-semibold text-sm mb-1">{stat.label}</div>
                  <div className="text-[#F5F5F5]/42 text-xs leading-snug">{stat.description}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="glass card-hover p-5 sm:p-7"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatars */}
            <div className="flex -space-x-2.5 flex-shrink-0">
              {['A', 'B', 'C', 'D'].map((l, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#0B0B0B] flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: `linear-gradient(135deg, rgba(198,169,107,${0.55 + i * 0.12}), rgba(198,169,107,0.25))`,
                    color: '#0B0B0B',
                  }}
                >
                  {l}
                </div>
              ))}
            </div>

            {/* Quote */}
            <p className="text-[#F5F5F5]/65 text-sm leading-relaxed flex-1 italic">
              "TribeHunt helped me land my first brand deal with just 8K followers. They
              understood the college creator space like no one else."
            </p>

            {/* Stars */}
            <div className="flex gap-1 flex-shrink-0">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={13} fill="#C6A96B" className="text-[#C6A96B]" />
              ))}
            </div>
          </div>
          <div className="mt-3 text-[#C6A96B] text-xs font-semibold ml-0 sm:ml-[4.5rem]">
            — College Creator, Mumbai
          </div>
        </motion.div>
      </div>
    </section>
  );
}
