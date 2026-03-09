"use client";

import { useTranslation } from "@/lib/useTranslation";
import { Globe } from "lucide-react";
import { useState } from "react";

export function LanguageSwitcher() {
  const { locale, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en" as const, name: "English" },
    { code: "no" as const, name: "Norsk" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
        aria-label="Change language"
      >
        <Globe size={18} />
        <span className="uppercase text-xs font-bold">{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                locale === lang.code
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
