import VehicleCard, { type VehicleData } from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, useMemo } from "react";
import { X } from "lucide-react";
import { usdToUgx, formatUgx } from "@/lib/utils";
// Using available images as fallbacks
import landCruiserImage from "@assets/generated_images/land rover defender.jpg";
import nissanPatrolImage from "@assets/generated_images/ford ranger wild truck.jpg";
import rav4Image from "@assets/generated_images/Safaris-1.webp";
import maverickImage from "@assets/generated_images/img1.webp";
import sprinterImage from "@assets/generated_images/marcedes splinter.jpg";
import hiaceImage from "@assets/generated_images/img2.webp";
import landRoverDefenderImage from "@assets/generated_images/land rover defender.jpg";
import fordRangerImage from "@assets/generated_images/ford ranger wild truck.jpg";
import mercedesSprinterImage from "@assets/generated_images/marcedes splinter.jpg";

const vehicles: VehicleData[] = [
  {
    name: "Toyota Land Cruiser",
    category: "Safari 4x4",
    seats: 7,
    luggage: 5,
    transmission: "Automatic",
    fuelType: "Diesel",
    dailyRate: 75,
    image: landCruiserImage,
    features: ["AC", "GPS", "4WD", "Full Insurance", "Roof Rack", "Spare Tire"],
    gallery: [landCruiserImage, nissanPatrolImage, rav4Image],
    rates: { daily: 75, weekly: 450, monthly: 1575 },
    mileageLimit: "250 km per day",
    fuelPolicy: "Full-to-full",
    included: ["Professional trip briefing", "Comprehensive insurance", "24/7 roadside assistance", "National park recovery support"],
    addOns: [
      { name: "Chauffeur Guide", price: 28, pricingType: "perDay" },
      { name: "Satellite Phone", price: 13, pricingType: "perDay" },
      { name: "Camping Kit", price: 10, pricingType: "perDay" },
      { name: "Child Seat", price: 5, pricingType: "perDay" }
    ],
    insurance: "Includes collision damage waiver and emergency medical support. Refundable security deposit of $600 applies.",
    support: "Dedicated safari specialist, daily vehicle health check-in, mechanical swap guarantee within 6 hours.",
    testimonials: [
      { name: "Clara & Team", feedback: "Impeccable off-road performance and support throughout our gorilla trek circuit." }
    ],
    rating: 4.9,
    reviewCount: 127,
    availability: "available",
    bookedDates: []
  },
  {
    name: "Nissan Patrol",
    category: "Luxury SUV",
    seats: 7,
    luggage: 6,
    transmission: "Automatic",
    fuelType: "Diesel",
    dailyRate: 60,
    image: nissanPatrolImage,
    features: ["Premium AC", "GPS Nav", "4WD", "Leather Seats", "Sunroof", "Insurance"],
    gallery: [nissanPatrolImage, landCruiserImage, rav4Image],
    rates: { daily: 60, weekly: 375, monthly: 1350 },
    mileageLimit: "220 km per day",
    fuelPolicy: "Full-to-full",
    included: ["Executive meet-and-greet", "Luxury welcome kit", "Professional chauffeur briefing", "Airport fast-track coordination"],
    addOns: [
      { name: "Executive Chauffeur", price: 35, pricingType: "perDay" },
      { name: "Onboard Wi-Fi", price: 8, pricingType: "perDay" },
      { name: "Premium Refreshments", price: 30, pricingType: "flat" }
    ],
    insurance: "Full comprehensive coverage including VIP protection, zero excess with chauffeur, $800 deposit for self-drive.",
    support: "Priority response line, in-car concierge chat, replacement vehicle within 3 hours in Kampala.",
    testimonials: [
      { name: "Ngoma Safaris", feedback: "Our executive guests loved the plush interior and concierge-level service." }
    ],
    rating: 4.8,
    reviewCount: 89,
    availability: "unavailable",
    bookedDates: []
  },
  {
    name: "Toyota RAV4",
    category: "Compact SUV",
    seats: 5,
    luggage: 3,
    transmission: "Automatic",
    fuelType: "Petrol",
    dailyRate: 25,
    image: rav4Image,
    features: ["AC", "GPS", "AWD", "Bluetooth", "USB Charging", "Insurance"],
    gallery: [rav4Image, landCruiserImage],
    rates: { daily: 25, weekly: 150, monthly: 600 },
    mileageLimit: "200 km per day",
    fuelPolicy: "Full-to-full",
    included: ["Unlimited driver swaps", "Phone holder and charger pack", "City driving orientation", "Insurance with low excess"],
    addOns: [
      { name: "Self-drive Orientation", price: 18, pricingType: "flat" },
      { name: "Baby Seat", price: 4, pricingType: "perDay" },
      { name: "Wi-Fi Hotspot", price: 6, pricingType: "perDay" }
    ],
    insurance: "Third-party and collision cover with $350 deposit. Optional personal effects cover available.",
    support: "Live WhatsApp support, recovery within 90 minutes in Kampala, cross-border permits on request.",
    testimonials: [
      { name: "James K.", feedback: "Ideal for city-to-safari trips. Booking was seamless, and support was responsive." }
    ],
    rating: 4.7,
    reviewCount: 156,
    availability: "unavailable",
    bookedDates: []
  },
  {
    name: "Land Rover Defender",
    category: "Safari 4x4",
    seats: 5,
    luggage: 4,
    transmission: "Manual",
    fuelType: "Diesel",
    dailyRate: 50,
    image: landRoverDefenderImage,
    features: ["AC", "GPS", "4WD", "Roof Tent", "Recovery Kit", "Insurance"],
    gallery: [landRoverDefenderImage, rav4Image, nissanPatrolImage],
    rates: { daily: 50, weekly: 300, monthly: 1050 },
    mileageLimit: "250 km per day",
    fuelPolicy: "Full-to-full",
    included: ["Roof tent setup", "Dual fridge-freezer", "Comprehensive recovery kit", "Preloaded GPS waypoints"],
    addOns: [
      { name: "Bush Chef Kit", price: 15, pricingType: "perDay" },
      { name: "Portable Shower", price: 9, pricingType: "perDay" },
      { name: "Additional Rooftop Tent", price: 23, pricingType: "perDay" }
    ],
    insurance: "Off-road coverage with damage waiver, deposit $700, includes wildlife encounter protection.",
    support: "Expedition hotline, satellite tracking, proactive maintenance alerts mid-trip.",
    testimonials: [
      { name: "Wild Trails Crew", feedback: "Rooftop tent and recovery gear made our filming safari worry-free." }
    ],
    rating: 4.9,
    reviewCount: 73,
    availability: "available",
    bookedDates: []
  },
  {
    name: "Ford Ranger Wildtrak",
    category: "Adventure Pickup",
    seats: 5,
    luggage: 5,
    transmission: "Automatic",
    fuelType: "Diesel",
    dailyRate: 40,
    image: fordRangerImage,
    features: ["4x4", "Cargo Bed Liner", "Snorkel", "Apple CarPlay", "Insurance"],
    gallery: [fordRangerImage, landCruiserImage],
    rates: { daily: 40, weekly: 240, monthly: 840 },
    mileageLimit: "260 km per day",
    fuelPolicy: "Full-to-full",
    included: ["Cargo tie-downs", "Dual battery system", "Adventure briefing", "Roadside mechanical standby"],
    addOns: [
      { name: "Film Crew Rigging Kit", price: 23, pricingType: "perDay" },
      { name: "Lockable Storage Box", price: 10, pricingType: "perDay" },
      { name: "Fuel Jerrycans (2)", price: 6, pricingType: "perDay" }
    ],
    insurance: "Commercial usage insurance with $600 deposit, includes cargo coverage up to $2,000.",
    support: "Specialized logistics manager, border documentation desk, tyre swap within 4 hours countrywide.",
    testimonials: [
      { name: "Karamoja Film Unit", feedback: "Perfect payload and reliability for remote shoots." }
    ],
    rating: 4.6,
    reviewCount: 42,
    availability: "available",
    bookedDates: []
  },
  {
    name: "Mercedes Sprinter XL",
    category: "Executive Van",
    seats: 12,
    luggage: 12,
    transmission: "Automatic",
    fuelType: "Diesel",
    dailyRate: 75,
    image: mercedesSprinterImage,
    features: ["Reclining Seats", "Onboard Wi-Fi", "Climate Control", "TV Screen", "Insurance"],
    gallery: [mercedesSprinterImage, hiaceImage],
    rates: { daily: 75, weekly: 450, monthly: 1575 },
    mileageLimit: "180 km per day",
    fuelPolicy: "Full-to-full",
    included: ["Executive chauffeur", "Cold towel service", "Daily detailing", "High-speed Wi-Fi"],
    addOns: [
      { name: "Onboard Catering", price: 55, pricingType: "flat" },
      { name: "Branding Wrap", price: 48, pricingType: "flat" },
      { name: "Security Escort", price: 75, pricingType: "perDay" }
    ],
    insurance: "Corporate travel insurance with zero excess, deposit on request based on itinerary.",
    support: "Travel coordinator desk, multilingual chauffeurs, event logistician on-call.",
    testimonials: [
      { name: "Global Conferences EA", feedback: "Board loved the hospitality touches and reliable schedule adherence." }
    ],
    rating: 4.8,
    reviewCount: 34,
    availability: "available",
    bookedDates: []
  }
];

const categories = ["All Vehicles", "Safari 4x4", "Luxury SUV", "Compact SUV", "Adventure Pickup", "Executive Van"];

const minPrice = Math.min(...vehicles.map(v => usdToUgx(v.dailyRate)));
const maxPrice = Math.max(...vehicles.map(v => usdToUgx(v.dailyRate)));

export default function VehiclesSection() {
  const [selectedCategory, setSelectedCategory] = useState("All Vehicles");
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);

  const filteredVehicles = useMemo(() => {
    let filtered = vehicles;

    // Filter by category
    if (selectedCategory !== "All Vehicles") {
      filtered = filtered.filter(v => v.category === selectedCategory);
    }

    // Filter by price range (comparing UGX prices)
    filtered = filtered.filter(v => {
      const vehiclePriceUgx = usdToUgx(v.dailyRate);
      return vehiclePriceUgx >= priceRange[0] && vehiclePriceUgx <= priceRange[1];
    });

    return filtered;
  }, [selectedCategory, priceRange]);

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const resetFilters = () => {
    setSelectedCategory("All Vehicles");
    setPriceRange([minPrice, maxPrice]);
  };

  const hasActiveFilters = selectedCategory !== "All Vehicles" || 
    priceRange[0] !== minPrice || priceRange[1] !== maxPrice;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/30 to-background" id="vehicles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Premium Fleet
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your Perfect Ride
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium safari vehicles and comfortable rides for every journey
          </p>
        </div>

        <div className="mb-8 space-y-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="shadow-sm hover:shadow-md transition-all text-sm"
                data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {category}
              </Button>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Price Range (per day in UGX)</Label>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="h-auto p-1 text-xs"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    min={minPrice}
                    max={maxPrice}
                    step={50000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatUgx(priceRange[0])}</span>
                    <span>{formatUgx(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No vehicles match your filters.</p>
            <Button variant="outline" onClick={resetFilters}>
              Clear Filters
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredVehicles.map((vehicle, index) => (
            <div 
              key={vehicle.name}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
