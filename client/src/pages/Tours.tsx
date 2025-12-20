import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToursSection from "@/components/ToursSection";
import PageHero from "@/components/PageHero";
import heroImage from "@assets/generated_images/Safaris-1.webp";
// Video removed - not available, using image only

export default function ToursPage() {
  return (
    <div className="min-h-screen">
      <Header forceDark />
      <main>
        <div className="pt-16" />
        <PageHero
          title="Tours & Travel"
          subtitle="Curated experiences across East Africa designed for comfort, discovery, and adventure."
          backgroundImage={heroImage}
          primaryCta={{ label: "Browse Tours", href: "#tours" }}
          secondaryCta={{ label: "Contact Us", href: "/contact" }}
        />

        <ToursSection />
      </main>
      <Footer />
    </div>
  );
}


