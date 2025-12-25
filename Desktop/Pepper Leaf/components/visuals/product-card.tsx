"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface ProductCardProps {
    title: string
    price: string
    image: string
    tag: string
}

export function ProductCard({ title, price, image, tag }: ProductCardProps) {
    return (
        <motion.div
            className="group relative bg-card rounded-2xl overflow-hidden border border-transparent hover:border-border/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.03)] transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-xs font-semibold text-pepper-700 uppercase tracking-wider">
                    {tag}
                </span>
            </div>

            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/20">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
                    <span className="text-lg font-medium text-muted-foreground">{price}</span>
                </div>

                <Button className="w-full bg-transparent border-2 border-pepper-500 text-pepper-600 hover:text-white hover:bg-pepper-600 rounded-full font-bold uppercase tracking-wider transition-all duration-300">
                    Add to Cart <Plus className="ml-2 w-4 h-4" />
                </Button>
            </div>
        </motion.div>
    )
}
