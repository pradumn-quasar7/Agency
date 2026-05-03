import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, AlertCircle, Loader, Mail, ExternalLink } from 'lucide-react';
import { saveLead } from '../store/leads';

interface FormData {
  name: string;
  email: string;
  instagram: string;
  type: string;
  message: string;
}

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const [form, setForm] = useState<FormData>({ name: '', email: '', instagram: '', type: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.instagram.trim()) e.instagram = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    // Simulate slight network delay for UX
    await new Promise((r) => setTimeout(r, 900));
    saveLead({
      name: form.name.trim(),
      email: form.email.trim(),
      instagram: form.instagram.trim().replace(/^@/, ''),
      type: form.type || 'creator',
      message: form.message.trim(),
    });
    setStatus('success');
    setForm({ name: '', email: '', instagram: '', type: '', message: '' });
    setTimeout(() => setStatus('idle'), 6000);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const base =
    'w-full bg-[#0d0d0d] border rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder-[#F5F5F5]/22 focus:outline-none transition-colors duration-200';
  const field = (f: keyof FormData) =>
    `${base} ${errors[f] ? 'border-red-500/40 focus:border-red-500/65' : 'border-[#C6A96B]/12 focus:border-[#C6A96B]/42'}`;

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(198,169,107,0.05) 0%, transparent 65%)' }}
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
          <span className="badge mb-5 inline-flex">Get Started</span>
          <h2 className="font-black tracking-tight text-[#F5F5F5] mb-3"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}>
            Ready to Start <span className="gold-text">Earning?</span>
          </h2>
          <p className="text-[#F5F5F5]/50 mx-auto"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', maxWidth: '32rem' }}>
            Drop us a message and we'll get back to you within 24 hours. No fluff, just results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="glass p-6 sm:p-7">
              <h3 className="text-[#F5F5F5] font-bold text-lg mb-2">Let's Talk</h3>
              <p className="text-[#F5F5F5]/48 text-sm leading-relaxed">
                Whether you have 500 or 50K followers — if you're serious about monetising your content, we want to hear from you.
              </p>
            </div>

            <a href="mailto:tribehunt421@gmail.com"
              className="glass card-hover flex items-center gap-4 p-5">
              <div className="w-9 h-9 rounded-lg bg-[#C6A96B]/10 flex items-center justify-center flex-shrink-0">
                <Mail size={15} className="text-[#C6A96B]" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-[#F5F5F5]/38 uppercase tracking-wider mb-0.5">Email</div>
                <div className="text-[#F5F5F5] text-sm font-medium truncate">tribehunt421@gmail.com</div>
              </div>
            </a>

            <a href="https://www.instagram.com/tribehunt.creators/" target="_blank" rel="noopener noreferrer"
              className="glass card-hover flex items-center gap-4 p-5">
              <div className="w-9 h-9 rounded-lg bg-[#C6A96B]/10 flex items-center justify-center flex-shrink-0 text-[#C6A96B]">
                <InstagramIcon />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-[#F5F5F5]/38 uppercase tracking-wider mb-0.5">Instagram</div>
                <div className="text-[#F5F5F5] text-sm font-medium">@tribehunt.creators</div>
              </div>
              <ExternalLink size={13} className="text-[#C6A96B]/40 flex-shrink-0" />
            </a>

            <div className="glass p-5 border !border-[#C6A96B]/15">
              <div className="text-[#C6A96B] font-bold text-xs uppercase tracking-wider mb-2">Our Promise</div>
              <p className="text-[#F5F5F5]/45 text-xs leading-relaxed">
                Zero upfront fees. Results-based model. We succeed only when you do.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="lg:col-span-3 glass p-6 sm:p-8 border !border-[#C6A96B]/12 relative overflow-hidden"
          >
            <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(198,169,107,0.06) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 flex flex-col gap-4">
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-[#F5F5F5]/42 uppercase tracking-wider mb-1.5 font-semibold">Full Name *</label>
                  <input name="name" value={form.name} onChange={onChange}
                    placeholder="Your name" className={field('name')} />
                  {errors.name && <p className="text-red-400/80 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-[10px] text-[#F5F5F5]/42 uppercase tracking-wider mb-1.5 font-semibold">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={onChange}
                    placeholder="you@email.com" className={field('email')} />
                  {errors.email && <p className="text-red-400/80 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.email}</p>}
                </div>
              </div>

              {/* Row 2: Instagram + Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-[#F5F5F5]/42 uppercase tracking-wider mb-1.5 font-semibold">Instagram Handle *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C6A96B]/50 text-sm select-none">@</span>
                    <input name="instagram" value={form.instagram} onChange={onChange}
                      placeholder="yourhandle" className={`${field('instagram')} pl-8`} />
                  </div>
                  {errors.instagram && <p className="text-red-400/80 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.instagram}</p>}
                </div>
                <div>
                  <label className="block text-[10px] text-[#F5F5F5]/42 uppercase tracking-wider mb-1.5 font-semibold">I am a…</label>
                  <select name="type" value={form.type} onChange={onChange}
                    className={`${base} border-[#C6A96B]/12 focus:border-[#C6A96B]/42`}
                    style={{ color: form.type ? '#F5F5F5' : 'rgba(245,245,245,0.22)' }}>
                    <option value="" disabled>Select type</option>
                    <option value="creator" style={{ color: '#F5F5F5', background: '#111' }}>College Creator</option>
                    <option value="brand" style={{ color: '#F5F5F5', background: '#111' }}>Brand / Agency</option>
                    <option value="other" style={{ color: '#F5F5F5', background: '#111' }}>Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] text-[#F5F5F5]/42 uppercase tracking-wider mb-1.5 font-semibold">Message *</label>
                <textarea name="message" value={form.message} onChange={onChange} rows={4}
                  placeholder="Tell us about yourself, your niche, and what you want to achieve..."
                  className={`${field('message')} resize-none`} />
                {errors.message && <p className="text-red-400/80 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-60 ${
                  status === 'success'
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 cursor-default'
                    : 'btn-gold'
                }`}
              >
                {status === 'loading' && <><Loader size={15} className="animate-spin" />Sending…</>}
                {status === 'success' && <><CheckCircle size={15} />Sent! We'll reach out within 24 hrs.</>}
                {status === 'idle' && <><Send size={15} />Send Message</>}
              </button>

              <p className="text-center text-[#F5F5F5]/22 text-xs">We reply within 24 hours · No spam, ever.</p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
