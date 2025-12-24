import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cloudinaryOptimize, cloudinaryPlaceholder } from "@/lib/utils";

function AsyncImage({ src, alt }: { src: string; alt?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
  const placeholder = cloudinaryPlaceholder(src);
  const full = cloudinaryOptimize(src, 1600);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Placeholder */}
      <img
        src={placeholder}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-contain filter blur-sm transition-opacity duration-300 ${placeholderLoaded && !loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setPlaceholderLoaded(true)}
        style={{ aspectRatio: 'auto' }}
      />
      {/* Main image */}
      <img
        src={full}
        alt={alt}
        className={`w-full h-full object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        style={{ maxHeight: 'calc(100vh - 120px)', maxWidth: 'calc(100vw - 80px)' }}
      />
    </div>
  );
}

interface Props {
  images: string[];
  open: boolean;
  initialIndex?: number;
  onOpenChange: (open: boolean) => void;
  onIndexChange?: (index: number) => void;
}

export default function ImageLightbox({ images, open, initialIndex = 0, onOpenChange, onIndexChange }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex, open]);

  useEffect(() => {
    if (!images || images.length === 0) return;
    
    const safeIndex = Math.max(0, Math.min(index, images.length - 1));
    if (onIndexChange) onIndexChange(safeIndex);

    // prefetch neighbor images for faster navigation
    const preload = (url?: string) => {
      if (!url || typeof url !== 'string') return;
      const img = new Image();
      img.src = url;
    };

    const next = images[(safeIndex + 1) % images.length];
    const prev = images[(safeIndex - 1 + images.length) % images.length];
    preload(next);
    preload(prev);
  }, [index, images, onIndexChange]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowLeft") {
        setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      } else if (e.key === "ArrowRight") {
        setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, images.length]);

  if (!images || images.length === 0) return null;

  // Ensure index is within bounds and current image exists
  const safeIndex = Math.max(0, Math.min(index, images.length - 1));
  const currentImage = images[safeIndex];

  // If no valid image, don't render
  if (!currentImage) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] h-[95vh] bg-black/95 shadow-none p-0 border-0 flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          aria-label="Close gallery"
          className="absolute top-4 right-4 z-50 bg-black/60 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/80 transition-all duration-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image Container - takes most of the space */}
        <div 
          className="relative flex-1 flex items-center justify-center overflow-hidden p-4"
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)} 
          onTouchEnd={(e) => {
            if (touchStartX === null) return;
            const endX = e.changedTouches[0].clientX;
            const deltaX = endX - touchStartX;
            const threshold = 50;
            if (deltaX > threshold) {
              setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
            } else if (deltaX < -threshold) {
              setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
            }
            setTouchStartX(null);
          }}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
            aria-label="Previous"
            className="absolute left-4 z-50 bg-black/60 backdrop-blur-sm p-3 rounded-full text-white hover:bg-black/80 transition-all duration-200"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          {/* Image/Video Display */}
          <div className="w-full h-full flex items-center justify-center">
            {typeof currentImage === 'string' && (currentImage.endsWith('.mp4') || currentImage.endsWith('.webm')) ? (
              <video 
                src={currentImage} 
                className="max-h-full max-w-full object-contain" 
                controls 
                autoPlay 
                playsInline 
                style={{ maxHeight: 'calc(95vh - 100px)', maxWidth: 'calc(95vw - 80px)' }}
              />
            ) : (
              <AsyncImage src={currentImage} alt={`Image ${safeIndex + 1}`} />
            )}
          </div>
          
          <button
            onClick={() => setIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
            aria-label="Next"
            className="absolute right-4 z-50 bg-black/60 backdrop-blur-sm p-3 rounded-full text-white hover:bg-black/80 transition-all duration-200"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Controls Footer - organized below image */}
        {images.length > 1 && (
          <div className="flex-shrink-0 bg-black/60 backdrop-blur-sm border-t border-white/10 px-6 py-4 flex items-center justify-between">
            {/* Dots Navigation */}
            <div className="flex items-center gap-2 flex-1 justify-center">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setIndex(idx)}
                  aria-label={`Show image ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    safeIndex === idx 
                      ? "bg-white w-8" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            
            {/* Counter */}
            <div className="text-white text-sm font-medium ml-4">
              {safeIndex + 1} / {images.length}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
