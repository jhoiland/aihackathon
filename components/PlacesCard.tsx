import { CachedPlace } from "@/lib/types";
import { Star, MapPin, Phone, DollarSign } from "lucide-react";

interface PlacesCardProps {
  place: CachedPlace;
  onClick?: () => void;
}

export default function PlacesCard({ place, onClick }: PlacesCardProps) {
  const photoUrl = place.photos?.[0]
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    : `https://picsum.photos/400/250?random=${place.place_id?.length || Math.floor(Math.random() * 1000)}`;

  const priceLabel = place.price_level
    ? "$".repeat(Math.min(place.price_level, 4))
    : "N/A";

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={photoUrl}
          alt={place.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
          onError={(e) => {
            e.currentTarget.src = `https://picsum.photos/400/250?random=${Math.random()}`;
          }}
        />
        {place.rating && (
          <div className="absolute top-3 right-3 bg-white rounded-lg px-3 py-1 flex items-center gap-1 shadow-md">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm">
              {place.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{place.name}</h3>

        <div className="space-y-2 text-sm text-gray-600">
          {place.address && (
            <div className="flex gap-2 items-start">
              <MapPin size={16} className="flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{place.address}</span>
            </div>
          )}

          {place.phone && (
            <div className="flex gap-2 items-center">
              <Phone size={16} className="flex-shrink-0" />
              <span>{place.phone}</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t">
            <div className="flex items-center gap-1">
              <DollarSign size={16} />
              <span>{priceLabel}</span>
            </div>
            <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {place.category}
            </div>
          </div>
        </div>

        {place.reviews_count && place.reviews_count > 0 && (
          <div className="mt-3 text-xs text-gray-500">
            {place.reviews_count} reviews
          </div>
        )}

        {place.opening_hours?.open_now !== undefined && (
          <div className="mt-2 text-xs">
            <span
              className={`px-2 py-1 rounded ${
                place.opening_hours.open_now
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {place.opening_hours.open_now ? "Open now" : "Closed"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
