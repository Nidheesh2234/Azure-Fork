"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/data";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 50, damping: 20 }
    }
};

export function Products() {
    return (
        <section id="products" className="py-24 bg-surface dark:bg-zinc-900/50">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mb-16 md:flex justify-between items-end"
                >
                    <div>
                        <span className="text-primary font-medium tracking-wider uppercase text-sm">Our Inventory</span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mt-2 text-foreground">
                            Premium Steel Products
                        </h2>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors">
                        View Full Catalog <ArrowUpRight className="h-4 w-4" />
                    </button>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={item}
                            className="group relative bg-card rounded-sm overflow-hidden border border-border hover:border-primary/50 transition-colors depth-2 card-interactive hover-glow"
                        >
                            <div className="aspect-[4/3] relative overflow-hidden bg-secondary/10">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.specs.slice(0, 2).map(spec => (
                                        <span key={spec} className="text-xs bg-secondary/5 text-secondary-foreground px-2 py-1 rounded-sm border border-border">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div >
        </section >
    );
}
