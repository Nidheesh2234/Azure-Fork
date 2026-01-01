"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { processSteps } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

export function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [activeStep, setActiveStep] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.25) setActiveStep(0);
        else if (latest < 0.5) setActiveStep(1);
        else if (latest < 0.75) setActiveStep(2);
        else setActiveStep(3);
    });

    return (
        <section id="process" className="bg-zinc-950 text-white">
            <div ref={containerRef} className="relative h-[200vh]">
                <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
                        {/* Background that might shift slightly */}
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-20 grid lg:grid-cols-2 gap-12 items-center h-full">

                        {/* Left: Content */}
                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="text-primary font-medium tracking-wider uppercase text-sm"
                                >
                                    Workflow
                                </motion.span>
                                <h2 className="text-4xl md:text-6xl font-display font-bold mt-2 mb-6">
                                    From Stockyard <br /> to Site
                                </h2>
                                <p className="text-gray-400 max-w-md">
                                    Watch how we ensure quality and timeliness at every step of the supply chain.
                                </p>
                            </motion.div>

                            <div className="space-y-14 relative">
                                {/* Vertical Progress Line */}
                                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-zinc-800">
                                    <motion.div
                                        className="w-full bg-primary origin-top"
                                        style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                                    />
                                </div>

                                {processSteps.map((step, index) => (
                                    <motion.div
                                        key={step.step}
                                        className={`relative pl-12 transition-opacity duration-500 ${activeStep === index ? "opacity-100" : "opacity-30"}`}
                                    >
                                        {/* Dot */}
                                        <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-500 bg-zinc-950 hover-scale depth-2
                            ${activeStep >= index ? "border-primary text-primary" : "border-zinc-800 text-zinc-600"}`}>
                                            {activeStep > index ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold text-sm">{step.step}</span>}
                                        </div>

                                        <h3 className="text-2xl font-bold font-display text-white">{step.title}</h3>
                                        <p className="text-gray-400 mt-2 max-w-sm">{step.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Visuals */}
                        <div className="hidden lg:block relative h-[60vh] w-full bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 shadow-2xl">
                            {processSteps.map((step, index) => (
                                <motion.div
                                    key={step.step}
                                    className="absolute inset-0 flex items-center justify-center bg-zinc-800"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{
                                        opacity: activeStep === index ? 1 : 0,
                                        scale: activeStep === index ? 1 : 1.1,
                                        zIndex: activeStep === index ? 10 : 0
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {/* Placeholder for dynamic step imagery - utilizing gradients/text for now as generic images might be repetitive */}
                                    <div className="text-center p-8">
                                        <div className="text-9xl font-display font-bold text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
                                            {step.step}
                                        </div>
                                        <h4 className="text-3xl font-bold text-primary relative z-10">{step.title} Visual</h4>
                                        <p className="text-zinc-500 mt-4 relative z-10">Simulation of {step.title} process...</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
