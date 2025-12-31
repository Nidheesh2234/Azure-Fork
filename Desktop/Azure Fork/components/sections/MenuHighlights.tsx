'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MENU_CATEGORIES, MENU_ITEMS } from '@/lib/menu-data';
import Image from 'next/image';

export function MenuHighlights() {
    const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);

    const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

    return (
        <Section id="menu" className="bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-azure-50/50 dark:bg-azure-900/5 -skew-x-12 z-0 pointer-events-none" />

            <div className="relative z-10 container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Our Menu</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Explore a symphony of flavours. From the spicy streets of Guntur to the breezy coasts of Vizag.
                    </p>
                </div>

                <Tabs
                    categories={MENU_CATEGORIES}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                <div className="min-h-[400px]">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 max-w-5xl mx-auto"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex gap-5 group p-2 rounded-2xl hover:bg-muted/30 transition-colors"
                                >
                                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden shadow-md bg-muted">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="text-lg font-bold group-hover:text-azure-600 dark:group-hover:text-azure-400 transition-colors leading-tight">{item.name}</h3>
                                                <span className="text-lg font-semibold text-azure-600 dark:text-azure-400 whitespace-nowrap">{item.price}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                                        </div>
                                        <div className="flex gap-2 mt-3 flex-wrap">
                                            {item.bestseller && <Badge variant="azure" className="text-[10px] px-2 h-5">Bestseller</Badge>}
                                            {item.spicy && <Badge variant="coral" className="text-[10px] px-2 h-5">Spicy</Badge>}
                                            {item.veg ? <Badge variant="success" className="text-[10px] px-2 h-5">Veg</Badge> : <Badge variant="outline" className="text-[10px] px-2 h-5 border-destructive/40 text-destructive">Non-Veg</Badge>}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                <div className="text-center mt-16">
                    <Button variant="outline" size="lg" className="rounded-full px-8 border-azure-200 hover:bg-azure-50 text-azure-700 dark:border-azure-800 dark:hover:bg-azure-900/30 dark:text-azure-300">
                        Download Full Menu (PDF)
                    </Button>
                </div>
            </div>
        </Section>
    )
}
