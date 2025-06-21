import PassesPage from "@/components/PassesPage";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Satellite Passes | Celvo",
  description:
    "Track upcoming visible satellite passes over your location in real-time. Discover ISS flyovers, weather satellites, and more with Celvo.",
  alternates: {
    canonical: "https://celvo.netlify.app/passes",
  },
  openGraph: {
    title: "Satellite Passes | Celvo",
    description:
      "See upcoming visible passes of the ISS and popular satellites from your location. Real-time space tracking with Celvo.",
    url: "https://celvo.netlify.app/passes",
    type: "website",
    images: [
      {
        url: "https://celvo.netlify.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Celvo Satellite Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satellite Passes | Celvo",
    description:
      "Track ISS and popular satellite flyovers from your location in real-time with Celvo.",
    images: ["https://celvo.netlify.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
});

export default function Passes() {
  return <PassesPage />;
}
