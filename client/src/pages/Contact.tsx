import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import PageHero from "@/components/PageHero";
import heroImage from "@assets/generated_images/Safaris-1.webp";
// Video removed - not available, using image only

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header forceDark />
      <main>
        <div className="pt-16" />
        <PageHero
          title="Contact Us"
          subtitle="Get in touch with our team to start planning your perfect adventure"
          backgroundImage={heroImage}
          primaryCta={{ label: "View Tours", href: "/tours" }}
          secondaryCta={{ label: "Car Hire", href: "/car-hire" }}
        />

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

