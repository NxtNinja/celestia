import { Cabin } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cabin = Cabin({ subsets: ["latin"], weight: "400" });

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
