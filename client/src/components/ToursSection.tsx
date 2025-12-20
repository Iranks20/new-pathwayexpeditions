import TourCard from "./TourCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";

// Cultural Heritage - using available images as fallbacks
import culturalHero from "@assets/generated_images/luwombo.jpg";
import luwombo from "@assets/generated_images/luwombo.jpg";
// Using available images for cultural gallery
import cultural1 from "@assets/generated_images/luwombo.jpg";
import cultural3 from "@assets/generated_images/luwombo.jpg";
import cultural4 from "@assets/generated_images/luwombo.jpg";
import cultural5 from "@assets/generated_images/luwombo.jpg";
import cultural6 from "@assets/generated_images/luwombo.jpg";
import cultural7 from "@assets/generated_images/luwombo.jpg";

// Gorilla Trekking - using available images
import gorilla1 from "@assets/generated_images/img1.webp";
import gorilla2 from "@assets/generated_images/img2.webp";
import gorilla3 from "@assets/generated_images/img4.webp";
import gorilla4 from "@assets/generated_images/img5.webp";
import gorilla5 from "@assets/generated_images/Safaris-1.webp";
import gorilla6 from "@assets/generated_images/pic3.webp";
import gorilla7 from "@assets/generated_images/pic4.webp";

// 13 Day Uganda Adventure - using available images
import uganda13_1 from "@assets/generated_images/1.webp";
import uganda13_2 from "@assets/generated_images/2.webp";
import uganda13_3 from "@assets/generated_images/3.webp";
import uganda13_4 from "@assets/generated_images/4.jpg";
import uganda13_5 from "@assets/generated_images/5.jpg";
import uganda13_6 from "@assets/generated_images/pic2.jpg";
import uganda13_7 from "@assets/generated_images/pic5.jpg";

// 15 Day Great Uganda Safari - using available images
import uganda15_1 from "@assets/generated_images/vic1.webp";
import uganda15_2 from "@assets/generated_images/vic2.webp";
import uganda15_3 from "@assets/generated_images/vic3.webp";
import uganda15_4 from "@assets/generated_images/vic4.webp";
import uganda15_5 from "@assets/generated_images/vic5.webp";
import uganda15_6 from "@assets/generated_images/falls1.webp";
import uganda15_7 from "@assets/generated_images/falls3.webp";

// Murchison Falls Explorer - using available images
import falls1 from "@assets/generated_images/falls1.webp";
import falls2 from "@assets/generated_images/falls3.webp";
import falls3 from "@assets/generated_images/falls4.webp";
import falls4 from "@assets/generated_images/falls 5.webp";
import falls5 from "@assets/generated_images/OIP.webp";
import falls6 from "@assets/generated_images/download.webp";
import falls7 from "@assets/generated_images/tomb.jpg";

// Lake Victoria Experience - using available images
import vic1 from "@assets/generated_images/vic1.webp";
import vic2 from "@assets/generated_images/vic2.webp";
import vic3 from "@assets/generated_images/vic3.webp";
import vic4 from "@assets/generated_images/vic4.webp";
import vic5 from "@assets/generated_images/vic5.webp";
import vic6 from "@assets/generated_images/vic1.webp";
import vic7 from "@assets/generated_images/vic2.webp";

const allTours = [
  {
    title: "Cultural Heritage Tour",
    location: "Central Uganda",
    duration: "5 Days",
    price: 1250,
    // add luwombo as the new first image and make it primary
    image: luwombo,
    images: [luwombo, cultural1, cultural3, cultural4, cultural5, cultural6, cultural7],
    description: "Immerse yourself in Uganda's rich cultural traditions, local communities, and authentic experiences.",
    groupSize: "4-10 people"
  },
  {
    title: "Gorilla Trekking Adventure",
    location: "Bwindi Forest, Uganda",
    duration: "3 Days",
    price: 1999,
    image: gorilla1,
    images: [gorilla1, gorilla2, gorilla3, gorilla4, gorilla5, gorilla6, gorilla7],
    description: "Journey through misty rainforests for a rare glimpse of mountain gorillas in their natural habitat.",
    groupSize: "2-8 people"
  },
  {
    title: "13 Day Uganda Adventure",
    location: "Multiple Destinations, Uganda",
    duration: "13 Days",
    price: 6495,
    image: uganda13_1,
    images: [uganda13_1, uganda13_2, uganda13_3, uganda13_4, uganda13_5, uganda13_6, uganda13_7],
    description: "Experience the best of Uganda with wildlife safaris, gorilla trekking, and cultural encounters.",
    groupSize: "4-12 people"
  },
  {
    title: "15 Day Great Uganda Safari",
    location: "Uganda Circuit",
    duration: "15 Days",
    price: 4385,
    // remove first image and use the next image as primary
    image: uganda15_2,
    images: [uganda15_2, uganda15_3, uganda15_4, uganda15_5, uganda15_6, uganda15_7],
    description: "Comprehensive safari adventure covering Uganda's most iconic national parks and wildlife reserves.",
    groupSize: "6-15 people"
  },
  {
    title: "Murchison Falls Explorer",
    location: "Murchison Falls NP",
    duration: "4 Days",
    price: 1850,
    // remove first image and use the next as primary
    image: falls2,
    images: [falls2, falls3, falls4, falls5, falls6, falls7],
    description: "Witness the world's most powerful waterfall and encounter diverse wildlife in Uganda's largest park.",
    groupSize: "2-8 people"
  },
  {
    title: "Lake Victoria Experience",
    location: "Lake Victoria",
    duration: "3 Days",
    price: 980,
    image: vic1,
    images: [vic1, vic2, vic3, vic4, vic5, vic6, vic7],
    description: "Explore Africa's largest lake with island hopping, fishing villages, and serene boat cruises.",
    groupSize: "2-6 people"
  }
];

export default function ToursSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedTours = showAll ? allTours : allTours.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background" id="tours">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Featured Packages
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Unforgettable Safari Adventures
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expertly crafted tours across East Africa's most spectacular destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedTours.map((tour, index) => (
            <div 
              key={tour.title}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TourCard {...tour} />
            </div>
          ))}
        </div>

        {allTours.length > 6 && !showAll && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="shadow-md"
              data-testid="button-view-all-tours"
            >
              <Link href="/tours">
                View All Tours
                <ChevronDown className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}