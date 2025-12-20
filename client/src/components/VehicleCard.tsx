import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Gauge, Fuel, Eye, Star, CheckCircle2, XCircle } from "lucide-react";
import { usdToUgx, formatUgx, cn } from "@/lib/utils";
import BookingDialog from "./BookingDialog";
import VehicleDetailDialog from "./VehicleDetailDialog";

export interface VehicleData {
  name: string;
  category: string;
  seats: number;
  luggage: number;
  transmission: string;
  fuelType: string;
  dailyRate: number;
  image: string;
  features: string[];
  gallery: string[];
  rates: { daily: number; weekly: number; monthly: number };
  mileageLimit: string;
  fuelPolicy: string;
  included: string[];
  addOns: { name: string; price: number; pricingType: "perDay" | "flat" }[];
  insurance: string;
  support: string;
  testimonials: { name: string; feedback: string }[];
  rating?: number;
  reviewCount?: number;
  availability?: "available" | "limited" | "unavailable";
  bookedDates?: string[]; // ISO date strings of booked dates
}

interface VehicleCardProps {
  vehicle: VehicleData;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const {
    name,
    category,
    seats,
    luggage,
    transmission,
    fuelType,
    dailyRate,
    image,
    features,
    addOns,
  } = vehicle;

  return (
    <>
      <Card className={cn(
        "overflow-hidden transition-all duration-300 cursor-pointer group h-full flex flex-col",
        vehicle.availability === "unavailable" 
          ? "opacity-75 cursor-not-allowed" 
          : "hover-elevate"
      )} data-testid={`card-vehicle-${name.toLowerCase().replace(/\s+/g, "-")}`}>
        <div className="relative h-40 sm:h-48 bg-muted overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-2">
            <Badge variant="default" className="shadow-md text-xs">{category}</Badge>
            {vehicle.availability && (
              <Badge 
                variant={vehicle.availability === "available" ? "secondary" : vehicle.availability === "limited" ? "secondary" : "destructive"}
                className={cn(
                  "shadow-md text-xs flex items-center gap-1",
                  vehicle.availability === "available" && "bg-blue-500 hover:bg-blue-600 text-white border-blue-600",
                  vehicle.availability === "limited" && "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-600",
                  vehicle.availability === "unavailable" && "bg-red-500 hover:bg-red-600 text-white border-red-600"
                )}
              >
                {vehicle.availability === "available" && (
                  <>
                    <CheckCircle2 className="h-3 w-3" />
                    Available Now
                  </>
                )}
                {vehicle.availability === "limited" && (
                  <>
                    <XCircle className="h-3 w-3" />
                    Limited Availability
                  </>
                )}
                {vehicle.availability === "unavailable" && (
                  <>
                    <XCircle className="h-3 w-3" />
                    Unavailable
                  </>
                )}
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3 gap-2">
            <h3 className="text-lg sm:text-xl font-semibold flex-1">{name}</h3>
            {(vehicle.rating || vehicle.reviewCount) && (
              <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm flex-shrink-0">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary" />
                <span className="font-semibold">{vehicle.rating?.toFixed(1) || "4.8"}</span>
                {vehicle.reviewCount && (
                  <span className="text-muted-foreground text-[10px] sm:text-xs hidden sm:inline">({vehicle.reviewCount})</span>
                )}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{seats} Seats</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{luggage} Bags</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Gauge className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{transmission}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Fuel className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{fuelType}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3 sm:mb-4 flex-1">
            {features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="outline" className="text-[10px] sm:text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 flex flex-col gap-3">
          <div className="w-full">
            <div className="text-xs sm:text-sm text-muted-foreground">From</div>
            <div className="text-xl sm:text-2xl font-bold text-primary">{formatUgx(usdToUgx(dailyRate))}/day</div>
          </div>
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline"
              onClick={() => setDetailsOpen(true)}
              size="sm"
              className="shadow-sm flex-1 text-xs sm:text-sm"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              View Details
            </Button>
            <Button 
              variant="default" 
              onClick={() => setBookingOpen(true)}
              className="shadow-md flex-1 text-xs sm:text-sm"
              disabled={vehicle.availability === "unavailable"}
              data-testid={`button-reserve-${name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {vehicle.availability === "unavailable" ? "Unavailable" : "Reserve Now"}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        type="vehicle"
        itemName={name}
        itemPrice={dailyRate}
        itemImage={image}
        addOns={addOns}
        allowDriver
        bookedDates={vehicle.bookedDates}
      />

      <VehicleDetailDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        vehicle={vehicle}
        onBook={() => {
          setDetailsOpen(false);
          setBookingOpen(true);
        }}
      />
    </>
  );
}