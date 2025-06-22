import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-sm  text-gray-500 text-center p-6 border-t border-gray-800 mt-10">
      <p className="">
        © {new Date().getFullYear()} Celvo — Satellite Tracking with N2YO API +
        Leaflet.js
      </p>
      <p className="">
        Made with ❤️ by{" "}
        <Link
          className="text-blue-600"
          href={"https://priyangsubanik.in/"}
          target="_blank"
        >
          Priyangsu Banik
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
