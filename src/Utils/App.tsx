import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import WhyUs from './components/WhyUs';
import CTABanner from './components/CTABanner';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import AdminPanel from './components/AdminPanel';

const HR = () => (
  <div className="max-w-6xl mx-auto px-5 sm:px-8">
    <div className="divider" />
  </div>
);

function isAdminRoute() {
  return window.location.hash === '#/admin' || window.location.search.includes('admin=1');
}

export default function App() {
  const [admin, setAdmin] = useState(isAdminRoute);

  // URL hash navigation: navigate to /#/admin to open
  useEffect(() => {
    const fn = () => setAdmin(isAdminRoute());
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);

  // Keyboard shortcut: Ctrl + Shift + A
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setAdmin((p) => {
          if (!p) window.location.hash = '#/admin';
          else window.location.hash = '';
          return !p;
        });
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const closeAdmin = () => {
    window.location.hash = '';
    setAdmin(false);
  };

  return (
    <>
      {/* Main site */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-[#0B0B0B] noise"
      >
        <Cursor />
        <Navbar />

        <main>
          <Hero />
          <HR />
          <SocialProof />
          <HR />
          <Services />
          <HR />
          <HowItWorks />
          <HR />
          <WhyUs />
          <CTABanner />
          <HR />
          <ContactSection />
        </main>

        <Footer />
        <FloatingCTA />
      </motion.div>

      {/* Admin panel overlay */}
      <AnimatePresence>
        {admin && <AdminPanel key="admin" onClose={closeAdmin} />}
      </AnimatePresence>
    </>
  );
}
