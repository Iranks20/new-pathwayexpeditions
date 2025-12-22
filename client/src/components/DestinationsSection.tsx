import DestinationCard from "./DestinationCard";
// Using Cloudinary fallbacks (local assets removed or relocated)
const fallsImage = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340963/nature_walks_6_i6mprd.jpg";
const elephantImage = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg";
const springImage = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340963/nature_walks_6_i6mprd.jpg";
const tombAsset = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339801/culture_9_fxgtyw.jpg"; // fallback for tomb
const lakeImage = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766340716/boat_10_kw2jqg.jpg";
const gorillaImage = "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766339399/gorilla_7_xrnim5.jpg";

// Using available images directly
const springVideo = springImage;
const tombImage = tombAsset ?? lakeImage;
const elgonVideo = gorillaImage;
const gorillaVideo = gorillaImage;

const destinations = [
  {
    name: "Western Uganda",
    description: "A land of iconic safaris and stunning natural wonders.",
    image: "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766399406/western_ecu2bm.jpg"
  },
  {
    name: "Central Uganda",
    description: "Experience vibrant culture and the Pearl of Africa's heartland.",
    image: tombImage
  },
  {
    name: "Eastern Uganda",
    description: "Discover Mount Elgon and the source of the Nile River.",
    image: "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766399388/eastern_er2hzf.jpg"
  },
  {
    name: "Northern Uganda",
    description: "Home of the majestic gorillas and breathtaking rolling hills.",
    image: "https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766399390/northern_sen4qp.jpg"
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
