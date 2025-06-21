"use client";

import { PassesResponse, PassInfo } from "@/lib/types";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

// Import the satellites list
const SATELLITES: Record<number, { name: string; category: string }> = {
  25544: {
    name: "International Space Station (ISS)",
    category: "Space Station",
  },
  20580: { name: "Hubble Space Telescope", category: "Observatory" },
  27424: { name: "Sentinel-1A", category: "Earth Observation" },
  40934: { name: "NOAA-20", category: "Weather" },
  43013: { name: "Starlink-1007", category: "Communications" },
  25994: { name: "Terra", category: "Earth Observation" },
  27386: { name: "Aqua", category: "Earth Observation" },
  37849: { name: "Suomi NPP", category: "Weather" },
  41866: { name: "GOES-16", category: "Weather" },
  43070: { name: "GOES-17", category: "Weather" },
};

type SatelliteInfo = {
  name: string;
  category: string;
};

export default function PassesPage() {
  const [passes, setPasses] = useState<PassInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedSatellite, setSelectedSatellite] = useState<number>(25544);
  const [satelliteInfo, setSatelliteInfo] = useState<SatelliteInfo | null>(
    null
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPasses = async (lat: number, lng: number, satId: number) => {
    try {
      const res = await fetch(
        `/api/passes?lat=${lat}&lng=${lng}&satId=${satId}`
      );
      if (!res.ok) throw new Error("Failed to fetch passes");
      const data: PassesResponse = await res.json();
      setPasses(data.passes || []);
      setSatelliteInfo(data.satelliteInfo || null);
      setError(null);
    } catch (err) {
      setError("Failed to load satellite passes");
      setPasses([]);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          await fetchPasses(latitude, longitude, selectedSatellite);
          setLoading(false);
        },
        () => {
          setError("Location access denied. Please enable location services.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported by this browser");
      setLoading(false);
    }
  }, []);

  const handleSatelliteChange = async (satId: number) => {
    if (!userLocation) return;
    setSelectedSatellite(satId);
    setIsRefreshing(true);
    await fetchPasses(userLocation.lat, userLocation.lng, satId);
    setIsRefreshing(false);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getVisibilityQuality = (maxEl: number, mag: number) => {
    if (maxEl >= 50 && mag <= 2)
      return { quality: "Excellent", color: "text-green-400" };
    if (maxEl >= 30 && mag <= 3)
      return { quality: "Good", color: "text-blue-400" };
    if (maxEl >= 20) return { quality: "Fair", color: "text-yellow-400" };
    return { quality: "Poor", color: "text-gray-400" };
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Space Station": "from-blue-500 to-cyan-500",
      Observatory: "from-purple-500 to-pink-500",
      "Earth Observation": "from-green-500 to-emerald-500",
      Weather: "from-orange-500 to-red-500",
      Communications: "from-indigo-500 to-blue-500",
    };
    return (
      colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
    );
  };

  const getDirectionIcon = (compass: string) => {
    const icons = {
      N: "↑",
      NE: "↗",
      E: "→",
      SE: "↘",
      S: "↓",
      SW: "↙",
      W: "←",
      NW: "↖",
    };
    return icons[compass as keyof typeof icons] || compass;
  };

  if (loading) {
    return (
      <div className="min-h-screen  text-white">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center flex justify-center items-center flex-col">
              <div className="relative mb-8">
                <div className="w-16 h-16 border-4 border-blue-500/30 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Tracking Satellite Passes
              </h2>
              <p className="text-gray-400">
                Getting your location and calculating passes...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  text-white">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-red-400">
                Unable to Load Passes
              </h2>
              <p className="text-gray-400">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${
                satelliteInfo
                  ? getCategoryColor(satelliteInfo.category)
                  : "from-blue-500 to-purple-600"
              } rounded-xl flex items-center justify-center`}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Satellite Passes
              </h1>
              <p className="text-gray-400 text-lg">
                {satelliteInfo
                  ? `${satelliteInfo.name} flyovers`
                  : "Upcoming satellite flyovers"}
              </p>
            </div>
          </div>

          {/* Satellite Selector */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <label className="text-sm font-medium text-gray-300">
                  Select Satellite:
                </label>
              </div>

              <div className="flex-1 max-w-md">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-700/70"
                      disabled={isRefreshing}
                    >
                      {SATELLITES[selectedSatellite]?.name} (
                      {SATELLITES[selectedSatellite]?.category})
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full bg-gray-800 border-gray-700 text-white">
                    {Object.entries(SATELLITES).map(([id, sat]) => (
                      <DropdownMenuItem
                        key={id}
                        onClick={() => handleSatelliteChange(Number(id))}
                        className="hover:bg-gray-700 cursor-pointer"
                      >
                        {sat.name} ({sat.category})
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {isRefreshing && (
                <div className="flex items-center gap-2 text-sm text-blue-400">
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Updating...
                </div>
              )}
            </div>
          </div>

          {userLocation && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  Location: {userLocation.lat.toFixed(4)},{" "}
                  {userLocation.lng.toFixed(4)}
                </span>
                <span className="text-gray-500">•</span>
                <span>{passes.length} passes found</span>
                {satelliteInfo && (
                  <>
                    <span className="text-gray-500">•</span>
                    <span className="text-blue-400">
                      {satelliteInfo.category}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Passes Grid */}
        {passes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.824-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0117.5 15.5V14a2 2 0 00-2-2h-1m-4 8v-4.5a2.5 2.5 0 00-2.5-2.5H6a2 2 0 00-2 2v4.5a1 1 0 001 1h8a1 1 0 001-1z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No Passes Found
            </h3>
            <p className="text-gray-500">
              There are no visible passes for{" "}
              {satelliteInfo?.name || "this satellite"} from your location in
              the coming days. Try selecting a different satellite from the
              dropdown above.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {passes.map((pass, idx) => {
              const { date, time } = formatDate(pass.startUTC);
              const visibility = getVisibilityQuality(pass.maxEl, pass.mag);
              const maxTime = formatDate(pass.maxUTC);

              return (
                <div
                  key={idx}
                  className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${
                          satelliteInfo
                            ? getCategoryColor(satelliteInfo.category)
                            : "from-blue-500 to-cyan-500"
                        } rounded-lg flex items-center justify-center`}
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {pass.satname ||
                            satelliteInfo?.name ||
                            "Unknown Satellite"}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium ${visibility.color}`}
                          >
                            {visibility.quality} Visibility
                          </span>
                          {satelliteInfo?.category && (
                            <>
                              <span className="text-gray-500">•</span>
                              <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                                {satelliteInfo.category}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div>Pass #{idx + 1}</div>
                      {pass.satname && pass.satname !== satelliteInfo?.name && (
                        <div className="text-xs text-blue-400 mt-1">
                          ID: {pass.satname}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Start Time */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Starts</p>
                        <p className="font-medium">{date}</p>
                        <p className="text-lg font-bold text-green-400">
                          {time}
                        </p>
                      </div>
                    </div>

                    {/* Peak Time */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3l14 9-14 9V3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Peak at</p>
                        <p className="text-lg font-bold text-yellow-400">
                          {maxTime.time}
                        </p>
                      </div>
                    </div>

                    {/* Path Information */}
                    <div className="bg-gray-700/30 rounded-lg p-3 space-y-2">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Satellite Path
                      </h4>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="text-green-400 font-bold text-lg">
                            {getDirectionIcon(pass.startAzCompass)}
                          </div>
                          <div className="text-gray-400">Start</div>
                          <div className="text-green-400 font-medium">
                            {pass.startAzCompass}
                          </div>
                          <div className="text-gray-300">
                            {pass.startEl.toFixed(1)}°
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-yellow-400 font-bold text-lg">
                            {getDirectionIcon(pass.maxAzCompass)}
                          </div>
                          <div className="text-gray-400">Peak</div>
                          <div className="text-yellow-400 font-medium">
                            {pass.maxAzCompass}
                          </div>
                          <div className="text-yellow-400 font-bold">
                            {pass.maxEl.toFixed(1)}°
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-red-400 font-bold text-lg">
                            {getDirectionIcon(pass.endAzCompass)}
                          </div>
                          <div className="text-gray-400">End</div>
                          <div className="text-red-400 font-medium">
                            {pass.endAzCompass}
                          </div>
                          <div className="text-gray-300">
                            {pass.endEl.toFixed(1)}°
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Duration and Magnitude */}
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-700/50">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-400">
                          {formatDuration(pass.duration)}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">
                          Duration
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-400">
                          {pass.mag}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">
                          Magnitude
                        </div>
                      </div>
                    </div>

                    {/* Visibility Status */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">
                          {pass.startVisibility
                            ? `Visible from ${
                                formatDate(pass.startVisibility).time
                              }`
                            : "Visible throughout pass"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Enhanced Info Footer */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">
                How to Use This Information
              </h4>
              <div className="text-gray-300 text-sm leading-relaxed space-y-2">
                <p>
                  <strong>Directions:</strong> Look towards the compass
                  direction shown (N=North, E=East, etc.). The satellite will
                  travel from Start → Peak → End positions.
                </p>
                <p>
                  <strong>Elevation:</strong> Higher angles mean the satellite
                  passes more directly overhead. 90° would be straight up
                  (zenith).
                </p>
                <p>
                  <strong>Magnitude:</strong> Lower numbers mean brighter
                  objects. Negative values are very bright, similar to bright
                  stars or planets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
