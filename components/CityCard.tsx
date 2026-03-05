"use client";

import Link from "next/link";
import { City } from "@/lib/types";

export default function CityCard({ city }: { city: City }) {
  return (
    <Link
      href={`/city/${city.slug}`}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-sm transition hover:bg-white/10"
    >
      <div className="relative h-44 w-full">
        <img
          src={city.heroImage}
          alt={`${city.city}, ${city.country}`}
          className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-lg font-semibold leading-tight">
            {city.city}
            <span className="text-white/70"> · {city.country}</span>
          </div>
          <div className="mt-1 line-clamp-1 text-sm text-white/70">{city.knownFor.join(" • ")}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-3">
        {city.interests.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
