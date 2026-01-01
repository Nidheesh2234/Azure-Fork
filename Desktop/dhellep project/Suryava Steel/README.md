# Suryava Steel & Infra Supplies Website

Modern, high-performance B2B website for a steel supplier, built with Next.js, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

1.  **Install dependencies:**
    ```bash
    npm install
    # or
    npm install --legacy-peer-deps
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📂 Project Structure

```
/app
  ├── globals.css        # Global styles & Tailwind directives
  ├── layout.tsx         # Root layout with ThemeProvider & Fonts
  └── page.tsx           # Main landing page composition
/components
  ├── hero.tsx           # Parallax hero section
  ├── theme-provider.tsx # Next-themes provider
  ├── /sections
  │   ├── contact.tsx    # Contact form
  │   ├── faq.tsx        # Accordion FAQ
  │   ├── industries.tsx # Paramax industries grid
  │   ├── process.tsx    # Scrollytelling workflow
  │   ├── products.tsx   # Staggered products grid
  │   ├── projects.tsx   # Portfolio showcase
  │   ├── quality.tsx    # SVG draw animation
  │   ├── services.tsx   # Service reveals
  │   └── testimonials.tsx # Snap-scroll testimonials
  └── /ui
      ├── footer.tsx     # Site footer
      └── navbar.tsx     # Sticky animated navbar
/lib
  ├── data.ts            # Site content & mock data
  └── utils.ts           # Helper functions (cn)
```

## 🎨 Customization

-   **Colors & Branding:** Edit `tailwind.config.ts` to change the `primary` (Orange), `secondary`, or `accent` colors.
-   **Content:** Update `lib/data.ts` to change text, images, products, and contact details.
-   **Images:** Currently using Unsplash placeholders. Replace with real assets in `lib/data.ts`.

## 🛠 Tech Stack

-   **Framework:** Next.js 14 (App Router)
-   **Styling:** Tailwind CSS
-   **Animation:** Framer Motion (Scroll-linked & Viewport-triggered)
-   **Language:** TypeScript
-   **Icons:** Lucide React
-   **Theme:** Next-Themes (Dark/Light mode)

## ⚠️ Notes

-   **Parallax Performance:** Heavy animations are disabled for users with `prefers-reduced-motion`.
-   **Images:** Ensure you configure `next.config.mjs` domains if you switch image providers.
