"use client";

import { useEffect, useMemo, useState } from "react";
import CityCard from "@/components/CityCard";
import { CITIES } from "@/data/cities";
import { loadFavs } from "@/lib/storage";

export default function FavoritesPage() {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    setFavs(loadFavs());
  }, []);

  const favCities = useMemo(() => {
    const set = new Set(favs);
    return CITIES.filter((c) => set.has(c.slug));
  }, [favs]);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-semibold">Favoritter</h2>
        <div className="text-xs text-white/50">{favCities.length} byer</div>
      </div>

      {favCities.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
          Ingen favoritter enda. Åpne en by og trykk “Lagre”.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {favCities.map((c) => (
            <CityCard key={c.slug} city={c} />
          ))}
        </div>
      )}
    </div>
  );
}
