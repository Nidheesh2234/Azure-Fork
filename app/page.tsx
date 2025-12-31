'use client';

import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { MenuHighlights } from '@/components/sections/MenuHighlights';
import { Specials } from '@/components/sections/Specials';
import { About } from '@/components/sections/About';
import { Gallery } from '@/components/sections/Gallery';
import { Reviews } from '@/components/sections/Reviews';
import { Catering } from '@/components/sections/Catering';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen bg-background relative selection:bg-azure-200 selection:text-navy-900">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-azure-400 to-coral z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <Hero />
      <About />
      <Specials />
      <MenuHighlights />
      <Catering />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
