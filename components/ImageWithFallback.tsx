/**
 * Image Loading Component
 * Displays images with loading skeleton and error states
 */

"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export function ImageWithFallback({
  src,
  alt,
  className = "w-full h-full object-cover",
  skeletonClassName = "w-full h-full bg-muted animate-pulse",
  onError,
}: ImageWithFallbackProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setError(true);
    setLoaded(true);
    onError?.(e);
  };

  if (error) {
    return (
      <div className={skeletonClassName}>
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <span className="text-xs">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {!loaded && <div className={skeletonClassName} />}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: loaded ? "block" : "none" }}
      />
    </>
  );
}

/**
 * Image Loader Component
 * Shows loading state while image is being fetched
 */
export function ImageLoader({ className = "w-full h-full" }) {
  return (
    <div className={`${className} flex items-center justify-center bg-muted`}>
      <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
    </div>
  );
}
