import DestinationCard from "./DestinationCard";
// Using available images as fallbacks
import fallsImage from "@assets/generated_images/falls1.webp";
import elephantImage from "@assets/generated_images/Safaris-1.webp";
import springImage from "@assets/generated_images/vic1.webp";
import tombAsset from "@assets/generated_images/tomb.jpg";
import lakeImage from "@assets/generated_images/vic2.webp";
import gorillaImage from "@assets/generated_images/img1.webp";

// Using available images directly
const springVideo = springImage;
const tombImage = tombAsset ?? lakeImage;
const elgonVideo = gorillaImage;
const gorillaVideo = gorillaImage;

const destinations = [
  {
    name: "Western Uganda",
    description: "A land of iconic safaris and stunning natural wonders.",
    image: springVideo
  },
  {
    name: "Central Uganda",
    description: "Experience vibrant culture and the Pearl of Africa's heartland.",
    image: tombImage
  },
  {
    name: "Eastern Uganda",
    description: "Discover Mount Elgon and the source of the Nile River.",
    image: elgonVideo
  },
  {
    name: "Northern Uganda",
    description: "Home of the majestic gorillas and breathtaking rolling hills.",
    image: gorillaVideo
  }
];

export default function DestinationsSection() {
  return (
    <section className="py-16 md:py-24" id="destinations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Explore Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Journey through Uganda's diverse regions and beyond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.name} {...destination} />
          ))}
        </div>
      </div>
    </section>
  );
}
