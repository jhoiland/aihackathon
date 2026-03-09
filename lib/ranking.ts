import { GooglePlace, RankingScore } from "@/lib/types";

/**
 * Calculate ranking score for attractions
 * Formula: (rating × 20) + (reviews × 0.5) + (proximity × 10)
 */
export function rankAttraction(
  place: GooglePlace,
  distanceKm: number = 5
): RankingScore {
  const ratingScore = (place.rating || 0) * 20;
  const reviewCountScore = Math.min((place.reviews_count || 0) * 0.5, 50);
  const proximityScore = Math.max(0, (10 - distanceKm) * 2);

  const totalScore = ratingScore + reviewCountScore + proximityScore;

  return {
    place_id: place.place_id,
    score: totalScore,
    ratingScore,
    reviewCountScore,
    distanceScore: proximityScore,
    priceScore: 0,
  };
}

/**
 * Calculate ranking score for restaurants
 * Formula: (rating × 20) + (reviews × 0.5) - (price_level × 5)
 */
export function rankRestaurant(
  place: GooglePlace,
  distanceKm: number = 3
): RankingScore {
  const ratingScore = (place.rating || 0) * 20;
  const reviewCountScore = Math.min((place.reviews_count || 0) * 0.5, 50);
  const priceScore = (place.price_level || 0) * -5;
  const proximityScore = Math.max(0, (5 - distanceKm) * 3);

  const totalScore = Math.max(0, ratingScore + reviewCountScore + priceScore + proximityScore);

  return {
    place_id: place.place_id,
    score: totalScore,
    ratingScore,
    reviewCountScore,
    distanceScore: proximityScore,
    priceScore,
  };
}

/**
 * Calculate ranking score for hotels
 * Formula: (rating × 20) + (reviews × 0.5) - (price_level × 3)
 */
export function rankHotel(
  place: GooglePlace,
  distanceKm: number = 2
): RankingScore {
  const ratingScore = (place.rating || 0) * 20;
  const reviewCountScore = Math.min((place.reviews_count || 0) * 0.5, 50);
  const priceScore = (place.price_level || 0) * -3;
  const proximityScore = Math.max(0, (5 - distanceKm) * 2);

  const totalScore = Math.max(0, ratingScore + reviewCountScore + priceScore + proximityScore);

  return {
    place_id: place.place_id,
    score: totalScore,
    ratingScore,
    reviewCountScore,
    distanceScore: proximityScore,
    priceScore,
  };
}

/**
 * Calculate distance between two coordinates (in kilometers)
 */
export function calculateDistance(
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

/**
 * Sort places by ranking score
 */
export function sortByScore(scores: RankingScore[]): RankingScore[] {
  return [...scores].sort((a, b) => b.score - a.score);
}

/**
 * Get top N places by score
 */
export function getTopPlaces(scores: RankingScore[], limit: number = 10): RankingScore[] {
  return sortByScore(scores).slice(0, limit);
}

/**
 * Filter places by minimum rating
 */
export function filterByRating(places: GooglePlace[], minRating: number = 4.0): GooglePlace[] {
  return places.filter((place) => (place.rating || 0) >= minRating);
}

/**
 * Filter places by price level
 */
export function filterByPrice(
  places: GooglePlace[],
  maxPrice: number = 4
): GooglePlace[] {
  return places.filter((place) => (place.price_level || 1) <= maxPrice);
}

/**
 * Filter places by business status (open/operational)
 */
export function filterByStatus(places: GooglePlace[]): GooglePlace[] {
  return places.filter((place) => place.business_status === "OPERATIONAL");
}
