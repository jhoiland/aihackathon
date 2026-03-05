export type Budget = "rimelig" | "middels" | "premium";
export type Season = "sol" | "vinter" | "var_host";
export type TripType = "romantisk" | "vennetur" | "familie" | "solo";
export type Interest = "mat" | "kultur" | "natur" | "natteliv" | "shopping";
export type AgeGroup = "18-24" | "25-34" | "35-49" | "50-64" | "65+";

export type PlaceCategory =
  | "ting_a_gjore"
  | "attraksjon"
  | "skjult_perle"
  | "restaurant"
  | "tips";

export type PriceLevel = "$" | "$$" | "$$$";

export type Place = {
  id: string;
  name: string;
  category: PlaceCategory;
  tags: Interest[];
  price?: PriceLevel;
  short: string;
  why: string;
};

export type City = {
  slug: string;
  city: string;
  country: string;
  heroImage: string;
  knownFor: string[];
  seasons: Season[];
  budgets: Budget[];
  tripTypes: TripType[];
  interests: Interest[];
  tips: string[];
  places: Place[];
};

export type UserPrefs = {
  ageGroup: AgeGroup | null;
  interests: Interest[];
};
