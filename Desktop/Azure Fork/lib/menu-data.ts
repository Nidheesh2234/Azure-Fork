export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
    veg: boolean;
    spicy?: boolean;
    bestseller?: boolean;
};

export const MENU_CATEGORIES = ["Starters", "Seafood", "Mains", "Biryani", "Desserts", "Beverages"];

export const MENU_ITEMS: MenuItem[] = [
    {
        id: 's1',
        name: "Vizag 'Beach Rd' Chilli Prawns",
        description: "Crispy fried fresh prawns tossed in a fiery green chilli and curry leaf masala.",
        price: "₹450",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", // Prawns/Seafood
        veg: false,
        spicy: true,
        bestseller: true,
    },
    {
        id: 's2',
        name: "Guntur Karam Kodi Vepudu",
        description: "Boneless chicken cubes wok-tossed with Guntur red chillies and cashew powder.",
        price: "₹380",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800", // Spicy Chicken
        veg: false,
        spicy: true,
    },
    {
        id: 's3',
        name: "Crispy Corn Kernels",
        description: "Sweet corn fried golden brown and dusted with pepper and sea salt.",
        price: "₹290",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&q=80&w=800", // Corn/Fried
        veg: true,
    },
    {
        id: 'f1',
        name: "Signature Clay Pot Fish Curry",
        description: "Seer fish simmered in a tangy tamarind and tomato gravy, served in a clay pot.",
        price: "₹550",
        category: "Seafood",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800", // Fish Curry style
        veg: false,
        spicy: true,
        bestseller: true,
    },
    {
        id: 'f2',
        name: "Butter Garlic Prawns",
        description: "Jumbo prawns sautéed in rich butter, garlic, and fresh parsley sauce.",
        price: "₹520",
        category: "Seafood",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800", // Fried/Sauted Dish
        veg: false,
    },
    {
        id: 'm1',
        name: "AzureFork Special Thali",
        description: "A grand feast with 2 veg curries, dal, sambar, rasam, flavored rice, roti, and sweet.",
        price: "₹350",
        category: "Mains",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800", // Meals/Thali
        veg: true,
        bestseller: true,
    },
    {
        id: 'm2',
        name: "Andhra Chicken Curry",
        description: "Homestyle chicken curry cooked with poppy seeds and coconut paste.",
        price: "₹420",
        category: "Mains",
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800", // Curry
        veg: false,
        spicy: true,
    },
    {
        id: 'b1',
        name: "Ulavacharu Chicken Biryani",
        description: "Long grain aromatic basmati rice cooked with horse gram sauce and tender chicken.",
        price: "₹480",
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800", // Biryani
        veg: false,
        spicy: true,
        bestseller: true,
    },
    {
        id: 'b2',
        name: "Prawns Fry Piece Biryani",
        description: "Flavorful biryani rice served with a generous portion of spicy prawn fry.",
        price: "₹520",
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800", // Biryani
        veg: false,
        spicy: true,
    },
    {
        id: 'd1',
        name: "Junnu (Kharvas)",
        description: "Traditional milk pudding made with colostrum milk and jaggery.",
        price: "₹150",
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800", // Dessert/Pudding
        veg: true,
    },
    {
        id: 'bev1',
        name: "Rose Milk",
        description: "Chilled milk with homemade rose syrup and sabja seeds.",
        price: "₹120",
        category: "Beverages",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800", // Drink/Shake
        veg: true,
    },
];

export const CHEF_SPECIALS = [
    {
        id: 'cs1',
        title: "Whole Grilled Pomfret",
        subtitle: "Tandoori Marinade",
        image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&q=80&w=800", // Grilled Fish
        description: "Fresh catch of the day, marinated in our secret tandoori spice blend and grilled to perfection over charcoal.",
    },
    {
        id: 'cs2',
        title: "Bamboo Chicken",
        subtitle: "Araku Style",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=800", // Chicken/Food
        description: "Chicken marinated in local herbs, stuffed inside bamboo shoots and slow-cooked over open fire without oil.",
    },
    {
        id: 'cs3',
        title: "Lobster Thermidor",
        subtitle: "Coastal Fusion",
        image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&q=80&w=800", // Lobster
        description: "Fresh lobster meat cooked in a rich creamy sauce with egg yolks and brandy, topped with oven-browned cheese.",
    },
];

export const REVIEWS = [
    {
        id: 'r1',
        name: "Arjun Reddy",
        city: "Visakhapatnam",
        rating: 5,
        text: "The best seafood place in Vizag! The Crab Fry was absolutely authentic and the service was top notch. Highly recommended for family dinners.",
        source: "Google",
    },
    {
        id: 'r2',
        name: "Sneha Gupta",
        city: "Hyderabad",
        rating: 5,
        text: "Visited during my vacation. The ambiance is stunning, especially the ocean theme. The Prawn Biryani is a must-try!",
        source: "Zomato",
    },
    {
        id: 'r3',
        name: "Michael Chen",
        city: "Tourist",
        rating: 4,
        text: "Fresh catch indeed. The grilled fish was juicy and flavorful. A bit spicy for my taste but manageable. Great view!",
        source: "Google",
    },
];
