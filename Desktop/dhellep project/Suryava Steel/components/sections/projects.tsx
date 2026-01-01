"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Projects() {
    const featured = projects[0];
    const others = projects.slice(1);

    return (
        <section id="projects" className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex justify-between items-end mb-12"
                >
                    <div>
                        <span className="text-primary font-medium tracking-wider uppercase text-sm">Portfolio</span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mt-2">Recent Projects</h2>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Featured Project */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 relative group overflow-hidden rounded-sm bg-zinc-900 border border-border min-h-[500px] depth-3 hover-glow"
                    >
                        <div className="absolute inset-0">
                            <Image
                                src={featured.image}
                                alt={featured.title}
                                fill
                                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </div>

                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                            <div className="text-primary font-medium mb-2">{featured.category}</div>
                            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{featured.title}</h3>
                            <p className="text-gray-300 max-w-lg mb-6 text-lg">{featured.description}</p>
                            <div className="flex gap-4 items-center">
                                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-sm text-white text-sm">
                                    {featured.outcome}
                                </div>
                                <button className="flex items-center gap-2 text-white font-medium hover:text-primary transition-colors">
                                    View Case Study <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Other Projects */}
                    <div className="space-y-8 lg:space-y-0 lg:grid lg:gap-8 overflow-y-auto max-h-[500px] lg:max-h-full no-scrollbar">
                        {others.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="flex gap-4 group cursor-pointer bg-card p-4 rounded-sm border border-border hover:border-primary/50 transition-colors depth-2 hover-lift-sm hover-glow"
                            >
                                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-sm bg-secondary/10">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div>
                                    <div className="text-xs text-primary font-medium mb-1 uppercase">{project.category}</div>
                                    <h4 className="font-bold font-display text-lg mb-1 group-hover:text-primary transition-colors">{project.title}</h4>
                                    <div className="text-xs text-gray-500">{project.outcome}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
