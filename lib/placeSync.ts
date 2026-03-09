import { CachedPlace } from "@/lib/types";
import { isCacheValid, getCachedPlaces, cachePlaces } from "@/lib/placeCache";

export interface SyncOptions {
  force?: boolean;
  cityIds?: string[];
  categories?: ("attractions" | "restaurants" | "hotels")[];
}

/**
 * Sync places for a city with smart caching
 */
export async function syncPlaces(
  cityId: string,
  category: "attractions" | "restaurants" | "hotels",
  options: SyncOptions = {}
): Promise<CachedPlace[]> {
  // Check cache validity unless force sync
  if (!options.force && isCacheValid(cityId, category)) {
    const cached = getCachedPlaces(cityId, category);
    if (cached) {
      return cached;
    }
  }

  // Fetch from API
  try {
    const response = await fetch(
      `/api/places?cityId=${cityId}&category=${category}&limit=20`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const places = data.places || [];

    // Cache the results
    if (places.length > 0) {
      const cachedPlaces: CachedPlace[] = places.map((place: any) => ({
        ...place,
        cityId,
        category,
        rank: 0,
        distance: 0,
        fetchedAt: new Date().toISOString(),
      }));

      cachePlaces(cityId, category, cachedPlaces);
      return cachedPlaces;
    }

    return [];
  } catch (error) {
    console.error(`Error syncing ${category} for ${cityId}:`, error);
    // Return cached data even if expired
    return getCachedPlaces(cityId, category) || [];
  }
}

/**
 * Bulk sync multiple cities and categories
 */
export async function bulkSyncPlaces(options: SyncOptions): Promise<void> {
  const { cityIds = [], categories = ["attractions", "restaurants", "hotels"] } = options;

  if (cityIds.length === 0) return;

  try {
    const response = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cityIds, categories }),
    });

    if (!response.ok) {
      throw new Error(`Sync error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Bulk sync completed:", data);
  } catch (error) {
    console.error("Error in bulk sync:", error);
  }
}

/**
 * Refresh places for a specific city
 */
export async function refreshCityPlaces(
  cityId: string,
  categories: ("attractions" | "restaurants" | "hotels")[] = [
    "attractions",
    "restaurants",
    "hotels",
  ]
): Promise<void> {
  try {
    const response = await fetch("/api/sync", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cityId, categories }),
    });

    if (!response.ok) {
      throw new Error(`Refresh error: ${response.status}`);
    }

    // Clear cache and re-fetch
    for (const category of categories) {
      await syncPlaces(cityId, category, { force: true });
    }
  } catch (error) {
    console.error(`Error refreshing ${cityId}:`, error);
  }
}

/**
 * Get all cached places for a city
 */
export async function getCityPlaces(
  cityId: string
): Promise<{
  attractions: CachedPlace[];
  restaurants: CachedPlace[];
  hotels: CachedPlace[];
}> {
  const [attractions, restaurants, hotels] = await Promise.all([
    syncPlaces(cityId, "attractions"),
    syncPlaces(cityId, "restaurants"),
    syncPlaces(cityId, "hotels"),
  ]);

  return { attractions, restaurants, hotels };
}
