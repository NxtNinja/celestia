import LiveMapClientOnly from "@/components/LiveMapClientOnly";
import { Metadata } from "next";
import Script from "next/script";

export const generateMetadata = (): Metadata => {
  return {
    title: "Celvo | Live Satellite Map",
    description:
      "View real-time satellite positions above Earth with Celvo's interactive live map. Track satellites by location.",
    openGraph: {
      title: "Celvo | Live Satellite Map",
      description:
        "View real-time satellite positions above Earth with Celvo's interactive live map. Track satellites by location.",
      url: "https://celvo.netlify.app/live-map",
      siteName: "Celvo",
      images: [
        {
          url: "https://celvo.netlify.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Celvo Live Satellite Map Preview",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Celvo | Live Satellite Map",
      description:
        "Track real-time satellite positions with Celvo's interactive live map.",
      images: ["https://celvo.netlify.app/twitter-card.png"],
      site: "@CelvoApp",
      creator: "@CelvoApp",
    },
    alternates: {
      canonical: "https://celvo.netlify.app/live-map",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};

export default function LiveMap() {
  return (
    <>
      <LiveMapClientOnly />
      <Script
        id="jsonld-live-map"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Celvo | Live Satellite Map",
            url: "https://celvo.netlify.app/live-map",
            description:
              "View real-time satellite positions above Earth with Celvo's interactive live map. Track satellites by location.",
            publisher: {
              "@type": "Organization",
              name: "Celvo",
              logo: {
                "@type": "ImageObject",
                url: "https://celvo.netlify.app/og-image.png",
              },
            },
          }),
        }}
      />
    </>
  );
}
