"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/visuals/scroll-reveal"
import { ProductCard } from "@/components/visuals/product-card"

const products = [
    {
        id: 1,
        name: "Gongura Pickle",
        desc: "Tangy sorrel leaves with Guntur chilli.",
        price: "₹349",
        heat: 4,
        image: "https://images.unsplash.com/photo-1589135233689-d53896564993?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Avakaya Pickle",
        desc: "The legendary Andhra mango pickle.",
        price: "₹349",
        heat: 5,
        image: "https://images.unsplash.com/photo-1628103448831-2947d102070b?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Garlic Podi",
        desc: "Crunchy, spicy garlic sprinkle.",
        price: "₹249",
        heat: 3,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Sambar Masala",
        desc: "Traditional slow-roast blend.",
        price: "₹199",
        heat: 2,
        image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Chettinad Masala",
        desc: "Complex, aromatic, and bold.",
        price: "₹229",
        heat: 4,
        image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Curry Leaf Podi",
        desc: "Aromatic karivepaku powder.",
        price: "₹249",
        heat: 2,
        image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=600&auto=format&fit=crop"
    }
]

export function BestSellers() {
    return (
        <section id="best-sellers" className="py-24 bg-background">
            <div className="container px-4">
                <div className="text-center mb-16 space-y-4">
                    <Badge variant="pepper" className="mb-2 uppercase tracking-widest">Customer Favorites</Badge>
                    <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">Our Best Sellers</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Traditional recipes passed down through generations. Made in small batches every week.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <ScrollReveal key={product.id} delay={index * 0.1}>
                            <ProductCard
                                title={product.name}
                                price={product.price}
                                image={product.image}
                                tag={product.heat > 3 ? "Spicy" : "Classic"}
                            />
                        </ScrollReveal>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button variant="outline" size="lg" className="rounded-full px-8 hover:bg-pepper-50 hover:text-pepper-700 hover:border-pepper-300">
                        View All Products
                    </Button>
                </div>
            </div>
        </section>
    )
}
