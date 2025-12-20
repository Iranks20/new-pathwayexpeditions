import { parseISO, isWithinInterval, addDays } from "date-fns";

/**
 * Check if a vehicle is available for the given date range
 */
export function isVehicleAvailable(
  bookedDates: string[] = [],
  startDate: Date,
  endDate: Date
): boolean {
  if (!startDate || !endDate) return true;

  // Generate all dates in the range
  const datesInRange: Date[] = [];
  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);
  
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  while (currentDate <= end) {
    datesInRange.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  // Check if any date in the range is booked
  for (const date of datesInRange) {
    const dateStr = date.toISOString().split('T')[0];
    if (bookedDates.some((booked) => {
      try {
        const bookedDate = parseISO(booked);
        return bookedDate.toISOString().split('T')[0] === dateStr;
      } catch {
        return false;
      }
    })) {
      return false;
    }
  }

  return true;
}

/**
 * Get availability status based on booked dates
 */
export function getAvailabilityStatus(bookedDates: string[] = []): "available" | "limited" | "unavailable" {
  const bookedCount = bookedDates.length;
  // Assuming we're checking next 30 days
  const totalDays = 30;
  const availableDays = totalDays - bookedCount;
  const availabilityPercent = (availableDays / totalDays) * 100;

  if (availabilityPercent > 70) return "available";
  if (availabilityPercent > 30) return "limited";
  return "unavailable";
}

