import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import logoSrc from "@assets/CIAI_Logo_1774366407988.png";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Sun, Moon, LogOut, User, LayoutDashboard } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/hooks/use-auth";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Navbar() {
  const { nav, name } = siteConfig;
  const { theme, toggleTheme } = useTheme();
  const { user, isLoading, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const handleSignOut = async () => {
    setOpen(false);
    await logout();
    navigate("/");
  };

  // Extract username for display — handle sessions created before username was stored
  const displayUsername = user?.username
    ?? user?.email?.replace(/@network\.local$/, "")
    ?? "";

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

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          data-testid="link-home"
        >
          <img
            src={logoSrc}
            alt={name}
            className="h-14 w-auto dark:brightness-0 dark:invert"
          />
        </Link>

        {/* Desktop nav links */}
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

        {/* Desktop right — auth-aware */}
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

          {!isLoading && !user && (
            <Link href="/login">
              <Button size="sm" variant="outline" data-testid="button-sign-in">
                Sign In
              </Button>
            </Link>
          )}

          {!isLoading && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border border-card-border bg-card hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-testid="button-user-menu"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary font-serif shrink-0">
                    {initials(user.displayName)}
                  </span>
                  <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                    {user.displayName}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-xs text-muted-foreground">Signed in as</p>
                  <p className="text-sm font-medium text-foreground truncate">@{displayUsername}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/portal" className="flex items-center gap-2 cursor-pointer" data-testid="link-my-profile">
                    <User className="h-3.5 w-3.5" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-2 cursor-pointer" data-testid="link-admin-dashboard">
                      <LayoutDashboard className="h-3.5 w-3.5" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-muted-foreground focus:text-foreground cursor-pointer flex items-center gap-2"
                  data-testid="button-sign-out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile right */}
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

              {/* Mobile auth section */}
              {!isLoading && user ? (
                <div className="flex flex-col gap-1">
                  <div className="px-3 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
                      Signed in as
                    </p>
                    <p className="text-sm font-semibold text-foreground">@{displayUsername}</p>
                  </div>
                  <Link href="/portal" onClick={() => setOpen(false)}>
                    <button
                      className="w-full flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md text-muted-foreground hover-elevate text-left"
                      data-testid="link-mobile-my-profile"
                    >
                      <User className="h-4 w-4" /> My Profile
                    </button>
                  </Link>
                  {user.role === "admin" && (
                    <Link href="/admin" onClick={() => setOpen(false)}>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md text-muted-foreground hover-elevate text-left"
                        data-testid="link-mobile-admin"
                      >
                        <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                      </button>
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md text-muted-foreground hover-elevate text-left"
                    data-testid="button-mobile-sign-out"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              ) : (
                !isLoading && (
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button className="w-full" data-testid="button-sign-in-mobile">
                      Sign In
                    </Button>
                  </Link>
                )
              )}
            </SheetContent>
          </Sheet>
        </div>

      </nav>
    </header>
  );
}
