import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft, Check, XCircle } from "lucide-react";
import { cn, usdToUgx, formatUgx } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { isVehicleAvailable } from "@/lib/availability";
import LocationSelector from "./LocationSelector";
import { defaultPickupDistrict, sortedDistricts } from "@shared/data/ugandaDistricts";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "tour" | "vehicle";
  itemName: string;
  itemPrice: number;
  itemImage: string;
  addOns?: { name: string; price: number; pricingType: "perDay" | "flat" }[];
  allowDriver?: boolean;
  bookedDates?: string[]; // ISO date strings for availability checking
}

export default function BookingDialog({
  open,
  onOpenChange,
  type,
  itemName,
  itemPrice,
  itemImage,
  addOns = [],
  allowDriver = false,
  bookedDates = [],
}: BookingDialogProps) {
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const [driverOption, setDriverOption] = useState<"self-drive" | "chauffeur">("self-drive");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [pickupLocation, setPickupLocation] = useState<string>(defaultPickupDistrict.id);
  const [dropoffLocation, setDropoffLocation] = useState<string>(defaultPickupDistrict.id);
  const [sameLocation, setSameLocation] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: "2",
    specialRequests: "",
  });

  const handleSubmit = async () => {
    if (!startDate || !endDate) return;
    
    // Check availability for vehicle bookings
    if (type === "vehicle" && bookedDates.length > 0) {
      const available = isVehicleAvailable(bookedDates, startDate, endDate);
      if (!available) {
        toast({
          title: "Vehicle Not Available",
          description: "This vehicle is not available for the selected dates. Please choose different dates.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setSubmitting(true);
    try {
      // Get district names from IDs for email
      const getDistrictName = (districtId: string) => {
        const district = sortedDistricts.find(d => d.id === districtId);
        return district ? district.name : districtId;
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          itemName,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          guests: formData.guests,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          specialRequests: formData.specialRequests,
          driverOption: type === "vehicle" && allowDriver ? driverOption : undefined,
          addOns: type === "vehicle" ? selectedAddOns : undefined,
          pickupLocation: type === "vehicle" ? getDistrictName(pickupLocation) : undefined,
          dropoffLocation: type === "vehicle" ? (sameLocation ? getDistrictName(pickupLocation) : getDistrictName(dropoffLocation)) : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to submit booking");
      }

      toast({
        title: "Booking request sent",
        description: "A confirmation email has been sent to your email address. We will contact you within 24 hours to finalize your booking.",
      });
      onOpenChange(false);
      setStep(1);
      setDriverOption("self-drive");
      setSelectedAddOns([]);
    } catch (e: any) {
      toast({ title: "Booking failed", description: e.message });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep1 = () => (
      <div className="space-y-6">
      {type === "vehicle" && (
        <div>
          <Label className="text-base font-semibold mb-4 block">Pick-up & Drop-off Locations</Label>
          <div className="space-y-4">
            <LocationSelector
              label="Pick-up Location"
              value={pickupLocation}
              onChange={setPickupLocation}
              required
            />
            <div className="flex items-center gap-2">
              <Checkbox
                id="same-location"
                checked={sameLocation}
                onCheckedChange={(checked) => {
                  setSameLocation(checked as boolean);
                  if (checked) {
                    setDropoffLocation(pickupLocation);
                  }
                }}
              />
              <Label htmlFor="same-location" className="text-sm font-normal cursor-pointer">
                Same as pick-up location
              </Label>
            </div>
            {!sameLocation && (
              <LocationSelector
                label="Drop-off Location"
                value={dropoffLocation}
                onChange={setDropoffLocation}
                required
              />
            )}
          </div>
        </div>
      )}
      <div>
        <Label className="text-base font-semibold mb-4 block">Select Your Dates</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">
              {type === "tour" ? "Tour Start Date" : "Pick-up Date"}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                  data-testid="button-select-start-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (date < today) return true;
                    // Disable booked dates for vehicles
                    if (type === "vehicle" && bookedDates.length > 0) {
                      return bookedDates.some((booked) => {
                        try {
                          const bookedDate = new Date(booked);
                          bookedDate.setHours(0, 0, 0, 0);
                          return date.getTime() === bookedDate.getTime();
                        } catch {
                          return false;
                        }
                      });
                    }
                    return false;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">
              {type === "tour" ? "Tour End Date" : "Drop-off Date"}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                  data-testid="button-select-end-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => {
                    if (!startDate) return date < new Date();
                    if (date < startDate) return true;
                    // Disable booked dates for vehicles
                    if (type === "vehicle" && bookedDates.length > 0) {
                      return bookedDates.some((booked) => {
                        try {
                          const bookedDate = new Date(booked);
                          bookedDate.setHours(0, 0, 0, 0);
                          return date.getTime() === bookedDate.getTime();
                        } catch {
                          return false;
                        }
                      });
                    }
                    return false;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {type === "vehicle" && startDate && endDate && bookedDates.length > 0 && (
          <div className="mt-2">
            {isVehicleAvailable(bookedDates, startDate, endDate) ? (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <Check className="h-3 w-3" />
                Vehicle is available for these dates
              </p>
            ) : (
              <p className="text-xs text-destructive flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                Vehicle is not available for some of these dates. Please select different dates.
              </p>
            )}
          </div>
        )}
      </div>

      {type === "vehicle" && allowDriver && (
        <div className="space-y-3">
          <Label className="text-base font-semibold">Driving Preference</Label>
          <RadioGroup
            value={driverOption}
            onValueChange={(val) => setDriverOption(val as "self-drive" | "chauffeur")}
            className="grid gap-2 md:grid-cols-2"
          >
            <div className={cn("border rounded-lg p-3 space-y-1", driverOption === "self-drive" && "border-primary")}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="self-drive" id="self-drive" />
                <Label htmlFor="self-drive" className="font-semibold">Self-drive</Label>
              </div>
              <p className="text-xs text-muted-foreground">Includes briefing, unlimited driver swaps, security deposit applies.</p>
            </div>
            <div className={cn("border rounded-lg p-3 space-y-1", driverOption === "chauffeur" && "border-primary")}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="chauffeur" id="chauffeur" />
                <Label htmlFor="chauffeur" className="font-semibold">Professional Chauffeur</Label>
              </div>
              <p className="text-xs text-muted-foreground">Licensed driver with local expertise. Driver service billed per day.</p>
            </div>
          </RadioGroup>
        </div>
      )}

      {type === "vehicle" && addOns.length > 0 && (
        <div className="space-y-3">
          <Label className="text-base font-semibold">Enhance Your Ride</Label>
          <div className="grid gap-3">
            {addOns.map((addon) => {
              const checked = selectedAddOns.includes(addon.name);
              return (
                <div
                  key={addon.name}
                  className={cn(
                    "flex items-start justify-between gap-3 border rounded-lg p-3",
                    checked && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={addon.name}
                      checked={checked}
                      onCheckedChange={(value) => {
                        if (value) {
                          setSelectedAddOns([...selectedAddOns, addon.name]);
                        } else {
                          setSelectedAddOns(selectedAddOns.filter((item) => item !== addon.name));
                        }
                      }}
                    />
                    <div>
                      <Label htmlFor={addon.name} className="font-semibold">{addon.name}</Label>
                      <p className="text-xs text-muted-foreground capitalize">
                        {addon.pricingType === "perDay" ? "Billed per day" : "One-time fee"}
                      </p>
                    </div>
                  </div>
                  <div className="font-semibold text-sm">${addon.price}{addon.pricingType === "perDay" ? "/day" : ""}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="guests">
          {type === "tour" ? "Number of Guests" : "Number of Passengers"}
        </Label>
        <Input
          id="guests"
          type="number"
          min="1"
          max="15"
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          data-testid="input-guests"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">Your Information</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              data-testid="input-first-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              data-testid="input-last-name"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              data-testid="input-booking-email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              data-testid="input-booking-phone"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="requests">Special Requests (Optional)</Label>
          <Textarea
            id="requests"
            rows={4}
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            placeholder="Any special requirements or requests..."
            data-testid="input-special-requests"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const days = startDate && endDate 
      ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) 
      : 0;
    const billableDays = type === "vehicle" ? Math.max(days, 1) : 1;
    const rentalSubtotal = itemPrice * billableDays;
    const addOnTotal = type === "vehicle"
      ? selectedAddOns.reduce((sum, name) => {
          const addon = addOns.find((item) => item.name === name);
          if (!addon) return sum;
          if (addon.pricingType === "perDay") {
            return sum + addon.price * billableDays;
          }
          return sum + addon.price;
        }, 0)
      : 0;
    const driverCharge = type === "vehicle" && allowDriver && driverOption === "chauffeur" ? 28 * billableDays : 0;
    const subtotal = rentalSubtotal + addOnTotal + driverCharge;
    const serviceFee = rentalSubtotal * 0.05;
    const total = subtotal + serviceFee;

    return (
      <div className="space-y-6">
        <div>
          <Label className="text-base font-semibold mb-4 block">Review Your Booking</Label>
          
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <div className="flex gap-4">
              <img src={itemImage} alt={itemName} className="w-24 h-24 object-cover rounded-md" />
              <div>
                <h4 className="font-semibold text-lg">{itemName}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {startDate && format(startDate, "MMM dd, yyyy")} - {endDate && format(endDate, "MMM dd, yyyy")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formData.guests} {type === "tour" ? "guest(s)" : "passenger(s)"}
                </p>
                {type === "vehicle" && allowDriver && (
                  <p className="text-sm text-muted-foreground capitalize">
                    {driverOption === "chauffeur" ? "Chauffeur-driven" : "Self-drive"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {type === "tour" ? "Tour Package" : `Vehicle Rental (${billableDays} day${billableDays !== 1 ? 's' : ''})`}
              </span>
              <span className="font-medium">{formatUgx(usdToUgx(rentalSubtotal))}</span>
            </div>
            {type === "vehicle" && allowDriver && driverOption === "chauffeur" && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Professional Chauffeur</span>
                <span className="font-medium">{formatUgx(usdToUgx(driverCharge))}</span>
              </div>
            )}
            {type === "vehicle" && addOnTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Selected Add-ons</span>
                <span className="font-medium">{formatUgx(usdToUgx(addOnTotal))}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service Fee (5%)</span>
              <span className="font-medium">{formatUgx(usdToUgx(serviceFee))}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total</span>
              <span className="text-primary">{formatUgx(usdToUgx(total))}</span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-center">
              <strong>Contact Information:</strong> {formData.firstName} {formData.lastName} • {formData.email} • {formData.phone}
            </p>
          </div>
          
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-center text-muted-foreground">
              By submitting this booking, you agree to our{" "}
              <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Terms & Conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {type === "tour" ? "Book Your Tour" : "Reserve Your Vehicle"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                  step >= s
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {step > s ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    "w-16 h-0.5 mx-2",
                    step > s ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[300px]">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            data-testid="button-back"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && (!startDate || !endDate)) ||
                (step === 2 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone))
              }
              data-testid="button-next"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={submitting} data-testid="button-confirm-booking">
              Confirm Booking
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
