"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
    return (
        <div
            className="fixed bottom-0 w-full h-[500px] bg-pepper-900 text-pepper-50 z-0 flex items-center justify-center"
            style={{ height: '500px' }} // Fixed height for reveal calculation
        >
            <div className="container px-4 grid md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <h3 className="font-serif text-3xl font-bold">PepperLeaf</h3>
                    <p className="text-pepper-200/80 max-w-xs">
                        Handcrafted small-batch spices and pickles.
                        Made with love, stone-ground, and sun-dried.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-pepper-100 uppercase tracking-widest text-sm">Shop</h4>
                    <ul className="space-y-4 text-pepper-200/80">
                        <li><Link href="#" className="hover:text-pepper-50 transition-colors">Best Sellers</Link></li>
                        <li><Link href="#" className="hover:text-pepper-50 transition-colors">Spices</Link></li>
                        <li><Link href="#" className="hover:text-pepper-50 transition-colors">Pickles</Link></li>
                        <li><Link href="#" className="hover:text-pepper-50 transition-colors">Gift Boxes</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-pepper-100 uppercase tracking-widest text-sm">Company</h4>
                    <ul className="space-y-4 text-pepper-200/80">
                        <li><Link href="#" className="hover:text-pepper-50 transition-colors">Our Story</Link></li>
                        <li><Link href="#" className="hover:text-pepper-50 transition-colors">Contact</Link></li>
                        <li><Link href="#" className="hover:text-pepper-50 transition-colors">FAQ</Link></li>
                        <li><Link href="#" className="hover:text-pepper-50 transition-colors">Shipping Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-pepper-100 uppercase tracking-widest text-sm">Stay Spicy</h4>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-pepper-800/50 border-pepper-700 text-pepper-50 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pepper-500"
                        />
                        <button className="bg-pepper-500 hover:bg-pepper-400 text-white px-4 py-2 rounded-lg transition-colors">
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
