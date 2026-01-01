"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Phone, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

export function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-border py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 z-50">
                    <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center font-bold text-white font-display text-xl hover-scale">
                        S
                    </div>
                    <span className={cn("font-display font-bold text-xl tracking-tight uppercase", scrolled ? "text-foreground" : "text-foreground/90")}>
                        Suryava Steel
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {["Products", "Services", "Process", "Projects", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors uppercase tracking-wide"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full hover:bg-secondary/10 transition-colors"
                    >
                        <Sun className="h-5 w-5 dark:hidden" />
                        <Moon className="h-5 w-5 hidden dark:block" />
                    </button>
                    <a
                        href={siteConfig.contact.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-secondary text-secondary-foreground hover:bg-primary transition-colors px-4 py-2 rounded-sm text-sm font-medium btn-depth"
                    >
                        WhatsApp
                    </a>
                    <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="bg-primary text-white hover:bg-orange-600 transition-colors px-4 py-2 rounded-sm text-sm font-medium flex items-center gap-2 btn-depth"
                    >
                        <Phone className="h-4 w-4" />
                        Get Quote
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        "fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden",
                        isOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    {["Products", "Services", "Process", "Projects", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-display font-bold uppercase text-foreground hover:text-primary transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full hover:bg-secondary/10 transition-colors"
                    >
                        {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
