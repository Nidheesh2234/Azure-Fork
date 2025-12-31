import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/ThemeProvider";
import { ReservationProvider } from "@/components/ReservationContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "AzureFork Kitchens | Coastal Cuisine & Andhra Flavors",
  description: "Experience premium coastal dining with authentic Andhra flavors, fresh seafood, and a stunning ocean view ambience in Visakhapatnam.",
  keywords: ["Seafood", "Andhra Cuisine", "Visakhapatnam Restaurants", "Coastal Dining", "Fine Dining Vizag"],
  metadataBase: new URL('https://azurefork-kitchens.vercel.app'), // Placeholder URL
  openGraph: {
    title: "AzureFork Kitchens | Coastal Cuisine & Andhra Flavors",
    description: "Experience premium coastal dining with authentic Andhra flavors, fresh seafood, and a stunning ocean view ambience.",
    url: 'https://azurefork-kitchens.vercel.app',
    siteName: 'AzureFork Kitchens',
    images: [
      {
        url: '/icon.png', // Ideally this should be a large OG image
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AzureFork Kitchens",
    description: "Premium coastal dining with authentic flavors.",
    images: ['/icon.png'],
  },
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(
        inter.variable,
        playfair.variable,
        "antialiased bg-background text-foreground font-sans overflow-x-hidden selection:bg-azure-200 selection:text-navy-900"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReservationProvider>
            {children}
            <Toaster position="top-center" richColors />
          </ReservationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
