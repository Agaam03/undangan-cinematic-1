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
    // Added 'relative' and 'z-10' to ensure this section slides OVER the pinned Hero
    <section
      ref={containerRef}
      className="relative z-10 py-24 px-6 md:px-12 bg-stone-100/50 backdrop-blur-sm text-center space-y-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Introduction */}
        <div className="space-y-8 mb-20 intro-text-container">
          <h2 className="intro-text text-2xl md:text-5xl font-serif leading-normal text-stone-900 font-medium whitespace-pre-line">
            {WEDDING_DATA.intro.title}
          </h2>
          <p className="intro-text text-base md:text-lg font-sans text-stone-800 font-medium max-w-2xl mx-auto leading-relaxed">
            {WEDDING_DATA.intro.description}
          </p>
          <div className="w-full flex justify-center pt-4 intro-text">
            <span className="h-px w-32 bg-stone-400 block"></span>
          </div>
        </div>

        {/* Ayat Suci / Holy Verse */}
        <div
          id="ayat-suci"
          className="verse-container p-4 md:p-10 border border-stone-200 rounded-lg bg-white shadow-sm"
        >
          <p className="font-serif italic text-2xl md:text-3xl text-stone-900 mb-6 font-medium leading-relaxed">
            {WEDDING_DATA.intro.verseText}
          </p>
          <p className="text-sm font-sans tracking-widest uppercase text-stone-600 font-bold">
            {WEDDING_DATA.intro.verseReference}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
