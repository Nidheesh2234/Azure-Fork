import Link from 'next/link';
import { Facebook, Instagram, Twitter, ArrowUp } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-navy-950 text-white py-20 border-t border-white/10 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">

                    {/* Navigation */}
                    <div className="flex gap-12 md:gap-24 text-lg font-light text-azure-200">
                        <ul className="space-y-4">
                            <li><Link href="#menu" className="hover:text-white transition-colors">Menu</Link></li>
                            <li><Link href="#about" className="hover:text-white transition-colors">Our Story</Link></li>
                            <li><Link href="#gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                        </ul>
                        <ul className="space-y-4">
                            <li><Link href="#reservation" className="hover:text-white transition-colors">Reservations</Link></li>
                            <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors opacity-50">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Socials & Legal */}
                    <div className="text-right ml-auto">
                        <div className="flex gap-6 justify-end mb-6">
                            <Link href="#" className="hover:text-coral transition-colors transform hover:-translate-y-1 duration-300"><Instagram className="w-6 h-6" /></Link>
                            <Link href="#" className="hover:text-coral transition-colors transform hover:-translate-y-1 duration-300"><Twitter className="w-6 h-6" /></Link>
                            <Link href="#" className="hover:text-coral transition-colors transform hover:-translate-y-1 duration-300"><Facebook className="w-6 h-6" /></Link>
                        </div>
                        <div className="text-sm text-white/30 space-x-6">
                            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        </div>
                    </div>
                </div>

                {/* Massive Signature */}
                <div className="border-t border-white/10 pt-10 mt-10 flex flex-col items-center">
                    <h1 className="text-[12vw] leading-none font-serif font-bold tracking-tight text-white/5 select-none hover:text-white/10 transition-colors duration-700 cursor-default">
                        AzureFork
                    </h1>
                </div>

                <div className="md:absolute top-1/2 right-10 -translate-y-1/2 flex justify-end mt-12 md:mt-0">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-white/5 hover:bg-white/10 text-white rounded-full p-8 transition-all hover:scale-110 group"
                    >
                        <ArrowUp className="w-8 h-8 group-hover:-translate-y-2 transition-transform duration-500" />
                    </button>
                </div>

                <div className="text-center mt-12 text-white/20 text-sm">
                    &copy; {new Date().getFullYear()} AzureFork Kitchens. Crafted with passion.
                </div>
            </div>
        </footer>
    )
}
