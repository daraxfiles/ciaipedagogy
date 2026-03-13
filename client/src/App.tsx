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
import ToolkitPage from "@/pages/toolkit";
import PeoplePage from "@/pages/people";
import EventsPage from "@/pages/events";
import PublicationsPage from "@/pages/publications";
import CollaboratePage from "@/pages/collaborate";
import ContactPage from "@/pages/contact";
import PolicyBuilderPage from "@/pages/policy-builder";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import PortalPage from "@/pages/portal";
import AdminPage from "@/pages/admin";
import NotFound from "@/pages/not-found";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        <PageLayout><AboutPage /></PageLayout>
      </Route>
      <Route path="/research">
        <PageLayout><ResearchPage /></PageLayout>
      </Route>
      <Route path="/projects">
        <PageLayout><ProjectsPage /></PageLayout>
      </Route>
      <Route path="/toolkit">
        <PageLayout><ToolkitPage /></PageLayout>
      </Route>
      <Route path="/people">
        <PageLayout><PeoplePage /></PageLayout>
      </Route>
      <Route path="/events">
        <PageLayout><EventsPage /></PageLayout>
      </Route>
      <Route path="/insights">
        <PageLayout><EventsPage /></PageLayout>
      </Route>
      <Route path="/publications">
        <PageLayout><PublicationsPage /></PageLayout>
      </Route>
      <Route path="/collaborate">
        <PageLayout><CollaboratePage /></PageLayout>
      </Route>
      <Route path="/contact">
        <PageLayout><ContactPage /></PageLayout>
      </Route>
      <Route path="/policy-builder">
        <PageLayout><PolicyBuilderPage /></PageLayout>
      </Route>
      <Route path="/login">
        <PageLayout><LoginPage /></PageLayout>
      </Route>
      <Route path="/register">
        <PageLayout><RegisterPage /></PageLayout>
      </Route>
      <Route path="/portal">
        <PageLayout><PortalPage /></PageLayout>
      </Route>
      <Route path="/admin">
        <PageLayout><AdminPage /></PageLayout>
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
