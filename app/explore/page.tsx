"use client";

import { useEffect, useMemo, useState } from "react";
import CityCard from "@/components/CityCard";
import FilterChips from "@/components/FilterChips";
import { CITIES } from "@/data/cities";
import { loadPrefs } from "@/lib/storage";
import { rankCities } from "@/lib/recommend";
import { Budget, Interest, Season, TripType } from "@/lib/types";

type Filters = {
  season: Season | "alle";
  budget: Budget | "alle";
  tripType: TripType | "alle";
  interests: Interest[];
};

export default function ExplorePage() {
  const [filters, setFilters] = useState<Filters>({
    season: "alle",
    budget: "alle",
    tripType: "alle",
    interests: [],
  });

  const [prefsLoaded, setPrefsLoaded] = useState(false);
  const [ranked, setRanked] = useState(CITIES);

  useEffect(() => {
    const prefs = loadPrefs();
    setRanked(rankCities(CITIES, prefs));
    setPrefsLoaded(true);
  }, []);

  const filtered = useMemo(() => {
    return ranked.filter((c) => {
      if (filters.season !== "alle" && !c.seasons.includes(filters.season)) return false;
      if (filters.budget !== "alle" && !c.budgets.includes(filters.budget)) return false;
      if (filters.tripType !== "alle" && !c.tripTypes.includes(filters.tripType)) return false;
      if (filters.interests.length > 0) {
        const set = new Set(c.interests);
        const ok = filters.interests.some((i) => set.has(i));
        if (!ok) return false;
      }
      return true;
    });
  }, [ranked, filters]);

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Utforsk</h2>
          <div className="text-xs text-white/50">{prefsLoaded ? "Tilpasset" : "Laster…"}</div>
        </div>
        <div className="mt-3">
          <FilterChips value={filters} onChange={setFilters} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((c) => (
          <CityCard key={c.slug} city={c} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
          Ingen byer matcher filtrene. Prøv å fjerne noen chips.
        </div>
      ) : null}
    </div>
  );
}
