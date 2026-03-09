import { NextRequest, NextResponse } from "next/server";
import { textSearch, nearbySearch } from "@/lib/googlePlaces";
import { deduplicateByPlaceId } from "@/lib/deduplication";
import { rankAttraction, rankRestaurant, rankHotel } from "@/lib/ranking";
import { globalCities } from "@/lib/cities";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cityIds, categories } = body;

    // Validate request
    if (!cityIds || !Array.isArray(cityIds) || cityIds.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid cityIds parameter" },
        { status: 400 }
      );
    }

    const validCategories = ["attractions", "restaurants", "hotels"];
    const categoriesToSync = categories && Array.isArray(categories)
      ? categories.filter((c) => validCategories.includes(c))
      : validCategories;

    if (categoriesToSync.length === 0) {
      return NextResponse.json(
        { error: "No valid categories specified" },
        { status: 400 }
      );
    }

    const results = [];

    // Sync each city
    for (const cityId of cityIds) {
      const city = globalCities.find((c) => c.id === cityId);
      if (!city) continue;

      // Sync each category
      for (const category of categoriesToSync) {
        try {
          let places = [];

          if (category === "attractions") {
            const query = `top attractions in ${city.name}`;
            places = await textSearch(query);
          } else if (category === "restaurants") {
            places = await nearbySearch(city.lat, city.lng, "restaurant", 15000);
          } else if (category === "hotels") {
            places = await nearbySearch(city.lat, city.lng, "lodging", 20000);
          }

          // Deduplicate
          places = deduplicateByPlaceId(places);

          // Apply ranking
          const rankings = places.map((place) => {
            if (category === "attractions") {
              return rankAttraction(place, 1);
            } else if (category === "restaurants") {
              return rankRestaurant(place, 1);
            } else {
              return rankHotel(place, 1);
            }
          });

          results.push({
            cityId,
            category,
            placesCount: places.length,
            status: "success",
            timestamp: new Date().toISOString(),
          });
        } catch (error) {
          results.push({
            cityId,
            category,
            status: "error",
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
          });
        }
      }
    }

    return NextResponse.json({
      message: "Sync completed",
      results,
      totalCities: cityIds.length,
      totalCategories: categoriesToSync.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in sync API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * Manual trigger to refresh places for a city
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { cityId, categories } = body;

    if (!cityId) {
      return NextResponse.json(
        { error: "Missing cityId parameter" },
        { status: 400 }
      );
    }

    const city = globalCities.find((c) => c.id === cityId);
    if (!city) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 404 }
      );
    }

    const validCategories = ["attractions", "restaurants", "hotels"];
    const categoriesToSync = categories && Array.isArray(categories)
      ? categories.filter((c) => validCategories.includes(c))
      : validCategories;

    const results = [];

    // Refresh each category
    for (const category of categoriesToSync) {
      try {
        let places = [];

        if (category === "attractions") {
          const query = `top attractions in ${city.name}`;
          places = await textSearch(query);
        } else if (category === "restaurants") {
          places = await nearbySearch(city.lat, city.lng, "restaurant", 15000);
        } else if (category === "hotels") {
          places = await nearbySearch(city.lat, city.lng, "lodging", 20000);
        }

        places = deduplicateByPlaceId(places);

        results.push({
          category,
          placesCount: places.length,
          status: "success",
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        results.push({
          category,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({
      message: "Refresh completed",
      cityId,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in refresh API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
