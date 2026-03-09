"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const { tWithVars } = useTranslation();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-xl"
    >
      <div className="flex-1 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || tWithVars("home.searchPlaceholder")}
          className="w-full px-4 py-3 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
        />
      </div>
      <Button
        type="submit"
        className="flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg"
      >
        <Search size={18} />
        <span className="hidden sm:inline">{tWithVars("common.search")}</span>
      </Button>
    </form>
  );
}
