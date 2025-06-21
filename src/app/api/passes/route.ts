import { NextRequest, NextResponse } from "next/server";
import { PassesResponse } from "@/lib/types";
import { SATELLITES } from "@/lib/satellites";

export async function GET(req: NextRequest) {
  const apiKey = process.env.N2YO_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const lat = req.nextUrl.searchParams.get("lat") || "20.5937";
  const lng = req.nextUrl.searchParams.get("lng") || "78.9629";
  const satIdParam = req.nextUrl.searchParams.get("satId");

  const satId =
    satIdParam && Object.keys(SATELLITES).includes(satIdParam)
      ? parseInt(satIdParam)
      : 25544; // ISS default

  const observerAlt = 0;
  const days = 10;
  const minElevation = 10;

  const url = `https://api.n2yo.com/rest/v1/satellite/visualpasses/${satId}/${lat}/${lng}/${observerAlt}/${days}/${minElevation}/&apiKey=${apiKey}`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "SatelliteTracker/1.0",
      },
    });

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const data: PassesResponse = await res.json();

    const satelliteInfo = SATELLITES[satId as keyof typeof SATELLITES];

    return NextResponse.json({
      ...data,
      satelliteInfo,
      selectedSatId: satId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch pass data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
