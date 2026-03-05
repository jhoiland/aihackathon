"use client";

import { useEffect, useState } from "react";
import { AgeGroup, Interest, UserPrefs } from "@/lib/types";
import { loadPrefs, savePrefs } from "@/lib/storage";
import { cn } from "@/lib/utils";

const ageOptions: Array<{ key: AgeGroup; label: string }> = [
  { key: "18-24", label: "18–24" },
  { key: "25-34", label: "25–34" },
  { key: "35-49", label: "35–49" },
  { key: "50-64", label: "50–64" },
  { key: "65+", label: "65+" },
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
        "rounded-full border px-3 py-1 text-sm transition",
        active
          ? "border-white/20 bg-white/15 text-white"
          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
      )}
    >
      {children}
    </button>
  );
}

export default function ProfilePage() {
  const [prefs, setPrefs] = useState<UserPrefs>({ ageGroup: null, interests: [] });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPrefs(loadPrefs());
  }, []);

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Profil / Preferanser</h2>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm text-white/60">Alder (valgfritt)</div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Chip active={prefs.ageGroup === null} onClick={() => setPrefs((p) => ({ ...p, ageGroup: null }))}>
            Ingen
          </Chip>
          {ageOptions.map((a) => (
            <Chip
              key={a.key}
              active={prefs.ageGroup === a.key}
              onClick={() => setPrefs((p) => ({ ...p, ageGroup: a.key }))}
            >
              {a.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm text-white/60">Interesser</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {interestOptions.map((i) => {
            const active = prefs.interests.includes(i.key);
            return (
              <Chip
                key={i.key}
                active={active}
                onClick={() =>
                  setPrefs((p) => ({
                    ...p,
                    interests: active ? p.interests.filter((x) => x !== i.key) : [...p.interests, i.key],
                  }))
                }
              >
                {i.label}
              </Chip>
            );
          })}
        </div>

        <div className="mt-3 text-xs text-white/50">
          Dette påvirker rekkefølgen på forslag – du kan alltid endre senere.
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            savePrefs(prefs);
            setSaved(true);
            setTimeout(() => setSaved(false), 1200);
          }}
          className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-neutral-950"
        >
          Lagre
        </button>
        {saved ? <div className="text-sm text-white/70">Lagret ✓</div> : null}
      </div>
    </div>
  );
}
