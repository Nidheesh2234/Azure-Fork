'use client';

import { useState, useRef, useEffect } from 'react';
import { CHEF_SPECIALS } from '@/lib/menu-data';
import { Section } from '@/components/ui/Section';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Specials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % CHEF_SPECIALS.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + CHEF_SPECIALS.length) % CHEF_SPECIALS.length);
    };

    const activeSpecial = CHEF_SPECIALS[activeIndex];

    return (
        <Section id="specials" className="bg-navy-950 text-white relative min-h-screen flex items-center overflow-hidden py-24">

            {/* Dynamic Background */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={activeSpecial.image}
                        alt="Background blur"
                        fill
                        className="object-cover blur-[100px] scale-125"
                    />
                    <div className="absolute inset-0 bg-navy-950/80 mix-blend-multiply" />
                </motion.div>
            </AnimatePresence>

            <div ref={containerRef} className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">

                {/* Header */}
                <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-8">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-azure-400 font-serif italic text-xl block mb-2"
                        >
                            Curated Excellence
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tight"
                        >
                            Chef's Spotlight
                        </motion.h2>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevSlide}
                            className="rounded-full border-white/20 hover:bg-white/10 text-white w-14 h-14"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextSlide}
                            className="rounded-full border-white/20 hover:bg-white/10 text-white w-14 h-14"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </div>
                </div>

                {/* Spotlight Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Image Spotlight */}
                    <div className="lg:col-span-7 relative order-2 lg:order-1 h-[50vh] min-h-[400px]">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={activeSpecial.id}
                                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 100, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50"
                            >
                                <Image
                                    src={activeSpecial.image}
                                    alt={activeSpecial.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                <div className="absolute bottom-8 left-8">
                                    <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white mb-2">
                                        Signature Dish
                                    </Badge>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Text Details */}
                    <div className="lg:col-span-5 order-1 lg:order-2 space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSpecial.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h3 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-white to-sand leading-[1.1] mb-2">
                                    {activeSpecial.title}
                                </h3>
                                <p className="text-xl text-azure-300 font-medium mb-6">{activeSpecial.subtitle}</p>

                                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 mb-8">
                                    <p className="text-gray-300 text-lg leading-relaxed font-light">
                                        {activeSpecial.description}
                                    </p>
                                </div>

                                <Button className="group bg-coral hover:bg-coral/90 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-coral/20 transition-all hover:scale-105">
                                    <span>Tasting Notes</span>
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress Indicator */}
                        <div className="flex gap-2 pt-8">
                            {CHEF_SPECIALS.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`h-1 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-12 bg-coral' : 'w-4 bg-white/20 hover:bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </Section>
    );
}
