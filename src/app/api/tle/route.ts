import { NextRequest, NextResponse } from "next/server";
import { SATELLITES } from "@/lib/satellites";

export async function GET(req: NextRequest) {
  const apiKey = process.env.N2YO_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key missing" }, { status: 500 });
  }

  const satId = req.nextUrl.searchParams.get("satId") || "25544";

  if (!Object.keys(SATELLITES).includes(satId)) {
    return NextResponse.json(
      { error: "Invalid satellite ID" },
      { status: 400 }
    );
  }

  const url = `https://api.n2yo.com/rest/v1/satellite/tle/${satId}&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("TLE API error");
    const data = await res.json();

    return NextResponse.json({
      line1: data.line1,
      line2: data.line2,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch TLE data" },
      { status: 500 }
    );
  }
}
