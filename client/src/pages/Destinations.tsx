import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DestinationsSection from "@/components/DestinationsSection";
import PageHero from "@/components/PageHero";
import heroImage from "@assets/generated_images/Safaris-1.webp";
// Video removed - not available, using image only

export default function DestinationsPage() {
  return (
    <div className="min-h-screen">
      <Header forceDark />
      <main>
        <div className="pt-16" />
        <PageHero
          title="Explore Destinations"
          subtitle="Discover must-visit destinations for an unforgettable adventure across Uganda and East Africa."
          backgroundImage={heroImage}
          primaryCta={{ label: "View Tours", href: "/tours" }}
          secondaryCta={{ label: "Contact Us", href: "/contact" }}
        />

        <DestinationsSection />
      </main>
      <Footer />
    </div>
  );
}

