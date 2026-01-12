'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useReservation } from '@/components/ReservationContext';

export function Hero() {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const { openReservation } = useReservation();

    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    const scrollToMenu = () => {
        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section ref={ref} className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-navy-950 text-white selection:bg-azure-500/30">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),rgba(2,6,23,0)_70%)]" />
                <div className="absolute bottom-0 right-0 w-[80vw] h-[80vh] bg-azure-900/10 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-4 md:px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Content (7 cols) - Breaking the 50/50 symmetry */}
                    <div className="lg:col-span-7 relative z-20 pt-20 lg:pt-0">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="h-px w-12 bg-azure-400/50" />
                                <span className="text-azure-300 font-medium tracking-widest text-sm uppercase">Est. 2024 • Visakhapatnam</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium leading-[0.9] tracking-tight mb-8">
                                <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">Coastal</span>
                                <span className="block ml-4 md:ml-16 italic text-azure-200/90 font-light">Soul.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-azure-100/60 max-w-xl font-light leading-relaxed mb-10 ml-2">
                                Where the fiery spirit of Andhra meets the gentle bounty of the Bay.
                                A culinary journey reimagined for the modern soul.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 ml-2">
                                <Button
                                    size="lg"
                                    className="bg-white text-navy-950 hover:bg-azure-50 rounded-full px-8 py-7 text-lg font-medium transition-all hover:scale-105"
                                    onClick={openReservation}
                                >
                                    Book a Table
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-7 text-lg group"
                                    onClick={scrollToMenu}
                                >
                                    Explore Menu <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content (5 cols) - Asymmetrical Layout */}
                    <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] flex items-center justify-center lg:justify-end">
                        {/* Abstract Shapes behind image */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute right-0 w-[400px] h-[400px] border border-white/5 rounded-full z-0"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute right-10 w-[300px] h-[300px] border border-dashed border-white/5 rounded-full z-0"
                        />

                        {/* Main Image with Parallax Glitch Effect */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative w-full max-w-[400px] aspect-[3/4] rounded-full lg:rounded-[100px] overflow-hidden shadow-2xl shadow-azure-900/40 z-10"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1579631542720-3a87824fff86?q=80&w=1200&auto=format&fit=crop"
                                alt="Signature Seafood"
                                fill
                                className="object-cover scale-110"
                                priority
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                            {/* Floating Element inside Image */}
                            <div className="absolute bottom-10 left-0 right-0 text-center">
                                <p className="font-serif text-3xl italic text-white drop-shadow-md">"Taste the tide"</p>
                            </div>
                        </motion.div>

                        {/* Floating Small Image */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="absolute -bottom-10 -left-10 md:bottom-20 md:-left-20 w-48 h-48 rounded-full border-4 border-navy-950 overflow-hidden shadow-xl z-20 hidden md:block"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop"
                                alt="Fresh Ingredients"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-8 hidden md:flex items-center gap-4 text-white/30 z-20"
            >
                <div className="h-px w-20 bg-white/20" />
                <span className="text-xs tracking-widest uppercase">Scroll</span>
            </motion.div>
        </section>
    );
}
