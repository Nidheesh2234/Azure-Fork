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
        <Section id="about" className="bg-sand/20 dark:bg-navy-800/20 py-24">
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                <div className="lg:w-1/2 relative order-2 lg:order-1">
                    <div className="relative aspect-[4/5] w-[80%] ml-auto rotate-3 rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1000&auto=format&fit=crop"
                            alt="Our Kitchen"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-navy-900/10" />
                    </div>
                    {/* Overlapping Image */}
                    <div className="absolute bottom-10 -left-6 md:left-0 w-[60%] aspect-square -rotate-6 rounded-2xl overflow-hidden shadow-xl border-8 border-white dark:border-navy-900">
                        <Image
                            src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1000&auto=format&fit=crop"
                            alt="Chef Preparing Spice Blend"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
                    <div>
                        <span className="text-azure-600 dark:text-azure-400 font-bold uppercase tracking-widest text-sm">Our Story</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 leading-tight">
                            Authentic Flavours, <br />Honest Ingredients.
                        </h2>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                        At AzureFork Kitchens, we assume that great food begins with great ingredients. Nestled in the heart of Vizag, we bring you the freshest treasures of the Bay of Bengal, paired with the fiery, aromatic spices of the Andhra heartland.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Founded by the Rao family, our kitchen operates on a simple philosophy: treat every guest like family. No shortcuts, no preservatives—just honest, soulful cooking.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                        {TRUST_BADGES.map((badge, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="bg-white dark:bg-white/5 p-3 rounded-xl shadow-sm border border-border">
                                    <badge.icon className="w-6 h-6 text-azure-600 dark:text-azure-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">{badge.title}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">{badge.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <Button
                            variant="link"
                            className="text-azure-600 dark:text-azure-400 p-0 text-lg decoration-2 underline-offset-4 flex items-center gap-2"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? 'Show Less' : 'Read Our Full Story'}
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </Button>
                    </div>

                    {/* Expandable Full Story Section */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="bg-white dark:bg-navy-800/50 rounded-2xl p-8 shadow-lg border border-border space-y-6">
                                    <h3 className="text-2xl font-serif font-bold text-foreground">{FULL_STORY.title}</h3>
                                    {FULL_STORY.paragraphs.map((para, i) => (
                                        <p key={i} className="text-muted-foreground leading-relaxed">
                                            {para}
                                        </p>
                                    ))}
                                    <div className="pt-4 border-t border-border">
                                        <p className="text-azure-600 dark:text-azure-400 font-semibold italic">
                                            "From our family to yours — welcome to AzureFork."
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-2">— The Rao Family</p>
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

