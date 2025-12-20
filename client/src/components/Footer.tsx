import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                PE
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">Pathway Expeditions</div>
                <div className="text-xs text-muted-foreground">Uganda</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Discover the magic of East Africa with expert-guided tours and premium car hire services.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8" data-testid="button-facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" data-testid="button-instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" data-testid="button-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/tours" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-tours">Tours & Travel</a></li>
              <li><a href="/car-hire" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-vehicles">Car Hire</a></li>
              <li><a href="/destinations" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-destinations">Destinations</a></li>
              <li><a href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">About Us</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Wildlife Safaris</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Gorilla Trekking</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cultural Tours</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Safari Vehicles</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+256753904064" className="hover:text-foreground transition-colors">+256 753 904064</a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@pathwayexpeditions.ug" className="hover:text-foreground transition-colors">info@pathwayexpeditions.ug</a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Kampala, Uganda</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Pathway Expeditions Uganda. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/terms-and-conditions" className="text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
