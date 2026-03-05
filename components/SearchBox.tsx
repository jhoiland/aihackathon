"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { City } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function SearchBox({ cities }: { cities: City[] }) {
  const [q, setQ] = useState("");

  const matches = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return cities
      .filter((c) => `${c.city} ${c.country}`.toLowerCase().includes(query))
      .slice(0, 8);
  }, [q, cities]);

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Søk etter by eller land…"
          className="w-full bg-transparent text-base outline-none placeholder:text-white/40"
          autoComplete="off"
          inputMode="search"
        />
      </div>

      <div className={cn("space-y-2", matches.length === 0 && q.trim() ? "opacity-90" : "")}>
        {matches.length === 0 && q.trim() ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            Ingen treff. Prøv et annet søk.
          </div>
        ) : null}

        {matches.map((c) => (
          <Link
            key={c.slug}
            href={`/city/${c.slug}`}
            className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 hover:bg-white/10"
          >
            <img src={c.heroImage} alt={c.city} className="h-12 w-12 rounded-2xl object-cover" />
            <div className="min-w-0">
              <div className="font-medium leading-tight">
                {c.city} <span className="text-white/60">· {c.country}</span>
              </div>
              <div className="line-clamp-1 text-sm text-white/60">{c.knownFor.join(" • ")}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
