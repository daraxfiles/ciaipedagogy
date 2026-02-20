import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
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
  const [location] = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-[1000] w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background border-b border-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-16">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          data-testid="link-home"
        >
          <span className="font-serif font-bold text-lg text-foreground leading-tight">
            {name}
          </span>
        </Link>

        <div className="hidden xl:flex items-center gap-0.5">
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-2.5 py-2 text-sm font-medium transition-colors rounded-md hover-elevate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
              data-testid={`link-nav-${item.label.toLowerCase().replace(/[\s&,]+/g, "-")}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Link href={nav.cta.href}>
            <Button size="sm" data-testid="button-join-network">
              {nav.cta.label}
            </Button>
          </Link>
        </div>

        <div className="flex xl:hidden items-center gap-2">
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
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-3 text-sm font-medium rounded-md hover-elevate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive(item.href) ? "text-foreground" : "text-muted-foreground"
                    }`}
                    data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/[\s&,]+/g, "-")}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Separator className="my-4" />
              <Link href={nav.cta.href} onClick={() => setOpen(false)}>
                <Button className="w-full" data-testid="button-join-network-mobile">
                  {nav.cta.label}
                </Button>
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
