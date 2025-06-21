const About = () => {
  return (
    <div className="min-h-screen text-white">
      <div className="max-w-5xl mx-auto p-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Celvo Satellite Tracker
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Explore the skies, track satellites in real-time, and witness ISS
            flyovers wherever you are.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              Why this project?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              The sky is full of fascinating objects orbiting above us — from
              the International Space Station to weather and communication
              satellites. This app was built to make satellite tracking simple,
              beautiful, and accessible to everyone. It uses real-time orbital
              data and the{" "}
              <a
                href="https://www.n2yo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                N2YO API
              </a>{" "}
              to fetch pass predictions and telemetry.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              Tech Stack
            </h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>Next.js 14 (App Router)</li>
              <li>TypeScript for type-safe APIs and components</li>
              <li>Tailwind CSS + shadcn/ui for sleek UI components</li>
              <li>Leaflet.js for interactive map</li>
              <li>N2YO API for real-time satellite pass and TLE data</li>
              <li>Client-side Geolocation API for location detection</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            Credits & Acknowledgments
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Special thanks to{" "}
            <a
              href="https://www.n2yo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              N2YO.com
            </a>{" "}
            for providing accessible, public satellite tracking APIs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
