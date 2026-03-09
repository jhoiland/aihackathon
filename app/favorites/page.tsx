"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2 } from "lucide-react";
import {
  getFavoritesFromStorage,
  removeFromFavorites,
} from "@/lib/storage";
import {
  mockCities,
  mockAttractions,
  mockRestaurants,
} from "@/lib/mockData";
import { Favorite } from "@/lib/types";

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFavorites(getFavoritesFromStorage());
  }, []);

  const handleRemove = (itemId: string) => {
    removeFromFavorites(itemId);
    setFavorites(getFavoritesFromStorage());
  };

  if (!mounted) {
    return null;
  }

  const favoriteCities = favorites
    .filter((f) => f.type === "city")
    .map((f) => mockCities.find((c) => c.id === f.itemId))
    .filter(Boolean);

  const favoriteAttractions = favorites
    .filter((f) => f.type === "attraction")
    .map((f) => mockAttractions.find((a) => a.id === f.itemId))
    .filter(Boolean);

  const favoriteRestaurants = favorites
    .filter((f) => f.type === "restaurant")
    .map((f) => mockRestaurants.find((r) => r.id === f.itemId))
    .filter(Boolean);

  const isEmpty =
    favoriteCities.length === 0 &&
    favoriteAttractions.length === 0 &&
    favoriteRestaurants.length === 0;

  return (
    <>
      <Navigation />
      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 fill-current" />
              <h1 className="text-4xl font-bold">Saved Favorites</h1>
            </div>
            <p className="text-white/90">
              {favorites.length} saved {favorites.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {isEmpty ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
              <p className="text-muted-foreground mb-8">
                Start exploring and save destinations you want to visit
              </p>
              <Button onClick={() => router.push("/")} variant="default" size="lg">
                Explore Destinations
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Favorite Cities */}
              {favoriteCities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Favorite Destinations ({favoriteCities.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteCities.map((city) => (
                      city && (
                        <div key={city.id} className="group relative">
                          <Card
                            className="overflow-hidden cursor-pointer h-full transition-all duration-300 hover:shadow-lg hover:border-primary"
                            onClick={() => router.push(`/city/${city.id}`)}
                          >
                            <div className="relative h-48 bg-muted overflow-hidden">
                              <img
                                src={city.image}
                                alt={city.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white font-bold text-lg">
                                  {city.name}
                                </h3>
                              </div>
                            </div>

                            <CardContent className="p-4">
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {city.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mb-4">
                                {city.knownFor.slice(0, 2).map((item) => (
                                  <Badge
                                    key={item}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemove(city.id);
                                }}
                                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded border border-border hover:border-destructive hover:bg-destructive/10 text-destructive transition-colors text-sm"
                              >
                                <Trash2 className="w-4 h-4" />
                                Remove
                              </button>
                            </CardContent>
                          </Card>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Favorite Attractions */}
              {favoriteAttractions.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Favorite Attractions ({favoriteAttractions.length})
                  </h2>
                  <div className="space-y-4">
                    {favoriteAttractions.map((attraction) => (
                      attraction && (
                        <Card
                          key={attraction.id}
                          className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() =>
                            router.push(`/city/${attraction.cityId}`)
                          }
                        >
                          <div className="flex gap-4">
                            <div className="w-40 h-32 flex-shrink-0 overflow-hidden">
                              <img
                                src={attraction.image}
                                alt={attraction.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 py-4 pr-4 flex flex-col justify-between">
                              <div>
                                <CardTitle className="flex items-center justify-between">
                                  {attraction.name}
                                  <Badge variant="outline" className="text-xs">
                                    {attraction.type === "must-see"
                                      ? "Must-See"
                                      : "Hidden Gem"}
                                  </Badge>
                                </CardTitle>
                                <CardDescription className="mt-1">
                                  {attraction.location}
                                </CardDescription>
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                  {attraction.description}
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemove(attraction.id);
                                }}
                                className="flex items-center justify-center gap-2 py-1.5 px-3 rounded text-xs border border-border hover:border-destructive hover:bg-destructive/10 text-destructive transition-colors w-fit mt-2"
                              >
                                <Trash2 className="w-3 h-3" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </Card>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Favorite Restaurants */}
              {favoriteRestaurants.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Favorite Restaurants ({favoriteRestaurants.length})
                  </h2>
                  <div className="space-y-4">
                    {favoriteRestaurants.map((restaurant) => (
                      restaurant && (
                        <Card
                          key={restaurant.id}
                          className="cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() =>
                            router.push(`/city/${restaurant.cityId}`)
                          }
                        >
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              {restaurant.name}
                              <Badge
                                variant="outline"
                                className="text-xs capitalize"
                              >
                                {restaurant.category}
                              </Badge>
                            </CardTitle>
                            <CardDescription>
                              {restaurant.cuisine} • {restaurant.location}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                              {restaurant.description}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(restaurant.id);
                              }}
                              className="flex items-center justify-center gap-2 py-1.5 px-3 rounded text-xs border border-border hover:border-destructive hover:bg-destructive/10 text-destructive transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                              Remove
                            </button>
                          </CardContent>
                        </Card>
                      )
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
