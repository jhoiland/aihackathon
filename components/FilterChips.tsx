"use client";

import { Budget, Interest, Season, TripType } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filters = {
  season: Season | "alle";
  budget: Budget | "alle";
  tripType: TripType | "alle";
  interests: Interest[];
};

const seasonOptions: Array<{ key: Filters["season"]; label: string }> = [
  { key: "alle", label: "Alle" },
  { key: "sol", label: "Sol" },
  { key: "vinter", label: "Vinter" },
  { key: "var_host", label: "Vår/Høst" },
];

const budgetOptions: Array<{ key: Filters["budget"]; label: string }> = [
  { key: "alle", label: "Alle" },
  { key: "rimelig", label: "Rimelig" },
  { key: "middels", label: "Middels" },
  { key: "premium", label: "Premium" },
];

const tripOptions: Array<{ key: Filters["tripType"]; label: string }> = [
  { key: "alle", label: "Alle" },
  { key: "romantisk", label: "Romantisk" },
  { key: "vennetur", label: "Vennetur" },
  { key: "familie", label: "Familie" },
  { key: "solo", label: "Solo" },
];

const interestOptions: Array<{ key: Interest; label: string }> = [
  { key: "mat", label: "Mat" },
  { key: "kultur", label: "Kultur" },
  { key: "natur", label: "Natur" },
  { key: "natteliv", label: "Natteliv" },
  { key: "shopping", label: "Shopping" },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs transition",
        active
          ? "border-white/20 bg-white/15 text-white"
          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
      )}
    >
      {children}
    </button>
  );
}

export default function FilterChips({
  value,
  onChange,
}: {
  value: Filters;
  onChange: (next: Filters) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <div className="w-full text-xs text-white/50">Klima / sesong</div>
        {seasonOptions.map((o) => (
          <Chip key={o.key} active={value.season === o.key} onClick={() => onChange({ ...value, season: o.key })}>
            {o.label}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="w-full text-xs text-white/50">Budsjett</div>
        {budgetOptions.map((o) => (
          <Chip key={o.key} active={value.budget === o.key} onClick={() => onChange({ ...value, budget: o.key })}>
            {o.label}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="w-full text-xs text-white/50">Reisetype</div>
        {tripOptions.map((o) => (
          <Chip
            key={o.key}
            active={value.tripType === o.key}
            onClick={() => onChange({ ...value, tripType: o.key })}
          >
            {o.label}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="w-full text-xs text-white/50">Interesser</div>
        {interestOptions.map((o) => {
          const active = value.interests.includes(o.key);
          return (
            <Chip
              key={o.key}
              active={active}
              onClick={() => {
                const interests = active ? value.interests.filter((x) => x !== o.key) : [...value.interests, o.key];
                onChange({ ...value, interests });
              }}
            >
              {o.label}
            </Chip>
          );
        })}
      </div>
    </div>
  );
}
