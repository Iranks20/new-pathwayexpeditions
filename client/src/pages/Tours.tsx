import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToursSection from "@/components/ToursSection";
import PageHero from "@/components/PageHero";
// Using Cloudinary poster as fallback (original local asset missing)
const heroImage = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg";
// Using video background (tours hero). Image retained as poster fallback.

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
          backgroundVideo="https://res.cloudinary.com/dnjdl9nuo/video/upload/v1766336475/home_2_x2mt7e.mp4"
          backgroundVideoParallax={0.7}
          primaryCta={{ label: "Browse Tours", href: "#tours" }}
          secondaryCta={{ label: "Contact Us", href: "/contact" }}
        />

        <ToursSection />
      </main>
      <Footer />
    </div>
  );
} 


