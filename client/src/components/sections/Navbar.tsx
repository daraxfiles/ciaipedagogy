import { useState, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function Navbar() {
  const { nav, name } = siteConfig;
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-[1000] w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-16">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNav("#home"); }}
          className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          data-testid="link-home"
        >
          <span className="font-serif font-bold text-lg text-foreground leading-tight">
            {name}
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
              className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors rounded-md hover-elevate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            size="sm"
            onClick={() => handleNav(nav.cta.href)}
            data-testid="button-join-network"
          >
            {nav.cta.label}
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-testid="button-theme-toggle-mobile"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Open menu" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-serif text-base mb-4">{name}</SheetTitle>
              <div className="flex flex-col gap-1">
                {nav.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                    className="px-3 py-3 text-sm font-medium text-foreground rounded-md hover-elevate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <Separator className="my-4" />
              <Button
                className="w-full"
                onClick={() => handleNav(nav.cta.href)}
                data-testid="button-join-network-mobile"
              >
                {nav.cta.label}
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
