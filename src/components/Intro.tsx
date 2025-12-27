"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";
import { WEDDING_DATA } from "../data";

const Intro: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Main title animation
      gsap.from(".intro-title", {
        scrollTrigger: { trigger: ".intro-title", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Description animation
      gsap.from(".intro-description", {
        scrollTrigger: { trigger: ".intro-description", start: "top 85%" },
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Verse animation
      gsap.from(".verse-card", {
        scrollTrigger: { trigger: ".verse-card", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-12 px-6 md:px-12 bg-white relative"
    >
      <div className="max-w-4xl mx-auto">
        {/* Decorative Top */}
        <div className="flex items-center justify-center mb-12">
          <span className="h-px w-20 bg-stone-300" />
          <div className="mx-6 w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center">
            <Heart className="w-4 h-4 text-stone-900 fill-stone-900" />
          </div>
          <span className="h-px w-20 bg-stone-300" />
        </div>


        {/* Description */}
        <div className="intro-description text-center mb-16">
          <p className="text-sm md:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            {WEDDING_DATA.intro.description}
          </p>
        </div>

        {/* Holy Verse Card */}
        <div className="verse-card relative">
          {/* Decorative Quote Marks */}
          <div className="absolute -top-6 left-8 text-8xl font-serif text-stone-200 leading-none select-none">
            "
          </div>

          <div className="bg-stone-50 border border-stone-200 p-8 md:p-12 text-center relative">
            {/* Verse Text */}
            <p className="font-script text-2xl md:text-3xl text-stone-800  mb-6 relative z-10">
              {WEDDING_DATA.intro.verseText}
            </p>

            {/* Reference */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-stone-300" />
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-stone-500 font-bold">
                {WEDDING_DATA.intro.verseReference}
              </p>
              <span className="h-px w-8 bg-stone-300" />
            </div>
          </div>

          {/* Decorative Quote Marks */}
          <div className="absolute -bottom-10 right-8 text-8xl font-serif text-stone-200 leading-none select-none rotate-180">
            "
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="flex items-center justify-center mt-16">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
            <span className="w-2 h-2 rounded-full bg-stone-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
