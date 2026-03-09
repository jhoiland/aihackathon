"use client";

import { useState, useEffect } from "react";
import { CachedPlace } from "@/lib/types";
import { getCityPlaces } from "@/lib/placeSync";
import PlacesTabs from "./PlacesTabs";
import PlacesList from "./PlacesList";
import PlaceFilters from "./PlaceFilters";

interface PlacesIntegrationProps {
  cityId: string;
}

export default function PlacesIntegration({ cityId }: PlacesIntegrationProps) {
  const [activeTab, setActiveTab] = useState<"attractions" | "restaurants" | "hotels">(
    "attractions"
  );
  const [places, setPlaces] = useState<{
    attractions: CachedPlace[];
    restaurants: CachedPlace[];
    hotels: CachedPlace[];
  }>({
    attractions: [],
    restaurants: [],
    hotels: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4);
  const [openNowOnly, setOpenNowOnly] = useState(false);

  useEffect(() => {
    const loadPlaces = async () => {
      setIsLoading(true);
      try {
        const data = await getCityPlaces(cityId);
        setPlaces(data);
      } catch (error) {
        console.error("Error loading places:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaces();
  }, [cityId]);

  // Filter places based on criteria
  const getFilteredPlaces = (
    categoryPlaces: CachedPlace[]
  ): CachedPlace[] => {
    return categoryPlaces.filter((place) => {
      if (minRating > 0 && (!place.rating || place.rating < minRating)) {
        return false;
      }
      if (maxPrice < 4 && place.price_level && place.price_level > maxPrice) {
        return false;
      }
      if (
        openNowOnly &&
        place.opening_hours?.open_now !== undefined &&
        !place.opening_hours.open_now
      ) {
        return false;
      }
      return true;
    });
  };

  const filteredPlaces = getFilteredPlaces(places[activeTab]);

  return (
    <div className="my-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-6">Discover {activeTab}</h2>
        <PlacesTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={{
            attractions: places.attractions.length,
            restaurants: places.restaurants.length,
            hotels: places.hotels.length,
          }}
        />
      </div>

      <PlaceFilters
        category={activeTab}
        onRatingChange={setMinRating}
        onPriceChange={setMaxPrice}
        onStatusChange={setOpenNowOnly}
      />

      <PlacesList
        category={activeTab}
        places={filteredPlaces}
        isLoading={isLoading}
        onPlaceClick={(place) => {
          console.log("Clicked place:", place);
        }}
      />
    </div>
  );
}
