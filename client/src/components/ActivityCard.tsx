import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, ChevronRight, ChevronLeft, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";

interface ActivityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  images?: string[];
  onOpen?: (index?: number) => void;
  initialIndex?: number;
  folderName?: string;
}

export default function ActivityCard({ icon: Icon, title, description, images, onOpen, initialIndex = 0, folderName }: ActivityCardProps) {
  const [index, setIndex] = useState(initialIndex ?? 0);
  useEffect(() => {
    setIndex(initialIndex ?? 0);
  }, [initialIndex]);
  const thumbnail = images && images.length > 0 ? images[index] : undefined;
  // Debugging: simple card log during development
  if (process.env.NODE_ENV !== "production") {
    console.debug(`ActivityCard: ${title} thumbnail:`, thumbnail, "folder:", folderName);
  }
  return (
    <Card
      className="group hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer border-0 shadow-md hover:shadow-xl overflow-visible"
      // Card no longer opens the gallery on whole click; only via the open button or image click if desired
      data-testid={`card-activity-${title.toLowerCase().replace(/\s+/g, "-")}`}
      // Keyboard open handled on the view button
    >
      <CardContent className="p-0 text-center">
        <div className="mb-0 relative h-36 w-full overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              aria-hidden
              onClick={(e) => { e.stopPropagation(); onOpen && onOpen(index); }}
            />
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
                  <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
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
