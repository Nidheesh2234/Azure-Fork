'use client';

import * as React from 'react';
import Link from 'next/link';
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useReservation } from '@/components/ReservationContext';

const NAV_LINKS = [
    { name: 'Menu', href: '#menu' },
    { name: 'Specials', href: '#specials' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
];

export function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);
    const { openReservation } = useReservation();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                    "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300",
                    isScrolled ? "top-4 w-[98%] max-w-6xl" : "top-8"
                )}
            >
                <div className={cn(
                    "relative flex items-center justify-between px-4 py-3 md:px-6 md:py-3 rounded-full border transition-all duration-300",
                    isScrolled
                        ? "bg-navy-900/60 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20"
                        : "bg-navy-950/40 backdrop-blur-md border-white/5 shadow-none"
                )}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group relative z-10">
                        <div className="bg-azure-500/10 p-2 rounded-full border border-azure-500/20 group-hover:bg-azure-500/20 transition-all duration-500">
                            <UtensilsCrossed className="text-azure-400 h-5 w-5 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                        <span className="text-xl font-serif font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                            AzureFork
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className="relative px-5 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-full"
                            >
                                {link.name}
                                {hoveredLink === link.name && (
                                    <motion.div
                                        layoutId="navHover"
                                        className="absolute inset-0 bg-white/10 rounded-full"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <ThemeToggle />
                        <Button
                            variant="azure"
                            size="sm"
                            onClick={openReservation}
                            className="rounded-full px-6 bg-gradient-to-r from-azure-600 to-azure-500 hover:from-azure-500 hover:to-azure-400 border-0 shadow-lg shadow-azure-900/20"
                        >
                            Book Table
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex lg:hidden items-center gap-2">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:text-white hover:bg-white/10 rounded-full"
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </Button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-navy-950/90 backdrop-blur-xl flex flex-col items-center justify-center lg:hidden"
                    >
                        <div className="flex flex-col items-center gap-6 w-full max-w-sm px-6">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    className="w-full text-center"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-3xl font-serif font-light text-white/80 hover:text-azure-400 transition-colors block py-2"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="w-full pt-8 space-y-4"
                            >
                                <Button size="lg" className="w-full rounded-full bg-azure-600 hover:bg-azure-500 text-lg py-6" onClick={() => { setIsMobileMenuOpen(false); openReservation(); }}>
                                    Reserve a Table
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
