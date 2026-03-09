import { MapPin, UtensilsCrossed, Hotel } from "lucide-react";

interface PlacesTabsProps {
  activeTab: "attractions" | "restaurants" | "hotels";
  onTabChange: (tab: "attractions" | "restaurants" | "hotels") => void;
  counts?: {
    attractions: number;
    restaurants: number;
    hotels: number;
  };
}

export default function PlacesTabs({
  activeTab,
  onTabChange,
  counts,
}: PlacesTabsProps) {
  const tabs = [
    {
      id: "attractions" as const,
      label: "Attractions",
      icon: MapPin,
    },
    {
      id: "restaurants" as const,
      label: "Restaurants",
      icon: UtensilsCrossed,
    },
    {
      id: "hotels" as const,
      label: "Hotels",
      icon: Hotel,
    },
  ];

  return (
    <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        const count = counts?.[id] || 0;

        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex items-center gap-2 px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
              isActive
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
            {count > 0 && (
              <span className="ml-1 bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
