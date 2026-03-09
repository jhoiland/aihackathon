"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { DestinationCard } from "@/components/destination-card";
import { SearchBar } from "@/components/SearchBar";
import { FilterDrawer } from "@/components/FilterDrawer";
import { Badge } from "@/components/ui/badge";
import { mockCities } from "@/lib/mockData";
import { City, Interest } from "@/lib/types";
import { useTranslation } from "@/lib/useTranslation";
import { X } from "lucide-react";

const climateOptions = ["tropical", "temperate", "cold"];
const budgetOptions = ["budget", "mid-range", "fine-dining"];
const travelTypeOptions = ["solo", "couple", "family", "group", "adventure"];
const interestOptions: Interest[] = [
  "culture",
  "nightlife",
  "food",
  "nature",
  "history",
  "shopping",
  "relaxation",
  "adventure",
  "art",
  "music",
];

export default function ExplorePage() {
  const { tWithVars } = useTranslation();
  const [filteredCities, setFilteredCities] = useState<City[]>(mockCities);
  const [searchQuery, setSearchQuery] = useState("");

  // Filters
  const [selectedClimate, setSelectedClimate] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedTravelType, setSelectedTravelType] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);

  useEffect(() => {
    applyFilters(null, null, null, []);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      const sorted = [...mockCities].sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      setFilteredCities(sorted);
      return;
    }
    const results = mockCities
      .filter((city) =>
        city.name.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
    setFilteredCities(results);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const applyFilters = (
    climate: string | null,
    _budget: string | null,
    _travelType: string | null,
    _interests: Interest[]
  ) => {
    let filtered = mockCities;

    if (climate) {
      filtered = filtered.filter(
        (city) => city.climate.toLowerCase().includes(climate.toLowerCase())
      );
    }

    // Sort alphabetically by city name
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredCities(filtered);
  };

  const handleClimateChange = (climate: string) => {
    const newClimate = selectedClimate === climate ? null : climate;
    setSelectedClimate(newClimate);
    applyFilters(newClimate, selectedBudget, selectedTravelType, selectedInterests);
  };

  const handleBudgetChange = (budget: string) => {
    const newBudget = selectedBudget === budget ? null : budget;
    setSelectedBudget(newBudget);
    applyFilters(selectedClimate, newBudget, selectedTravelType, selectedInterests);
  };

  const handleTravelTypeChange = (type: string) => {
    const newType = selectedTravelType === type ? null : type;
    setSelectedTravelType(newType);
    applyFilters(selectedClimate, selectedBudget, newType, selectedInterests);
  };

  const handleInterestChange = (interest: Interest) => {
    const newInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter((i) => i !== interest)
      : [...selectedInterests, interest];
    setSelectedInterests(newInterests);
    applyFilters(selectedClimate, selectedBudget, selectedTravelType, newInterests);
  };

  const clearFilters = () => {
    setSelectedClimate(null);
    setSelectedBudget(null);
    setSelectedTravelType(null);
    setSelectedInterests([]);
    setFilteredCities(mockCities);
  };

  const hasActiveFilters =
    selectedClimate || selectedBudget || selectedTravelType || selectedInterests.length > 0;

  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Hero Section with Search */}
        <div className="relative h-80 sm:h-96 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
            <div className="max-w-2xl w-full">
              <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">
                {tWithVars("home.title")}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 text-center mb-8">
                {tWithVars("home.subtitle")}
              </p>
              <div className="flex justify-center">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Filter Drawer */}
          <FilterDrawer
            selectedClimate={selectedClimate}
            selectedBudget={selectedBudget}
            selectedTravelType={selectedTravelType}
            selectedInterests={selectedInterests}
            onClimateChange={handleClimateChange}
            onBudgetChange={handleBudgetChange}
            onTravelTypeChange={handleTravelTypeChange}
            onInterestChange={handleInterestChange}
            onClearFilters={clearFilters}
            climateOptions={climateOptions}
            budgetOptions={budgetOptions}
            travelTypeOptions={travelTypeOptions}
            interestOptions={interestOptions}
          />

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mb-8 p-4 sm:p-5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50 shadow-sm">
              <p className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-200 mb-3 uppercase tracking-wide">
                {tWithVars("filters.activeFilters")}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {selectedClimate && (
                  <Badge
                    variant="default"
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm cursor-default"
                  >
                    {tWithVars(`filters.climateOptions.${selectedClimate}`)}
                    <X
                      size={16}
                      className="cursor-pointer hover:opacity-70 transition-opacity ml-0.5"
                      onClick={() => setSelectedClimate(null)}
                    />
                  </Badge>
                )}
                {selectedBudget && (
                  <Badge
                    variant="default"
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm cursor-default"
                  >
                    Budget: {selectedBudget}
                    <X
                      size={16}
                      className="cursor-pointer hover:opacity-70 transition-opacity ml-0.5"
                      onClick={() => setSelectedBudget(null)}
                    />
                  </Badge>
                )}
                {selectedTravelType && (
                  <Badge
                    variant="default"
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm cursor-default"
                  >
                    {tWithVars(`filters.travelTypeOptions.${selectedTravelType}`)}
                    <X
                      size={16}
                      className="cursor-pointer hover:opacity-70 transition-opacity ml-0.5"
                      onClick={() => setSelectedTravelType(null)}
                    />
                  </Badge>
                )}
                {selectedInterests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="default"
                    className="flex items-center gap-2 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm capitalize cursor-default"
                  >
                    {tWithVars(`filters.interestOptions.${interest}`)}
                    <X
                      size={16}
                      className="cursor-pointer hover:opacity-70 transition-opacity ml-0.5"
                      onClick={() =>
                        setSelectedInterests(
                          selectedInterests.filter((i) => i !== interest)
                        )
                      }
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Results Section */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">{tWithVars("home.featured")}</h2>
            <p className="text-base text-muted-foreground font-medium">
              {tWithVars("home.destinationsFound", { count: filteredCities.length })}
            </p>
          </div>

          {filteredCities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCities.map((city) => (
                <DestinationCard key={city.id} city={city} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <p className="text-muted-foreground text-lg sm:text-xl">
                {tWithVars("home.destinationsNotFound")}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
