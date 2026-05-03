import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, UserCheck, ShieldCheck, Target, ArrowRight } from 'lucide-react';

const reasons = [
  {
    icon: GraduationCap,
    title: 'College Niche Specialists',
    description:
      'We understand the college creator ecosystem better than anyone. Your audience, content, and constraints — we get it.',
  },
  {
    icon: UserCheck,
    title: 'Personalized Growth',
    description:
      'No cookie-cutter strategies. Every creator gets a custom roadmap built around their unique voice, niche, and goals.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Upfront Fees',
    description:
      'We invest in you first. Our model is fully performance-based — we only succeed when you do. Zero risk.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description:
      'We track everything — follower growth, engagement, deal values. Every metric is optimised for maximum impact.',
  },
];

export default function WhyUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="why-us" className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(198,169,107,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="badge mb-6 inline-flex">Why Choose Us</span>

            <h2
              className="font-black tracking-tight text-[#F5F5F5] mb-5 leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
            >
              Built for{' '}
              <span className="gold-text">Creators Like You</span>
            </h2>

            <p className="text-[#F5F5F5]/50 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              We're not a generic agency. We're a specialised partner for college
              creators ready to turn their passion into income — without compromising
              their authenticity.
            </p>

            <button
              onClick={() =>
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 text-sm"
            >
              Start Your Journey
              <ArrowRight size={15} />
            </button>

            <p className="text-[#F5F5F5]/22 text-xs mt-4 tracking-wider">
              Find Creators · Build Tribes · Grow Brands
            </p>
          </motion.div>

          {/* Right: 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
                  className="glass card-hover p-5 sm:p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C6A96B]/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#C6A96B]" />
                  </div>
                  <h3 className="text-[#F5F5F5] font-bold text-sm sm:text-base mb-2">
                    {r.title}
                  </h3>
                  <p className="text-[#F5F5F5]/45 text-xs sm:text-sm leading-relaxed">
                    {r.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
