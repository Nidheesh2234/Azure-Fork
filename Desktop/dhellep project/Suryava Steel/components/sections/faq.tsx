"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/data";
import { Plus } from "lucide-react";

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-surface dark:bg-zinc-900/30">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-display font-bold mb-12 text-center"
                >
                    Frequently Asked
                </motion.h2>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-border rounded-sm bg-card overflow-hidden depth-2 hover-glow">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left font-bold font-display text-lg hover:text-primary transition-colors"
                            >
                                {faq.question}
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Plus className="w-5 h-5 text-primary" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-gray-500 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
