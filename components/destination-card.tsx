"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { City } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { isFavorited, addToFavorites, removeFromFavorites } from "@/lib/storage";

interface DestinationCardProps {
  city: City;
}

export function DestinationCard({ city }: DestinationCardProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorited(city.id));
  }, [city.id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(city.id);
    } else {
      addToFavorites("city", city.id, city.id);
    }
    setFavorite(!favorite);
  };

  return (
    <Link href={`/city/${city.id}`}>
      <div className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-xl hover:border-primary cursor-pointer h-full flex flex-col hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative overflow-hidden h-56 bg-muted">
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all z-10 group-hover:scale-110"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                favorite ? "fill-red-500 text-red-500 scale-110" : "text-white"
              }`}
            />
          </button>

          {/* City Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <h3 className="text-white font-bold text-2xl sm:text-3xl drop-shadow-lg">{city.name}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col">
          <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {city.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {city.knownFor.slice(0, 2).map((item) => (
              <Badge key={item} variant="secondary" className="text-xs font-medium px-2.5 py-1">
                {item}
              </Badge>
            ))}
            {city.knownFor.length > 2 && (
              <Badge variant="secondary" className="text-xs font-medium px-2.5 py-1">
                +{city.knownFor.length - 2}
              </Badge>
            )}
          </div>

          {/* Info Footer */}
          <div className="mt-auto pt-5 text-xs sm:text-sm text-muted-foreground border-t border-border/60 font-medium space-y-2">
            <div className="flex justify-between">
              <span className="capitalize">{city.climate}</span>
              <span>{city.bestTimeToVisit}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
