import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { ResearchInAction } from "@/components/sections/ResearchInAction";
import { Publications } from "@/components/sections/Publications";
import { Resources } from "@/components/sections/Resources";
import { InsightsEvents } from "@/components/sections/InsightsEvents";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-medium"
        data-testid="link-skip-content"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <section id="about" aria-label="About section">
          <Pillars />
        </section>
        <ResearchInAction />
        <Publications />
        <Resources />
        <InsightsEvents />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
