import { NextRequest, NextResponse } from "next/server";
import { textSearch, nearbySearch } from "@/lib/googlePlaces";
import { rankAttraction, rankRestaurant, rankHotel, getTopPlaces } from "@/lib/ranking";
import { deduplicateByPlaceId } from "@/lib/deduplication";
import { globalCities } from "@/lib/cities";
import { mockAttractions, mockRestaurants, mockHotels } from "@/lib/mockData";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cityId = searchParams.get("cityId");
    const category = searchParams.get("category") as "attractions" | "restaurants" | "hotels";
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!cityId || !category) {
      return NextResponse.json(
        { error: "Missing cityId or category parameter" },
        { status: 400 }
      );
    }

    // Find city in our database
    const city = globalCities.find((c) => c.id === cityId);
    if (!city) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 404 }
      );
    }

    // Return mock data if Google API not configured
    const mockData = getMockData(cityId, category);
    if (mockData.length > 0) {
      return NextResponse.json({
        cityId,
        category,
        places: mockData.slice(0, limit),
        source: "mock",
        cached: false,
      });
    }

    // Try to fetch from Google Places API
    let places = [];
    
    if (category === "attractions") {
      const query = `top attractions in ${city.name}`;
      places = await textSearch(query);
    } else if (category === "restaurants") {
      places = await nearbySearch(city.lat, city.lng, "restaurant", 15000);
    } else if (category === "hotels") {
      places = await nearbySearch(city.lat, city.lng, "lodging", 20000);
    }

    // Deduplicate places
    places = deduplicateByPlaceId(places);

    // Score and rank places
    const rankings = places
      .map((place) => {
        const distance = 1; // Simplified for now
        if (category === "attractions") {
          return rankAttraction(place, distance);
        } else if (category === "restaurants") {
          return rankRestaurant(place, distance);
        } else {
          return rankHotel(place, distance);
        }
      })
      .filter((score) => score.score > 0);

    // Get top places
    const topPlaces = getTopPlaces(rankings, limit);
    const placeIds = new Set(topPlaces.map((p) => p.place_id));

    const result = places.filter((p) => placeIds.has(p.place_id));

    return NextResponse.json({
      cityId,
      category,
      places: result,
      source: "google",
      cached: false,
      count: result.length,
    });
  } catch (error) {
    console.error("Error in places API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Get mock data for a city and category
 */
function getMockData(cityId: string, category: "attractions" | "restaurants" | "hotels") {
  if (category === "attractions") {
    return mockAttractions.filter((a) => a.cityId === cityId);
  } else if (category === "restaurants") {
    return mockRestaurants.filter((r) => r.cityId === cityId);
  } else {
    return mockHotels.filter((h) => h.cityId === cityId);
  }
}
