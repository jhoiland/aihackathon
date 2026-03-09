"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, X } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";
import { Interest } from "@/lib/types";

interface FilterDrawerProps {
  selectedClimate: string | null;
  selectedBudget: string | null;
  selectedTravelType: string | null;
  selectedInterests: Interest[];
  onClimateChange: (climate: string) => void;
  onBudgetChange: (budget: string) => void;
  onTravelTypeChange: (type: string) => void;
  onInterestChange: (interest: Interest) => void;
  onClearFilters: () => void;
  climateOptions: string[];
  budgetOptions: string[];
  travelTypeOptions: string[];
  interestOptions: Interest[];
}

export function FilterDrawer({
  selectedClimate,
  selectedBudget,
  selectedTravelType,
  selectedInterests,
  onClimateChange,
  onBudgetChange,
  onTravelTypeChange,
  onInterestChange,
  onClearFilters,
  climateOptions,
  budgetOptions,
  travelTypeOptions,
  interestOptions,
}: FilterDrawerProps) {
  const { tWithVars } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount =
    (selectedClimate ? 1 : 0) +
    (selectedBudget ? 1 : 0) +
    (selectedTravelType ? 1 : 0) +
    selectedInterests.length;

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="bg-card border border-border rounded-xl mb-8 shadow-sm hover:shadow-md transition-shadow">
      {/* Header with toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 hover:bg-muted/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-base sm:text-lg text-foreground">
            {tWithVars("common.filter")}
          </span>
          {hasActiveFilters && (
            <Badge variant="default" className="rounded-full text-xs font-bold">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        <ChevronDown
          size={22}
          className={`transition-transform duration-200 text-muted-foreground ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expandable filter content */}
      {isOpen && (
        <div className="border-t border-border/60 px-5 sm:px-6 py-6 sm:py-8 space-y-7 animate-in fade-in duration-200">
          {/* Climate Filter */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {tWithVars("filters.climate")}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {climateOptions.map((option) => (
                <Button
                  key={option}
                  variant={selectedClimate === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => onClimateChange(option)}
                  className="capitalize text-xs sm:text-sm"
                >
                  {tWithVars(`filters.climateOptions.${option}`)}
                </Button>
              ))}
            </div>
          </div>

          {/* Budget Filter */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {tWithVars("filters.budget")}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {budgetOptions.map((option) => (
                <Button
                  key={option}
                  variant={selectedBudget === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => onBudgetChange(option)}
                  className="capitalize text-xs sm:text-sm"
                >
                  {tWithVars(`filters.budgetOptions.${option}`)}
                </Button>
              ))}
            </div>
          </div>

          {/* Travel Type Filter */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {tWithVars("filters.travelType")}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {travelTypeOptions.map((option) => (
                <Button
                  key={option}
                  variant={selectedTravelType === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTravelTypeChange(option)}
                  className="capitalize text-xs sm:text-sm"
                >
                  {tWithVars(`filters.travelTypeOptions.${option}`)}
                </Button>
              ))}
            </div>
          </div>

          {/* Interests Filter */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {tWithVars("filters.interests")}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {interestOptions.map((option) => (
                <Badge
                  key={option}
                  variant={
                    selectedInterests.includes(option) ? "default" : "outline"
                  }
                  className="cursor-pointer capitalize text-xs sm:text-sm px-2.5 py-1.5 font-medium hover:bg-primary/90 transition-colors"
                  onClick={() => onInterestChange(option)}
                >
                  {tWithVars(`filters.interestOptions.${option}`)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs sm:text-sm font-medium w-full justify-center"
              >
                <X className="w-4 h-4 mr-1.5" />
                {tWithVars("common.clearAll")}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
