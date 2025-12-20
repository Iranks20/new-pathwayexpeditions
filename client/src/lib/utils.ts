import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency conversion: 1 USD = 3,500 UGX (approximate rate)
const USD_TO_UGX_RATE = 3500;

export function usdToUgx(usd: number): number {
  return Math.round(usd * USD_TO_UGX_RATE);
}

export function formatUgx(amount: number): string {
  return `${amount.toLocaleString()} UGX`;
}
