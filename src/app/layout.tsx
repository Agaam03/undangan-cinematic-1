import React from "react";
import type { Metadata } from "next";
import { WEDDING_DATA } from "../data";

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
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      white: '#F9F8F6', 
                      black: '#000000', 
                      stone: {
                        50: '#F9F8F6',
                        100: '#EFE9E3',
                        200: '#D9CFC7',
                        300: '#D9CFC7', 
                        400: '#C9B59C',
                        500: '#C9B59C', 
                        600: '#C9B59C', 
                        700: '#C9B59C', 
                        800: '#C1856D', 
                        900: '#000000',
                        950: '#000000',
                      },
                    },
                    fontFamily: {
                      serif: ['"Cormorant Garamond"', 'serif'],
                      sans: ['"Lato"', 'sans-serif'],
                    },
                    backgroundImage: {
                      'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
                    }
                  },
                },
              }
            `,
          }}
        />
        <style>{`
 
          .vertical-text {
            writing-mode: vertical-lr;
            text-orientation: mixed;
            transform: rotate(180deg);
          }
          .fade-in {
            animation: fadeIn 1.5s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          /* Hide Scrollbar for Chrome, Safari and Opera */
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .scrollbar-hide {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
          }
        `}</style>
      </head>
      <body className="bg-black">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
