'use client';

import { REVIEWS } from '@/lib/menu-data';
import { Section } from '@/components/ui/Section';
import { Star, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function Reviews() {
    return (
        <Section id="reviews" className="bg-azure-50/50 dark:bg-navy-950/50">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold">Diner Stories</h2>
                    <p className="text-muted-foreground mt-4">Average 4.8/5 Stars from over 500+ happy customers</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="bg-card text-card-foreground p-8 rounded-2xl shadow-sm border border-border h-full flex flex-col relative group hover:-translate-y-1 transition-transform duration-300">
                            <Quote className="absolute top-6 right-6 text-azure-100 dark:text-navy-800 w-16 h-16 transition-colors group-hover:text-azure-200 dark:group-hover:text-navy-700" />

                            <div className="flex gap-1 mb-6 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        fill={i < review.rating ? "currentColor" : "none"}
                                        className={`w-5 h-5 ${i >= review.rating ? "text-gray-300" : ""}`}
                                    />
                                ))}
                            </div>

                            <p className="text-lg italic mb-8 leading-relaxed relative z-10 flex-grow">
                                &quot;{review.text}&quot;
                            </p>

                            <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-azure-100 dark:bg-navy-800 flex items-center justify-center text-azure-700 dark:text-azure-300 font-bold">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm leading-none">{review.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{review.city}</p>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="text-[10px] font-medium opacity-70">
                                    {review.source}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
