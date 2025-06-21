import { SatelliteResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.N2YO_API_KEY;

  const lat = req.nextUrl.searchParams.get("lat") || "20.5937";
  const lng = req.nextUrl.searchParams.get("lng") || "78.9629";
  const observerAlt = 0;
  const searchRadius = 70;
  const categoryId = 0;

  const url = `https://api.n2yo.com/rest/v1/satellite/above/${lat}/${lng}/${observerAlt}/${searchRadius}/${categoryId}/&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data: SatelliteResponse = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch satellite data" },
      { status: 500 }
    );
  }
}
