import FeatureCard from "./FeatureCard";
import { Award, Heart, Leaf } from "lucide-react";

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

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30" id="about">
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
  );
}
