import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, ChevronRight, ChevronLeft, Maximize2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useInView } from "@/lib/useInView";
import { cloudinaryOptimize, cloudinaryPlaceholder, prefetchImage } from "@/lib/utils"; 

interface ActivityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  images?: string[]; // small/thumbnail images
  fullImages?: string[]; // larger images for lightbox/prefetch
  onOpen?: (index?: number) => void;
  initialIndex?: number;
  folderName?: string;
}

export default function ActivityCard({ icon: Icon, title, description, images, fullImages, onOpen, initialIndex = 0, folderName }: ActivityCardProps) {
  const [index, setIndex] = useState(initialIndex ?? 0);
  useEffect(() => {
    setIndex(initialIndex ?? 0);
  }, [initialIndex]);

  // lazy load main image when card is in view
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>({ rootMargin: "200px" });
  // combine refs
  wrapperRef.current = (inViewRef as any).current ?? wrapperRef.current;

  const thumbnail = images && images.length > 0 ? images[index] : undefined;
  const [loadedSrc, setLoadedSrc] = useState<string | undefined>(undefined);
  const [placeholderSrc, setPlaceholderSrc] = useState<string | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);

  useEffect(() => {
    if (thumbnail) {
      // set placeholder immediately
      setPlaceholderSrc(cloudinaryPlaceholder(thumbnail));
    }
  }, [thumbnail]);

  useEffect(() => {
    if (!thumbnail || !inView) return;
    // optimize thumbnail size and set it when visible
    setLoadedSrc(cloudinaryOptimize(thumbnail, 480));
  }, [thumbnail, inView]);

  // prefetch next/prev full images when index changes
  useEffect(() => {
    if (!fullImages || fullImages.length === 0) return;
    const next = fullImages[(index + 1) % fullImages.length];
    const prev = fullImages[(index - 1 + fullImages.length) % fullImages.length];
    if (next) prefetchImage(cloudinaryOptimize(next, 1600));
    if (prev) prefetchImage(cloudinaryOptimize(prev, 1600));
  }, [index, fullImages]);

  // Debugging: simple card log during development
  if (process.env.NODE_ENV !== "production") {
    console.debug(`ActivityCard: ${title} thumbnail:`, thumbnail, "folder:", folderName, "loaded:", !!loadedSrc);
  }

  return (
    <Card
      ref={inViewRef as any}
      className="group hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer border-0 shadow-md hover:shadow-xl overflow-visible"
      // Card no longer opens the gallery on whole click; only via the open button or image click if desired
      data-testid={`card-activity-${title.toLowerCase().replace(/\s+/g, "-")}`}
      // Keyboard open handled on the view button
    >
      <CardContent className="p-0 text-center">
        <div className="mb-0 relative h-36 w-full overflow-hidden">
          {thumbnail ? (
            <>
              {/* Placeholder (small, blurred) */}
              {placeholderSrc && (
                <img
                  src={placeholderSrc}
                  alt={`${title} placeholder`}
                  className={`absolute inset-0 w-full h-full object-cover filter blur-sm scale-105 transition-opacity duration-300 ${placeholderLoaded && !isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setPlaceholderLoaded(true)}
                  aria-hidden
                />
              )}

              {/* Loading skeleton (visible until placeholder appears) */}
              {!placeholderLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse" />
              )}

              {/* Main image fades in when loaded */}
              <img
                src={loadedSrc ?? undefined}
                alt={title}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden
                onLoad={() => setIsLoaded(true)}
                onClick={(e) => { e.stopPropagation(); onOpen && onOpen(index); }}
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
          <div className="absolute left-4 top-4 h-12 w-12 rounded-xl bg-black/30 backdrop-blur flex items-center justify-center">
            <Icon className="h-6 w-6 text-white" />
          </div>
          {/* Small open / next button: if there are multiple images, advance to next; otherwise open lightbox */}
          {images && images.length > 1 ? (
            <button
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); setIndex((i: number) => (i === images.length - 1 ? 0 : i + 1)); }}
              className="absolute right-4 top-4 bg-white/10 text-white p-2 rounded-full z-30 hover:bg-white/20 border border-white/10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              aria-label="Open gallery"
              onClick={(e) => { e.stopPropagation(); onOpen && onOpen(index); }}
              className="absolute right-4 top-4 bg-black/40 text-white text-xs px-2 py-1 rounded z-30 hover:bg-black/60"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          )}
          {folderName && process.env.NODE_ENV !== 'production' && (
            <div className="absolute right-4 top-14 bg-black/40 text-white text-xs px-2 py-1 rounded">{folderName}</div>
          )}
          {/* lower gradient and title */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-3 text-white text-sm font-semibold drop-shadow">{title}</div>
          </div>
          {images && images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setIndex((i: number) => (i === images.length - 1 ? 0 : i + 1)); }}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-30 opacity-100 sm:opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          {images && images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setIndex((i: number) => (i === 0 ? images.length - 1 : i - 1)); }}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-30 opacity-100 sm:opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {images && images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-20">
              {index + 1}/{images.length}
            </div>
          )}
          {/* Small thumbnails */}
          {images && images.length > 1 && (
            <div className="absolute left-3 bottom-3 flex items-center gap-2 z-20">
              {images.slice(0, 4).map((src, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 rounded overflow-hidden border-2 ${index === i ? 'border-white' : 'border-transparent'}`}
                  onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                >
                  <img src={cloudinaryOptimize(src, 120)} alt={`thumb-${i}`} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
              {images.length > 4 && (
                <div className="w-8 h-8 rounded bg-black/40 text-white text-xs flex items-center justify-center">+{images.length - 4}</div>
              )}
            </div>
          )}
        </div>
        <div className="p-6 text-left">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
