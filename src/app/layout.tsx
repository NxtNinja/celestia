import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cabin = Cabin({ subsets: ["latin"], weight: "400" });
export const metadata: Metadata = {
  title: "Celestia",
  description: "Track satellites in real time | Celestia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cabin.className} antialiased bg-gray-950`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
