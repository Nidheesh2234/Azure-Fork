"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, 100]);
    const y3 = useTransform(scrollY, [0, 500], [0, 50]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-zinc-950">
            {/* Scroll Progress Bar at Top */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
                style={{ scaleX: useTransform(scrollY, [0, 2000], [0, 1]) }} /* Simple progress for demo, ideally linked to page height */
            />

            {/* Layer 1: Background Grid & Gradient */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 z-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay"
            >
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-transparent to-zinc-900" />
            </motion.div>

            {/* Layer 2: Floating Particles */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary/30 rounded-full blur-[1px]"
                        initial={{ x: Math.random() * 1000, y: Math.random() * 500 }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.5
                        }}
                    />
                ))}
            </div>

            {/* Layer 3: Content */}
            <div className="relative z-20 container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    style={{ y: y3 }}
                    className="text-left space-y-8"
                >
                    <motion.div
                        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                        transition={{ duration: 1, ease: "circOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Ready Stock Available
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight">
                            STEEL SUPPLY <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200">
                                & FABRICATION
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed"
                    >
                        Premium TMT, Structural Steel, and Custom Fabrication delivered on time, on spec.
                        Trusted by Visakhapatnam&apos;s leading builders.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-wrap gap-4 items-center"
                    >
                        <button className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-sm font-semibold text-lg transition-all flex items-center gap-2 group btn-depth">
                            Get a Quote
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-sm font-semibold text-lg transition-all btn-depth">
                            Our Projects
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="pt-8 flex flex-wrap gap-6 text-sm font-medium text-gray-400"
                    >
                        {["Verified Weights", "Fast Quotations", "Reliable Delivery"].map((text) => (
                            <div key={text} className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-accent" />
                                {text}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Hero Image Layer */}
                <motion.div
                    style={{ y: y2 }}
                    className="relative hidden md:block aspect-[4/5] lg:aspect-square"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950 z-10" />
                    {/* Abstract Structure Image */}
                    <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 depth-4 hover-glow">
                        <Image
                            src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1000&auto=format&fit=crop"
                            alt="Industrial Steel Structure"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    {/* Floating Badge */}
                    <motion.div
                        className="absolute bottom-20 -left-10 z-20 bg-zinc-900/90 backdrop-blur-md p-6 border-l-4 border-primary shadow-xl max-w-xs card-glass"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        <div className="text-3xl font-display font-bold text-white mb-1">15+ Years</div>
                        <div className="text-sm text-gray-400">Excellence in Industrial Supply & Fabrication</div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
                />
            </motion.div>
        </div>
    );
}
