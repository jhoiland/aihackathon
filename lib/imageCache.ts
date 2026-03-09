/**
 * Image Cache & Enrichment Utility
 * Caches fetched images and enriches mock data with real images
 */

import { City, Attraction, Restaurant, Activity } from "@/lib/types";

const CACHE_KEY = "travel-app-image-cache";
const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface CachedImage {
  url: string;
  source: string;
  timestamp: number;
  alt?: string;
}

export interface ImageCache {
  [key: string]: CachedImage;
}

/**
 * Get the image cache from localStorage
 */
export function getImageCache(): ImageCache {
  if (typeof window === "undefined") return {};
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return {};
    return JSON.parse(cached);
  } catch (error) {
    console.error("Failed to parse image cache:", error);
    return {};
  }
}

/**
 * Save image to cache
 */
export function cacheImage(key: string, image: CachedImage): void {
  if (typeof window === "undefined") return;
  try {
    const cache = getImageCache();
    cache[key] = image;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error("Failed to cache image:", error);
  }
}

/**
 * Get cached image if valid, null if expired or not found
 */
export function getCachedImage(key: string): CachedImage | null {
  const cache = getImageCache();
  const cached = cache[key];

  if (!cached) return null;

  // Check if cache is expired
  if (Date.now() - cached.timestamp > CACHE_EXPIRY_MS) {
    return null;
  }

  return cached;
}

/**
 * Generate cache key for an item
 */
export function generateCacheKey(
  name: string,
  category: string
): string {
  return `${category}:${name.toLowerCase().replace(/\s+/g, "-")}`;
}

/**
 * Fetch and cache image for a single item
 */
export async function enrichItemWithImage<
  T extends { name: string; image?: string }
>(
  item: T,
  category: "city" | "attraction" | "restaurant" | "hotel" | "activity",
  currentImage?: string
): Promise<T> {
  // If image already exists and it's not a placeholder, keep it
  if (
    item.image &&
    !item.image.includes("picsum.photos") &&
    !item.image.includes("via.placeholder.com")
  ) {
    return item;
  }

  const cacheKey = generateCacheKey(item.name, category);
  const cached = getCachedImage(cacheKey);

  if (cached) {
    return {
      ...item,
      image: cached.url,
    };
  }

  // Fetch new image
  try {
    const params = new URLSearchParams({
      query: item.name,
      category,
    });

    if (currentImage) {
      params.append("fallback", currentImage);
    }

    const response = await fetch(`/api/images?${params.toString()}`);

    if (response.ok) {
      const data = (await response.json()) as CachedImage;
      cacheImage(cacheKey, {
        ...data,
        timestamp: Date.now(),
      });

      return {
        ...item,
        image: data.url,
      };
    }
  } catch (error) {
    console.error(`Failed to fetch image for ${item.name}:`, error);
  }

  return item;
}

/**
 * Batch enrich multiple items with images
 */
export async function enrichItemsWithImages<
  T extends { name: string; image?: string }
>(
  items: T[],
  category: "city" | "attraction" | "restaurant" | "hotel" | "activity"
): Promise<T[]> {
  return Promise.all(
    items.map((item) => enrichItemWithImage(item, category, item.image))
  );
}

/**
 * Enrich a single city with images for all its related items
 */
export async function enrichCityData(city: City): Promise<City> {
  return enrichItemWithImage(city, "city", city.image);
}

/**
 * Clear expired images from cache
 */
export function clearExpiredImages(): void {
  if (typeof window === "undefined") return;
  try {
    const cache = getImageCache();
    const now = Date.now();
    let hasExpired = false;

    const cleaned = Object.entries(cache).reduce<ImageCache>((acc, [key, image]) => {
      if (now - image.timestamp > CACHE_EXPIRY_MS) {
        hasExpired = true;
      } else {
        acc[key] = image;
      }
      return acc;
    }, {});

    if (hasExpired) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cleaned));
    }
  } catch (error) {
    console.error("Failed to clear expired images:", error);
  }
}

/**
 * Clear all image cache
 */
export function clearImageCache(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.error("Failed to clear image cache:", error);
  }
}
