"use client";

import { cn } from "@/lib/utils";

export type TabItem<T extends string> = { key: T; label: string };

export default function Tabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: Array<TabItem<T>>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto rounded-3xl border border-white/10 bg-white/5 p-2">
      {tabs.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={cn(
              "shrink-0 rounded-2xl px-4 py-2 text-sm transition",
              active ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
