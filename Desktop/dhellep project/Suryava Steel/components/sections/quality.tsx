"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Ruler } from "lucide-react";

export function Quality() {
    return (
        <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="container mx-auto px-4 md:px-6 text-center mb-16 relative z-10"
            >
                <h2 className="text-3xl md:text-5xl font-display font-bold">Quality First</h2>
                <p className="text-gray-400 mt-4">Uncompromising standards with every dispatch.</p>
            </motion.div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto gap-8 md:gap-0">

                    {/* Animated Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 hidden md:block -translate-y-1/2 z-0">
                        <svg className="w-full h-full overflow-visible">
                            <motion.line
                                x1="0" y1="50%" x2="100%" y2="50%"
                                stroke="#ff6b00"
                                strokeWidth="2"
                                strokeDasharray="10 10"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                viewport={{ once: true }}
                            />
                        </svg>
                    </div>

                    {[
                        { icon: Ruler, title: "Verified Weights", desc: "Digital weighbridge slips" },
                        { icon: ShieldCheck, title: "Lab Tested", desc: "Spectro analysis reports" },
                        { icon: Award, title: "ISO Certified", desc: "9001:2015 processes" }
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 + (i * 0.3), type: "spring" }}
                            viewport={{ once: true }}
                            className="relative z-10 flex flex-col items-center bg-zinc-900 p-6 rounded-full border border-zinc-800 w-48 h-48 justify-center tex-center depth-3 hover-scale hover-glow"
                        >
                            <item.icon className="h-8 w-8 text-primary mb-3" />
                            <h3 className="font-bold font-display text-lg">{item.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}
