'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useReservation } from '@/components/ReservationContext';

export function Hero() {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const { openReservation } = useReservation();

    // Parallax transforms
    const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);
    const contentY = useTransform(scrollY, [0, 500], [0, 50]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const scrollToMenu = () => {
        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-navy-900 text-white">

            {/* Layer 1: Animated Background Mesh */}
            <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#020c1b]/80 z-10" />

                {/* Gradient Blobs */}
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vh] bg-azure-600/20 rounded-full blur-[120px] animate-pulse duration-[5000ms]" />
                <div className="absolute top-[30%] -right-[10%] w-[60vw] h-[60vh] bg-indigo-600/20 rounded-full blur-[150px] animate-pulse duration-[7000ms]" />
                <div className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vh] bg-teal-600/10 rounded-full blur-[100px]" />

                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 mix-blend-soft-light filter contrast-150" />
            </motion.div>

            {/* Layer 2: Floating Particles (Simulating sea motes) */}
            <div className="absolute inset-0 z-1 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/10 rounded-full blur-[1px]"
                        style={{
                            width: Math.random() * 6 + 2 + "px",
                            height: Math.random() * 6 + 2 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Layer 3: Main Content */}
            <motion.div
                style={{ y: contentY, opacity }}
                className="relative z-20 container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12 pt-20"
            >
                <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-3 justify-center lg:justify-start"
                    >
                        <Badge variant="azure" className="text-sm px-3 py-1">Fresh Catch Daily</Badge>
                        <Badge variant="outline" className="text-gray-300 border-white/10 text-sm px-3 py-1">Est. 2024</Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight"
                    >
                        <div>Seafood, <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure-300 to-teal-200">Perfected.</span></div>
                        <div className="mt-2">Andhra Flavours, <div className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-coral to-orange-300">Elevated.</div></div>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-light"
                    >
                        Dive into a culinary journey where the freshness of the coast meets the fiery soul of Andhra Pradesh.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                    >
                        <Button size="lg" variant="azure" className="text-lg px-8 h-12 shadow-[0_0_30px_-10px_rgba(14,165,233,0.5)]" onClick={openReservation}>Book a Table</Button>
                        <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/5 hover:text-white text-lg px-8 h-12" onClick={scrollToMenu}>View Full Menu</Button>
                    </motion.div>
                </div>

                <div className="lg:w-1/2 relative perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative w-full max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group"
                    >
                        <div className="absolute inset-0 bg-azure-500/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                        <Image
                            src="https://images.unsplash.com/photo-1579631542720-3a87824fff86?q=80&w=1200&auto=format&fit=crop"
                            alt="Signature Seafood Platter"
                            fill
                            className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                            priority
                        />

                        {/* Floating Card Overlay */}
                        <div className="absolute bottom-6 right-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl max-w-[200px] hidden md:block">
                            <p className="text-xs text-azure-200 uppercase tracking-widest font-semibold mb-1">Chef's Pick</p>
                            <p className="text-sm font-bold text-white">Vizag 'Beach Rd' Chilli Prawns</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2 cursor-pointer z-20"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll to Discover</span>
                <ChevronDown className="w-5 h-5" />
            </motion.div>
        </section>
    )
}
