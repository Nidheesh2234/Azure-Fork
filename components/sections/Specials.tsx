'use client';

import { CHEF_SPECIALS } from '@/lib/menu-data';
import { Section } from '@/components/ui/Section';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';

export function Specials() {
    return (
        <Section id="specials" className="bg-navy-900 text-white relative py-24">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-azure-900 to-transparent" />

            <div className="relative z-10 container mx-auto">
                <div className="text-center mb-16">
                    <Badge variant="azure" className="mb-4 px-4 py-1 text-sm bg-azure-500/20 hover:bg-azure-500/30 border border-azure-500/50">Chef's Selection</Badge>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                        Signature Creations
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CHEF_SPECIALS.map((special, index) => (
                        <motion.div
                            key={special.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-xl shadow-black/40"
                        >
                            <Image
                                src={special.image}
                                alt={special.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

                            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <Badge variant="outline" className="bg-black/50 border-white/20 text-white backdrop-blur-md">Featured</Badge>
                            </div>

                            <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                <p className="text-azure-400 font-medium mb-2 font-serif italic text-lg">{special.subtitle}</p>
                                <h3 className="text-3xl font-bold mb-3 leading-none">{special.title}</h3>
                                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                                    <p className="text-gray-300 text-sm leading-relaxed pb-2">
                                        {special.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
