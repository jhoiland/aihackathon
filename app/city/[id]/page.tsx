"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, MapPin, Clock, UtensilsCrossed, MapPinIcon, AlertCircle } from "lucide-react";
import {
  mockCities,
  mockAttractions,
  mockRestaurants,
  mockActivities,
  mockTravelTips,
} from "@/lib/mockData";
import { 
  isFavorited,
  addToFavorites,
  removeFromFavorites,
  getPreferencesFromStorage,
  sortByRelevance,
} from "@/lib/storage";
import PlacesIntegration from "@/components/PlacesIntegration";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CityGuidePage({ params }: PageProps) {
  const router = useRouter();
  const city = mockCities.find((c) => c.id === params.id);
  const [favorite, setFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (city) {
      setFavorite(isFavorited(city.id));
    }
  }, [city]);

  if (!mounted) {
    return null;
  }

  if (!city) {
    return (
      <>
        <Navigation />
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">City not found</h1>
            <Button onClick={() => router.push("/")} variant="default">
              Back to Explore
            </Button>
          </div>
        </div>
      </>
    );
  }

  const attractions = mockAttractions.filter((a) => a.cityId === city.id);
  const restaurants = mockRestaurants.filter((r) => r.cityId === city.id);
  const activities = mockActivities.filter((a) => a.cityId === city.id);
  const tips = mockTravelTips.filter((t) => t.cityId === city.id);

  const preferences = getPreferencesFromStorage();
  const sortedAttractions = sortByRelevance(attractions, preferences);
  const sortedRestaurants = sortByRelevance(restaurants, preferences);
  const sortedActivities = sortByRelevance(activities, preferences);

  const mustSeeAttractions = sortedAttractions.filter((a) => a.type === "must-see");
  const hiddenGems = sortedAttractions.filter((a) => a.type === "hidden-gem");

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(city.id);
    } else {
      addToFavorites("city", city.id, city.id);
    }
    setFavorite(!favorite);
  };

  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Header with Image */}
        <div className="relative h-80 sm:h-96 overflow-hidden">
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Back Button and Title */}
          <div className="absolute top-4 left-4">
            <Button
              variant="ghost"
              className="bg-white/20 hover:bg-white/30 text-white"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="max-w-7xl mx-auto flex items-end justify-between">
              <div>
                <h1 className="text-5xl font-bold mb-2">{city.name}</h1>
                <p className="text-lg text-white/90">{city.description}</p>
              </div>
              <button
                onClick={handleToggleFavorite}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    favorite ? "fill-red-500 text-red-500" : "text-white"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Welcome to {city.name}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {city.introText}
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Climate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground font-medium">{city.climate}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Best Time to Visit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground font-medium">{city.bestTimeToVisit}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What It's Known For */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4">What It's Known For</h3>
            <div className="flex flex-wrap gap-2">
              {city.knownFor.map((item) => (
                <Badge key={item} variant="secondary" className="text-base px-3 py-1.5">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Google Places Integration */}
          <PlacesIntegration cityId={city.id} />

          {/* Must-See Attractions */}
          {mustSeeAttractions.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Must-See Attractions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mustSeeAttractions.map((attraction) => (
                  <Card key={attraction.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{attraction.name}</CardTitle>
                      <CardDescription>{attraction.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{attraction.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">Why Recommended:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {attraction.whyRecommended.map((reason) => (
                            <li key={reason} className="flex gap-2">
                              <span className="text-primary">•</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {attraction.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground pt-2 border-t">
                        {attraction.tips}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Hidden Gems */}
          {hiddenGems.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Hidden Gems</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hiddenGems.map((attraction) => (
                  <Card key={attraction.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{attraction.name}</CardTitle>
                      <CardDescription>{attraction.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{attraction.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">Why Recommended:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {attraction.whyRecommended.map((reason) => (
                            <li key={reason} className="flex gap-2">
                              <span className="text-primary">•</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {attraction.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground pt-2 border-t">
                        {attraction.tips}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Restaurants */}
          {sortedRestaurants.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Where to Eat</h3>
              <div className="space-y-4">
                {sortedRestaurants.map((restaurant) => (
                  <Card key={restaurant.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {restaurant.name}
                            <Badge variant="outline" className="text-xs capitalize">
                              {restaurant.category}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="w-4 h-4" />
                            {restaurant.location}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm">{restaurant.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-foreground">Cuisine</p>
                          <p className="text-muted-foreground">{restaurant.cuisine}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Price Level</p>
                          <p className="text-muted-foreground capitalize">
                            {restaurant.priceLevel}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-2">Specialty</p>
                        <p className="text-sm text-muted-foreground">
                          {restaurant.specialty}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-2 border-t">
                        {restaurant.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Things to Do */}
          {sortedActivities.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Things to Do</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedActivities.map((activity) => (
                  <Card key={activity.id}>
                    <div className="h-40 overflow-hidden">
                      <img
                        src={activity.image}
                        alt={activity.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{activity.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {activity.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm">{activity.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{activity.duration}</span>
                        </div>
                        <div>
                          <span className="font-semibold capitalize">
                            {activity.priceLevel}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {activity.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Travel Tips */}
          {tips.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Travel Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tips.map((tip) => (
                  <Card key={tip.id}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {tip.category === "safety" && (
                          <AlertCircle className="w-5 h-5 text-orange-500" />
                        )}
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{tip.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
