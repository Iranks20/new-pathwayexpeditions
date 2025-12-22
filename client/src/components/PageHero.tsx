import React from "react";
import { Button } from "@/components/ui/button";

interface Cta {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  backgroundVideo,
  primaryCta,
  secondaryCta,
  backgroundVideoParallax = 0.7,
}: PageHeroProps & { backgroundVideoParallax?: number }) {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[420px] md:min-h-[520px] flex items-center justify-center overflow-hidden">
      {backgroundVideo ? (
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover will-change-transform"
            style={{ transform: `translateY(${scrollY * backgroundVideoParallax}px)` }}
            src={backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundImage}
          />
        </div>
      ) : backgroundImage ? (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }} />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>

        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryCta && (
              <Button size="lg" variant={primaryCta.variant ?? "default"} asChild>
                <a href={primaryCta.href}>{primaryCta.label}</a>
              </Button>
            )}
            {secondaryCta && (
              <Button size="lg" variant={secondaryCta.variant ?? "outline"} asChild className="backdrop-blur-md bg-white/20 text-white border-white/40">
                <a href={secondaryCta.href}>{secondaryCta.label}</a>
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}



