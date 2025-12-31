'use client';

import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const CATERING_FEATURES = [
    "Customized Menus for Every Occasion",
    "Live Counters (Dosa, Grill, Fry Stations)",
    "Professional Service Staff",
    "Hygiene & Quality Assured",
    "Zero-Plastic Eco-Friendly Cutlery",
];

export function Catering() {
    return (
        <Section id="catering" className="bg-azure-900 text-white relative py-24 overflow-hidden">
            {/* Background Image Parallax */}
            <div className="absolute inset-0 z-0 opacity-20">
                <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
                    alt="Catering Background"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 space-y-6">
                    <span className="text-azure-300 font-bold uppercase tracking-widest text-sm">Catering & Events</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                        Bring the Coast to Your Celebration
                    </h2>
                    <p className="text-azure-100 text-lg leading-relaxed">
                        From intimate family gatherings to grand corporate feasts, AzureFork brings the authentic taste of the coast to your venue. Let us handle the food while you make memories.
                    </p>

                    <ul className="space-y-3 pt-4">
                        {CATERING_FEATURES.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-lg">
                                <CheckCircle2 className="text-coral w-6 h-6 flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <Button variant="azure" size="lg" className="text-lg px-8">Request a Quote</Button>
                        <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 text-lg px-8">WhatsApp Now</Button>
                    </div>
                </div>

                <div className="lg:w-1/2 relative w-full aspect-video lg:aspect-square max-h-[500px]">
                    <div className="grid grid-cols-2 gap-4 h-full">
                        <div className="space-y-4 pt-12">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform">
                                <Image src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80" alt="Catering Setup" fill className="object-cover" />
                            </div>
                            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform">
                                <Image src="https://images.unsplash.com/photo-1530610476181-d8ceb28bc572?w=800&q=80" alt="Buffet Spread" fill className="object-cover" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform">
                                <Image src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" alt="Delicate Plating" fill className="object-cover" />
                            </div>
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform">
                                <Image src="https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=800&q=80" alt="Feast" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}
