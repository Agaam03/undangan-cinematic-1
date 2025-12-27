import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Italianno, Playfair_Display } from "next/font/google";
import { WEDDING_DATA } from "../data";
import "./globals.css";
import SmoothScroll from "@/SmoothScroll";

// Original fonts for Hero section
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
});

// Fancy wedding fonts for other sections
const italianno = Italianno({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: WEDDING_DATA.metadata.title,
  description: WEDDING_DATA.metadata.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable} ${italianno.variable} ${playfair.variable}`}>
      <body>
        <div id="root">
          <SmoothScroll />
          {children}
        </div>
      </body>
    </html>
  );
}
