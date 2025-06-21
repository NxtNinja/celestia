"use client";

import { Button } from "@/components/ui/button";
import { Satellite, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const HomePage = () => {
  const features = [
    {
      icon: Satellite,
      title: "Live Satellite Tracking",
      description:
        "See the real-time position of satellites like ISS, Starlink, and more on a dynamic Mapbox map.",
      link: "/live-map",
      linkLabel: "Explore Live Map →",
      delay: 0.6,
    },
    {
      icon: CalendarDays,
      title: "Upcoming Pass Predictions",
      description:
        "Find out when satellites will pass over your location and plan your observation sessions easily.",
      link: "/passes",
      linkLabel: "Check Pass Schedule →",
      delay: 0.7,
    },
  ];
  return (
    <>
      <main className="min-h-screen text-white">
        <section className="flex flex-col items-center text-center py-20 px-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6 tracking-wider"
          >
            Track Satellites in Real Time
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-400 text-lg max-w-2xl mb-10"
          >
            Monitor live positions of satellites overhead, predict passes for
            your location, and view real-time orbital data directly from your
            browser.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-500"
              asChild
            >
              <a href="/live-map">View Live Map</a>
            </Button>
            <Button
              variant="default"
              size="lg"
              asChild
              className="bg-white text-black hover:bg-white"
            >
              <a href="/passes">Upcoming Passes</a>
            </Button>
          </motion.div>
        </section>

        {/* Feature Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: feature.delay }}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
            >
              <feature.icon className="w-12 h-12 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <a
                href={feature.link}
                className="text-indigo-400 hover:underline"
              >
                {feature.linkLabel}
              </a>
            </motion.div>
          ))}
        </section>
      </main>
    </>
  );
};

export default HomePage;
