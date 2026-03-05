import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Oppdag neste by på under 60 sekunder
        </h1>
        <p className="mt-2 max-w-2xl text-white/70">
          Utforsk reisemål, filtrer etter vibe og interesser, og få en ryddig city guide med
          alders- og interessebasert prioritering.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/explore"
            className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-neutral-950"
          >
            Start Utforsk
          </Link>
          <Link
            href="/profile"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Sett preferanser
          </Link>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm text-white/60">MVP-fokus</div>
          <div className="mt-1 font-medium">Kort, kuratert innhold</div>
          <p className="mt-2 text-sm text-white/70">
            Ingen lange artikler – bare kategorier, korte beskrivelser og “hvorfor anbefalt”.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm text-white/60">Tilpasning</div>
          <div className="mt-1 font-medium">Myk anbefalingslogikk</div>
          <p className="mt-2 text-sm text-white/70">
            Alder og interesser påvirker rekkefølge – du kan alltid endre preferanser.
          </p>
        </div>
      </section>
    </div>
  );
}
