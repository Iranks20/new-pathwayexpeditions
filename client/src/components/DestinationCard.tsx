import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { cloudinaryVideoPoster } from "@/lib/utils";

interface DestinationCardProps {
  name: string;
  description: string;
  image: string;
}

export default function DestinationCard({ name, description, image }: DestinationCardProps) {
  return (
    <Card 
      className="relative overflow-hidden h-80 group cursor-pointer hover-elevate transition-all duration-500 border-0 shadow-lg hover:shadow-2xl"
      data-testid={`card-destination-${name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Render a video if the asset is a video file, otherwise use OptimizedImage */}
      {typeof image === "string" && (image.endsWith('.mp4') || image.endsWith('.webm')) ? (
        <video 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          src={image} 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="metadata"
          poster={cloudinaryVideoPoster(image, 800)}
        />
      ) : (
        <div className="absolute inset-0">
          <OptimizedImage src={image} alt={name} widthHint={1200} className="w-full h-full" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 transition-all duration-500" />
      
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 transform group-hover:translate-y-[-4px] transition-transform duration-300">{name}</h3>
        <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all duration-300 text-primary-foreground">
          <span>Explore Region</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Card>
  );
}
