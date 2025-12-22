import React, { useEffect, useState } from 'react';
import { cloudinaryOptimize, cloudinaryPlaceholder } from '@/lib/utils';
import { useInView } from '@/lib/useInView';

export type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt?: string;
  widthHint?: number; // desired width for cloudinaryOptimize
  className?: string;
  /** 'top' | 'center' | 'bottom' */
  objectPosition?: 'top' | 'center' | 'bottom';
  /** percentage between 0 and 100 to vertically shift the focal point */
  objectPositionY?: number;
};

export default function OptimizedImage({ src, alt, widthHint = 800, className = '', objectPosition = 'center', objectPositionY, ...props }: OptimizedImageProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '200px' });
  const [loaded, setLoaded] = useState(false);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
  const placeholder = cloudinaryPlaceholder(src);
  const optimized = cloudinaryOptimize(src, widthHint);

  // map to tailwind object-* classes
  const posClass = objectPosition === 'top' ? 'object-top' : objectPosition === 'bottom' ? 'object-bottom' : 'object-center';

  // inline style when a custom percentage is provided (e.g., "center 75%")
  const objectPosStyle = objectPositionY !== undefined ? { objectPosition: `center ${objectPositionY}%` } : undefined;

  useEffect(() => {
    // no-op, placeholder will load when img element renders
  }, [inView]);

  return (
    <div ref={ref as any} className={`relative ${className}`}>
      {/* Placeholder (blur) */}
      <img
        src={placeholder}
        alt={alt}
        style={objectPosStyle}
        className={`absolute inset-0 w-full h-full ${posClass} filter blur-sm transition-opacity duration-300 ${placeholderLoaded && !loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setPlaceholderLoaded(true)}
        aria-hidden
      />

      {/* Main image loads only when inView */}
      {inView && (
        <img
          src={optimized}
          alt={alt}
          style={objectPosStyle}
          className={`absolute inset-0 w-full h-full ${posClass} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
}
