"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Tabs from "@/components/Tabs";
import { CITIES } from "@/data/cities";
import { loadFavs, saveFavs, loadPrefs } from "@/lib/storage";
import { rankPlaces } from "@/lib/recommend";
import { Place } from "@/lib/types";

type TabKey = "known" | "do" | "see" | "eat" | "tips";

const tabItems = [
  { key: "known" as const, label: "Kjent for" },
  { key: "do" as const, label: "Ting å gjøre" },
  { key: "see" as const, label: "Attraksjoner" },
  { key: "eat" as const, label: "Mat" },
  { key: "tips" as const, label: "Tips" },
];

function SectionCard({ place }: { place: Place }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-medium leading-tight">{place.name}</div>
          <div className="mt-1 text-sm text-white/70">{place.short}</div>
        </div>
        {place.price ? (
          <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            {place.price}
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {place.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-3 text-sm text-white/70">
        <span className="text-white/50">Hvorfor anbefalt: </span>
        {place.why}
      </div>
    </div>
  );
}

export default function CityPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const city = useMemo(() => CITIES.find((c) => c.slug === slug), [slug]);
  const [tab, setTab] = useState<TabKey>("known");
  const [isFav, setIsFav] = useState(false);

  const rankedPlaces = useMemo(() => {
    if (!city) return [];
    const prefs = loadPrefs();
    return rankPlaces(city.places, prefs);
  }, [city]);

  useEffect(() => {
    const favs = loadFavs();
    setIsFav(favs.includes(slug));
  }, [slug]);

  if (!city) return notFound();

  const thingsToDo = rankedPlaces.filter((p) => p.category === "ting_a_gjore");
  const attractions = rankedPlaces.filter((p) => p.category === "attraksjon" || p.category === "skjult_perle");
  const food = rankedPlaces.filter((p) => p.category === "restaurant");
  const tips = [
    ...city.tips.map((t, idx) => ({
      id: `tip-${idx}`,
      name: t,
      category: "tips" as const,
      tags: [],
      short: t,
      why: "Praktisk for en smidig tur.",
    })),
    ...rankedPlaces.filter((p) => p.category === "tips"),
  ];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="relative h-52 w-full">
          <img src={city.heroImage} alt={city.city} className="h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div>
              <div className="text-2xl font-semibold leading-tight">
                {city.city} <span className="text-white/70">· {city.country}</span>
              </div>
              <div className="mt-1 line-clamp-1 text-sm text-white/70">{city.knownFor.join(" • ")}</div>
            </div>

            <button
              type="button"
              onClick={() => {
                const favs = loadFavs();
                const next = favs.includes(city.slug) ? favs.filter((x) => x !== city.slug) : [...favs, city.slug];
                saveFavs(next);
                setIsFav(next.includes(city.slug));
              }}
              className="shrink-0 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-neutral-950"
            >
              {isFav ? "Lagret ✓" : "Lagre"}
            </button>
          </div>
        </div>

        <div className="p-4">
          <Tabs tabs={tabItems} value={tab} onChange={setTab} />
        </div>
      </div>

      {tab === "known" ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm text-white/60">Hva byen er kjent for</div>
          <ul className="mt-3 space-y-2">
            {city.knownFor.map((k) => (
              <li key={k} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                {k}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {tab === "do" ? (
        <div className="space-y-3">
          {thingsToDo.map((p) => (
            <SectionCard key={p.id} place={p} />
          ))}
          {thingsToDo.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
              Ingen forslag i denne kategorien enda.
            </div>
          ) : null}
        </div>
      ) : null}

      {tab === "see" ? (
        <div className="space-y-3">
          {attractions.map((p) => (
            <SectionCard key={p.id} place={p} />
          ))}
          {attractions.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
              Ingen forslag i denne kategorien enda.
            </div>
          ) : null}
        </div>
      ) : null}

      {tab === "eat" ? (
        <div className="space-y-3">
          {food.map((p) => (
            <SectionCard key={p.id} place={p} />
          ))}
          {food.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
              Ingen forslag i denne kategorien enda.
            </div>
          ) : null}
        </div>
      ) : null}

      {tab === "tips" ? (
        <div className="space-y-3">
          {tips.map((p: any, i: number) => (
            <div
              key={p.id ?? i}
              className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
            >
              {p.name ?? p.short}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
