"use client"

import { motion } from "framer-motion"

export function JarIllustration({ color = "#C84C0C", label = "Pickle", className }: { color?: string; label?: string; className?: string }) {
    return (
        <svg viewBox="0 0 200 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id={`grad-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.8" />
                    <stop offset="50%" stopColor={color} stopOpacity="1" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.8" />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-10%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                    <feOffset dx="0" dy="8" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Jar Body */}
            <motion.path
                d="M40 60 H160 V260 C160 275 150 285 135 285 H65 C50 285 40 275 40 260 V60 Z"
                fill={`url(#grad-${label})`}
                stroke="currentColor" strokeWidth="2" strokeOpacity="0.1"
                filter="url(#shadow)"
            />

            {/* Texture/Grains inside */}
            <circle cx="60" cy="100" r="2" fill="white" opacity="0.2" />
            <circle cx="90" cy="140" r="3" fill="white" opacity="0.2" />
            <circle cx="130" cy="200" r="2" fill="white" opacity="0.2" />
            <circle cx="70" cy="230" r="4" fill="white" opacity="0.1" />

            {/* Lid */}
            <rect x="35" y="30" width="130" height="30" rx="4" fill="#2D2D2D" />
            <path d="M35 30 L45 10 H155 L165 30 H35 Z" fill="#3D3D3D" />

            {/* Label */}
            <rect x="50" y="100" width="100" height="80" rx="4" fill="#FDFBF7" />
            <rect x="55" y="105" width="90" height="70" rx="2" stroke="#2D5A27" strokeWidth="1" fill="none" opacity="0.3" />
            <text x="100" y="145" textAnchor="middle" fontFamily="serif" fontSize="16" fill="#1C1C1E" fontWeight="bold">{label}</text>

            {/* Highlights */}
            <path d="M150 70 V250" stroke="white" strokeWidth="4" strokeOpacity="0.1" strokeLinecap="round" />
        </svg>
    )
}
