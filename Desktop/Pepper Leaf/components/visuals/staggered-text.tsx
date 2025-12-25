"use client"

import { motion } from "framer-motion"

export function StaggeredText({ text, className }: { text: string, className?: string }) {
    const letters = text.split("")

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
        }),
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const child: any = {
        visible: {
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hover: {
            y: -4,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            }
        }
    }

    return (
        <motion.span
            className={`inline-flex overflow-hidden ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className="inline-block"
                    whileHover={{ y: -5 }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.span>
    )
}

export function HoverStaggeredText({ text, className }: { text: string, className?: string }) {
    return (
        <div className={`relative overflow-hidden block ${className || ''}`}>
            <div className="block">
                {text.split("").map((l, i) => (
                    <span
                        key={i}
                        className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full"
                        style={{ transitionDelay: `${i * 25}ms` }}
                    >
                        {l === " " ? "\u00A0" : l}
                    </span>
                ))}
            </div>
            <div className="absolute top-0 left-0 block">
                {text.split("").map((l, i) => (
                    <span
                        key={i}
                        className="inline-block translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"
                        style={{ transitionDelay: `${i * 25}ms` }}
                    >
                        {l === " " ? "\u00A0" : l}
                    </span>
                ))}
            </div>
        </div>
    )
}
