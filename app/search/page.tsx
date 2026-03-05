import SearchBox from "@/components/SearchBox";
import { CITIES } from "@/data/cities";

export default function SearchPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Søk</h2>
      <SearchBox cities={CITIES} />
    </div>
  );
}
