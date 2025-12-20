import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehiclesSection from "@/components/VehiclesSection";
import PageHero from "@/components/PageHero";
import CarHireHighlights from "@/components/CarHireHighlights";
import CarHireSupportSection from "@/components/CarHireSupportSection";
import CarHireFAQSection from "@/components/CarHireFAQSection";
import TrustBadges from "@/components/TrustBadges";
// Using available image as fallback
import carHero from "@assets/generated_images/land rover defender.jpg";

export default function CarHirePage() {
  return (
    <div className="min-h-screen">
      <Header forceDark />
      <main>
        <div className="pt-16" />
        <PageHero
          title="Car Hire Services"
          subtitle="Reliable, comfortable vehicles for safaris, business, and city trips."
          backgroundImage={carHero}
          primaryCta={{ label: "View Rates", href: "/car-hire/rates" }}
          secondaryCta={{ label: "View Vehicles", href: "#vehicles" }}
        />

        <TrustBadges />
        <CarHireHighlights />
        <VehiclesSection />
        <CarHireSupportSection />
        <CarHireFAQSection />
      </main>
      <Footer />
    </div>
  );
}


