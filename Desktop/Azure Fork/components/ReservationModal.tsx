'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

interface ReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        note: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.date || !formData.time) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);

        toast.success("Table reserved successfully! We'll confirm via WhatsApp.");
        setFormData({ name: '', phone: '', date: '', time: '', guests: '2', note: '' });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-background w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="bg-azure-600 p-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold font-serif">Book a Table</h3>
                                <p className="text-azure-100 text-sm">Reserve your spot at AzureFork</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Contact Details</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        placeholder="Name"
                                        className="input-field border rounded-md px-3 py-2 w-full bg-background"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                    <input
                                        placeholder="Phone"
                                        type="tel"
                                        className="input-field border rounded-md px-3 py-2 w-full bg-background"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Reservation Details</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="date"
                                            className="input-field border rounded-md pl-10 pr-3 py-2 w-full bg-background"
                                            value={formData.date}
                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="time"
                                            className="input-field border rounded-md pl-10 pr-3 py-2 w-full bg-background"
                                            value={formData.time}
                                            onChange={e => setFormData({ ...formData, time: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Guests & Requests</label>
                                <div className="flex gap-4">
                                    <div className="relative w-1/3">
                                        <Users className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                        <select
                                            className="input-field border rounded-md pl-10 pr-3 py-2 w-full bg-background appearance-none"
                                            value={formData.guests}
                                            onChange={e => setFormData({ ...formData, guests: e.target.value })}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, "8+"].map(n => <option key={n} value={n}>{n} Guests</option>)}
                                        </select>
                                    </div>
                                    <input
                                        placeholder="Special request (optional)"
                                        className="input-field border rounded-md px-3 py-2 w-full bg-background flex-1"
                                        value={formData.note}
                                        onChange={e => setFormData({ ...formData, note: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button type="submit" variant="azure" className="w-full mt-2" disabled={isSubmitting}>
                                {isSubmitting ? "Confirming..." : "Confirm Reservation"}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
