import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, Fuel, Gauge, MapPin, Star } from "lucide-react";
import { usdToUgx, formatUgx } from "@/lib/utils";
import AvailabilityCalendar from "./AvailabilityCalendar";
import type { VehicleData } from "./VehicleCard";

interface VehicleDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: VehicleData;
  onBook: () => void;
}

export default function VehicleDetailDialog({ open, onOpenChange, vehicle, onBook }: VehicleDetailDialogProps) {
  const {
    name,
    category,
    seats,
    luggage,
    transmission,
    fuelType,
    dailyRate,
    features,
    gallery,
    rates,
    mileageLimit,
    fuelPolicy,
    included,
    addOns,
    insurance,
    support,
    testimonials,
  } = vehicle;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto pr-6">
            <DialogHeader className="space-y-2">
              <Badge variant="secondary" className="w-fit">{category}</Badge>
              <DialogTitle className="text-3xl">{name}</DialogTitle>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Gauge className="h-4 w-4" />{transmission}</span>
                <span className="flex items-center gap-2"><Fuel className="h-4 w-4" />{fuelType}</span>
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{seats} seats</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{mileageLimit}</span>
              </div>
            </DialogHeader>

            <div className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
              <div className="grid grid-cols-2 gap-3">
                {gallery.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border bg-muted">
                    <img src={image} alt={`${name} ${index + 1}`} className="w-full h-44 object-cover" />
                  </div>
                ))}
              </div>
              <div className="space-y-3 rounded-lg border p-4 bg-muted/40">
                <h3 className="text-lg font-semibold">Rates & Availability</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Daily (24 hrs)</span>
                    <span className="font-semibold">{formatUgx(usdToUgx(rates.daily))}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Weekly (7 days)</span>
                    <span className="font-semibold">{formatUgx(usdToUgx(rates.weekly))}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Monthly (30 days)</span>
                    <span className="font-semibold">{formatUgx(usdToUgx(rates.monthly))}</span>
                  </div>
                </div>
                <Separator />
                <p className="text-sm text-muted-foreground">Pricing includes VAT, standard insurance, and unlimited driver swaps. Custom itineraries receive a tailored quote within 30 minutes.</p>
              </div>
            </div>

            <div className="mt-6">
              <AvailabilityCalendar
                bookedDates={vehicle.bookedDates}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Included</h3>
                <div className="space-y-2 text-sm">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Popular Add-ons</h3>
                <div className="space-y-2 text-sm">
                  {addOns.map((addon) => (
                    <div key={addon.name} className="flex items-center justify-between rounded-md border p-2">
                      <span>{addon.name}</span>
                      <span className="font-medium">{formatUgx(usdToUgx(addon.price))}{addon.pricingType === "perDay" ? "/day" : ""}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Insurance & Policies</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{insurance}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Fuel policy: {fuelPolicy}. Complimentary vehicle health inspection on pickup and drop-off.</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">24/7 Support</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{support}</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default" size="sm">Live WhatsApp</Button>
                  <Button variant="outline" size="sm">Request Quote PDF</Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Guest Stories</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.name} className="rounded-lg border bg-muted/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-primary fill-primary" />
                      <span className="font-semibold">{testimonial.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">“{testimonial.feedback}”</p>
                  </div>
                ))}
              </div>
            </div>
        </div>
        <div className="border-t bg-muted/40 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Reserve from</div>
            <div className="text-2xl font-bold text-primary">{formatUgx(usdToUgx(dailyRate))}/day</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
            <Button asChild variant="secondary">
              <a href="https://wa.me/256753904064" target="_blank" rel="noopener noreferrer">
                Live WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="mailto:bookings@pathwayexpeditions.com?subject=Vehicle%20Quote%20Request">
                Request Quote PDF
              </a>
            </Button>
            <Button onClick={onBook}>Reserve This Vehicle</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


