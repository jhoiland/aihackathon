import { Favorite, UserPreferences, Attraction, Restaurant, Activity } from "./types";

const FAVORITES_KEY = "travel-app-favorites";
const PREFERENCES_KEY = "travel-app-preferences";

export function getFavoritesFromStorage(): Favorite[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveFavoritestoStorage(favorites: Favorite[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function addToFavorites(
  type: "city" | "attraction" | "restaurant",
  itemId: string,
  cityId: string
): void {
  const favorites = getFavoritesFromStorage();
  const newFavorite: Favorite = {
    id: `${type}-${itemId}-${Date.now()}`,
    type,
    itemId,
    cityId,
    savedAt: new Date(),
  };
  favorites.push(newFavorite);
  saveFavoritestoStorage(favorites);
}

export function removeFromFavorites(itemId: string): void {
  const favorites = getFavoritesFromStorage();
  const filtered = favorites.filter((fav) => fav.itemId !== itemId);
  saveFavoritestoStorage(filtered);
}

export function isFavorited(itemId: string): boolean {
  const favorites = getFavoritesFromStorage();
  return favorites.some((fav) => fav.itemId === itemId);
}

export function getPreferencesFromStorage(): UserPreferences {
  if (typeof window === "undefined") {
    return getDefaultPreferences();
  }
  const stored = localStorage.getItem(PREFERENCES_KEY);
  return stored ? JSON.parse(stored) : getDefaultPreferences();
}

export function savePreferencestoStorage(preferences: UserPreferences): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
}

export function getDefaultPreferences(): UserPreferences {
  return {
    ageGroup: "25-34",
    interests: ["food", "culture"],
    travelType: "solo",
    budgetPreference: "mid-range",
    preferredClimate: "any",
    preferredSeason: "any",
  };
}

export function shouldRecommendForAge(
  targetAgeGroups: string[] | undefined,
  userAgeGroup: string
): boolean {
  if (!targetAgeGroups || targetAgeGroups.length === 0) return true;
  return targetAgeGroups.includes(userAgeGroup);
}

export function calculateRelevanceScore(
  item: Attraction | Restaurant | Activity,
  preferences: UserPreferences
): number {
  let score = 0;

  // Age group match
  if (
    item.targetAgeGroups &&
    shouldRecommendForAge(item.targetAgeGroups, preferences.ageGroup)
  ) {
    score += 3;
  }

  // Interest match
  const matchingInterests = item.tags.filter((tag) =>
    preferences.interests.includes(tag as any)
  );
  score += matchingInterests.length * 2;

  // Restaurant-specific: price level match
  if ("priceLevel" in item) {
    if (item.priceLevel === preferences.budgetPreference) {
      score += 2;
    }
  }

  return score;
}

export function sortByRelevance(
  items: (Attraction | Restaurant | Activity)[],
  preferences: UserPreferences
): (Attraction | Restaurant | Activity)[] {
  return items.sort(
    (a, b) =>
      calculateRelevanceScore(b, preferences) -
      calculateRelevanceScore(a, preferences)
  );
}
