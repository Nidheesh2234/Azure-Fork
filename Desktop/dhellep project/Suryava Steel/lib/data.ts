import { Factory, Truck, Award, ShieldCheck, HardHat, Anchor, Layers, Box, PenTool, ClipboardCheck, Users, Phone, Mail } from "lucide-react";

export const siteConfig = {
    name: "Suryava Steel & Infra Supplies",
    description: "Premium steel supply and fabrication services in Visakhapatnam. Verified weights, on-time delivery, quality-first.",
    contact: {
        phone: "+91 98765 43210",
        email: "sales@suryavasteel.com",
        address: "Plot 42, Industrial Park, Visakhapatnam, AP",
        whatsapp: "https://wa.me/919876543210"
    }
}

export const products = [
    {
        id: "tmt-bars",
        name: "TMT Bars (Fe 500D)",
        description: "High-grade TMT bars for superior structural integrity. Available in 8mm to 32mm.",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
        specs: ["Fe 500D Grade", "Corrosion Resistant", "High Ductility"]
    },
    {
        id: "structural-steel",
        name: "Structural Steel Beams",
        description: "Heavy-duty I-beams and H-beams for industrial construction frameworks.",
        image: "https://images.unsplash.com/photo-1530639834082-05bafb67fbbe?auto=format&fit=crop&q=80&w=800",
        specs: ["IS 2062 Grade", "Custom Cut Lengths", "Standard Sections"]
    },
    {
        id: "steel-plates",
        name: "MS Plates & Sheets",
        description: "Versatile mild steel plates for fabrication, shipbuilding, and infrastructure.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
        specs: ["Thickness: 2mm-100mm", "Boiler Quality Avail.", "Laser Cut Capable"]
    },
    {
        id: "pipes-tubes",
        name: "Pipes & Hollow Sections",
        description: "Round, square, and rectangular hollow sections for trusses and scaffolding.",
        image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=800",
        specs: ["ERW & Seamless", "Galvanized Options", "Heavy Wall Thickness"]
    }
];

export const services = [
    {
        id: "supply",
        title: "Bulk Material Supply",
        description: "Direct-from-mill supply of steel for large-scale infrastructure projects with verified weighbridge slips.",
        icon: Truck
    },
    {
        id: "fabrication",
        title: "Custom Fabrication",
        description: "Precision cutting, bending, and welding of structural components in our advanced workshop.",
        icon: Factory
    },
    {
        id: "logistics",
        title: "Site Delivery Logistics",
        description: "End-to-end logistics with GPS-tracked fleet ensuring materials reach your site on schedule.",
        icon: Anchor
    },
    {
        id: "consulting",
        title: "Project Consultation",
        description: "Expert advice on material selection and quantity estimation to reduce wastage by up to 15%.",
        icon: ClipboardCheck
    }
];

export const industries = [
    { name: "Construction", icon: HardHat, image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600" },
    { name: "Shipbuilding", icon: Anchor, image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=600" },
    { name: "Manufacturing", icon: Factory, image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=600" },
    { name: "Infrastructure", icon: Layers, image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=600" },
];

export const processSteps = [
    {
        step: "01",
        title: "Order & Verification",
        description: "Your requirements are verified against our inventory. Weights conform to IS standards.",
    },
    {
        step: "02",
        title: "Quality Check",
        description: "Visual inspection and spectro analysis to ensure material grade compliance.",
    },
    {
        step: "03",
        title: "Custom Processing",
        description: "Cutting, bending, or fabrication as per your project blueprints.",
    },
    {
        step: "04",
        title: "Dispatch & Tracking",
        description: "Loaded onto GPS-enabled trucks. Live updates shared until site arrival.",
    }
];

export const projects = [
    {
        id: 1,
        title: "Vizag Port Warehouse",
        category: "Industrial",
        outcome: "Delivered 500MT Structural Steel",
        image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800",
        description: "Complete structural framework for a 50,000 sq.ft automated warehouse."
    },
    {
        id: 2,
        title: "Tech Park High-Rise",
        category: "Commercial",
        outcome: "Reduced wastage by 12%",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=800",
        description: "Supply of high-ductility TMT bars for a 20-story IT park tower."
    },
    {
        id: 3,
        title: "Naval Dockyard Shed",
        category: "Defense",
        outcome: "Completed in 45 Days",
        image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
        description: "Heavy fabrication and erection of specialized storage sheds."
    },
    {
        id: 4,
        title: "Coastal Highway Bridge",
        category: "Infrastructure",
        outcome: "On-time delivery for 18 months",
        image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800",
        description: "Continuous supply of corrosion-resistant steel for coastal bridge works."
    },
    {
        id: 5,
        title: "Pharmaceutical Plant",
        category: "Industrial",
        outcome: "Zero Defect Compliance",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800",
        description: "Stainless steel pipe network and structural supports for a pharma unit."
    },
    {
        id: 6,
        title: "Residential Township",
        category: "Housing",
        outcome: "Supplied 2000+ MT",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
        description: "Phase-wise delivery synchronized with construction milestones."
    }
];

export const testimonials = [
    {
        name: "Rajesh Kumar",
        role: "Project Manager, L&T Construction",
        content: "Suryava's adherence to weight and quality standards is unmatched. Their timely delivery helped us stay on schedule for the metro project.",
        rating: 5
    },
    {
        name: "David Reddy",
        role: "Director, Vizag Infra",
        content: "The transparency in pricing and the digital tracking of shipments gave us complete peace of mind. A truly professional steel partner.",
        rating: 5
    },
    {
        name: "Swetha S.",
        role: "Lead Architect",
        content: "Their custom fabrication team understood our complex design requirements perfectly. The finish and precision were excellent.",
        rating: 5
    }
];

export const faqs = [
    {
        question: "Do you provide test certificates for the steel?",
        answer: "Yes, every consignment is accompanied by Mill Test Certificates (MTC) from the primary producer to guarantee chemical and physical properties."
    },
    {
        question: "What is your minimum order quantity?",
        answer: "We cater to both small and large requirements. For bulk direct-from-mill orders, the minimum is usually 10MT, but we also supply smaller lots from our stockyard."
    },
    {
        question: "Can you handle custom fabrication requests?",
        answer: "Absolutely. We have a fully equipped workshop for cutting, bending, and welding structural steel to your exact CAD specifications."
    },
    {
        question: "How do you ensure weight transparency?",
        answer: "We strictly bill based on actual weighbridge slips. Clients are welcome to witness the weighing process at our certified weighbridge."
    }
];
