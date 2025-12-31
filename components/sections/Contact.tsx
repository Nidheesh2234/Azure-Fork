'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

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
        <Section id="contact" className="bg-azure-50 dark:bg-navy-900 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-azure-200/20 dark:bg-azure-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <div className="text-center mb-12">
                    <span className="text-azure-600 dark:text-azure-400 font-bold uppercase tracking-widest text-sm">Get in Touch</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2">Have a question?</h2>
                </div>

                <div className="bg-white dark:bg-navy-800 p-8 md:p-12 rounded-2xl shadow-xl border border-border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <textarea
                                id="message"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                placeholder="How can we help you?"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <Button type="submit" variant="azure" className="w-full md:w-auto min-w-[200px]" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </div>
            </div>
        </Section>
    )
}
