import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { BestSellers } from "@/components/sections/best-sellers";
import { WhyUs } from "@/components/sections/why-us";
import { ProjectProcess } from "@/components/sections/process";
import { Reviews } from "@/components/sections/reviews";
import { Footer } from "@/components/layout/footer";
import { MarqueeSeparator } from "@/components/visuals/marquee-separator";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Main Content Wrapper - Slides over footer */}
      <main className="relative z-10 bg-background mb-[500px] shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
        <Hero />
        <MarqueeSeparator text="AUTHENTIC • SUSTAINABLE • SPICY • HANDMADE" />
        <BestSellers />
        <MarqueeSeparator text="PURE • FRESH • TRADITIONAL • TASTY" />
        <WhyUs />
        <ProjectProcess />
        <Reviews />
      </main>

      {/* Fixed Footer - Revealed on scroll */}
      <Footer />
    </div>
  );
}
