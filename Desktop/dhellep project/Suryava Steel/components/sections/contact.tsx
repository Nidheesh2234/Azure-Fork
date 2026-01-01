"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { Send, Phone, Mail, MapPin } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-24 bg-surface dark:bg-zinc-900/50">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">

                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <span className="text-primary font-medium tracking-wider uppercase text-sm">Get In Touch</span>
                            <h2 className="text-3xl md:text-5xl font-display font-bold mt-2 mb-6">
                                Ready to Build?
                            </h2>
                            <p className="text-gray-500 mb-8 text-lg">
                                Contact us for a detailed quote or to discuss your specific fabrication requirements.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-background rounded-sm border border-border mt-1 depth-2 hover-lift-sm">
                                    <Phone className="w-5 h-5 text-primary icon-hover" />
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Call Us</div>
                                    <div className="text-gray-500">{siteConfig.contact.phone}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-background rounded-sm border border-border mt-1 depth-2 hover-lift-sm">
                                    <Mail className="w-5 h-5 text-primary icon-hover" />
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Email Us</div>
                                    <div className="text-gray-500">{siteConfig.contact.email}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-background rounded-sm border border-border mt-1 depth-2 hover-lift-sm">
                                    <MapPin className="w-5 h-5 text-primary icon-hover" />
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Visit Us</div>
                                    <div className="text-gray-500 max-w-xs">{siteConfig.contact.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                        className="bg-card p-8 rounded-sm border border-border depth-3 hover-glow"
                    >
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all input-focus-glow" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Company</label>
                                    <input type="text" className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all input-focus-glow" placeholder="Tech Infra Ltd" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input type="email" className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all input-focus-glow" placeholder="john@company.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Requirements</label>
                                <textarea className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-[120px] input-focus-glow" placeholder="Kind of steel, quantity, project details..." />
                            </div>

                            <button className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-2 btn-depth">
                                <Send className="w-4 h-4" />
                                Request Quote
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
