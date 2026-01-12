'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position using MotionValues
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the trailing cursor
    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Only show custom cursor on non-touch devices
        if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
            setIsVisible(true);
        }

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16); // Center offset (32px width / 2)
            mouseY.set(e.clientY - 16);
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        // Add event listeners for hover effects on clickable elements
        const handleLinkHover = () => setIsHovering(true);
        const handleLinkLeave = () => setIsHovering(false);

        const addHoverListeners = () => {
            const hoverableElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
            hoverableElements.forEach(el => {
                el.addEventListener('mouseenter', handleLinkHover);
                el.addEventListener('mouseleave', handleLinkLeave);
            });
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Initial attach
        addHoverListeners();

        // Re-attach on mutation (simple way to handle dynamic content)
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            observer.disconnect();

            const hoverableElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
            hoverableElements.forEach(el => {
                el.removeEventListener('mouseenter', handleLinkHover);
                el.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, [mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference"
            style={{
                x: cursorX,
                y: cursorY,
            }}
        >
            <motion.div
                className="w-full h-full rounded-full border-2 border-white bg-white/20"
                animate={{
                    scale: isHovering ? 2 : 1,
                    backgroundColor: isHovering ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.1)",
                }}
                transition={{ duration: 0.15 }}
            />
        </motion.div>
    );
}
