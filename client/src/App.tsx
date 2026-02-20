import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import Home from "@/pages/home";
import AboutPage from "@/pages/about";
import ResearchPage from "@/pages/research";
import ProjectsPage from "@/pages/projects";
import PublicationsPage from "@/pages/publications";
import InsightsPage from "@/pages/insights";
import CollaboratePage from "@/pages/collaborate";
import ContactPage from "@/pages/contact";
import NotFound from "@/pages/not-found";

function PageLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-10 sm:mb-14">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about">
        <PageLayout title="About">
          <AboutPage />
        </PageLayout>
      </Route>
      <Route path="/research">
        <PageLayout title="Research">
          <ResearchPage />
        </PageLayout>
      </Route>
      <Route path="/projects">
        <PageLayout title="Projects, Labs & Resources">
          <ProjectsPage />
        </PageLayout>
      </Route>
      <Route path="/publications">
        <PageLayout title="Publications & Outputs">
          <PublicationsPage />
        </PageLayout>
      </Route>
      <Route path="/insights">
        <PageLayout title="Insights & Events">
          <InsightsPage />
        </PageLayout>
      </Route>
      <Route path="/collaborate">
        <PageLayout title="Collaborate">
          <CollaboratePage />
        </PageLayout>
      </Route>
      <Route path="/contact">
        <PageLayout title="Contact">
          <ContactPage />
        </PageLayout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-medium"
              data-testid="link-skip-content"
            >
              Skip to content
            </a>
            <Navbar />
            <ScrollToTop />
            <main id="main-content" className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
