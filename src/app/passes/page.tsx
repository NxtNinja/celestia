import PassesPage from "@/components/PassesPage";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Celvo | Satellite Passes",
  description: "Check upcoming visible satellite passes over your location.",
  alternates: {
    canonical: "https://celvo.netlify.app/passes",
  },
  robots: {
    index: true,
    follow: true,
  },
});

export default function Passes() {
  return <PassesPage />;
}
