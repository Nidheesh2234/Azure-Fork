"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

import { ScrollReveal } from "@/components/visuals/scroll-reveal"

const reviews = [
    { name: "Priya R.", city: "Hyderabad", text: "The gongura pickle tastes exactly like my grandmother's. Absolutely authentic!", rating: 5 },
    { name: "Arjun K.", city: "Bangalore", text: "Finally found a brand that doesn't use vinegar or preservatives. The garlic podi is a game changer.", rating: 5 },
    { name: "Sneha M.", city: "Mumbai", text: "Packaging is so premium, I gifted the box to my boss and she loved it.", rating: 5 },
]

export function Reviews() {
    return (
        <section id="reviews" className="py-24 bg-pepper-900 text-pepper-50">
            <div className="container px-4">
                <ScrollReveal>
                    <h2 className="text-4xl font-serif font-bold text-center mb-12">Love from our Family</h2>
                </ScrollReveal>
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((r, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <Card className="bg-white/5 border-white/10 text-pepper-50 backdrop-blur-md h-full hover:bg-white/10 transition-colors">
                                <CardContent className="p-8 space-y-4">
                                    <div className="flex gap-1">
                                        {[...Array(r.rating)].map((_, i) => <Star key={i} className="fill-turmeric-500 text-turmeric-500 w-4 h-4" />)}
                                    </div>
                                    <p className="italic opacity-90">&quot;{r.text}&quot;</p>
                                    <div>
                                        <div className="font-bold">{r.name}</div>
                                        <div className="text-sm opacity-60 m-0">{r.city}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
