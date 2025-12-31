'use client';

import * as React from 'react';
import Link from 'next/link';
import { useScroll, useMotionValueEvent, motion } from 'framer-motion';
import { Menu, X, Phone, UtensilsCrossed } from 'lucide-react';
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
    const [activeSection, setActiveSection] = React.useState('');
    const { openReservation } = useReservation();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    React.useEffect(() => {
        const handleScroll = () => {
            const sections = NAV_LINKS.map(link => link.href.substring(1));
            const scrollPosition = window.scrollY + 200; // Offset for sticky header

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        return;
                    }
                }
            }
            // Reset if at top
            if (window.scrollY < 100) {
                setActiveSection('');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-border/40 shadow-sm py-2"
                    : "bg-transparent py-4 md:py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-azure-500 p-1.5 rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
                        <UtensilsCrossed className="text-white h-6 w-6" />
                    </div>
                    <span className={cn("text-xl md:text-2xl font-serif font-bold tracking-tight transition-colors",
                        isScrolled ? "text-foreground" : "text-white")}>
                        AzureFork
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-6">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-azure-400 relative",
                                isScrolled ? "text-foreground/80" : "text-white/90",
                                activeSection === link.href.substring(1) && "text-azure-500 font-bold"
                            )}
                        >
                            {link.name}
                            {activeSection === link.href.substring(1) && (
                                <motion.div
                                    layoutId="activeNavIndicator"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-azure-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-3">
                    <ThemeToggle />
                    <Button variant="azure" size="sm" onClick={openReservation}>
                        Book a Table
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <div className="flex lg:hidden items-center gap-2">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(isScrolled ? "text-foreground" : "text-white hover:bg-white/10")}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-xl lg:hidden animate-in slide-in-from-top-2">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "text-lg font-medium py-2 border-b border-border/50 last:border-0 hover:text-azure-500 transition-colors",
                                activeSection === link.href.substring(1) ? "text-azure-500 font-bold" : "text-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 mt-2">
                        <Button variant="azure" className="w-full" onClick={() => { setIsMobileMenuOpen(false); openReservation(); }}>Book a Table</Button>
                        <Button variant="outline" className="w-full">WhatsApp Order</Button>
                    </div>
                </div>
            )}
        </header>
    );
}
