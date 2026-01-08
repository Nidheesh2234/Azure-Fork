'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CateringItem {
    id: string;
    name: string;
    description: string;
    pricePerPerson: number;
    category: 'starters' | 'mains' | 'seafood' | 'desserts' | 'beverages';
    quantity: number;
}

export interface ExtraOption {
    id: string;
    name: string;
    description: string;
    price: number;
    priceType: 'flat' | 'per-person' | 'per-unit';
    enabled: boolean;
    quantity?: number;
}

interface QuoteContextType {
    items: CateringItem[];
    extraOptions: ExtraOption[];
    guestCount: number;
    eventDate: string;
    eventType: string;
    deliveryAddress: string;
    addItem: (item: Omit<CateringItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateItemQuantity: (id: string, quantity: number) => void;
    toggleExtraOption: (id: string) => void;
    updateExtraOptionQuantity: (id: string, quantity: number) => void;
    setGuestCount: (count: number) => void;
    setEventDate: (date: string) => void;
    setEventType: (type: string) => void;
    setDeliveryAddress: (address: string) => void;
    getTotalPrice: () => number;
    clearQuote: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const DEFAULT_EXTRA_OPTIONS: ExtraOption[] = [
    {
        id: 'delivery',
        name: 'Delivery Service',
        description: 'We deliver to your venue with setup',
        price: 2500,
        priceType: 'flat',
        enabled: false,
    },
    {
        id: 'servers',
        name: 'Service Staff',
        description: 'Professional servers for your event',
        price: 1500,
        priceType: 'per-unit',
        enabled: false,
        quantity: 2,
    },
    {
        id: 'live-counter',
        name: 'Live Cooking Counter',
        description: 'Dosa, Grill, or Fry station with chef',
        price: 5000,
        priceType: 'flat',
        enabled: false,
    },
    {
        id: 'premium-cutlery',
        name: 'Premium Eco Cutlery',
        description: 'Upgraded bamboo plates and cutlery',
        price: 50,
        priceType: 'per-person',
        enabled: false,
    },
    {
        id: 'decoration',
        name: 'Table Decorations',
        description: 'Floral and thematic table arrangements',
        price: 3500,
        priceType: 'flat',
        enabled: false,
    },
];

export function QuoteProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CateringItem[]>([]);
    const [extraOptions, setExtraOptions] = useState<ExtraOption[]>(DEFAULT_EXTRA_OPTIONS);
    const [guestCount, setGuestCount] = useState<number>(50);
    const [eventDate, setEventDate] = useState<string>('');
    const [eventType, setEventType] = useState<string>('');
    const [deliveryAddress, setDeliveryAddress] = useState<string>('');

    const addItem = (item: Omit<CateringItem, 'quantity'>) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const updateItemQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
    };

    const toggleExtraOption = (id: string) => {
        setExtraOptions(prev => prev.map(opt =>
            opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
        ));
    };

    const updateExtraOptionQuantity = (id: string, quantity: number) => {
        setExtraOptions(prev => prev.map(opt =>
            opt.id === id ? { ...opt, quantity: Math.max(1, quantity) } : opt
        ));
    };

    const getTotalPrice = () => {
        // Calculate items total
        const itemsTotal = items.reduce((sum, item) => {
            return sum + (item.pricePerPerson * item.quantity * guestCount);
        }, 0);

        // Calculate extras total
        const extrasTotal = extraOptions.reduce((sum, opt) => {
            if (!opt.enabled) return sum;
            switch (opt.priceType) {
                case 'flat':
                    return sum + opt.price;
                case 'per-person':
                    return sum + (opt.price * guestCount);
                case 'per-unit':
                    return sum + (opt.price * (opt.quantity || 1));
                default:
                    return sum;
            }
        }, 0);

        return itemsTotal + extrasTotal;
    };

    const clearQuote = () => {
        setItems([]);
        setExtraOptions(DEFAULT_EXTRA_OPTIONS);
        setGuestCount(50);
        setEventDate('');
        setEventType('');
        setDeliveryAddress('');
    };

    return (
        <QuoteContext.Provider value={{
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
            clearQuote,
        }}>
            {children}
        </QuoteContext.Provider>
    );
}

export function useQuote() {
    const context = useContext(QuoteContext);
    if (context === undefined) {
        throw new Error('useQuote must be used within a QuoteProvider');
    }
    return context;
}
