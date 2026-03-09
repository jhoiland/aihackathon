import { useState } from "react";
import { Sliders } from "lucide-react";

interface PlaceFiltersProps {
  onRatingChange?: (rating: number) => void;
  onPriceChange?: (price: number) => void;
  onStatusChange?: (openNow: boolean) => void;
  category: "attractions" | "restaurants" | "hotels";
}

export default function PlaceFilters({
  onRatingChange,
  onPriceChange,
  onStatusChange,
  category,
}: PlaceFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(4);
  const [openNow, setOpenNow] = useState(false);

  const handleRatingChange = (value: number) => {
    setRating(value);
    onRatingChange?.(value);
  };

  const handlePriceChange = (value: number) => {
    setPrice(value);
    onPriceChange?.(value);
  };

  const handleStatusChange = (value: boolean) => {
    setOpenNow(value);
    onStatusChange?.(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold"
      >
        <Sliders size={20} />
        Filters
      </button>

      {showFilters && (
        <div className="mt-4 space-y-4 border-t pt-4">
          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Minimum Rating: {rating > 0 ? `${rating.toFixed(1)}+` : "All"}
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={rating}
              onChange={(e) => handleRatingChange(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>All</span>
              <span>5.0</span>
            </div>
          </div>

          {/* Price Filter - only for restaurants and hotels */}
          {(category === "restaurants" || category === "hotels") && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Maximum Price: {"$".repeat(price)}{" "}
                {price < 4 && `(${4 - price} more)`}
              </label>
              <input
                type="range"
                min="1"
                max="4"
                value={price}
                onChange={(e) => handlePriceChange(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$</span>
                <span>$$$$</span>
              </div>
            </div>
          )}

          {/* Open Now Filter - only for restaurants and hotels */}
          {(category === "restaurants" || category === "hotels") && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="openNow"
                checked={openNow}
                onChange={(e) => handleStatusChange(e.target.checked)}
                className="h-4 w-4 cursor-pointer"
              />
              <label htmlFor="openNow" className="text-sm font-medium text-gray-700 cursor-pointer">
                Open now
              </label>
            </div>
          )}

          {/* Reset Button */}
          <button
            onClick={() => {
              setRating(0);
              setPrice(4);
              setOpenNow(false);
              onRatingChange?.(0);
              onPriceChange?.(4);
              onStatusChange?.(false);
            }}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
