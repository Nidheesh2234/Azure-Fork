'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MENU_CATEGORIES, MENU_ITEMS } from '@/lib/menu-data';
import { generateMenuPDF } from '@/lib/generate-menu-pdf';
import Image from 'next/image';
import { Star, Flame, Leaf } from 'lucide-react';

export function MenuHighlights() {
    const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);
    const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

    return (
        <Section id="menu" className="bg-background py-32 relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-azure-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <span className="text-azure-600 dark:text-azure-400 font-bold uppercase tracking-[0.2em] text-sm">Culinary Journey</span>
                    <h2 className="text-5xl md:text-7xl font-serif font-medium mt-4">
                        A Syllabus of <span className="italic text-coral">Flavours</span>
                    </h2>
                </div>

                {/* Category Navigation - Pill Style */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {MENU_CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-8 py-3 rounded-full text-lg transition-all duration-300 relative overflow-hidden group ${activeCategory === category
                                    ? 'text-white'
                                    : 'text-muted-foreground hover:text-foreground bg-secondary/50'
                                }`}
                        >
                            {/* Active Background */}
                            {activeCategory === category && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-navy-900 dark:bg-white z-0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {/* Text */}
                            <span className={`relative z-10 font-medium ${activeCategory === category ? 'dark:text-navy-950' : ''}`}>{category}</span>
                        </button>
                    ))}
                </div>

                {/* Menu Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-white dark:bg-white/5 rounded-[2rem] p-4 pr-6 flex gap-6 hover:shadow-xl hover:shadow-azure-900/5 transition-all duration-500 border border-transparent hover:border-azure-100 dark:hover:border-azure-900/50"
                            >
                                {/* Image with rotational hover effect */}
                                <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-azure-100 to-sand/20 dark:from-white/10 dark:to-transparent rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover rounded-full shadow-lg group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Badge Overlays */}
                                    <div className="absolute -top-2 -right-2 flex flex-col gap-1">
                                        {item.bestseller && (
                                            <div className="bg-sand text-navy-950 p-2 rounded-full shadow-md" title="Bestseller">
                                                <Star className="w-3 h-3 fill-current" />
                                            </div>
                                        )}
                                        {item.spicy && (
                                            <div className="bg-coral text-white p-2 rounded-full shadow-md" title="Spicy">
                                                <Flame className="w-3 h-3 fill-current" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 py-2 flex flex-col justify-center">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-serif font-bold group-hover:text-azure-700 dark:group-hover:text-azure-400 transition-colors">
                                            {item.name}
                                        </h3>
                                        <span className="text-xl font-bold font-sans text-azure-600 dark:text-azure-400">
                                            {item.price}
                                        </span>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        {item.veg ? (
                                            <Badge variant="outline" className="border-green-500/30 text-green-600 dark:text-green-400 px-3 py-1 flex gap-1 items-center">
                                                <Leaf className="w-3 h-3" /> Veg
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="border-red-500/30 text-red-600 dark:text-red-400 px-3 py-1 flex gap-1 items-center">
                                                <Flame className="w-3 h-3" /> Non-Veg
                                            </Badge>
                                        )}

                                        <button className="text-sm font-bold text-azure-500 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                                            Add to Order +
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Footer Action */}
                <div className="text-center mt-20">
                    <p className="text-muted-foreground mb-6 font-serif italic text-xl">"The only thing we love more than food is you."</p>
                    <Button
                        size="lg"
                        className="rounded-full px-10 py-7 text-lg bg-navy-900 text-white hover:bg-navy-800 dark:bg-white dark:text-navy-950 shadow-xl shadow-navy-900/20"
                        onClick={generateMenuPDF}
                    >
                        Download Full Menu
                    </Button>
                </div>
            </div>
        </Section>
    )
}
