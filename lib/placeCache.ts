import { PlacesCache, CachedPlace } from "@/lib/types";

const CACHE_PREFIX = "places_cache_";
const DEFAULT_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Save places to cache for a city and category
 */
export function cachePlaces(
  cityId: string,
  category: "attractions" | "restaurants" | "hotels",
  places: CachedPlace[]
): void {
  if (typeof window === "undefined") return; // Only cache on client side

  const cache: PlacesCache = {
    cityId,
    category,
    places,
    lastSyncAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + DEFAULT_CACHE_DURATION).toISOString(),
  };

  const key = getCacheKey(cityId, category);
  try {
    localStorage.setItem(key, JSON.stringify(cache));
  } catch (error) {
    console.error("Error caching places:", error);
  }
}

/**
 * Get cached places for a city and category
 */
export function getCachedPlaces(
  cityId: string,
  category: "attractions" | "restaurants" | "hotels"
): CachedPlace[] | null {
  if (typeof window === "undefined") return null; // Only cache on client side

  const key = getCacheKey(cityId, category);
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const cache: PlacesCache = JSON.parse(cached);

    // Check if cache has expired
    if (new Date(cache.expiresAt) < new Date()) {
      removeCachedPlaces(cityId, category);
      return null;
    }

    return cache.places;
  } catch (error) {
    console.error("Error retrieving cached places:", error);
    return null;
  }
}

/**
 * Check if places cache exists and is valid
 */
export function isCacheValid(
  cityId: string,
  category: "attractions" | "restaurants" | "hotels"
): boolean {
  if (typeof window === "undefined") return false;

  const key = getCacheKey(cityId, category);
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return false;

    const cache: PlacesCache = JSON.parse(cached);
    return new Date(cache.expiresAt) > new Date();
  } catch {
    return false;
  }
}

/**
 * Remove cached places for a city and category
 */
export function removeCachedPlaces(
  cityId: string,
  category: "attractions" | "restaurants" | "hotels"
): void {
  if (typeof window === "undefined") return;

  const key = getCacheKey(cityId, category);
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing cached places:", error);
  }
}

/**
 * Clear all places cache
 */
export function clearAllPlacesCache(): void {
  if (typeof window === "undefined") return;

  try {
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    }
  } catch (error) {
    console.error("Error clearing places cache:", error);
  }
}

/**
 * Get cache stats (number of cached cities/categories)
 */
export function getCacheStats(): { citiesCount: number; totalCached: number } {
  if (typeof window === "undefined") {
    return { citiesCount: 0, totalCached: 0 };
  }

  try {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));
    
    let totalCached = 0;
    const cities = new Set<string>();

    for (const key of cacheKeys) {
      const cached = localStorage.getItem(key);
      if (cached) {
        const cache: PlacesCache = JSON.parse(cached);
        cities.add(cache.cityId);
        totalCached += cache.places.length;
      }
    }

    return {
      citiesCount: cities.size,
      totalCached,
    };
  } catch (error) {
    console.error("Error getting cache stats:", error);
    return { citiesCount: 0, totalCached: 0 };
  }
}

/**
 * Get cache key for city and category
 */
function getCacheKey(
  cityId: string,
  category: "attractions" | "restaurants" | "hotels"
): string {
  return `${CACHE_PREFIX}${cityId}_${category}`;
}
