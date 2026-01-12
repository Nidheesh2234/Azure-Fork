'use client';

import { useState, useRef } from 'react';
import { Section } from '@/components/ui/Section';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=800&auto=format&fit=crop",
];

export function Gallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Split images into 3 columns for masonry effect
    const col1 = GALLERY_IMAGES.filter((_, i) => i % 3 === 0);
    const col2 = GALLERY_IMAGES.filter((_, i) => i % 3 === 1);
    const col3 = GALLERY_IMAGES.filter((_, i) => i % 3 === 2);

    return (
        <Section id="gallery" className="bg-background py-32 overflow-hidden">

            {/* Header */}
            <div className="container mx-auto px-4 mb-20 text-center relative z-10">
                <span className="text-azure-600 dark:text-azure-400 font-bold uppercase tracking-widest text-sm">Visual Feast</span>
                <h2 className="text-5xl md:text-7xl font-serif font-medium mt-4">
                    Captured <span className="italic text-coral">Moments</span>
                </h2>
            </div>

            {/* Masonry Grid */}
            <div ref={containerRef} className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* Column 1 */}
                    <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-8">
                        {col1.map((src, i) => <GalleryItem key={i} src={src} index={i} onClick={() => setSelectedImage(src)} />)}
                    </motion.div>

                    {/* Column 2 */}
                    <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:gap-8 pt-0 lg:pt-20">
                        {col2.map((src, i) => <GalleryItem key={i} src={src} index={i} onClick={() => setSelectedImage(src)} />)}
                    </motion.div>

                    {/* Column 3 */}
                    <motion.div style={{ y: y3 }} className="flex flex-col gap-6 md:gap-8">
                        {col3.map((src, i) => <GalleryItem key={i} src={src} index={i} onClick={() => setSelectedImage(src)} />)}
                    </motion.div>
                </div>
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-navy-950/95 flex items-center justify-center p-4 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-6 right-6 text-white hover:bg-white/10 rounded-full w-12 h-12"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-6 h-6" />
                        </Button>
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-6xl w-full max-h-[85vh] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image src={selectedImage} alt="Gallery view" fill className="object-cover" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    )
}

function GalleryItem({ src, index, onClick }: { src: string, index: number, onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-2xl overflow-hidden cursor-zoom-in aspect-[4/5] filter grayscale hover:grayscale-0 transition-all duration-700"
            onClick={onClick}
        >
            <Image
                src={src}
                alt={`Gallery image`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="text-white w-6 h-6" />
                </div>
            </div>
        </motion.div>
    )
}
