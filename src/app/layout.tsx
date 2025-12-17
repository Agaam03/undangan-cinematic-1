import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import { WEDDING_DATA } from "../data";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif", // Sesuai dengan yang ada di globals.css
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans", // Sesuai dengan yang ada di globals.css
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
    <html lang="en" className={`${cormorant.variable} ${lato.variable}`}>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
