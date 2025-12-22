import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cloudinaryOptimize, cloudinaryPlaceholder } from "@/lib/utils";

function AsyncImage({ src, alt }: { src: string; alt?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
  const placeholder = cloudinaryPlaceholder(src);
  const full = cloudinaryOptimize(src, 1600);

  return (
    <div className="relative">
      <img
        src={placeholder}
        alt={alt}
        className={`max-h-[90vh] max-w-[90vw] object-contain filter blur-sm transition-opacity duration-300 ${placeholderLoaded && !loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setPlaceholderLoaded(true)}
      />
      <img
        src={full}
        alt={alt}
        className={`absolute left-0 top-0 max-h-[90vh] max-w-[90vw] object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
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
    if (onIndexChange) onIndexChange(index);

    // prefetch neighbor images for faster navigation
    const preload = (url?: string) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    };

    const next = images[(index + 1) % images.length];
    const prev = images[(index - 1 + images.length) % images.length];
    preload(next);
    preload(prev);
  }, [index]);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full bg-transparent shadow-none p-0">
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center" onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)} onTouchEnd={(e) => {
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
            }}>
            <button
              onClick={() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
              aria-label="Previous"
              className="absolute left-4 z-50 bg-black/30 p-3 rounded-full text-white hover:bg-black/50"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            {images[index].endsWith('.mp4') || images[index].endsWith('.webm') ? (
              <video src={images[index]} className="max-h-[90vh] max-w-[90vw] object-contain" controls autoPlay playsInline />
            ) : (
              <AsyncImage src={images[index]} alt={`Image ${index + 1}`} />
            )}
            <button
              onClick={() => setIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
              aria-label="Next"
              className="absolute right-4 z-50 bg-black/30 p-3 rounded-full text-white hover:bg-black/50"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setIndex(idx)}
                    aria-label={`Show image ${idx + 1}`}
                    className={`w-2 h-2 rounded-full transition-all ${index === idx ? "bg-white" : "bg-white/40"}`}
                  />
                ))}
              </div>
            )}
            {/* Counter */}
            <div className="absolute bottom-4 right-4 text-white text-sm z-50">{index + 1}/{images.length}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
