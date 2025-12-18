"use client";

import React, { useEffect, useRef } from "react";
import { Instagram } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { WEDDING_DATA } from "../data";

const Couple: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { groom, bride } = WEDDING_DATA.couple;

  // Detect desktop view (min-width: 768px)
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance Animations - Always keep these for better entry feel
      // but only trigger if visible.
      gsap.from(".groom-card", {
        scrollTrigger: {
          trigger: ".groom-card",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".bride-card", {
        scrollTrigger: {
          trigger: ".bride-card",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
      });

      // CONDITIONAL PARALLAX: Only run if isDesktop is true
      if (isDesktop) {
        gsap.utils.toArray(".parallax-img-wrapper").forEach((wrapper: any) => {
          const img = wrapper.querySelector("img");
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.15, yPercent: -10 },
              {
                scale: 1.15,
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                  trigger: wrapper,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }
        });
      } else {
        // If mobile, ensure images are properly scaled and centered without movement
        gsap.set(".parallax-img-wrapper img", {
          scale: 1,
          yPercent: 0,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop]); // Re-run effect when screen size switches between mobile and desktop

  return (
    <section
      ref={containerRef}
      id="couple"
      className="relative py-24 px-6 md:px-12 bg-stone-100 backdrop-blur-sm overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 justify-center items-center md:items-start">
        {/* The Groom */}
        <div className="groom-card flex-1 max-w-md w-full group">
          <div className="parallax-img-wrapper relative overflow-hidden aspect-[3/4] shadow-xl border border-stone-200">
            <div className="w-full h-full overflow-hidden">
              <img
                src={groom.photoUrl}
                alt={groom.role}
                className="object-cover w-full h-full will-change-transform opacity-95 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
          <div className="mt-8 text-center flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-serif mb-2 text-stone-900 font-medium">
              {groom.name}
            </h3>
            <p className="text-sm text-stone-800 uppercase tracking-[0.2em] font-bold mb-4">
              {groom.role}
            </p>

            <a
              href={groom.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span className="font-sans text-xs font-bold uppercase tracking-widest">
                {groom.handle}
              </span>
            </a>
          </div>
        </div>

        {/* The Bride */}
        <div className="bride-card flex-1 max-w-md w-full group mt-12 md:mt-0">
          <div className="parallax-img-wrapper relative overflow-hidden aspect-[3/4] shadow-xl border border-stone-200">
            <div className="w-full h-full overflow-hidden">
              <img
                src={bride.photoUrl}
                alt={bride.role}
                className="object-cover w-full h-full will-change-transform opacity-95 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
          <div className="mt-8 text-center flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-serif mb-2 text-stone-900 font-medium">
              {bride.name}
            </h3>
            <p className="text-sm text-stone-800 uppercase tracking-[0.2em] font-bold mb-4">
              {bride.role}
            </p>

            <a
              href={bride.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span className="font-sans text-xs font-bold uppercase tracking-widest">
                {bride.handle}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Couple;
