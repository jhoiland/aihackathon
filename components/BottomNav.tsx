"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/explore", label: "Utforsk" },
  { href: "/search", label: "Søk" },
  { href: "/favorites", label: "Favoritter" },
  { href: "/profile", label: "Profil" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-4 gap-1 px-2 py-2">
        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + "/");
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "rounded-2xl px-3 py-2 text-center text-sm",
                active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
              )}
            >
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
