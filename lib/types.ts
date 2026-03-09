export type AgeGroup = "18-24" | "25-34" | "35-49" | "50-64" | "65+";

export type TravelType = "solo" | "couple" | "family" | "group" | "adventure";

export type Interest =
  | "culture"
  | "nightlife"
  | "food"
  | "nature"
  | "history"
  | "shopping"
  | "relaxation"
  | "adventure"
  | "art"
  | "music";

export type PriceLevel = "budget" | "mid-range" | "fine-dining";

export type AttractionType = "must-see" | "hidden-gem";

export type RestaurantCategory =
  | "budget"
  | "mid-range"
  | "fine-dining"
  | "local-favorites"
  | "vegetarian-friendly";

export interface UserPreferences {
  ageGroup: AgeGroup;
  interests: Interest[];
  travelType: TravelType;
  budgetPreference: PriceLevel;
  preferredClimate: "tropical" | "temperate" | "cold" | "any";
  preferredSeason: "spring" | "summer" | "fall" | "winter" | "any";
}

export interface Country {
  id: string;
  name: string;
  code: string;
  description: string;
  image: string;
}

export interface City {
  id: string;
  countryId: string;
  name: string;
  description: string;
  image: string;
  knownFor: string[];
  climate: string;
  bestTimeToVisit: string;
  introText: string;
  isFavorite?: boolean;
  lat?: number;
  lng?: number;
  priority?: number;
}

export interface Attraction {
  id: string;
  cityId: string;
  name: string;
  description: string;
  type: AttractionType;
  image: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  tips: string;
  whyRecommended: string[];
  tags: Interest[];
  targetAgeGroups?: AgeGroup[];
}

export interface Restaurant {
  id: string;
  cityId: string;
  name: string;
  description: string;
  category: RestaurantCategory;
  image: string;
  location: string;
  cuisine: string;
  priceLevel: PriceLevel;
  whyRecommended: string[];
  tags: Interest[];
  targetAgeGroups?: AgeGroup[];
  specialty: string;
}

export interface Activity {
  id: string;
  cityId: string;
  name: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  priceLevel: PriceLevel;
  whyRecommended: string[];
  tags: Interest[];
  targetAgeGroups?: AgeGroup[];
}

export interface TravelTip {
  id: string;
  cityId: string;
  category: "transport" | "safety" | "timing" | "general";
  title: string;
  content: string;
}

export interface CityGuide {
  city: City;
  attractions: Attraction[];
  restaurants: Restaurant[];
  activities: Activity[];
  travelTips: TravelTip[];
}

export interface Favorite {
  id: string;
  type: "city" | "attraction" | "restaurant";
  itemId: string;
  cityId: string;
  savedAt: Date;
}

// Google Places API Types
export interface GooglePlace {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
  photos?: Array<{
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }>;
  price_level?: number;
  opening_hours?: {
    open_now?: boolean;
    weekday_text?: string[];
  };
  website?: string;
  formatted_phone_number?: string;
  business_status?: "OPERATIONAL" | "CLOSED_TEMPORARILY" | "CLOSED_PERMANENTLY";
}

export interface CachedPlace extends GooglePlace {
  cityId: string;
  category: "attractions" | "restaurants" | "hotels";
  rank?: number;
  distance?: number;
  fetchedAt: number;
}

export interface PlacesCache {
  cityId: string;
  category: "attractions" | "restaurants" | "hotels";
  places: CachedPlace[];
  lastSyncAt: number;
  expiresAt: number;
}

export interface RankingScore {
  place_id: string;
  score: number;
  ratingScore: number;
  reviewCountScore: number;
  distanceScore: number;
  priceScore?: number;
}
