import HomePage from "@/components/HomePage";
import { Metadata } from "next";
import Script from "next/script";

export const generateMetadata = (): Metadata => {
  return {
    title: "Celvo | Real-time Satellite Tracker",
    description:
      "Track live positions of satellites orbiting Earth with Celvo's real-time interactive map.",
    openGraph: {
      title: "Celvo | Real-time Satellite Tracker",
      description:
        "Track live positions of satellites orbiting Earth with Celvo's real-time interactive map.",
      url: "https://celvo.netlify.app/",
      siteName: "Celvo",
      images: [
        {
          url: "https://celvo.netlify.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Celvo Satellite Map Preview",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Celvo | Real-time Satellite Tracker",
      description:
        "Explore an interactive live satellite map powered by Celvo.",
      images: ["https://celvo.netlify.app/twitter-card.png"],
      site: "@CelvoApp",
      creator: "@CelvoApp",
    },
    alternates: {
      canonical: "https://celvo.netlify.app/",
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

export default function Home() {
  return (
    <>
      <HomePage />
      <Script
        id="jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Celvo",
            url: "https://celvo.netlify.app/",
            description:
              "Track live positions of satellites orbiting Earth with Celvo's real-time interactive map.",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://celvo.netlify.app/live-map?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
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
