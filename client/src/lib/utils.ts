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

// Return a Cloudinary-optimized URL by inserting a transformation after `/upload/`.
export function cloudinaryOptimize(url: string, width = 800): string {
  try {
    if (!url.includes('/upload/')) return url;
    // If already contains transformations (contains '/upload/w_') return original
    const afterUpload = url.split('/upload/')[1];
    if (afterUpload.startsWith('w_') || afterUpload.startsWith('q_') || afterUpload.startsWith('f_')) {
      return url;
    }
    return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`);
  } catch (e) {
    return url;
  }
}

// Return a very small, blurred Cloudinary placeholder URL (LQIP)
export function cloudinaryPlaceholder(url: string): string {
  try {
    if (!url.includes('/upload/')) return url;
    // Small width, very low quality, and blur effect
    return url.replace('/upload/', `/upload/w_20,q_1,e_blur:200/`);
  } catch (e) {
    return url;
  }
}

// Prefetch an image URL (creates an Image object which triggers browser caching)
export function prefetchImage(url: string) {
  try {
    const img = new Image();
    img.src = url;
  } catch (e) {
    // noop
  }
}
