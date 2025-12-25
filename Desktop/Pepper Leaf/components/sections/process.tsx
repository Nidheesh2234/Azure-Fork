"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/visuals/scroll-reveal"

const steps = [
    { num: "01", title: "Select", desc: "Hand-picking the finest raw spices." },
    { num: "02", title: "Roast & Grind", desc: "Slow roasting and traditional stone grinding." },
    { num: "03", title: "Slow Cook", desc: "Simmering with authentic oils for hours." },
    { num: "04", title: "Seal & Ship", desc: "Hygienically packed in glass jars." },
]

export function ProjectProcess() { // "Process" might conflict with Node process globally in naming sometimes
    return (
        <section id="process" className="py-24 bg-background overflow-hidden">
            <div className="container px-4">
                <ScrollReveal>
                    <h2 className="text-4xl font-serif font-bold text-center mb-16">From Our Kitchen to Yours</h2>
                </ScrollReveal>

                <div className="relative">
                    {/* Connector Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block" />
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute top-1/2 left-0 w-full h-0.5 bg-pepper-300 origin-left -translate-y-1/2 hidden md:block"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <ScrollReveal
                                key={i}
                                delay={i * 0.2}
                                className="relative z-10 flex flex-col items-center text-center bg-background p-4"
                            >
                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary flex items-center justify-center text-2xl font-serif font-bold text-primary mb-4 bg-pepper-50 transition-transform hover:scale-110 duration-300">
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.desc}</p>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
