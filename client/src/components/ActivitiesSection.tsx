import ActivityCard from "./ActivityCard";
import { Camera, Leaf, Mountain, Users, Ship, Binoculars } from "lucide-react";
import React, { useMemo, useState } from "react";
import ImageLightbox from "./ImageLightbox";
import fallbackImage from "@assets/generated_images/Safaris-1.webp";
import gorillaFallback from "@assets/generated_images/img1.webp";
import culturalFallback from "@assets/generated_images/luwombo.jpg";
import birdFallback from "@assets/generated_images/img2.webp";
import boatFallback from "@assets/generated_images/vic1.webp";
import natureFallbackImg from "@assets/generated_images/falls1.webp";

const activities = [
  {
    icon: Camera,
    title: "Wildlife Safaris",
    description: "Experience close encounters with Uganda's iconic wildlife species."
  },
  {
    icon: Mountain,
    title: "Gorilla Trekking",
    description: "Journey through forests for a rare glimpse of mountain gorillas."
  },
  {
    icon: Binoculars,
    title: "Bird Watching",
    description: "Spot diverse bird species in Uganda's rich natural habitats."
  },
  {
    icon: Users,
    title: "Cultural Tours",
    description: "Immerse yourself in Uganda's vibrant traditions and heritage."
  },
  {
    icon: Ship,
    title: "Boat Cruises",
    description: "Relax on scenic waterways with breathtaking views and wildlife."
  },
  {
    icon: Leaf,
    title: "Nature Walks",
    description: "Explore pristine landscapes and discover hidden natural wonders."
  }
];

export default function ActivitiesSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [initialIndex, setInitialIndex] = useState(0);

  // mapping of activity title to folder names under @assets/generated_images
  const folderMap: Record<string, string> = {
    "Wildlife Safaris": "Wildlife Safaris",
    "Gorilla Trekking": "gorilla-trekking",
    "Bird Watching": "bird watching",
    "Cultural Tours": "cultural-heritage",
    "Boat Cruises": "boat cruises",
    "Nature Walks": "nature walks",
  };
  // Preload thumbnails and image arrays for each activity using static imports to satisfy Vite globbing
  const activityAssets = useMemo(() => {
    const map: Record<string, { images: string[]; thumbnail?: string; folder?: string }> = {};
    const tryImportImages = (folderCandidates: string[]) => {
      for (const f of folderCandidates) {
        try {
          const modules = (import.meta as any).globEager(`@assets/generated_images/${f}/*.{jpg,jpeg,png,webp}`) as Record<string, any>;
          const imgs = Object.values(modules).map((m) => m?.default).filter(Boolean) as string[];
          if (imgs.length > 0) {
            return { images: imgs, thumbnail: imgs[0], folder: `@assets/generated_images/${f}` };
          }
        } catch (e) {
          // Try next candidate
        }

        try {
          const modules = (import.meta as any).globEager(`@/components/${f}/*.{jpg,jpeg,png,webp}`) as Record<string, any>;
          const imgs = Object.values(modules).map((m) => m?.default).filter(Boolean) as string[];
          if (imgs.length > 0) {
            return { images: imgs, thumbnail: imgs[0], folder: `@/components/${f}` };
          }
        } catch (e) {
          // Try next candidate
        }
      }
      return { images: [], thumbnail: undefined, folder: folderCandidates[0] };
    };

    // Wildlife Safaris
    {
      const candidateFolders = ["Wildlife Safaris", "wildlife-safaris", "wildlife_safaris", "Wildlife_safari"];
      const { images, thumbnail, folder } = tryImportImages(candidateFolders);
      if (images.length > 0) {
        map['Wildlife Safaris'] = { images, thumbnail, folder };
        console.log('Matched Wildlife Safaris folder:', folder, images.length, 'images');
      } else {
        map['Wildlife Safaris'] = { images: [fallbackImage], thumbnail: fallbackImage, folder: 'fallback' };
        console.warn('No images found for Wildlife Safaris; using fallback');
      }
    }
    // Gorilla Trekking
    {
      const candidateFolders = ["gorilla-trekking", "gorilla trekking", "gorilla_trekking", "gorilla-trekking"];
      const { images, thumbnail, folder } = tryImportImages(candidateFolders);
      if (images.length > 0) {
        map['Gorilla Trekking'] = { images, thumbnail, folder };
        console.log('Matched Gorilla Trekking folder:', folder, images.length, 'images');
      } else {
        map['Gorilla Trekking'] = { images: [gorillaFallback], thumbnail: gorillaFallback, folder: 'fallback' };
        console.warn('No images found for Gorilla Trekking; using fallback');
      }
    }
    // Bird Watching
    {
      const candidateFolders = ["bird watching", "bird-watching", "bird_watching", "birdwatching"];
      const { images, thumbnail, folder } = tryImportImages(candidateFolders);
      if (images.length > 0) {
        map['Bird Watching'] = { images, thumbnail, folder };
        console.log('Matched Bird Watching folder:', folder, images.length, 'images');
      } else {
        map['Bird Watching'] = { images: [birdFallback], thumbnail: birdFallback, folder: 'fallback' };
        console.warn('No images found for Bird Watching; using fallback');
      }
    }
    // Cultural Tours
    {
      const candidateFolders = ["cultural-heritage", "cultural heritage", "cultural_heritage"];
      const { images, thumbnail, folder } = tryImportImages(candidateFolders);
      if (images.length > 0) {
        map['Cultural Tours'] = { images, thumbnail, folder };
        console.log('Matched Cultural Tours folder:', folder, images.length, 'images');
      } else {
        map['Cultural Tours'] = { images: [culturalFallback], thumbnail: culturalFallback, folder: 'fallback' };
        console.warn('No images found for Cultural Tours; using fallback');
      }
    }
    // Boat Cruises
    {
      const candidateFolders = ["boat cruises", "boat-cruises", "boat_cruises", "boatcruises"];
      const { images, thumbnail, folder } = tryImportImages(candidateFolders);
      if (images.length > 0) {
        map['Boat Cruises'] = { images, thumbnail, folder };
        console.log('Matched Boat Cruises folder:', folder, images.length, 'images');
      } else {
        map['Boat Cruises'] = { images: [boatFallback], thumbnail: boatFallback, folder: 'fallback' };
        console.warn('No images found for Boat Cruises; using fallback');
      }
    }
    // Nature Walks
    {
      const candidateFolders = ["nature walks", "nature-walks", "nature_walks", "naturewalks", "nature"];
      let { images, thumbnail, folder } = tryImportImages(candidateFolders);
      // Exclude the specific bad image if present
      images = images.filter((img) => !img.toLowerCase().includes("pic3.webp"));
      if (images.length > 0) {
        // ensure thumbnail is still valid after filtering
        if (!images.includes(thumbnail as string)) thumbnail = images[0];
        map['Nature Walks'] = { images, thumbnail, folder };
        console.log('Matched Nature Walks folder:', folder, images.length, 'images');
      } else {
        // fallback to a nature-themed image (avoid safari fallback)
        map['Nature Walks'] = { images: [natureFallbackImg], thumbnail: natureFallbackImg, folder: 'fallback' };
        console.warn('No images found for Nature Walks after filtering; using fallback');
      }
    }
    console.log("Activity assets loaded:", map);
    return map;
  }, []);

  // Random initial indices per activity so their thumbnails vary
  const initialIndices = useMemo(() => {
    const map: Record<string, number> = {};
    Object.entries(activityAssets).forEach(([title, data]) => {
      const len = data.images.length || 1;
      map[title] = Math.floor(Math.random() * len);
    });
    if (process.env.NODE_ENV !== 'production') {
      console.debug('Activity initial indices:', map);
    }
    return map;
  }, [activityAssets]);

  // single thumbnails (no random indices required)
  return (
    <section className="py-16 md:py-24" id="activities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our Activities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover unforgettable experiences across East Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.title}
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
              images={activityAssets[activity.title]?.images}
              folderName={activityAssets[activity.title]?.folder}
              initialIndex={initialIndices[activity.title] ?? 0}
              onOpen={(idx = 0) => {
                const data = activityAssets[activity.title];
                if (data?.images && data.images.length > 0) {
                  setLightboxImages(data.images);
                  setInitialIndex(idx);
                  setLightboxOpen(true);
                }
              }}
            />
          ))}
        </div>
        <ImageLightbox images={lightboxImages} open={lightboxOpen} initialIndex={initialIndex} onOpenChange={setLightboxOpen} />
      </div>
    </section>
  );
}
