'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all fields.");
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <Section id="contact" className="bg-navy-950 text-white py-32 relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-azure-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row gap-20">

                {/* Text Content */}
                <div className="md:w-1/2 space-y-12">
                    <div>
                        <span className="text-azure-400 font-bold uppercase tracking-[0.2em] text-sm block mb-6">Contact Us</span>
                        <h2 className="text-6xl md:text-8xl font-serif leading-[0.9]">
                            Let's Start a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-sand">Conversation.</span>
                        </h2>
                    </div>

                    <div className="space-y-6 text-xl font-light text-azure-100/70">
                        <p>Dining Reservations, Private Events, or just say hello.</p>
                        <div className="block h-px w-20 bg-white/20" />
                        <div className="space-y-2">
                            <p className="font-sans font-medium text-white">Vizag Location</p>
                            <p>MVP Colony, Sector 2<br />Visakhapatnam, AP 530017</p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-sans font-medium text-white">Opening Hours</p>
                            <p>Tue - Sun: 11:00 AM - 11:00 PM<br />Mon: Closed</p>
                        </div>
                    </div>
                </div>

                {/* Minimalist Form */}
                <div className="md:w-1/2">
                    <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="space-y-8">
                            <div className="relative group">
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-2xl font-serif focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-2xl font-serif focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                                    placeholder="Your Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="relative group">
                                <textarea
                                    id="message"
                                    required
                                    rows={3}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-2xl font-serif focus:outline-none focus:border-white transition-colors placeholder:text-white/20 resize-none"
                                    placeholder="Your Message..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-white text-navy-950 hover:bg-azure-50 px-10 py-8 rounded-full text-xl font-medium w-full md:w-auto flex items-center justify-between group"
                        >
                            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                            <div className="bg-navy-950 text-white rounded-full p-2 ml-4 group-hover:rotate-45 transition-transform duration-500">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </Button>
                    </form>
                </div>
            </div>
        </Section>
    )
}
