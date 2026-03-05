import { AgeGroup, City, Interest, Place, UserPrefs } from "./types";

const AGE_WEIGHTS: Record<AgeGroup, Partial<Record<Interest, number>>> = {
  "18-24": { natteliv: 1.4, mat: 1.1, kultur: 1.0, shopping: 1.0, natur: 0.9 },
  "25-34": { mat: 1.35, kultur: 1.15, natteliv: 1.1, natur: 1.0, shopping: 1.0 },
  "35-49": { mat: 1.3, kultur: 1.2, natur: 1.1, shopping: 1.0, natteliv: 0.95 },
  "50-64": { kultur: 1.3, mat: 1.25, natur: 1.15, shopping: 1.0, natteliv: 0.85 },
  "65+": { kultur: 1.35, mat: 1.2, natur: 1.1, shopping: 1.0, natteliv: 0.75 },
};

function interestScore(tags: Interest[], prefs: UserPrefs): number {
  if (tags.length === 0) return 0;
  const userInterests = new Set(prefs.interests);
  let score = 0;

  for (const t of tags) {
    const base = userInterests.has(t) ? 1.0 : 0.15;
    score += base;
  }

  if (prefs.ageGroup) {
    const w = AGE_WEIGHTS[prefs.ageGroup] ?? {};
    for (const t of tags) {
      score += (w[t] ?? 1.0) - 1.0;
    }
  }

  return score / tags.length;
}

export function rankCities(cities: City[], prefs: UserPrefs) {
  return [...cities]
    .map((c) => ({ city: c, score: interestScore(c.interests, prefs) }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.city);
}

export function rankPlaces(places: Place[], prefs: UserPrefs) {
  return [...places]
    .map((p) => ({ place: p, score: interestScore(p.tags, prefs) }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.place);
}
