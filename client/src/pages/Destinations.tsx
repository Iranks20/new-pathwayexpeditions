import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DestinationsSection from "@/components/DestinationsSection";
import PageHero from "@/components/PageHero";
// Using Cloudinary poster as fallback (original local asset missing)
const heroImage = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg";
// Using video background (spring). Image retained as poster fallback.

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
          backgroundVideo="https://res.cloudinary.com/dnjdl9nuo/video/upload/v1766336462/spring_nnihak.mp4"
          backgroundVideoParallax={0.7}
          primaryCta={{ label: "View Tours", href: "/tours" }}
          secondaryCta={{ label: "Contact Us", href: "/contact" }}
        />

        <DestinationsSection />
      </main>
      <Footer />
    </div>
  );
} 

