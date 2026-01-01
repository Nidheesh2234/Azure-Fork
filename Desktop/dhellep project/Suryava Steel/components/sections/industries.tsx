"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { industries } from "@/lib/data";
import Image from "next/image";

export function Industries() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <section ref={ref} className="py-24 bg-surface dark:bg-zinc-900 overflow-hidden relative">
            {/* Moving Background Pattern */}
            <motion.div
                style={{ x }}
                className="absolute inset-0 opacity-5 pointer-events-none w-[120%]"
            >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.1)_25%,rgba(0,0,0,.1)_50%,transparent_50%,transparent_75%,rgba(0,0,0,.1)_75%,rgba(0,0,0,.1))] bg-[length:60px_60px]" />
            </motion.div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold">Industries Served</h2>
                    <p className="text-gray-500 mt-4">Powering growth across diverse sectors.</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {industries.map((industry, i) => (
                        <motion.div
                            key={industry.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                                type: "spring",
                                bounce: 0.5,
                                delay: i * 0.1,
                                duration: 0.8
                            }}
                            viewport={{ once: true }}
                            className="group relative aspect-[3/4] rounded-sm overflow-hidden border border-border bg-card depth-2 hover-lift hover-glow"
                        >
                            <Image
                                src={industry.image}
                                alt={industry.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                <industry.icon className="h-8 w-8 text-primary mb-2" />
                                <h3 className="text-white font-bold font-display text-lg">{industry.name}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
