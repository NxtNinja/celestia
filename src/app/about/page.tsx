import About from "@/components/About";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = (): Metadata => ({
  title: "About | Celvo",
  description:
    "Learn about Celvo — a real-time satellite tracking platform to monitor ISS flyovers and popular satellites from your location.",
  keywords: [
    "Celvo",
    "satellite tracker",
    "ISS tracking",
    "real-time satellite passes",
    "TLE viewer",
    "Next.js space app",
    "N2YO API",
  ],
  openGraph: {
    title: "About | Celvo",
    description:
      "Learn about Celvo — track ISS and popular satellites from your location in real-time.",
    url: "https://celvo.netlify.app/about",
    type: "website",
    images: [
      {
        url: "https://celvo.netlify.app/og-image.png", // replace this if you make one
        width: 1200,
        height: 630,
        alt: "Celvo Satellite Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Celvo",
    description:
      "Learn about Celvo — track ISS and popular satellites from your location in real-time.",
    images: ["https://celvo.netlify.app/og-image.png"],
  },
});

export default function AboutPage() {
  return <About />;
}
