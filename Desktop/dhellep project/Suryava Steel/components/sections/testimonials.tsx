"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { Quote } from "lucide-react";

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 bg-background border-t border-border">
            <div className="container mx-auto px-4 md:px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-display font-bold mb-12 text-center"
                >
                    Client Trust
                </motion.h2>

                {/* Horizontal Scroll Snap Container */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 no-scrollbar">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="snap-center flex-shrink-0 w-[85vw] md:w-[400px] bg-secondary/5 border border-border p-8 rounded-sm relative depth-2 hover-lift-sm hover-glow"
                        >
                            <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
                            <p className="text-lg italic text-gray-600 dark:text-gray-300 mb-6 relative z-10 leading-relaxed">
                                "{t.content}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <div className="font-bold font-display">{t.name}</div>
                                    <div className="text-xs text-primary">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
