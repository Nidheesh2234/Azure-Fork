'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import Image from 'next/image';
import { ShieldCheck, Anchor, Heart, Leaf, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const TRUST_BADGES = [
    { icon: Anchor, title: "Daily Catch", desc: "Sourced every morning directly from Visakhapatnam Fishing Harbour." },
    { icon: ShieldCheck, title: "Hygiene First", desc: "Strict safety protocols and open-kitchen transparency." },
    { icon: Heart, title: "Made with Love", desc: "Family recipes passed down through three generations." },
    { icon: Leaf, title: "Eco-Conscious", desc: "Sustainable sourcing and zero-plastic packaging policy." },
];

const FULL_STORY = {
    title: "The AzureFork Story",
    paragraphs: [
        "It all began with a simple dream — and a worn-out family recipe book. In the heart of Visakhapatnam, the Rao family had been preparing seafood for generations, their recipes whispered from grandmother to grandchild, perfected over decades of Sunday lunches and festive celebrations.",
        "When young Vikram Rao returned home after years abroad, he carried with him not just memories, but a vision: to share his grandmother's legendary prawn masala, his mother's delicate fish curries, and his father's secret spice blends with the world — but with a modern twist.",
        "In 2024, AzureFork Kitchens was born. The name 'Azure' pays homage to the beautiful Bay of Bengal that provides our daily catch, while 'Fork' represents the bridge between traditional coastal cooking and contemporary culinary excellence.",
        "Every morning at 4 AM, our team is at the Visakhapatnam Fishing Harbour, hand-selecting the freshest catches from trusted fishermen we've known for years. By the time you sit down for lunch, the fish on your plate was swimming in the Bay just hours ago.",
        "Our kitchen is an open book — quite literally. Walk through our restaurant, and you'll see our chefs at work, precisely measuring the same spice ratios that great-grandmother Lakshmi would have used in 1952. No shortcuts, no MSG, no artificial preservatives.",
        "What makes us different? We believe that great food tells a story. Each dish at AzureFork carries the salt of the sea, the warmth of Andhra hospitality, and three generations of culinary wisdom. When you dine with us, you're not just eating — you're becoming part of our family's journey.",
        "Today, we're proud to serve hundreds of families daily, cater to grand weddings and intimate gatherings, and introduce the bold flavors of coastal Andhra to food lovers across the city. But our mission remains unchanged: treat every guest like family, and never compromise on freshness or flavor.",
    ],
};

export function About() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Section id="about" className="relative py-32 overflow-hidden bg-background">

            {/* Organic Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] -left-[10%] w-[50vw] h-[50vh] bg-sand/40 dark:bg-azure-900/10 rounded-[100%] blur-[80px]" />
                <div className="absolute bottom-[10%] -right-[10%] w-[40vw] h-[60vh] bg-azure-100/40 dark:bg-navy-800/20 rounded-[100%] blur-[100px]" />
            </div>

            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">

                {/* Image Composition */}
                <div className="lg:w-1/2 relative order-2 lg:order-1 perspective-1000">
                    <motion.div
                        whileHover={{ rotateY: 5, scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                        className="relative aspect-[4/5] w-[80%] mx-auto lg:ml-auto lg:mr-10 rotate-2 rounded-[2rem] overflow-hidden shadow-2xl shadow-navy-900/10 border-[10px] border-white dark:border-navy-800"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1000&auto=format&fit=crop"
                            alt="Our Kitchen"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Floating Secondary Image */}
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: -20 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                        className="absolute bottom-20 left-0 md:left-10 w-[55%] aspect-square -rotate-6 rounded-[2rem] overflow-hidden shadow-xl border-8 border-white dark:border-navy-900 z-20"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1000&auto=format&fit=crop"
                            alt="Chef Preparing Spice Blend"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Decorative Element */}
                    <div className="absolute top-10 right-0 lg:-right-6 text-9xl leading-none font-serif text-azure-900/5 select-none z-0">
                        Since <br /> 2024
                    </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 space-y-10 order-1 lg:order-2">
                    <div>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '4rem' }}
                            className="h-1 bg-coral mb-6"
                        />
                        <span className="text-azure-600 dark:text-azure-400 font-bold uppercase tracking-widest text-sm">Our Ethos</span>
                        <h2 className="text-5xl md:text-6xl font-serif font-medium mt-4 leading-[1.1]">
                            Authentic Flavours, <br />
                            <span className="italic text-muted-foreground">Honest Ingredients.</span>
                        </h2>
                    </div>

                    <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
                        <p>
                            At <span className="font-semibold text-foreground">AzureFork Kitchens</span>, we assume that great food begins with great ingredients. Nestled in the heart of Vizag, we bring you the freshest treasures of the Bay of Bengal, paired with the fiery, aromatic spices of the Andhra heartland.
                        </p>
                        <p>
                            Founded by the Rao family, our kitchen operates on a simple philosophy: treat every guest like family. No shortcuts, no preservatives—just honest, soulful cooking.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 pt-4">
                        {TRUST_BADGES.map((badge, i) => (
                            <div key={i} className="flex gap-4 items-start group">
                                <div className="bg-azure-50/50 dark:bg-white/5 p-4 rounded-full group-hover:bg-azure-100 dark:group-hover:bg-white/10 transition-colors">
                                    <badge.icon className="w-6 h-6 text-azure-600 dark:text-azure-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground text-lg">{badge.title}</h4>
                                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{badge.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6">
                        <Button
                            variant="outline"
                            className="rounded-full px-8 py-6 border-azure-200 text-azure-800 hover:bg-azure-50 dark:border-azure-800 dark:text-azure-200"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? 'Show Less' : 'Read Our Full Story'}
                            {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                        </Button>
                    </div>

                    {/* Expandable Full Story Section */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="mt-8 bg-white/50 dark:bg-navy-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/20 shadow-xl space-y-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-32 bg-azure-500/5 rounded-full blur-3xl pointer-events-none" />

                                    <h3 className="text-3xl font-serif font-bold text-foreground relative z-10">{FULL_STORY.title}</h3>
                                    <div className="space-y-4 relative z-10">
                                        {FULL_STORY.paragraphs.map((para, i) => (
                                            <p key={i} className="text-muted-foreground leading-relaxed">
                                                {para}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="pt-8 border-t border-dashed border-border relative z-10">
                                        <p className="text-azure-600 dark:text-azure-400 font-serif text-xl italic">
                                            "From our family to yours — welcome to AzureFork."
                                        </p>
                                        <p className="text-sm text-foreground/60 mt-2 tracking-widest uppercase">— The Rao Family</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Section>
    )
}
