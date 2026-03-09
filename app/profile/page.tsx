"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Save } from "lucide-react";
import {
  UserPreferences,
  AgeGroup,
  TravelType,
  Interest,
  PriceLevel,
} from "@/lib/types";
import {
  getPreferencesFromStorage,
  savePreferencestoStorage,
  getDefaultPreferences,
} from "@/lib/storage";

const ageGroups: AgeGroup[] = ["18-24", "25-34", "35-49", "50-64", "65+"];
const travelTypes: TravelType[] = ["solo", "couple", "family", "group", "adventure"];
const interests: Interest[] = [
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
const budgetLevels: PriceLevel[] = ["budget", "mid-range", "fine-dining"];
const climateOptions = ["tropical", "temperate", "cold", "any"];
const seasonOptions = ["spring", "summer", "fall", "winter", "any"];

export default function ProfilePage() {
  const [preferences, setPreferences] = useState<UserPreferences>(
    getDefaultPreferences()
  );
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPreferences(getPreferencesFromStorage());
  }, []);

  const handleSave = () => {
    savePreferencestoStorage(preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleInterest = (interest: Interest) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleReset = () => {
    const defaults = getDefaultPreferences();
    setPreferences(defaults);
    savePreferencestoStorage(defaults);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navigation />
      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-8 h-8" />
              <h1 className="text-4xl font-bold">Travel Preferences</h1>
            </div>
            <p className="text-white/90">
              Customize your preferences to get better recommendations
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Success Message */}
          {saved && (
            <Card className="mb-6 bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <p className="text-green-800 font-medium">
                  ✓ Preferences saved successfully
                </p>
              </CardContent>
            </Card>
          )}

          {/* Main Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Preferences</CardTitle>
              <CardDescription>
                Help us personalize your travel recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Age Group */}
              <div className="space-y-3">
                <Label htmlFor="age-group" className="text-base font-semibold">
                  Age Group
                </Label>
                <Select value={preferences.ageGroup} onValueChange={(value) =>
                  setPreferences((prev) => ({
                    ...prev,
                    ageGroup: value as AgeGroup,
                  }))
                }>
                  <SelectTrigger id="age-group">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ageGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Travel Type */}
              <div className="space-y-3">
                <Label htmlFor="travel-type" className="text-base font-semibold">
                  Travel Type
                </Label>
                <Select value={preferences.travelType} onValueChange={(value) =>
                  setPreferences((prev) => ({
                    ...prev,
                    travelType: value as TravelType,
                  }))
                }>
                  <SelectTrigger id="travel-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {travelTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        <span className="capitalize">{type}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Budget Preference */}
              <div className="space-y-3">
                <Label htmlFor="budget" className="text-base font-semibold">
                  Budget Preference
                </Label>
                <Select value={preferences.budgetPreference} onValueChange={(value) =>
                  setPreferences((prev) => ({
                    ...prev,
                    budgetPreference: value as PriceLevel,
                  }))
                }>
                  <SelectTrigger id="budget">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        <span className="capitalize">{level}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preferred Climate */}
              <div className="space-y-3">
                <Label htmlFor="climate" className="text-base font-semibold">
                  Preferred Climate
                </Label>
                <Select value={preferences.preferredClimate} onValueChange={(value) =>
                  setPreferences((prev) => ({
                    ...prev,
                    preferredClimate: value as any,
                  }))
                }>
                  <SelectTrigger id="climate">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {climateOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        <span className="capitalize">{option}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preferred Season */}
              <div className="space-y-3">
                <Label htmlFor="season" className="text-base font-semibold">
                  Preferred Season
                </Label>
                <Select value={preferences.preferredSeason} onValueChange={(value) =>
                  setPreferences((prev) => ({
                    ...prev,
                    preferredSeason: value as any,
                  }))
                }>
                  <SelectTrigger id="season">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {seasonOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        <span className="capitalize">{option}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Interests */}
              <div className="space-y-3 pb-4">
                <Label className="text-base font-semibold">Interests</Label>
                <p className="text-sm text-muted-foreground">
                  Select interests that matter to you
                </p>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant={
                        preferences.interests.includes(interest)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer capitalize text-sm px-3 py-1.5"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleReset}
                >
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-base">How Preferences Help</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-foreground space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary">→</span>
                  Recommendations are personalized based on your age group and interests
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">→</span>
                  Travel tips and activities are filtered to match your travel style
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">→</span>
                  Restaurant suggestions align with your budget preferences
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">→</span>
                  You can update these anytime to discover new experiences
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
