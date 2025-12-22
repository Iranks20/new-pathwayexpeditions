import TourCard from "./TourCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";

// Cultural Heritage - using Cloudinary fallbacks (local assets moved)
const culturalHero = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg";
const luwombo = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg";
// Using Cloudinary images for cultural gallery
const cultural1 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg";
const cultural3 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339800/culture_7_omaddc.jpg";
const cultural4 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339798/culture_3_tvcrjs.jpg";
const cultural5 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339785/culture_8_da4cz8.jpg";
const cultural6 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339769/culture_1_tq1far.jpg";
const cultural7 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339802/culture_2_niunfh.jpg";

// Gorilla Trekking - using Cloudinary fallbacks
const gorilla1 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339399/gorilla_7_xrnim5.jpg";
const gorilla2 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339392/gorilla_8_exuo6a.jpg";
const gorilla3 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339380/gorilla_3_btjdfk.jpg";
const gorilla4 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339366/gorilla_26_vpfime.jpg";
const gorilla5 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg";
const gorilla6 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339365/gorilla_4_rno9ax.jpg";
const gorilla7 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339364/gorilla_5_pwi1df.jpg";

// 13 Day Uganda Adventure - Cloudinary fallbacks
const uganda13_1 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340963/nature_walks_6_i6mprd.jpg";
const uganda13_2 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340944/nature_walks_3_edkqjc.jpg";
const uganda13_3 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340944/nature_walks_1_z3f1q3.jpg";
const uganda13_4 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340943/nature_walks_5_ajbevw.jpg";
const uganda13_5 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340939/nature_walks_4_mhiim4.jpg";
const uganda13_6 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340963/nature_walks_6_i6mprd.jpg";
const uganda13_7 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340944/nature_walks_3_edkqjc.jpg";

// 15 Day Great Uganda Safari - Cloudinary fallbacks
const uganda15_1 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338693/wildlife_13_slttqx.jpg";
const uganda15_2 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338693/wildlife_13_slttqx.jpg";
const uganda15_3 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338693/wildlife_13_slttqx.jpg";
const uganda15_4 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338693/wildlife_13_slttqx.jpg";
const uganda15_5 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338693/wildlife_13_slttqx.jpg";
const uganda15_6 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340963/nature_walks_6_i6mprd.jpg";
const uganda15_7 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340943/nature_walks_5_ajbevw.jpg";

// Murchison Falls Explorer - Cloudinary fallbacks
const falls1 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340963/nature_walks_6_i6mprd.jpg";
const falls2 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340943/nature_walks_5_ajbevw.jpg";
const falls3 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340944/nature_walks_1_z3f1q3.jpg";
const falls4 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340944/nature_walks_3_edkqjc.jpg";
const falls5 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340939/nature_walks_4_mhiim4.jpg";
const falls6 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340963/nature_walks_6_i6mprd.jpg";
const falls7 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg";

// Lake Victoria Experience - Cloudinary fallbacks
const vic1 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340724/boat_13_rtn8wm.jpg";
const vic2 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340716/boat_10_kw2jqg.jpg";
const vic3 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340713/boat_18_py0y6x.jpg";
const vic4 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340707/boat_16_phxhlt.jpg";
const vic5 = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340701/boat_15_hyxe9c.jpg";
const vic6 = vic1;
const vic7 = vic2;

const allTours = [
  {
    title: "Cultural Heritage Tour",
    location: "Central Uganda",
    duration: "5 Days",
    price: 1250,
    // replaced with Cloudinary images as requested
    image: "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg",
    images: [
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339800/culture_7_omaddc.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339798/culture_3_tvcrjs.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339785/culture_8_da4cz8.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339769/culture_1_tq1far.jpg",
    ],
    description: "Immerse yourself in Uganda's rich cultural traditions, local communities, and authentic experiences.",
    groupSize: "4-10 people"
  },
  {
    title: "Gorilla Trekking Adventure",
    location: "Bwindi Forest, Uganda",
    duration: "3 Days",
    price: 1999,
    image: "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339399/gorilla_7_xrnim5.jpg",
    images: [
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339399/gorilla_7_xrnim5.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339392/gorilla_8_exuo6a.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339380/gorilla_3_btjdfk.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339366/gorilla_26_vpfime.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339365/gorilla_4_rno9ax.jpg",
    ],
    description: "Journey through misty rainforests for a rare glimpse of mountain gorillas in their natural habitat.",
    groupSize: "2-8 people"
  },
  {
    title: "13 Day Uganda Adventure",
    location: "Multiple Destinations, Uganda",
    duration: "13 Days",
    price: 6495,
    image: "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340963/nature_walks_6_i6mprd.jpg",
    images: [
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340963/nature_walks_6_i6mprd.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340944/nature_walks_3_edkqjc.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340944/nature_walks_1_z3f1q3.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340943/nature_walks_5_ajbevw.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340939/nature_walks_4_mhiim4.jpg",
    ],
    description: "Experience the best of Uganda with wildlife safaris, gorilla trekking, and cultural encounters.",
    groupSize: "4-12 people"
  },
  {
    title: "15 Day Great Uganda Safari",
    location: "Uganda Circuit",
    duration: "15 Days",
    price: 4385,
    image: "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338693/wildlife_13_slttqx.jpg",
    images: [
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338693/wildlife_13_slttqx.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338690/wildlife_12_umcnzx.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338681/wildlife_6_vlpi8q.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338680/wildlife_5_hro0ta.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338675/wildlife_10_ckkxb5.jpg",
    ],
    description: "Comprehensive safari adventure covering Uganda's most iconic national parks and wildlife reserves.",
    groupSize: "6-15 people"
  },
  {
    title: "Murchison Falls Explorer",
    location: "Murchison Falls NP",
    duration: "4 Days",
    price: 1850,
    image: "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340677/boat_8_apoiyf.jpg",
    images: [
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340677/boat_8_apoiyf.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340676/boat_11_gxfdi7.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340672/boat_1_jkgudg.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340670/boat_6_ibtlkq.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340669/boat_9_uyv9rl.jpg",
    ],
    description: "Witness the world's most powerful waterfall and encounter diverse wildlife in Uganda's largest park.",
    groupSize: "2-8 people"
  },
  {
    title: "Lake Victoria Experience",
    location: "Lake Victoria",
    duration: "3 Days",
    price: 980,
    image: "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340655/boat_4_sf2x2s.jpg",
    images: [
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340655/boat_4_sf2x2s.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340641/boat_7_jvpz7h.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340640/boat_3_fn6wbe.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340631/boat_5_cw4s2x.jpg",
      "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340625/boat_2_gjwhc4.jpg",
    ],
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