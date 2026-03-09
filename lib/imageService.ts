/**
 * Image Service
 * Handles fetching images from multiple sources with intelligent fallback chain:
 * 1. Pexels (city heroes, mood images, general travel photos)
 * 2. Wikimedia Commons (landmarks, attractions, historic sites)
 * 3. Google Places Photos (restaurants, hotels - requires place_id)
 * 4. Pixabay (final fallback)
 */

export interface ImageFetchOptions {
  query: string;
  category?: "city" | "attraction" | "restaurant" | "hotel" | "activity";
  width?: number;
  height?: number;
  fallbackUrl?: string;
}

export interface ImageResult {
  url: string;
  source: "pexels" | "wikimedia" | "google-places" | "pixabay" | "fallback";
  credit?: string;
  alt?: string;
}

/**
 * Fetch from Pexels API
 * Best for: city hero images, general travel mood images
 */
async function fetchFromPexels(
  query: string,
  width: number = 800,
  height: number = 600
): Promise<ImageResult | null> {
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: { Authorization: apiKey },
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!response.ok) return null;

    const data = (await response.json()) as {
      photos?: Array<{
        src: { large: string };
        photographer: string;
        alt: string;
      }>;
    };
    const photo = data.photos?.[0];

    if (photo) {
      return {
        url: photo.src.large,
        source: "pexels",
        credit: photo.photographer,
        alt: photo.alt,
      };
    }
  } catch (error) {
    console.error("Pexels API error:", error);
  }

  return null;
}

/**
 * Fetch from Wikimedia Commons API
 * Best for: landmarks, attractions, historic monuments, museums
 */
async function fetchFromWikimedia(
  query: string,
  width: number = 800,
  height: number = 600
): Promise<ImageResult | null> {
  try {
    const response = await fetch(
      `https://commons.wikimedia.org/w/api.php?action=query&list=allimages&aisort=timestamp&aidir=descending&ailimit=5&aifrom=${encodeURIComponent(query)}&format=json`,
      {
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok) return null;

    const data = (await response.json()) as {
      query?: {
        allimages?: Array<{
          name: string;
          url: string;
          user: string;
        }>;
      };
    };
    const images = data.query?.allimages;

    if (images && images.length > 0) {
      const image = images[0];
      return {
        url: image.url,
        source: "wikimedia",
        credit: image.user,
        alt: image.name,
      };
    }
  } catch (error) {
    console.error("Wikimedia API error:", error);
  }

  return null;
}

/**
 * Fetch from Pixabay API
 * Used as fallback for any image type
 */
async function fetchFromPixabay(
  query: string,
  width: number = 800,
  height: number = 600
): Promise<ImageResult | null> {
  const apiKey = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=1&safesearch=true`,
      {
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok) return null;

    const data = (await response.json()) as {
      hits?: Array<{
        largeImageURL: string;
        user: string;
        pageURL: string;
      }>;
    };
    const image = data.hits?.[0];

    if (image) {
      return {
        url: image.largeImageURL,
        source: "pixabay",
        credit: image.user,
        alt: query,
      };
    }
  } catch (error) {
    console.error("Pixabay API error:", error);
  }

  return null;
}

/**
 * Main image fetching function with intelligent fallback chain
 */
export async function fetchImage(options: ImageFetchOptions): Promise<ImageResult> {
  const { query, category, fallbackUrl } = options;

  // Determine which sources to try based on category
  let sources: Array<() => Promise<ImageResult | null>> = [];

  if (category === "city") {
    // For cities: Pexels first, then Wikimedia for landmark cities, then Pixabay
    sources = [
      () => fetchFromPexels(`${query} destination travel`),
      () => fetchFromWikimedia(query),
      () => fetchFromPixabay(query),
    ];
  } else if (category === "attraction") {
    // For attractions: Wikimedia first (good for landmarks), then Pexels, then Pixabay
    sources = [
      () => fetchFromWikimedia(query),
      () => fetchFromPexels(`${query} landmark`),
      () => fetchFromPixabay(query),
    ];
  } else if (category === "restaurant") {
    // For restaurants: Pexels for food images, then Pixabay
    sources = [
      () => fetchFromPexels(`${query} restaurant food`),
      () => fetchFromPixabay(`${query} restaurant`),
    ];
  } else if (category === "hotel") {
    // For hotels: Pexels for accommodation, then Pixabay
    sources = [
      () => fetchFromPexels(`${query} hotel accommodation`),
      () => fetchFromPixabay(`${query} hotel`),
    ];
  } else {
    // Default: try all sources in order
    sources = [
      () => fetchFromPexels(query),
      () => fetchFromWikimedia(query),
      () => fetchFromPixabay(query),
    ];
  }

  // Try each source in order until one succeeds
  for (const fetchFn of sources) {
    const result = await fetchFn();
    if (result) {
      return result;
    }
  }

  // If no source returns an image, use fallback
  if (fallbackUrl) {
    return {
      url: fallbackUrl,
      source: "fallback",
      alt: query,
    };
  }

  // Ultimate fallback - use a generic placeholder
  return {
    url: `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`,
    source: "fallback",
    alt: query,
  };
}

/**
 * Batch fetch images for multiple items
 */
export async function fetchImagesForItems(
  items: Array<{ name: string; description?: string }>,
  category: ImageFetchOptions["category"],
  fallbackUrl?: string
): Promise<ImageResult[]> {
  return Promise.all(
    items.map((item) =>
      fetchImage({
        query: item.name,
        category,
        fallbackUrl,
      })
    )
  );
}

/**
 * Generate image search query with context
 */
export function generateImageQuery(
  name: string,
  context?: string,
  location?: string
): string {
  const parts = [name];
  if (context) parts.push(context);
  if (location) parts.push(location);
  return parts.join(" ");
}
