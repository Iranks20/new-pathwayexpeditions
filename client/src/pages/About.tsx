import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FeatureCard from "@/components/FeatureCard";
import ActivitiesSection from "@/components/ActivitiesSection";
import { Award, Heart, Leaf, Users, TrendingUp, Globe } from "lucide-react";
// Using available image as fallback
// Using Cloudinary poster as fallback (original local asset missing)
const heroImage = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg";
// Video removed - not available, using image only

const features = [
  {
    icon: Award,
    title: "Expert Guides",
    description: "Our knowledgeable guides ensure you have a safe, informative, and enjoyable experience throughout your journey."
  },
  {
    icon: Heart,
    title: "Tailored Experiences",
    description: "We create personalized itineraries to suit your interests, ensuring every trip is unique and unforgettable."
  },
  {
    icon: Leaf,
    title: "Sustainable Travel",
    description: "We are committed to eco-friendly practices, ensuring your travels benefit both you and the environment."
  }
];

const activities = [
  {
    name: "Wildlife Safaris",
    description: "Experience close encounters with Uganda's iconic wildlife species."
  },
  {
    name: "Gorilla Trekking",
    description: "Journey through forests for a rare glimpse of mountain gorillas."
  },
  {
    name: "Bird Watching",
    description: "Spot diverse bird species in Uganda's rich natural habitats."
  },
  {
    name: "Cultural Tours",
    description: "Immerse yourself in Uganda's vibrant traditions and heritage."
  },
  {
    name: "Boat Cruises",
    description: "Relax on scenic waterways with breathtaking views and wildlife."
  },
  {
    name: "Nature Walks",
    description: "Explore Uganda's diverse ecosystems on guided nature trails."
  }
];

const stats = [
  { label: "Satisfied Clients", value: "1000+" },
  { label: "Success Rate", value: "98%" },
  { label: "Years Experience", value: "10+" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header forceDark />
      <main>
        <div className="pt-16" />
        <PageHero
          title="About Pathway Expeditions"
          subtitle="Where Every Journey Becomes a Story"
          backgroundImage={heroImage}
          backgroundVideo="https://res.cloudinary.com/dnjdl9nuo/video/upload/v1766398641/vid_4_nfvmpo.mp4"
          backgroundVideoParallax={0.7}
          primaryCta={{ label: "Explore Tours", href: "/tours" }}
          secondaryCta={{ label: "Contact Us", href: "#contact" }}
        />

        {/* Main About Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Welcome to Pathway Expeditions Uganda
              </h2>
              <div className="prose prose-lg max-w-none text-left text-muted-foreground space-y-4">
                <p>
                  At Pathway Expeditions Uganda, we specialize in creating unforgettable travel experiences that connect you to Uganda's breathtaking landscapes, wildlife, and cultures. Whether you're seeking adventure, relaxation, or cultural exploration, our expert team is here to craft the perfect journey for you.
                </p>
                <p>
                  Let us be your guide to the heart of Africa. We are committed to providing exceptional service, ensuring every moment of your journey is filled with discovery, wonder, and lasting memories.
                </p>
                <p>
                  Our mission is to showcase the beauty and diversity of Uganda while promoting sustainable tourism practices that benefit local communities and preserve the natural environment for future generations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Assets section removed */}

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <ActivitiesSection />

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Why Choose Pathway Expeditions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the difference with Uganda's premier tour and car hire service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground">
                  To provide exceptional travel experiences that showcase the beauty and diversity of Uganda while promoting sustainable tourism practices that benefit local communities and preserve the natural environment.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-muted-foreground">
                  To become the leading tour operator in East Africa, recognized for our commitment to excellence, sustainability, and creating transformative travel experiences that leave a positive impact on travelers and local communities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

