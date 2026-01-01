"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Services() {
    return (
        <section id="services" className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <span className="text-primary font-medium tracking-wider uppercase text-sm">End-to-End Solutions</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold mt-2">
                        More Than Just Supply
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Central Line for visual connection (desktop only) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

                    <div className="space-y-12 md:space-y-24">
                        {services.map((service, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, x: isEven ? -50 : 50, filter: "blur(4px)" }}
                                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className={cn(
                                        "relative flex flex-col gap-6 md:flex-row items-center",
                                        isEven ? "md:flex-row-reverse md:text-right" : ""
                                    )}
                                >
                                    {/* Content Side */}
                                    <div className="flex-1 w-full md:w-1/2">
                                        <div className={cn("flex flex-col gap-4", isEven ? "items-end" : "items-start")}>
                                            <div className="p-4 bg-secondary/5 rounded-sm w-fit depth-2 hover-lift-sm">
                                                <service.icon className="h-8 w-8 text-primary icon-hover" />
                                            </div>
                                            <h3 className="text-2xl font-display font-bold">{service.title}</h3>
                                            <p className="text-gray-500 leading-relaxed max-w-md">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center Dot (Desktop) */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-background bg-primary z-10 hidden md:block shadow-lg shadow-primary/20" />

                                    {/* Empty Side for layout balance */}
                                    <div className="flex-1 w-full md:w-1/2 hidden md:block" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
