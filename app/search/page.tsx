"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, MapPin, UtensilsCrossed, MapPinIcon } from "lucide-react";
import {
  mockCities,
  mockAttractions,
  mockRestaurants,
  mockActivities,
} from "@/lib/mockData";

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) {
      return { cities: [], attractions: [], restaurants: [], activities: [] };
    }

    const q = query.toLowerCase().trim();

    return {
      cities: mockCities.filter(
        (city) =>
          city.name.toLowerCase().includes(q) ||
          city.description.toLowerCase().includes(q) ||
          city.knownFor.some((item) => item.toLowerCase().includes(q))
      ),
      attractions: mockAttractions.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      ),
      restaurants: mockRestaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q)
      ),
      activities: mockActivities.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  const totalResults =
    results.cities.length +
    results.attractions.length +
    results.restaurants.length +
    results.activities.length;

  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Search Header */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4 text-center">
              Search Destinations & Experiences
            </h1>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search cities, attractions, restaurants, activities..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12 text-base"
                autoFocus
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {query && totalResults === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No results found for "{query}"
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Try different keywords or browse all destinations
              </p>
              <Button onClick={() => router.push("/")} variant="default">
                Browse All Destinations
              </Button>
            </div>
          ) : !query ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Enter a search term to find cities, attractions, restaurants, and activities
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Cities */}
              {results.cities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    Destinations ({results.cities.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {results.cities.map((city) => (
                      <Card
                        key={city.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => router.push(`/city/${city.id}`)}
                      >
                        <div className="h-40 overflow-hidden rounded-t-lg">
                          <img
                            src={city.image}
                            alt={city.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{city.name}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {city.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1">
                            {city.knownFor.slice(0, 3).map((item) => (
                              <Badge key={item} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Attractions */}
              {results.attractions.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <MapPinIcon className="w-6 h-6" />
                    Attractions ({results.attractions.length})
                  </h2>
                  <div className="space-y-4">
                    {results.attractions.map((attraction) => (
                      <Card
                        key={attraction.id}
                        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() =>
                          router.push(`/city/${attraction.cityId}`)
                        }
                      >
                        <div className="flex gap-4">
                          <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-l-lg">
                            <img
                              src={attraction.image}
                              alt={attraction.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 py-4 pr-4">
                            <CardTitle className="text-lg mb-1">
                              {attraction.name}
                            </CardTitle>
                            <CardDescription className="text-sm mb-2 line-clamp-2">
                              {attraction.description}
                            </CardDescription>
                            <div className="text-xs text-muted-foreground">
                              <span className="inline-block mr-3">
                                {attraction.type === "must-see"
                                  ? "Must-See"
                                  : "Hidden Gem"}
                              </span>
                              <span>{attraction.location}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Restaurants */}
              {results.restaurants.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <UtensilsCrossed className="w-6 h-6" />
                    Restaurants ({results.restaurants.length})
                  </h2>
                  <div className="space-y-4">
                    {results.restaurants.map((restaurant) => (
                      <Card
                        key={restaurant.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() =>
                          router.push(`/city/${restaurant.cityId}`)
                        }
                      >
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center justify-between">
                            {restaurant.name}
                            <Badge variant="outline" className="text-xs capitalize">
                              {restaurant.category}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            {restaurant.cuisine} • {restaurant.priceLevel}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {restaurant.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Activities */}
              {results.activities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Things to Do ({results.activities.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {results.activities.map((activity) => (
                      <Card
                        key={activity.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                        onClick={() =>
                          router.push(`/city/${activity.cityId}`)
                        }
                      >
                        <div className="h-40 overflow-hidden rounded-t-lg">
                          <img
                            src={activity.image}
                            alt={activity.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{activity.name}</CardTitle>
                          <CardDescription>{activity.category}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-xs text-muted-foreground">
                            Duration: {activity.duration}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
