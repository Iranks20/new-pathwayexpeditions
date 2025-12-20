import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  forceDark?: boolean;
}

export default function Header({ forceDark = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Tours & Travel", href: "/tours" },
    { name: "Car Hire", href: "/car-hire" },
    { name: "Car Hire Rates", href: "/car-hire/rates" },
    { name: "Destinations", href: "/destinations" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const useDark = forceDark || scrolled;

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
      scrolled 
        ? "bg-background/95 backdrop-blur-md shadow-md border-b" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2" data-testid="link-home">
              <div className={cn(
                "h-10 w-10 rounded-md bg-primary flex items-center justify-center font-bold text-lg transition-all duration-300",
                useDark ? "text-primary-foreground" : "text-primary-foreground shadow-lg"
              )}>
                PE
              </div>
              <div className="hidden sm:block">
                <div className={cn(
                  "font-bold text-lg leading-tight transition-colors duration-300",
                  useDark ? "text-foreground" : "text-white"
                )}>
                  Pathway Expeditions
                </div>
                <div className={cn(
                  "text-xs transition-colors duration-300",
                  useDark ? "text-muted-foreground" : "text-white/80"
                )}>
                  Uganda
                </div>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className={cn(
                  "text-sm font-medium transition-colors",
                  useDark ? "text-foreground" : "text-white hover:bg-white/10"
                )}
                data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm">
              <a 
                href="tel:+256753904064" 
                className={cn(
                  "flex items-center gap-1 hover-elevate px-3 py-2 rounded-md transition-colors",
                  useDark ? "text-muted-foreground" : "text-white/90"
                )}
                data-testid="link-phone"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">+256 753 904064</span>
              </a>
            </div>
            <Button variant="default" size="sm" className="shadow-lg" asChild data-testid="button-book-now">
              <a href="#contact">Book Now</a>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden",
              useDark ? "text-foreground" : "text-white"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/98 backdrop-blur-md">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium rounded-md hover-elevate"
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t space-y-2">
              <a href="tel:+256753904064" className="flex items-center gap-2 px-4 py-2 text-sm" data-testid="link-mobile-phone">
                <Phone className="h-4 w-4" />
                +256 753 904064
              </a>
              <Button variant="default" className="w-full" asChild data-testid="button-mobile-book">
                <a href="#contact">Book Now</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
