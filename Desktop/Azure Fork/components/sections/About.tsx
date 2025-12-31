'use client';

import { Section } from '@/components/ui/Section';
import Image from 'next/image';
import { ShieldCheck, Anchor, Heart, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const TRUST_BADGES = [
    { icon: Anchor, title: "Daily Catch", desc: "Sourced every morning directly from Visakhapatnam Fishing Harbour." },
    { icon: ShieldCheck, title: "Hygiene First", desc: "Strict safety protocols and open-kitchen transparency." },
    { icon: Heart, title: "Made with Love", desc: "Family recipes passed down through three generations." },
    { icon: Leaf, title: "Eco-Conscious", desc: "Sustainable sourcing and zero-plastic packaging policy." },
];

export function About() {
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
                        <Button variant="link" className="text-azure-600 dark:text-azure-400 p-0 text-lg decoration-2 underline-offset-4">
                            Read Our Full Story &rarr;
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    )
}
