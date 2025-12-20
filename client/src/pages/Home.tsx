import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ToursSection from "@/components/ToursSection";
import VehiclesSection from "@/components/VehiclesSection";
import DestinationsSection from "@/components/DestinationsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ActivitiesSection />
        <ToursSection />
        <VehiclesSection />
        <DestinationsSection />
        <WhyChooseUsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
