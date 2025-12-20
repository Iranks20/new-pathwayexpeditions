import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { format, isSameDay, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

interface AvailabilityCalendarProps {
  bookedDates?: string[]; // ISO date strings
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export default function AvailabilityCalendar({
  bookedDates = [],
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
}: AvailabilityCalendarProps) {
  const isDateBooked = (date: Date) => {
    return bookedDates.some((bookedDate) => {
      try {
        return isSameDay(date, parseISO(bookedDate));
      } catch {
        return false;
      }
    });
  };

  const isDateInRange = (date: Date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const modifiers = {
    booked: (date: Date) => isDateBooked(date),
    selected: (date: Date) => isDateInRange(date),
  };

  const modifiersClassNames = {
    booked: "bg-destructive/10 text-destructive hover:bg-destructive/20",
    selected: "bg-primary text-primary-foreground hover:bg-primary/90",
  };

  const availableCount = 30 - bookedDates.length; // Assuming 30-day view
  const availabilityStatus = 
    availableCount > 20 ? "available" : 
    availableCount > 10 ? "limited" : 
    "unavailable";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Availability Calendar</CardTitle>
        <div className="flex items-center gap-4 flex-wrap mt-2">
          <div className="flex items-center gap-2">
            {availabilityStatus === "available" && (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Available</span>
              </>
            )}
            {availabilityStatus === "limited" && (
              <>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-muted-foreground">Limited Availability</span>
              </>
            )}
            {availabilityStatus === "unavailable" && (
              <>
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-muted-foreground">Unavailable</span>
              </>
            )}
          </div>
          {bookedDates.length > 0 && (
            <Badge variant="outline" className="text-xs">
              {bookedDates.length} booked date{bookedDates.length !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedStartDate}
          onMonthChange={onDateSelect}
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today || isDateBooked(date);
          }}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          className="rounded-md border"
        />
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border-2 border-primary bg-primary/20" />
            <span className="text-muted-foreground">Selected dates</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border-2 border-destructive bg-destructive/10" />
            <span className="text-muted-foreground">Booked/Unavailable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border-2 border-muted" />
            <span className="text-muted-foreground">Available</span>
          </div>
        </div>
        {bookedDates.length > 0 && (
          <div className="mt-4 p-3 bg-muted/50 rounded-md">
            <p className="text-xs font-semibold mb-2">Upcoming Booked Dates:</p>
            <div className="space-y-1">
              {bookedDates.slice(0, 5).map((date, index) => (
                <p key={index} className="text-xs text-muted-foreground">
                  {format(parseISO(date), "MMM dd, yyyy")}
                </p>
              ))}
              {bookedDates.length > 5 && (
                <p className="text-xs text-muted-foreground">
                  +{bookedDates.length - 5} more dates
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

