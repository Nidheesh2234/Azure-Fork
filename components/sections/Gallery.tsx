'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop", // Restaurant
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop", // Interior
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop", // Food platter
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop", // Healthy bowl
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=800&auto=format&fit=crop", // Meal
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop", // Breakfast
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop", // Restaurant interior
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=800&auto=format&fit=crop", // Food spread
];

export function Gallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <Section id="gallery" className="bg-background">
            <div className="text-center mb-12">
                <span className="text-azure-600 font-bold uppercase tracking-widest text-sm">Visual Feast</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2">AzureFork Gallery</h2>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 container mx-auto">
                {GALLERY_IMAGES.map((src, i) => (
                    <motion.div
                        key={i}
                        className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-zoom-in"
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedImage(src)}
                    >
                        <Image
                            src={src}
                            alt={`Gallery image ${i + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ZoomIn className="text-white w-8 h-8" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 text-white hover:bg-white/20"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </Button>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-5xl w-full max-h-[90vh] aspect-video rounded-lg overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image src={selectedImage} alt="Gallery view" fill className="object-contain" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    )
}
