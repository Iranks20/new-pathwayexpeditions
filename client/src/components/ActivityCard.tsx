import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, Maximize2 } from "lucide-react";
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
  // Use first image only for homepage - gallery opens on click
  const [index] = useState(initialIndex ?? 0);

  // lazy load main image when card is in view
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>({ rootMargin: "200px" });
  // combine refs
  wrapperRef.current = (inViewRef as any).current ?? wrapperRef.current;

  // Always use the first image for homepage display
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

  // Prefetch first few gallery images when card comes into view (for gallery performance)
  useEffect(() => {
    if (!fullImages || fullImages.length === 0 || !inView) return;
    // Prefetch first 3 images for smooth gallery opening
    const toPrefetch = fullImages.slice(0, 3);
    toPrefetch.forEach(img => prefetchImage(cloudinaryOptimize(img, 1600)));
  }, [inView, fullImages]);

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
          {/* View Gallery button - only show if there are multiple images */}
          {images && images.length > 1 && (
            <button
              aria-label="View gallery"
              onClick={(e) => { e.stopPropagation(); onOpen && onOpen(0); }}
              className="absolute right-4 top-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg z-30 hover:bg-black/80 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg"
            >
              <Maximize2 className="h-4 w-4" />
              <span>View Gallery ({images.length})</span>
            </button>
          )}
          {/* Single image - no gallery button if only one image */}
          {images && images.length === 1 && onOpen && (
            <button
              aria-label="View image"
              onClick={(e) => { e.stopPropagation(); onOpen(0); }}
              className="absolute right-4 top-4 bg-black/40 text-white p-2 rounded-full z-30 hover:bg-black/60 transition-all duration-200"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          )}
          {/* lower gradient and title */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-3 text-white text-sm font-semibold drop-shadow">{title}</div>
          </div>
        </div>
        <div className="p-6 text-left">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
