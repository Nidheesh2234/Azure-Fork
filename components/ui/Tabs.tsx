"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TabsProps {
    categories: string[]
    activeCategory: string
    onCategoryChange: (category: string) => void
    className?: string
}

export function Tabs({ categories, activeCategory, onCategoryChange, className }: TabsProps) {
    return (
        <div className={cn("flex flex-wrap gap-2 justify-center items-center pb-8", className)}>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={cn(
                        "relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors outline-none",
                        activeCategory === category
                            ? "text-white"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    )}
                >
                    {activeCategory === category && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-azure-600 shadow-md shadow-azure-500/20 rounded-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10 tracking-wide">{category}</span>
                </button>
            ))}
        </div>
    )
}
