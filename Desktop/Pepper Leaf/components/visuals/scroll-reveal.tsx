"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
    children: ReactNode
    className?: string
    direction?: "up" | "down" | "left" | "right"
    delay?: number
    duration?: number
    amount?: number | "some" | "all"
}

export function ScrollReveal({
    children,
    className,
    direction = "up",
    delay = 0,
    duration = 0.5,
    amount = 0.3
}: ScrollRevealProps) {

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuad-ish
            }
        }
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount }}
            variants={variants}
            className={cn(children == null ? "hidden" : "block", className)}
        >
            {children}
        </motion.div>
    )
}
