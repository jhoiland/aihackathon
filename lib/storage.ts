import { UserPrefs } from "./types";

const KEY_PREFS = "reiseinspirator:prefs:v1";
const KEY_FAVS = "reiseinspirator:favs:v1";

export function loadPrefs(): UserPrefs {
  if (typeof window === "undefined") return { ageGroup: null, interests: [] };
  try {
    const raw = localStorage.getItem(KEY_PREFS);
    if (!raw) return { ageGroup: null, interests: [] };
    const parsed = JSON.parse(raw) as UserPrefs;
    return {
      ageGroup: parsed.ageGroup ?? null,
      interests: Array.isArray(parsed.interests) ? parsed.interests : [],
    };
  } catch {
    return { ageGroup: null, interests: [] };
  }
}

export function savePrefs(prefs: UserPrefs) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_PREFS, JSON.stringify(prefs));
}

export function loadFavs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY_FAVS);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFavs(favs: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_FAVS, JSON.stringify(favs));
}
