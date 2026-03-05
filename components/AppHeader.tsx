import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          Reiseinspirator
        </Link>
        <div className="text-xs text-white/60">MVP</div>
      </div>
    </header>
  );
}
