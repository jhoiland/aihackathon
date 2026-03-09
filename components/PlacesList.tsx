import { CachedPlace } from "@/lib/types";
import PlacesCard from "./PlacesCard";

interface PlacesListProps {
  category: "attractions" | "restaurants" | "hotels";
  places: CachedPlace[];
  isLoading?: boolean;
  onPlaceClick?: (place: CachedPlace) => void;
}

export default function PlacesList({
  category,
  places,
  isLoading = false,
  onPlaceClick,
}: PlacesListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-48 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No {category} found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500">
        Showing {places.length} {category}
      </div>
      {places.map((place) => (
        <PlacesCard
          key={place.place_id}
          place={place}
          onClick={() => onPlaceClick?.(place)}
        />
      ))}
    </div>
  );
}
