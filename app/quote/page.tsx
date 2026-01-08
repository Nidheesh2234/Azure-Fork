'use client';

import { useState } from 'react';
import { useQuote, CateringItem } from '@/components/QuoteContext';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowLeft,
    Plus,
    Minus,
    Trash2,
    Truck,
    Users,
    ChefHat,
    Utensils,
    Sparkles,
    Send,
    ShoppingCart,
    Calendar,
    MapPin
} from 'lucide-react';
import { toast } from 'sonner';

// Sample menu items for catering
const CATERING_MENU: Omit<CateringItem, 'quantity'>[] = [
    // Starters
    { id: 'prawns-65', name: 'Prawns 65', description: 'Crispy fried prawns with Andhra spices', pricePerPerson: 150, category: 'starters' },
    { id: 'fish-fry', name: 'Apollo Fish Fry', description: 'Signature crispy fish with curry leaves', pricePerPerson: 180, category: 'starters' },
    { id: 'chicken-65', name: 'Chicken 65', description: 'Spicy deep-fried chicken bites', pricePerPerson: 120, category: 'starters' },
    { id: 'crab-claws', name: 'Crab Claws Fry', description: 'Premium crab claws with masala', pricePerPerson: 250, category: 'starters' },

    // Mains
    { id: 'chicken-biryani', name: 'Hyderabadi Chicken Biryani', description: 'Aromatic dum-cooked biryani', pricePerPerson: 200, category: 'mains' },
    { id: 'mutton-biryani', name: 'Mutton Biryani', description: 'Rich mutton biryani with saffron', pricePerPerson: 280, category: 'mains' },
    { id: 'veg-biryani', name: 'Vegetable Biryani', description: 'Garden fresh vegetables in spiced rice', pricePerPerson: 150, category: 'mains' },
    { id: 'chicken-curry', name: 'Country Chicken Curry', description: 'Free-range chicken in spicy gravy', pricePerPerson: 180, category: 'mains' },

    // Seafood Specials
    { id: 'prawn-curry', name: 'Royyala Iguru', description: 'Prawns in Andhra tomato-onion gravy', pricePerPerson: 220, category: 'seafood' },
    { id: 'fish-curry', name: 'Chepala Pulusu', description: 'Tangy tamarind fish curry', pricePerPerson: 190, category: 'seafood' },
    { id: 'crab-masala', name: 'Crab Masala', description: 'Fresh crab in aromatic spices', pricePerPerson: 320, category: 'seafood' },
    { id: 'lobster-special', name: 'Lobster Butter Garlic', description: 'Premium lobster with garlic butter', pricePerPerson: 500, category: 'seafood' },

    // Desserts
    { id: 'double-ka-meetha', name: 'Double Ka Meetha', description: 'Hyderabadi bread pudding', pricePerPerson: 80, category: 'desserts' },
    { id: 'gulab-jamun', name: 'Gulab Jamun', description: 'Soft milk dumplings in syrup', pricePerPerson: 60, category: 'desserts' },
    { id: 'payasam', name: 'Semiya Payasam', description: 'Vermicelli kheer with nuts', pricePerPerson: 70, category: 'desserts' },

    // Beverages
    { id: 'lassi', name: 'Sweet Lassi', description: 'Creamy yogurt drink', pricePerPerson: 50, category: 'beverages' },
    { id: 'buttermilk', name: 'Masala Chaas', description: 'Spiced buttermilk', pricePerPerson: 40, category: 'beverages' },
    { id: 'filter-coffee', name: 'Filter Coffee', description: 'South Indian style coffee', pricePerPerson: 45, category: 'beverages' },
];

const CATEGORY_LABELS: Record<string, string> = {
    starters: '🍤 Starters',
    mains: '🍛 Main Course',
    seafood: '🦀 Seafood Specials',
    desserts: '🍮 Desserts',
    beverages: '☕ Beverages',
};

const EXTRA_OPTION_ICONS: Record<string, React.ReactNode> = {
    'delivery': <Truck className="w-5 h-5" />,
    'servers': <Users className="w-5 h-5" />,
    'live-counter': <ChefHat className="w-5 h-5" />,
    'premium-cutlery': <Utensils className="w-5 h-5" />,
    'decoration': <Sparkles className="w-5 h-5" />,
};

export default function QuotePage() {
    const {
        items,
        extraOptions,
        guestCount,
        eventDate,
        eventType,
        deliveryAddress,
        addItem,
        removeItem,
        updateItemQuantity,
        toggleExtraOption,
        updateExtraOptionQuantity,
        setGuestCount,
        setEventDate,
        setEventType,
        setDeliveryAddress,
        getTotalPrice,
    } = useQuote();

    const [activeCategory, setActiveCategory] = useState<string>('starters');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredMenu = CATERING_MENU.filter(item => item.category === activeCategory);

    const handleSubmitQuote = async () => {
        if (!contactName || !contactPhone || !eventDate || items.length === 0) {
            toast.error('Please fill in required fields and add at least one item');
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Quote request submitted! We will contact you within 24 hours.');
        setIsSubmitting(false);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const deliveryOption = extraOptions.find(o => o.id === 'delivery');

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-navy-900 text-white py-6 sticky top-0 z-50 shadow-lg">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <h1 className="text-2xl font-serif font-bold">Request a Catering Quote</h1>
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="bg-azure-500 text-white text-sm px-2 py-0.5 rounded-full">
                            {items.length}
                        </span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Panel - Menu Selection */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Event Details */}
                        <Section className="bg-white dark:bg-navy-800/50 rounded-2xl p-6 shadow-lg border border-border">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-azure-500" />
                                Event Details
                            </h2>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2">Event Type *</label>
                                    <select
                                        value={eventType}
                                        onChange={(e) => setEventType(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-azure-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select type</option>
                                        <option value="wedding">Wedding</option>
                                        <option value="corporate">Corporate Event</option>
                                        <option value="birthday">Birthday Party</option>
                                        <option value="anniversary">Anniversary</option>
                                        <option value="religious">Religious Ceremony</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2">Event Date *</label>
                                    <input
                                        type="date"
                                        value={eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-azure-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2">Number of Guests *</label>
                                    <input
                                        type="number"
                                        value={guestCount}
                                        onChange={(e) => setGuestCount(Math.max(10, parseInt(e.target.value) || 10))}
                                        min={10}
                                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-azure-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                        </Section>

                        {/* Menu Selection */}
                        <Section className="bg-white dark:bg-navy-800/50 rounded-2xl p-6 shadow-lg border border-border">
                            <h2 className="text-xl font-bold mb-6">Select Menu Items</h2>

                            {/* Category Tabs */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveCategory(key)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === key
                                                ? 'bg-azure-500 text-white shadow-lg'
                                                : 'bg-muted text-muted-foreground hover:bg-azure-100 dark:hover:bg-navy-700'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            {/* Menu Items Grid */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                {filteredMenu.map((item) => {
                                    const inCart = items.find(i => i.id === item.id);
                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`p-4 rounded-xl border transition-all ${inCart
                                                    ? 'border-azure-500 bg-azure-50 dark:bg-azure-900/20'
                                                    : 'border-border hover:border-azure-300'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-bold text-foreground">{item.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                                </div>
                                                <span className="text-azure-600 dark:text-azure-400 font-bold whitespace-nowrap">
                                                    {formatPrice(item.pricePerPerson)}/pp
                                                </span>
                                            </div>

                                            {inCart ? (
                                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => updateItemQuantity(item.id, inCart.quantity - 1)}
                                                            className="w-8 h-8 rounded-full bg-azure-100 dark:bg-azure-900/30 flex items-center justify-center hover:bg-azure-200 transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="font-bold w-6 text-center">{inCart.quantity}</span>
                                                        <button
                                                            onClick={() => updateItemQuantity(item.id, inCart.quantity + 1)}
                                                            className="w-8 h-8 rounded-full bg-azure-100 dark:bg-azure-900/30 flex items-center justify-center hover:bg-azure-200 transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-red-500 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <Button
                                                    variant="azure"
                                                    size="sm"
                                                    className="w-full mt-3"
                                                    onClick={() => addItem(item)}
                                                >
                                                    <Plus className="w-4 h-4 mr-1" /> Add to Quote
                                                </Button>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </Section>

                        {/* Extra Options */}
                        <Section className="bg-white dark:bg-navy-800/50 rounded-2xl p-6 shadow-lg border border-border">
                            <h2 className="text-xl font-bold mb-6">Additional Services</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {extraOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        className={`p-4 rounded-xl border transition-all cursor-pointer ${option.enabled
                                                ? 'border-azure-500 bg-azure-50 dark:bg-azure-900/20'
                                                : 'border-border hover:border-azure-300'
                                            }`}
                                        onClick={() => toggleExtraOption(option.id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 rounded-lg ${option.enabled ? 'bg-azure-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                                                {EXTRA_OPTION_ICONS[option.id]}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-bold text-foreground">{option.name}</h3>
                                                    <input
                                                        type="checkbox"
                                                        checked={option.enabled}
                                                        onChange={() => { }}
                                                        className="w-5 h-5 rounded border-border text-azure-500 focus:ring-azure-500"
                                                    />
                                                </div>
                                                <p className="text-sm text-muted-foreground">{option.description}</p>
                                                <p className="text-sm font-medium text-azure-600 dark:text-azure-400 mt-1">
                                                    {formatPrice(option.price)}
                                                    {option.priceType === 'per-person' && '/person'}
                                                    {option.priceType === 'per-unit' && '/person'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quantity control for per-unit options */}
                                        {option.enabled && option.priceType === 'per-unit' && (
                                            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border" onClick={e => e.stopPropagation()}>
                                                <span className="text-sm text-muted-foreground">Quantity:</span>
                                                <button
                                                    onClick={() => updateExtraOptionQuantity(option.id, (option.quantity || 1) - 1)}
                                                    className="w-8 h-8 rounded-full bg-azure-100 dark:bg-azure-900/30 flex items-center justify-center hover:bg-azure-200 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="font-bold w-6 text-center">{option.quantity || 1}</span>
                                                <button
                                                    onClick={() => updateExtraOptionQuantity(option.id, (option.quantity || 1) + 1)}
                                                    className="w-8 h-8 rounded-full bg-azure-100 dark:bg-azure-900/30 flex items-center justify-center hover:bg-azure-200 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Delivery Address */}
                            <AnimatePresence>
                                {deliveryOption?.enabled && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 overflow-hidden"
                                    >
                                        <div className="p-4 rounded-xl bg-azure-50 dark:bg-azure-900/20 border border-azure-200 dark:border-azure-700">
                                            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                                <MapPin className="w-4 h-4 text-azure-500" />
                                                Delivery Address *
                                            </label>
                                            <textarea
                                                value={deliveryAddress}
                                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                                placeholder="Enter complete delivery address with landmarks..."
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-azure-500 focus:border-transparent transition-all resize-none"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Section>
                    </div>

                    {/* Right Panel - Quote Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Order Summary */}
                            <div className="bg-white dark:bg-navy-800/50 rounded-2xl p-6 shadow-lg border border-border">
                                <h2 className="text-xl font-bold mb-4">Quote Summary</h2>

                                {/* Guest count display */}
                                <div className="flex items-center justify-between text-sm mb-4 p-3 bg-muted rounded-lg">
                                    <span className="text-muted-foreground">Number of Guests</span>
                                    <span className="font-bold">{guestCount}</span>
                                </div>

                                {/* Selected Items */}
                                <div className="space-y-3 mb-4">
                                    {items.length === 0 ? (
                                        <p className="text-muted-foreground text-center py-4">No items selected yet</p>
                                    ) : (
                                        items.map((item) => (
                                            <div key={item.id} className="flex justify-between items-start text-sm">
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-muted-foreground">
                                                        {item.quantity}x × {guestCount} guests
                                                    </p>
                                                </div>
                                                <span className="font-medium">
                                                    {formatPrice(item.pricePerPerson * item.quantity * guestCount)}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Extra Options */}
                                {extraOptions.filter(o => o.enabled).length > 0 && (
                                    <>
                                        <hr className="border-border my-4" />
                                        <p className="text-sm font-medium mb-3">Additional Services</p>
                                        <div className="space-y-2 mb-4">
                                            {extraOptions.filter(o => o.enabled).map((option) => (
                                                <div key={option.id} className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        {option.name}
                                                        {option.priceType === 'per-unit' && ` (×${option.quantity})`}
                                                    </span>
                                                    <span className="font-medium">
                                                        {formatPrice(
                                                            option.priceType === 'flat' ? option.price :
                                                                option.priceType === 'per-person' ? option.price * guestCount :
                                                                    option.price * (option.quantity || 1)
                                                        )}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* Total */}
                                <hr className="border-border my-4" />
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-bold">Estimated Total</span>
                                    <span className="text-2xl font-bold text-azure-600 dark:text-azure-400">
                                        {formatPrice(getTotalPrice())}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    *Final price may vary based on customizations
                                </p>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-white dark:bg-navy-800/50 rounded-2xl p-6 shadow-lg border border-border">
                                <h2 className="text-xl font-bold mb-4">Contact Details</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">Your Name *</label>
                                        <input
                                            type="text"
                                            value={contactName}
                                            onChange={(e) => setContactName(e.target.value)}
                                            placeholder="Full name"
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-azure-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={contactPhone}
                                            onChange={(e) => setContactPhone(e.target.value)}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-azure-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">Email (Optional)</label>
                                        <input
                                            type="email"
                                            value={contactEmail}
                                            onChange={(e) => setContactEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-azure-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">Special Requests</label>
                                        <textarea
                                            value={specialRequests}
                                            onChange={(e) => setSpecialRequests(e.target.value)}
                                            placeholder="Any dietary restrictions, specific requirements..."
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-azure-500 focus:border-transparent transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <Button
                                    variant="azure"
                                    size="lg"
                                    className="w-full mt-6"
                                    onClick={handleSubmitQuote}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                            Submitting...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Send className="w-5 h-5" />
                                            Request Quote
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
