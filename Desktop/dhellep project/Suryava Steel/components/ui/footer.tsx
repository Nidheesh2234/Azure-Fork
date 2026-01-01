import { siteConfig } from "@/lib/data";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-zinc-950 text-white pt-24 pb-12 border-t border-zinc-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <div className="text-2xl font-display font-bold tracking-tight">SURYAVA STEEL</div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {siteConfig.description}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-primary">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#products" className="hover:text-white transition-colors">Products</Link></li>
                            <li><Link href="#services" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="#projects" className="hover:text-white transition-colors">Projects</Link></li>
                            <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-primary">Contact</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>{siteConfig.contact.phone}</li>
                            <li>{siteConfig.contact.email}</li>
                            <li>{siteConfig.contact.address}</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-primary">Social</h4>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-primary transition-colors text-white">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-900 text-center text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
