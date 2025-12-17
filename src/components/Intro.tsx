"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../data";

const Intro: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Animate Main Title
      gsap.from(".intro-text", {
        scrollTrigger: {
          trigger: ".intro-text",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.2,
      });

      // Animate Verse
      gsap.from(".verse-container", {
        scrollTrigger: {
          trigger: ".verse-container",
          start: "top 85%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Changed bg-stone-100 to bg-stone-50/80 with backdrop blur (Glass effect)
    <section
      ref={containerRef}
      className="relative z-10 py-24 px-6 md:px-12   text-center bg-stone-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Introduction */}
        <div className="relative mb-16 text-center  intro-text-container">
          {/* Card */}
          <div className="relative mx-auto px-8 py-10 ">
            {/* Title */}
            <h2 className="intro-text font-serif text-3xl md:text-5xl italic capitalize  text-stone-900">
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
          className="verse-container p-4 md:p-10 border border-stone-200 rounded-lg bg-white/70 shadow-sm"
        >
          <p className="font-serif italic text-2xl md:text-3xl text-stone-900 mb-6 font-medium ">
            {WEDDING_DATA.intro.verseText}
          </p>
          <p className="text-sm font-sans tracking-widest uppercase text-stone-800 font-bold">
            {WEDDING_DATA.intro.verseReference}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
