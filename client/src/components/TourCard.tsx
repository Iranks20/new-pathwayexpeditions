import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";
import BookingDialog from "./BookingDialog";
import OptimizedImage from "./OptimizedImage";

interface TourCardProps {
  title: string;
  location: string;
  duration: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  groupSize: string;
}

export default function TourCard({ 
  title, 
  location, 
  duration, 
  price, 
  image, 
  images,
  description,
  groupSize 
}: TourCardProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
    // autoplay removed; refs not needed
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Use provided images array or fall back to single image; filter falsy entries
  const imageArray = (images && images.length > 0 ? images : [image]).filter(Boolean);
  const currentImage = imageArray[currentImageIndex];

  // pause auto-play while interacting
  useEffect(() => {
    if (bookingOpen) setIsPaused(true);
  }, [bookingOpen]);

  useEffect(() => {
      // Auto-play logic removed
      return () => {}; // no-op cleanup since autoplay removed
  }, [isPaused, imageArray.length]);

  useEffect(() => {
      // no-op cleanup since autoplay removed
      return () => {};
  }, []);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(true);
    setCurrentImageIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
    // pause timeout logic removed
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(true);
    setCurrentImageIndex((prev) => (prev === imageArray.length - 1 ? 0 : prev + 1));
    // pause timeout logic removed
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) {
      setIsPaused(false);
      return;
    }
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - touchStartX;
    const threshold = 50; // swipe threshold
    if (deltaX > threshold) {
      // swipe right
      setCurrentImageIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
    } else if (deltaX < -threshold) {
      // swipe left
      setCurrentImageIndex((prev) => (prev === imageArray.length - 1 ? 0 : prev + 1));
    }
    setTouchStartX(null);
    setIsPaused(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsPaused(true);
    // pause timeout logic removed
  };

  // autoplay toggling removed

  const openLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxOpen(true);
  };

  return (
    <>
      <Card className="overflow-hidden hover-elevate transition-all duration-300 cursor-pointer group h-full flex flex-col" data-testid={`card-tour-${title.toLowerCase().replace(/\s+/g, "-")}`}>
        <div className="relative h-56 overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <OptimizedImage
            src={currentImage}
            alt={title}
            widthHint={1200}
            className="w-full h-full"
            onClick={openLightbox}
          />
          
          {/* Navigation Arrows - Only show if multiple images */}
          {imageArray.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 z-30"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute -right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 z-30"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-20">
                {currentImageIndex + 1}/{imageArray.length}
              </div>
            </>
          )}
          {/* Fullscreen */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-40">
            <button
              onClick={openLightbox}
              aria-label="Open image"
              className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-opacity"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-md">
              {duration}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {/* Dots */}
        {imageArray.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-2">
            {imageArray.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); handleDotClick(idx); }}
                aria-label={`Show image ${idx + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? "bg-primary" : "bg-muted-foreground/40"}`}
              />
            ))}
          </div>
        )}
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold line-clamp-1">{title}</h3>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{groupSize}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-sm text-muted-foreground">From</div>
            <div className="text-2xl font-bold text-primary">${price.toLocaleString()}</div>
          </div>
          <Button 
            variant="default" 
            onClick={() => setBookingOpen(true)}
            className="shadow-md"
            data-testid={`button-book-${title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        type="tour"
        itemName={title}
        itemPrice={price}
        itemImage={image}
      />
      <ImageLightbox
        images={imageArray}
        open={lightboxOpen}
        initialIndex={currentImageIndex}
        onOpenChange={setLightboxOpen}
        onIndexChange={(idx: number) => setCurrentImageIndex(idx)}
      />
    </>
  );
}
