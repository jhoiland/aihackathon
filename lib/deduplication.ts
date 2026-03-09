import { GooglePlace } from "@/lib/types";

/**
 * Deduplicate places by place_id
 * Keeps the first occurrence and removes duplicates
 */
export function deduplicateByPlaceId(places: GooglePlace[]): GooglePlace[] {
  const seen = new Set<string>();
  const deduplicated: GooglePlace[] = [];

  for (const place of places) {
    if (!seen.has(place.place_id)) {
      seen.add(place.place_id);
      deduplicated.push(place);
    }
  }

  return deduplicated;
}

/**
 * Merge duplicate places, combining their data
 * Useful when same place appears with different data
 */
export function mergeDuplicates(places: GooglePlace[]): GooglePlace[] {
  const placeMap = new Map<string, GooglePlace>();

  for (const place of places) {
    const existing = placeMap.get(place.place_id);

    if (!existing) {
      placeMap.set(place.place_id, { ...place });
    } else {
      // Merge data intelligently
      const merged: GooglePlace = {
        ...existing,
        // Use newer data if available
        rating: place.rating ?? existing.rating,
        reviews_count: Math.max(place.reviews_count || 0, existing.reviews_count || 0),
        // Merge reviews
        reviews: mergeReviews(existing.reviews || [], place.reviews || []),
        // Merge photos
        photos: mergePhotos(existing.photos || [], place.photos || []),
        // Use provided data if present
        website: place.website || existing.website,
        phone: place.phone || existing.phone,
        opening_hours: place.opening_hours || existing.opening_hours,
      };
      placeMap.set(place.place_id, merged);
    }
  }

  return Array.from(placeMap.values());
}

/**
 * Merge reviews from duplicate places
 */
function mergeReviews(
  reviews1: GooglePlace["reviews"] = [],
  reviews2: GooglePlace["reviews"] = []
) {
  const reviewMap = new Map<string, any>();

  // Add reviews from both sources, avoiding duplicates
  const allReviews = [...(reviews1 || []), ...(reviews2 || [])];
  for (const review of allReviews) {
    const key = `${review.author_name}-${review.time}`;
    if (!reviewMap.has(key)) {
      reviewMap.set(key, review);
    }
  }

  // Return sorted by most recent
  return Array.from(reviewMap.values()).sort((a, b) => b.time - a.time);
}

/**
 * Merge photos from duplicate places
 */
function mergePhotos(
  photos1: GooglePlace["photos"] = [],
  photos2: GooglePlace["photos"] = []
) {
  const photoMap = new Map<string, any>();

  // Add photos from both sources, avoiding duplicates
  const allPhotos = [...(photos1 || []), ...(photos2 || [])];
  for (const photo of allPhotos || []) {
    if (!photoMap.has(photo.photo_reference)) {
      photoMap.set(photo.photo_reference, photo);
    }
  }

  return Array.from(photoMap.values());
}

/**
 * Check if two places are likely duplicates based on name similarity
 */
export function areDuplicates(place1: GooglePlace, place2: GooglePlace, threshold: number = 0.8): boolean {
  // If place_ids match, definitely duplicates
  if (place1.place_id === place2.place_id) {
    return true;
  }

  // If names are very similar and close distance
  const nameSimilarity = calculateStringSimilarity(place1.name, place2.name);
  
  if (nameSimilarity >= threshold) {
    // Check distance if both have coordinates
    if (place1.geometry?.location && place2.geometry?.location) {
      const distance = calculateDistance(
        place1.geometry.location.lat,
        place1.geometry.location.lng,
        place2.geometry.location.lat,
        place2.geometry.location.lng
      );
      return distance < 0.1; // Less than 100 meters
    }
    return true;
  }

  return false;
}

/**
 * Calculate string similarity using Levenshtein distance
 */
function calculateStringSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (s1 === s2) return 1;

  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;

  if (longer.length === 0) return 1;

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

/**
 * Calculate Levenshtein distance
 */
function levenshteinDistance(s1: string, s2: string): number {
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

/**
 * Calculate distance between two coordinates (in kilometers)
 */
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
