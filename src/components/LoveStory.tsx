"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import dynamic from "next/dynamic";
import { WEDDING_DATA } from "../data";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as React.ComponentType<any>;

const LoveStory: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { loveStory } = WEDDING_DATA;
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    setHasWindow(true);
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Header Text
      gsap.from(".story-header", {
        scrollTrigger: { trigger: ".story-header", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      });

      // Video Reveal (Clip Path or Scale)
      gsap.from(".story-video", {
        scrollTrigger: { trigger: ".story-video", start: "top 80%" },
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      // Note: Removed the parallax scale/movement on the video inner container
      // to ensure the video fits perfectly 100% width/height without black bars
      // caused by aspect ratio mismatches in the previous parallax setup.

      // Footer columns stagger
      gsap.from(".story-col", {
        scrollTrigger: { trigger: ".story-col", start: "top 90%" },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="love-story"
      className="py-24 px-6 md:px-12 bg-stone-50 border-t border-stone-200"
    >
      <div className="max-w-[90rem] mx-auto">
        {/* Editorial Header Layout */}
        <div className="story-header flex flex-col md:flex-row   justify-between mb-16 gap-8 border-b border-stone-200 pb-8">
          <div className="max-w-2xl">
            <span className="text-xs font-sans tracking-[0.4em] uppercase text-stone-800 font-bold block mb-4">
              The Journey
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-stone-900 leading-none font-medium">
              {loveStory.title}
            </h2>
          </div>
          <div className="max-w-md pb-2">
            <p className="font-serif italic text-xl text-stone-800 leading-relaxed font-medium">
              {loveStory.quote}
            </p>
            <p className="text-xs font-sans uppercase tracking-widest text-stone-600 mt-2 font-bold">
              {loveStory.quoteAuthor}
            </p>
          </div>
        </div>

        {/* Cinematic Video Container */}
        {/* Removed 'aspect-video' from parent and handled sizing to ensure full coverage */}
        <div className="story-video relative w-full aspect-video overflow-hidden group shadow-2xl bg-black rounded-sm">
          {/* Decorative Frame */}
          <div className="absolute inset-0 border-[1px] border-white/20 z-20 pointer-events-none m-4 md:m-8"></div>

          {/* Wrapper for player - set to full width/height of container */}
          <div className="story-video-inner w-full h-full relative">
            {hasWindow && (
              <ReactPlayer
                src={loveStory.videoUrl}
                width="100%"
                height="100%"
                controls={true}
                autoPlay
                className="react-player"
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            )}
          </div>
        </div>

        {/* Narrative Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {loveStory.stories.map((story, idx) => (
            <div key={idx} className="story-col col-span-1">
              <h3 className="font-serif text-2xl text-stone-900 mb-2 font-medium">
                {story.title}
              </h3>
              <p className="font-sans text-stone-800 text-sm leading-relaxed">
                {story.content}
              </p>
            </div>
          ))}

          <div className="story-col col-span-1 md:text-right flex flex-col justify-end">
            <p className="font-serif italic text-3xl text-stone-600 font-medium">
              {loveStory.estYear}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveStory;
