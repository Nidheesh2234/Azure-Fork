'use client';

import { REVIEWS } from '@/lib/menu-data';
import { Section } from '@/components/ui/Section';
import { Star, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Reviews() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const x2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <Section id="reviews" className="bg-sand/30 dark:bg-navy-900 overflow-hidden py-32 relative">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-azure-100 via-transparent to-transparent dark:from-azure-900/30" />

            <div className="container mx-auto px-4 mb-20 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-navy-950 dark:text-white">
                    Stories from the <br /><span className="text-azure-600 dark:text-azure-400 italic">Table</span>
                </h2>
                <div className="flex justify-center gap-2 mt-6">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-muted-foreground mt-2 font-medium">4.8/5 Average Rating</p>
            </div>

            <div ref={containerRef} className="relative z-10 space-y-12">

                {/* Row 1 - Moving Left */}
                <motion.div style={{ x: x1 }} className="flex gap-8 w-max pl-4">
                    {REVIEWS.slice(0, 3).concat(REVIEWS.slice(0, 3)).map((review, i) => (
                        <ReviewCard key={`r1-${i}`} review={review} />
                    ))}
                </motion.div>

                {/* Row 2 - Moving Right */}
                <motion.div style={{ x: x2 }} className="flex gap-8 w-max -ml-[500px]">
                    {REVIEWS.slice(3).concat(REVIEWS.slice(3)).map((review, i) => (
                        <ReviewCard key={`r2-${i}`} review={review} />
                    ))}
                </motion.div>
            </div>
        </Section>
    )
}

function ReviewCard({ review }: { review: any }) {
    return (
        <div className="w-[350px] md:w-[450px] bg-white dark:bg-navy-800 p-8 rounded-3xl shadow-lg border border-azure-100 dark:border-white/5 relative flex-shrink-0 group hover:-translate-y-2 transition-transform duration-300">
            <Quote className="absolute top-8 right-8 text-azure-50 dark:text-white/5 w-16 h-16 transform rotate-12" />

            <p className="text-lg md:text-xl font-serif leading-relaxed text-navy-800 dark:text-azure-50/90 mb-8 relative z-10">
                "{review.text}"
            </p>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-dashed border-azure-100 dark:border-white/10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-azure-100 to-sand dark:from-navy-700 dark:to-navy-900 flex items-center justify-center text-azure-800 dark:text-azure-200 font-bold text-xl shadow-inner">
                        {review.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-bold text-foreground">{review.name}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{review.city}</p>
                    </div>
                </div>
                <Badge variant="secondary" className="bg-azure-50 text-azure-700 dark:bg-white/5 dark:text-azure-300 px-3 py-1">
                    {review.source}
                </Badge>
            </div>
        </div>
    )
}
