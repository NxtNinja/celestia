"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import { Satellite, SatelliteResponse } from "@/lib/types";
import "leaflet/dist/leaflet.css";

// Dynamically import all Leaflet-related components with no SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function LiveMapClientOnly() {
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [position, setPosition] = useState<[number, number]>([
    20.5937, 78.9629,
  ]); // default India center
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);
  const [satelliteIcon, setSatelliteIcon] = useState<any>(null);
  const [userIcon, setUserIcon] = useState<any>(null);

  useEffect(() => {
    // Import Leaflet only on client side
    const initializeLeaflet = async () => {
      const leaflet = await import("leaflet");

      const satelliteIconInstance = new leaflet.Icon({
        iconUrl: "/satellite-icon.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const userIconInstance = new leaflet.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      setL(leaflet);
      setSatelliteIcon(satelliteIconInstance);
      setUserIcon(userIconInstance);
      setIsClient(true);
    };

    initializeLeaflet();
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          setUserPosition([latitude, longitude]);
          fetchSatellites(latitude, longitude);
        },
        (err) => {
          setLocationError("Location access denied or unavailable");
          fetchSatellites(20.5937, 78.9629); // fallback to India if denied
        }
      );
    } else {
      setLocationError("Geolocation not supported by this browser");
      fetchSatellites(20.5937, 78.9629); // fallback if unsupported
    }
  }, [isClient]);

  const fetchSatellites = async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/satellites?lat=${lat}&lng=${lng}`);
      const data: SatelliteResponse = await res.json();
      setSatellites(data.above);
      setLastUpdate(new Date());
    } catch (error) {
      // console.error("Failed to fetch satellite data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    const [lat, lng] = userPosition || position;
    fetchSatellites(lat, lng);
  };

  // Show loading state until client-side is ready
  if (!isClient || !L || !satelliteIcon || !userIcon) {
    return (
      <main className="min-h-screen bg-gray-950 text-white max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading map...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white max-w-7xl mx-auto p-6">
      <div className="flex md:flex-row flex-col justify-between md:items-center mb-4 gap-3">
        <h2 className="text-3xl font-bold">Live Satellite Map</h2>
        <div className="flex md:flex-row flex-col justify-start md:items-center gap-4">
          <div className="text-sm text-gray-400">
            {locationError ? (
              <span className="text-red-400">⚠️ {locationError}</span>
            ) : userPosition ? (
              <div className="md:text-right">
                <div className="text-green-400">
                  📍 Location: {userPosition[0].toFixed(4)},{" "}
                  {userPosition[1].toFixed(4)}
                </div>
                {lastUpdate && (
                  <div className="text-xs text-gray-500">
                    Updated: {lastUpdate.toLocaleTimeString()}
                  </div>
                )}
              </div>
            ) : (
              <span>📡 Getting your location...</span>
            )}
          </div>

          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              isLoading
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            }`}
          >
            <svg
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
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
            {isLoading ? "Updating..." : "Refresh"}
          </Button>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-300">
        <span className="inline-flex items-center mr-4">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          Your Location
        </span>
        <span className="inline-flex items-center mr-4">
          <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
          Satellites ({satellites.length})
        </span>
        <span className="inline-flex items-center text-xs text-gray-500">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9z" />
          </svg>
          Manual Updates Only
        </span>
      </div>

      <MapContainer
        center={userPosition || position}
        zoom={userPosition ? 5 : 3}
        style={{ height: "70vh", borderRadius: "1rem" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* User's current position */}
        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <strong>📍 Your Location</strong>
                <br />
                <small>Lat: {userPosition[0].toFixed(6)}</small>
                <br />
                <small>Lng: {userPosition[1].toFixed(6)}</small>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Satellites */}
        {satellites.map((sat: Satellite) => (
          <Marker
            key={sat.satid}
            position={[sat.satlat, sat.satlng]}
            icon={satelliteIcon}
          >
            <Popup>
              <div className="text-center">
                <strong>🛰️ {sat.satname}</strong>
                <br />
                <small>ID: {sat.satid}</small>
                <br />
                <small>Lat: {sat.satlat.toFixed(6)}</small>
                <br />
                <small>Lng: {sat.satlng.toFixed(6)}</small>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </main>
  );
}
