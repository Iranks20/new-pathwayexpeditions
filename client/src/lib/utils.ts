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

// Optimize Cloudinary video URL with transformations for faster loading
// Note: Do NOT use f_auto for videos as it can convert video to image
// Options: quality (auto, best, good, eco, low), width, height
export function cloudinaryOptimizeVideo(url: string, options?: {
  quality?: 'auto' | 'best' | 'good' | 'eco' | 'low';
  width?: number;
  height?: number;
}): string {
  try {
    if (!url.includes('/upload/')) return url;
    
    // Check if already has transformations
    const afterUpload = url.split('/upload/')[1];
    if (afterUpload.startsWith('q_') || afterUpload.startsWith('w_') || afterUpload.startsWith('f_')) {
      return url; // Already optimized
    }
    
    const { quality = 'auto', width, height } = options || {};
    const transformations: string[] = [];
    
    // Quality optimization (safe for videos)
    if (quality !== 'auto') {
      transformations.push(`q_${quality}`);
    } else {
      transformations.push('q_auto');
    }
    
    // Width/height constraints (safe for videos)
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    
    // Video-specific optimizations
    // Note: vc_auto and ac_auto might not be standard Cloudinary params
    // Removing them to avoid issues - let Cloudinary handle codec selection
    
    // Only apply transformations if we have any
    if (transformations.length === 0) return url;
    
    const transformString = transformations.join(',');
    return url.replace('/upload/', `/upload/${transformString}/`);
  } catch (e) {
    return url;
  }
}

// Generate a Cloudinary video poster/thumbnail (first frame as image)
// Cloudinary allows generating a poster frame from a video by accessing it as an image
export function cloudinaryVideoPoster(videoUrl: string, width = 1280): string {
  try {
    if (!videoUrl.includes('/upload/')) return videoUrl;
    
    // For Cloudinary videos, we can get a poster frame by:
    // 1. Extract the video path (everything after /upload/)
    const afterUpload = videoUrl.split('/upload/')[1];
    
    // 2. Remove any existing transformations if present
    let videoPath = afterUpload;
    if (afterUpload.includes('/')) {
      videoPath = afterUpload.split('/').slice(1).join('/');
    }
    
    // 3. Generate poster URL with image transformations, accessing video as image
    // Use so_0 to get frame at 0 seconds, convert to jpg format
    const baseUrl = videoUrl.split('/upload/')[0] + '/upload/';
    return `${baseUrl}w_${width},q_auto,f_jpg,so_0/${videoPath}`;
  } catch (e) {
    return videoUrl;
  }
}