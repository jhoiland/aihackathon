import { GooglePlace } from "@/lib/types";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

interface TextSearchResponse {
  results: GooglePlaceResult[];
  next_page_token?: string;
  status: string;
}

interface NearbySearchResponse {
  results: GooglePlaceResult[];
  next_page_token?: string;
  status: string;
}

interface GooglePlaceResult {
  place_id: string;
  name: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  price_level?: number;
  business_status?: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
  opening_hours?: {
    open_now?: boolean;
    weekday_text?: string[];
  };
  website?: string;
  formatted_phone_number?: string;
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }>;
  types?: string[];
}

/**
 * Text Search for attractions, restaurants, and activities
 */
export async function textSearch(query: string): Promise<GooglePlace[]> {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not set. Using fallback.");
    return [];
  }

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
    url.searchParams.append("query", query);
    url.searchParams.append("key", GOOGLE_MAPS_API_KEY);

    const response = await fetch(url.toString());
    const data: TextSearchResponse = await response.json();

    if (data.status !== "OK") {
      console.error(`Google Places Text Search error: ${data.status}`);
      return [];
    }

    return data.results.map((result) => convertToGooglePlace(result));
  } catch (error) {
    console.error("Error in text search:", error);
    return [];
  }
}

/**
 * Nearby Search for restaurants, hotels, etc. around a location
 */
export async function nearbySearch(
  lat: number,
  lng: number,
  type: "restaurant" | "hotel" | "lodging",
  radius: number = 15000
): Promise<GooglePlace[]> {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not set. Using fallback.");
    return [];
  }

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
    url.searchParams.append("location", `${lat},${lng}`);
    url.searchParams.append("radius", radius.toString());
    url.searchParams.append("type", type);
    url.searchParams.append("key", GOOGLE_MAPS_API_KEY);

    const response = await fetch(url.toString());
    const data: NearbySearchResponse = await response.json();

    if (data.status !== "OK") {
      console.error(`Google Places Nearby Search error: ${data.status}`);
      return [];
    }

    return data.results.map((result) => convertToGooglePlace(result));
  } catch (error) {
    console.error("Error in nearby search:", error);
    return [];
  }
}

/**
 * Get place details including website, phone, reviews
 */
export async function getPlaceDetails(placeId: string): Promise<GooglePlace | null> {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not set. Using fallback.");
    return null;
  }

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.append("place_id", placeId);
    url.searchParams.append("fields", "place_id,name,formatted_address,rating,user_ratings_total,photos,price_level,business_status,geometry,opening_hours,website,formatted_phone_number,reviews");
    url.searchParams.append("key", GOOGLE_MAPS_API_KEY);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.status !== "OK") {
      console.error(`Google Places Details error: ${data.status}`);
      return null;
    }

    return convertToGooglePlace(data.result);
  } catch (error) {
    console.error("Error getting place details:", error);
    return null;
  }
}

/**
 * Convert Google Places API result to our GooglePlace type
 */
function convertToGooglePlace(result: GooglePlaceResult): GooglePlace {
  return {
    place_id: result.place_id,
    name: result.name,
    address: result.formatted_address || "",
    geometry: result.geometry ? {
      location: {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
      },
    } : undefined,
    rating: result.rating,
    reviews_count: result.user_ratings_total || 0,
    reviews: result.reviews || [],
    photos: result.photos || [],
    price_level: result.price_level,
    business_status: result.business_status as "OPERATIONAL" | "CLOSED_TEMPORARILY" | "CLOSED_PERMANENTLY" | undefined,
    opening_hours: result.opening_hours,
    website: result.website,
    phone: result.formatted_phone_number,
    types: result.types || [],
  };
}
