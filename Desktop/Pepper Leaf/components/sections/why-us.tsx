"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Leaf, Heart, Truck } from "lucide-react"
import { ScrollReveal } from "@/components/visuals/scroll-reveal"
import { ParallaxText } from "@/components/visuals/parallax-text"

const features = [
    {
        icon: Leaf,
        title: "100% Natural Sourcing",
        desc: "We source chilies from Guntur and turmeric from Duggirala directly from farmers."
    },
    {
        icon: ShieldCheck,
        title: "Lab Tested Hygiene",
        desc: "Every batch is tested for safety while maintaining traditional preparation methods."
    },
    {
        icon: Heart,
        title: "Traditional Recipes",
        desc: "Recipes preserved from our grandmother's kitchen, using stone-grinding techniques."
    },
    {
        icon: Truck,
        title: "Sealed Fresh",
        desc: "Premium glass jars sealed immediately after preparation to lock in the aroma."
    }
]

export function WhyUs() {
    return (
        <section id="why-us" className="py-32 bg-pepper-50 dark:bg-pepper-950/20 relative overflow-hidden">
            {/* Background Parallax */}
            <div className="absolute top-10 w-full z-0 text-pepper-900/5 dark:text-pepper-100/5">
                <ParallaxText baseVelocity={-2}>Authentic • Pure • Tasty •</ParallaxText>
                <ParallaxText baseVelocity={2}>Homemade • Fresh • Spicy •</ParallaxText>
            </div>

            <div className="container px-4 relative z-10">
                <ScrollReveal>
                    <div className="text-center max-w-3xl mx-auto mb-20 sticky top-24 z-20 mix-blend-multiply dark:mix-blend-screen bg-background/5 p-4 rounded-xl backdrop-blur-[2px]">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Why PepperLeaf?</h2>
                        <p className="text-lg text-muted-foreground">It’s not just about the spice, it’s about the story, the soil, and the soul.</p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div
                                className="group text-center p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-transparent hover:border-pepper-200 shadow-sm hover:shadow-xl hover:shadow-pepper-200/20 transition-all duration-500"
                            >
                                <div className="inline-flex items-center justify-center p-4 rounded-full bg-pepper-100 text-pepper-600 mb-6 group-hover:scale-110 group-hover:bg-pepper-500 group-hover:text-white transition-all duration-300">
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
