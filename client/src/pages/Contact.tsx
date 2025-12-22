import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import PageHero from "@/components/PageHero";
// Using Cloudinary poster as fallback (original local asset missing)
const heroImage = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg";
// Using video background (gorilla). Image retained as poster fallback.

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
          backgroundVideo="https://res.cloudinary.com/dnjdl9nuo/video/upload/v1766398584/vid_2_xclrvq.mp4"
          backgroundVideoParallax={0.7}
          primaryCta={{ label: "View Tours", href: "/tours" }}
          secondaryCta={{ label: "Car Hire", href: "/car-hire" }}
        />

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
} 

