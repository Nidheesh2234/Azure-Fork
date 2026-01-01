import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/hero";
import { Products } from "@/components/sections/products";
import { Services } from "@/components/sections/services";
import { Industries } from "@/components/sections/industries";
import { Process } from "@/components/sections/process";
import { Quality } from "@/components/sections/quality";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/ui/footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <Hero />
            <Products />
            <Services />
            <Industries />
            <Process />
            <Quality />
            <Projects />
            <Testimonials />
            <FAQ />
            <Contact />
            <Footer />
        </main>
    );
}
