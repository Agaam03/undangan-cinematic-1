"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { WEDDING_DATA } from "../data";

const Intro: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Entrance animations for text - keep simple for mobile, more dynamic for desktop
      gsap.from(".intro-text", {
        scrollTrigger: {
          trigger: ".intro-text-container",
          start: "top 85%",
        },
        y: isDesktop ? 40 : 20,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: isDesktop ? 0.2 : 0, // No stagger on mobile for weight
      });

      // Animate Verse container
      gsap.from(".verse-container", {
        scrollTrigger: {
          trigger: ".verse-container",
          start: "top 90%",
        },
        scale: isDesktop ? 0.98 : 1, // Minimize transformations on mobile
        y: 20,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      className="relative z-10 py-24 px-6 md:px-12 text-center bg-stone-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Introduction */}
        <div className="relative mb-16 text-center intro-text-container">
          <div className="relative mx-auto px-8 py-10">
            {/* Title */}
            <h2 className="intro-text font-serif text-3xl md:text-5xl italic capitalize text-stone-900">
              {WEDDING_DATA.intro.title}
            </h2>

            {/* Decorative Divider */}
            <div className="my-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-stone-300" />
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              <span className="h-px w-12 bg-stone-300" />
            </div>

            {/* Description */}
            <p className="intro-text mx-auto max-w-2xl font-sans text-sm md:text-base leading-relaxed text-stone-800">
              {WEDDING_DATA.intro.description}
            </p>
          </div>
        </div>

        {/* Ayat Suci / Holy Verse */}
        <div
          id="ayat-suci"
          className="verse-container p-4 md:p-10 border border-stone-200 rounded-lg bg-white/70 shadow-sm backdrop-blur-sm"
        >
          <p className="font-serif italic text-2xl md:text-3xl text-stone-900 mb-6 font-medium">
            "{WEDDING_DATA.intro.verseText}"
          </p>
          <p className="text-[10px] md:text-xs font-sans tracking-[0.4em] uppercase text-stone-500 font-bold">
            {WEDDING_DATA.intro.verseReference}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
