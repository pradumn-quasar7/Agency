import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ClipboardList, Lightbulb, BadgeDollarSign, Rocket } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    num: '01',
    title: 'Apply',
    description:
      'Fill out a quick form with your niche, handles, and goals. No follower minimum — we look for potential, not just numbers.',
  },
  {
    icon: Lightbulb,
    num: '02',
    title: 'Get Strategy',
    description:
      'We craft a custom growth and monetization roadmap tailored to your audience, content style, and niche.',
  },
  {
    icon: BadgeDollarSign,
    num: '03',
    title: 'Land Deals',
    description:
      'We pitch you to relevant brands, negotiate the best rates, and manage the full campaign from brief to payment.',
  },
  {
    icon: Rocket,
    num: '04',
    title: 'Grow & Scale',
    description:
      'As your audience grows, so do your deal values. We scale with you from micro to macro — every step of the way.',
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(198,169,107,0.04) 0%, transparent 60%)',
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
          <span className="badge mb-5 inline-flex">The Process</span>
          <h2
            className="font-black tracking-tight text-[#F5F5F5] mb-3"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
          >
            How It <span className="gold-text">Works</span>
          </h2>
          <p className="text-[#F5F5F5]/50 mx-auto" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', maxWidth: '32rem' }}>
            Four clear steps from creator to earning creator. Simple, transparent, results-driven.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: i * 0.11, ease: 'easeOut' }}
                className="glass card-hover p-6 flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Step connector on desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-9 -right-2.5 w-5 h-px bg-[#C6A96B]/25 z-10" />
                )}

                {/* Number + Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#C6A96B]/10 flex items-center justify-center">
                    <Icon size={20} className="text-[#C6A96B]" />
                  </div>
                  <span className="text-[#C6A96B]/18 text-3xl font-black tabular-nums">{step.num}</span>
                </div>

                <div>
                  <h3 className="text-[#F5F5F5] font-black text-lg mb-1.5">{step.title}</h3>
                  <p className="text-[#F5F5F5]/48 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="text-center mt-10"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 text-sm"
          >
            Start the Process
          </button>
        </motion.div>
      </div>
    </section>
  );
}
