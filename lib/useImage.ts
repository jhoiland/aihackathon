/**
 * React Hook for Image Loading
 * Handles image fetching with loading and error states
 */

import { useState, useEffect } from "react";
import { ImageFetchOptions, ImageResult } from "@/lib/imageService";

export interface UseImageOptions extends ImageFetchOptions {
  enabled?: boolean;
}

export function useImage(options: UseImageOptions) {
  const [image, setImage] = useState<ImageResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!options.enabled && options.enabled !== undefined) {
      return;
    }

    const fetchImageData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          query: options.query,
        });

        if (options.category) {
          params.append("category", options.category);
        }

        if (options.fallbackUrl) {
          params.append("fallback", options.fallbackUrl);
        }

        const response = await fetch(`/api/images?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const data = (await response.json()) as ImageResult;
        setImage(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        // Set fallback image on error
        setImage({
          url: options.fallbackUrl || `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`,
          source: "fallback",
          alt: options.query,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchImageData();
  }, [options.query, options.category, options.enabled, options.fallbackUrl]);

  return { image, loading, error };
}
