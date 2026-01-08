'use client';

import { jsPDF } from 'jspdf';
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem } from './menu-data';

export function generateMenuPDF() {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let yPosition = margin;

    // Colors
    const primaryColor: [number, number, number] = [0, 120, 160]; // Azure blue
    const accentColor: [number, number, number] = [220, 80, 60]; // Coral/Paprika
    const textColor: [number, number, number] = [40, 40, 40];
    const mutedColor: [number, number, number] = [120, 120, 120];

    // Helper function to check page overflow
    const checkPageOverflow = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
            return true;
        }
        return false;
    };

    // === HEADER ===
    // Draw decorative header line
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 8, 'F');

    yPosition = 25;

    // Restaurant name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(32);
    doc.setTextColor(...primaryColor);
    doc.text('AzureFork', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    // Tagline
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    doc.setTextColor(...mutedColor);
    doc.text('Coastal Cuisine • Andhra Flavors', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;

    // Decorative line
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin + 40, yPosition, pageWidth - margin - 40, yPosition);
    yPosition += 15;

    // === MENU CONTENT ===
    MENU_CATEGORIES.forEach((category) => {
        const categoryItems = MENU_ITEMS.filter((item) => item.category === category);

        if (categoryItems.length === 0) return;

        // Check if we need a new page for category header + at least one item
        checkPageOverflow(40);

        // Category Header
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(margin, yPosition - 3, contentWidth, 12, 2, 2, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(...primaryColor);
        doc.text(category.toUpperCase(), margin + 5, yPosition + 5);
        yPosition += 18;

        // Items in this category
        categoryItems.forEach((item: MenuItem) => {
            checkPageOverflow(25);

            // Item name and price on same line
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(...textColor);

            // Name with badges
            let itemName = item.name;
            doc.text(itemName, margin, yPosition);

            // Price aligned right
            doc.setTextColor(...primaryColor);
            doc.text(item.price, pageWidth - margin, yPosition, { align: 'right' });

            yPosition += 4;

            // Badges
            let badgeX = margin;
            doc.setFontSize(7);

            if (item.bestseller) {
                doc.setFillColor(...primaryColor);
                doc.roundedRect(badgeX, yPosition - 2.5, 16, 4, 1, 1, 'F');
                doc.setTextColor(255, 255, 255);
                doc.text('BESTSELLER', badgeX + 0.8, yPosition + 0.5);
                badgeX += 18;
            }

            if (item.spicy) {
                doc.setFillColor(...accentColor);
                doc.roundedRect(badgeX, yPosition - 2.5, 10, 4, 1, 1, 'F');
                doc.setTextColor(255, 255, 255);
                doc.text('SPICY', badgeX + 0.8, yPosition + 0.5);
                badgeX += 12;
            }

            // Veg/Non-Veg indicator
            if (item.veg) {
                doc.setFillColor(34, 139, 34);
                doc.roundedRect(badgeX, yPosition - 2.5, 7, 4, 1, 1, 'F');
                doc.setTextColor(255, 255, 255);
                doc.text('VEG', badgeX + 0.5, yPosition + 0.5);
            } else {
                doc.setDrawColor(180, 50, 50);
                doc.setFillColor(255, 255, 255);
                doc.roundedRect(badgeX, yPosition - 2.5, 14, 4, 1, 1, 'FD');
                doc.setTextColor(180, 50, 50);
                doc.text('NON-VEG', badgeX + 0.8, yPosition + 0.5);
            }

            yPosition += 5;

            // Description
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...mutedColor);
            const descLines = doc.splitTextToSize(item.description, contentWidth - 30);
            doc.text(descLines, margin, yPosition);
            yPosition += descLines.length * 4 + 8;
        });

        yPosition += 5; // Extra space after category
    });

    // === FOOTER ===
    const footerY = pageHeight - 15;
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...mutedColor);
    doc.text('All prices are inclusive of applicable taxes', pageWidth / 2, footerY, { align: 'center' });
    doc.text('www.azurefork.com', pageWidth / 2, footerY + 5, { align: 'center' });

    // Download the PDF
    doc.save('AzureFork-Menu.pdf');
}
