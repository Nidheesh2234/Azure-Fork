"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { JarIllustration } from "@/components/visuals/jar-illustration"
import { ArrowRight, Star } from "lucide-react"

export function Hero() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"])
    const yJars = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    return (
        <section ref={containerRef} className="relative h-[110vh] min-h-[800px] overflow-hidden bg-background flex flex-col items-center justify-center -mt-16 pt-16">

            {/* Background Gradient Mesh */}
            <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-paprika-300/30 to-purple-500/30 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-pepper-300/30 to-yellow-500/30 blur-[120px]" />
            </motion.div>

            <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div style={{ y: yText }} className="text-center lg:text-left space-y-8">
                    <motion.div
                        initial={{ opacity: 1 }}
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                        className="mb-8 block origin-left"
                    >
                        {/* Big Hero Logo that morphs into nav */}
                        <span className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary block mb-2">PepperLeaf</span>
                        <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground block">Spices & Pickles</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pepper-200 bg-pepper-50/50 text-pepper-700 text-sm font-medium backdrop-blur-sm"
                    >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>Rated #1 Authentic D2C Brand</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-5xl lg:text-7xl font-serif font-bold tracking-tight text-foreground leading-[1.1]"
                    >
                        Small-batch spices <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pepper-600 to-paprika-500 italic">
                            with coastal punch.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
                    >
                        Hand-ground, sun-dried, and sealed fresh. Experience the real taste of Andhra pickles and masalas, made without shortcuts.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-wrap gap-4 justify-center lg:justify-start"
                    >
                        <Button size="lg" className="rounded-full text-base h-14 px-8 shadow-lg shadow-pepper-500/20 bg-pepper-500 hover:bg-pepper-600 text-white border-0">
                            Explore Best Sellers <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full text-base h-14 px-8 border-2">
                            Get Gift Box
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-pepper-500" /> No Added Colors
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-pepper-500" /> Stone Ground
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-pepper-500" /> Lab Tested
                        </div>
                    </motion.div>
                </motion.div>

                {/* Hero Image / Jars */}
                <motion.div style={{ y: yJars }} className="relative h-[500px] lg:h-[600px] w-full flex items-center justify-center lg:justify-end perspective-1000">
                    {/* Composition of jars */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 50, rotate: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0, rotate: 3 }}
                        transition={{ duration: 1, delay: 0.2, type: "spring" }}
                        className="absolute right-10 lg:right-20 top-10 lg:top-20 z-20 transform-gpu"
                    >
                        <JarIllustration label="Avakaya" color="#D84315" className="w-56 lg:w-72 drop-shadow-2xl" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -50, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0, rotate: -6 }}
                        transition={{ duration: 1, delay: 0.4, type: "spring" }}
                        className="absolute right-40 lg:right-64 bottom-20 lg:bottom-32 z-10 transform-gpu"
                    >
                        <JarIllustration label="Gongura" color="#2D5A27" className="w-48 lg:w-64 drop-shadow-xl" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
