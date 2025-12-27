"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../data";

const LoveStory: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { loveStory } = WEDDING_DATA;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".story-header", {
        scrollTrigger: { trigger: ".story-header", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      });

      gsap.from(".story-video", {
        scrollTrigger: { trigger: ".story-video", start: "top 80%" },
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

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
      className="py-20 px-6 md:px-12 bg-white relative"
    >
      <div className="max-w-[90rem] mx-auto">
        <div className="story-header flex flex-col md:flex-row items-start justify-between mb-16 gap-8 border-b border-stone-200 pb-8">
          <div className="max-w-2xl">
            <span className="text-xs font-sans tracking-[0.4em] uppercase text-stone-800 font-bold block mb-4">
              The Journey
            </span>
            <h2 className="text-6xl md:text-8xl font-script text-stone-900 leading-none">
              {loveStory.title}
            </h2>
          </div>
          <div className="max-w-md pb-2">
            <p className="font-script text-xl text-stone-800 leading-relaxed">
              {loveStory.quote}
            </p>
            <p className="text-xs font-sans uppercase tracking-widest text-stone-600 mt-2 font-bold">
              {loveStory.quoteAuthor}
            </p>
          </div>
        </div>

        <div className="story-video relative w-full aspect-video overflow-hidden group bg-black rounded-sm border border-stone-200">
          <video
            src={loveStory.videoUrl}
            className="w-full h-full object-cover"
            poster={(loveStory as any).posterUrl}
            autoPlay
            loop
            muted
            playsInline
            controls
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {loveStory.stories.map((story, idx) => (
            <div key={idx} className="story-col col-span-1">
              <h3 className="font-script text-3xl text-stone-900 mb-2">
                {story.title}
              </h3>
              <p className="font-sans text-stone-800 text-sm leading-relaxed">
                {story.content}
              </p>
            </div>
          ))}
        </div>
        <div className="story-col col-span-1 md:text-right flex flex-col justify-end mt-3">
          <p className="font-script text-3xl text-stone-600">
            {loveStory.estYear}
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoveStory;
