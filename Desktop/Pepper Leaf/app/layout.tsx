import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PepperLeaf Spices & Pickles | Authentic Andhra Flavors",
  description: "Small-batch spices & pickles with real coastal punch. Hand-ground, preservative-free, and insanely premium.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://pepperleaf.example.com",
    title: "PepperLeaf Spices & Pickles",
    description: "Premium handcrafted spices.",
    siteName: "PepperLeaf",
  },
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased text-foreground bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
