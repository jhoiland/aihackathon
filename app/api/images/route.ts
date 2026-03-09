/**
 * Images API Route
 * Handles image fetching requests from the frontend
 * GET /api/images?query=string&category=city|attraction|restaurant|hotel
 */

import { fetchImage, ImageFetchOptions } from "@/lib/imageService";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const category = searchParams.get("category") as ImageFetchOptions["category"] | null;
    const fallbackUrl = searchParams.get("fallback");

    if (!query) {
      return NextResponse.json(
        { error: "Missing query parameter" },
        { status: 400 }
      );
    }

    const result = await fetchImage({
      query,
      category: category || undefined,
      fallbackUrl: fallbackUrl || undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Image fetching error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch image",
        url: `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`,
        source: "fallback",
      },
      { status: 500 }
    );
  }
}
