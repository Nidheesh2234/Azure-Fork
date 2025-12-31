'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    id?: string;
    className?: string;
    containerClassName?: string;
}

export function Section({ children, id, className, containerClassName, ...props }: SectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

    return (
        <section
            ref={ref}
            id={id}
            className={cn("py-20 md:py-32 relative overflow-hidden", className)}
            {...props}
        >
            <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // smooth easeOutCubic/Quint
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
