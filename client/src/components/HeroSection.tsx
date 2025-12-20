import { Button } from "@/components/ui/button";
import { Compass, Car, Star } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@assets/generated_images/Safaris-1.webp";
// Video removed - not available, using image background

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[600px] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute top-0 left-0 w-full h-full will-change-transform overflow-hidden bg-cover bg-center"
        style={{ 
          transform: `translateY(${scrollY * 0.7}px)`,
          backgroundImage: `url(${heroImage})`
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm font-medium">Award-Winning Safari Experiences</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Discover the Magic of <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            East Africa
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
          Expert-guided safari tours, unforgettable gorilla trekking, and premium car hire services across Uganda, Kenya, Rwanda, and Tanzania
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <Button
            size="lg"
            variant="default"
            className="text-lg px-8 py-6 min-h-14 shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            asChild
            data-testid="button-explore-tours"
          >
            <a href="#tours" className="flex items-center gap-2">
              <Compass className="h-5 w-5" />
              Explore Tours
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 min-h-14 backdrop-blur-md bg-white/20 text-white border-white/40 hover:bg-white/30 shadow-2xl transition-all duration-300 hover:scale-105"
            asChild
            data-testid="button-rent-vehicle"
          >
            <a href="#vehicles" className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Rent a Vehicle
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-500">
          {[
            { value: "500+", label: "Happy Travelers" },
            { value: "4", label: "Countries Covered" },
            { value: "50+", label: "Tour Packages" },
            { value: "30+", label: "Quality Vehicles" }
          ].map((stat, index) => (
            <div key={index} className="text-center backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10 hover-elevate transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
 }