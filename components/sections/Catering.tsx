'use client';

import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const CATERING_FEATURES = [
    "Customized Menus for Every Occasion",
    "Live Counters (Dosa, Grill, Fry Stations)",
    "Professional Service Staff",
    "Hygiene & Quality Assured",
    "Zero-Plastic Eco-Friendly Cutlery",
];

export function Catering() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <Section id="catering" className="bg-azure-900 text-white relative py-32 overflow-hidden">

            {/* Parallax Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
                    alt="Catering Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-azure-950/60 mix-blend-color" />
            </div>

            <div ref={sectionRef} className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-20">

                {/* Editorial Content */}
                <div className="lg:w-1/2 space-y-10">
                    <div>
                        <motion.span
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            className="text-coral font-bold uppercase tracking-[0.3em] text-sm block mb-4"
                        >
                            Events & Gatherings
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1]">
                            Bring the Coast <br />
                            <span className="italic text-azure-200">to Your Celebration.</span>
                        </h2>
                    </div>

                    <p className="text-azure-50/80 text-xl leading-relaxed font-light max-w-lg">
                        From intimate family gatherings to grand corporate feasts, AzureFork brings the authentic taste of the coast to your venue. Let us handle the food while you make memories.
                    </p>

                    <ul className="space-y-4 pt-4 border-t border-white/10">
                        {CATERING_FEATURES.map((feature, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 text-lg text-azure-100"
                            >
                                <span className="bg-coral/20 p-1 rounded-full text-coral">
                                    <CheckCircle2 className="w-5 h-5" />
                                </span>
                                <span>{feature}</span>
                            </motion.li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-6 pt-8">
                        <Link href="/quote">
                            <Button className="bg-white text-azure-900 hover:bg-azure-50 text-lg px-8 py-6 rounded-full font-medium">
                                Request a Quote
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full group"
                        >
                            <span>WhatsApp Now</span>
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>

                {/* Overlapping Images Composition */}
                <motion.div
                    style={{ y }}
                    className="lg:w-1/2 relative w-full aspect-square max-w-[600px]"
                >
                    {/* Main Large Image */}
                    <div className="absolute top-0 right-0 w-[85%] h-[85%] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50 border-[8px] border-white/10 z-10 rotate-3">
                        <Image
                            src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80"
                            alt="Catering Setup"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Floating Secondary Image */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-10 left-0 w-[55%] h-[55%] rounded-[2.5rem] overflow-hidden shadow-xl border-[6px] border-white z-20 -rotate-6"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80"
                            alt="Buffet Spread"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-coral/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 right-20 w-32 h-32 bg-azure-400/20 rounded-full blur-3xl" />
                </motion.div>
            </div>
        </Section>
    )
}
