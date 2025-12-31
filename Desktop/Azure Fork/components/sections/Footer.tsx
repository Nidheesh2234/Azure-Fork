import Link from 'next/link';
import { Facebook, Instagram, Twitter, UtensilsCrossed } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-navy-950 text-white/80 py-12 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group mb-4">
                            <div className="bg-azure-600 p-1.5 rounded-lg">
                                <UtensilsCrossed className="text-white h-5 w-5" />
                            </div>
                            <span className="text-xl font-serif font-bold text-white">AzureFork</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Premium coastal dining experience bringing the authentic flavors of Andhra to your plate.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#menu" className="hover:text-azure-400 transition-colors">Menu</Link></li>
                            <li><Link href="#about" className="hover:text-azure-400 transition-colors">Our Story</Link></li>
                            <li><Link href="#reservation" className="hover:text-azure-400 transition-colors">Reservations</Link></li>
                            <li><Link href="#contact" className="hover:text-azure-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-azure-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-azure-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-azure-400 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-azure-500 hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-azure-500 hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-azure-500 hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
                    <p>&copy; {new Date().getFullYear()} AzureFork Kitchens. All rights reserved.</p>
                    <p>Designed with ❤️ in Vizag.</p>
                </div>
            </div>
        </footer>
    )
}
