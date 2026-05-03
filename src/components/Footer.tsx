import { Mail, ExternalLink } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
];

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative pt-16 pb-8 border-t border-[#C6A96B]/8 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(198,169,107,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#C6A96B]/10 flex items-center justify-center">
                <span className="text-[#C6A96B] font-black text-sm leading-none">TH</span>
              </div>
              <span className="text-[#F5F5F5] font-bold text-base">
                TRIBE<span className="text-[#C6A96B]">HUNT</span>
              </span>
            </div>
            <p className="text-[#F5F5F5]/38 text-xs leading-relaxed mb-4 max-w-[200px]">
              Helping college creators land paid brand deals and build sustainable creator careers.
            </p>
            <p className="text-[#C6A96B]/45 text-[10px] tracking-widest uppercase font-medium">
              Find · Build · Grow
            </p>
          </div>

          {/* Nav */}
          <div>
            <h5 className="text-[#F5F5F5]/55 text-[10px] uppercase tracking-widest font-bold mb-4">
              Navigation
            </h5>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => go(l.href)}
                    className="text-[#F5F5F5]/40 hover:text-[#C6A96B] text-sm transition-colors duration-200 text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-2">
            <h5 className="text-[#F5F5F5]/55 text-[10px] uppercase tracking-widest font-bold mb-4">
              Connect
            </h5>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:tribehunt421@gmail.com"
                className="flex items-center gap-2.5 text-[#F5F5F5]/42 hover:text-[#C6A96B] text-sm transition-colors duration-200 group"
              >
                <Mail size={14} className="text-[#C6A96B]/45 group-hover:text-[#C6A96B] flex-shrink-0 transition-colors" />
                tribehunt421@gmail.com
              </a>
              <a
                href="https://www.instagram.com/tribehunt.creators/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#F5F5F5]/42 hover:text-[#C6A96B] text-sm transition-colors duration-200 group"
              >
                <span className="text-[#C6A96B]/45 group-hover:text-[#C6A96B] flex-shrink-0 transition-colors">
                  <InstagramIcon />
                </span>
                @tribehunt.creators
                <ExternalLink size={10} className="opacity-0 group-hover:opacity-60 transition-opacity" />
              </a>
              <a
                href="https://www.linkedin.com/in/tribe-hunt-101780407/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#F5F5F5]/42 hover:text-[#C6A96B] text-sm transition-colors duration-200 group"
              >
                <span className="text-[#C6A96B]/45 group-hover:text-[#C6A96B] flex-shrink-0 transition-colors">
                  <LinkedInIcon />
                </span>
                TribeHunt · LinkedIn
                <ExternalLink size={10} className="opacity-0 group-hover:opacity-60 transition-opacity" />
              </a>
            </div>

            {/* Social icon row */}
            <div className="flex gap-2.5 mt-5">
              {[
                { href: 'https://www.instagram.com/tribehunt.creators/', Icon: InstagramIcon },
                { href: 'https://www.linkedin.com/in/tribe-hunt-101780407/', Icon: LinkedInIcon },
              ].map(({ href, Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 glass flex items-center justify-center text-[#F5F5F5]/40 hover:text-[#C6A96B] hover:border-[#C6A96B]/28 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
              <a
                href="mailto:tribehunt421@gmail.com"
                className="w-9 h-9 glass flex items-center justify-center text-[#F5F5F5]/40 hover:text-[#C6A96B] hover:border-[#C6A96B]/28 transition-all duration-200"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[#F5F5F5]/25 text-xs">
          <p>© {new Date().getFullYear()} TribeHunt. All rights reserved.</p>
          <p className="text-[#C6A96B]/35">Built for creators. By creators. ✦</p>
        </div>
      </div>
    </footer>
  );
}
