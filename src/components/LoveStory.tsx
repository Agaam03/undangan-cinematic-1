"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../data";

interface LoveStoryProps {
  isOpened?: boolean;
  isMuted?: boolean;
}

const LoveStory: React.FC<LoveStoryProps> = ({
  isOpened = false,
  isMuted = true,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loveStory } = WEDDING_DATA;
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Sinkronisasi status muted dengan prop isMuted
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;

      // Jika tidak muted dan sudah dibuka, pastikan video berputar
      if (!isMuted && isOpened) {
        videoRef.current.play().catch((err) => {
          console.log("Play interrupted or blocked:", err);
        });
      }
    }
  }, [isMuted, isOpened]);

  // Logika Awal saat Undangan Dibuka (dari permintaan sebelumnya)
  useEffect(() => {
    if (isOpened && videoRef.current) {
      // Kita tetap menjalankan play() di sini untuk inisialisasi awal
      videoRef.current.play().catch((error) => {
        console.log("Initial autoplay blocked:", error);
      });
    }
  }, [isOpened]);

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
      className="py-20 px-6 md:px-12 bg-stone-100 relative"
    >
      <div className="max-w-[90rem] mx-auto">
        <div className="story-header flex flex-col md:flex-row items-start justify-between mb-16 gap-8 border-b border-stone-200 pb-8">
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

        <div className="story-video relative w-full aspect-video overflow-hidden group shadow-2xl bg-black rounded-sm">
          <div className="absolute inset-0 border-[1px] border-white/20 z-20 pointer-events-none m-4 md:m-8"></div>

          <div className="story-video-inner w-full h-full relative flex items-center justify-center">
            {/* Loading Indicator while buffering */}
            {!isVideoReady && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-stone-300 border-t-stone-900 rounded-full animate-spin"></div>
              </div>
            )}

            <video
              ref={videoRef}
              src={loveStory.videoUrl}
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                isVideoReady ? "opacity-100" : "opacity-40"
              }`}
              poster={(loveStory as any).posterUrl}
              controls
              playsInline
              loop
              autoPlay
              muted={isMuted} // Menggunakan prop isMuted
              onCanPlayThrough={() => setIsVideoReady(true)}
            />
          </div>
        </div>

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
        </div>
        <div className="story-col col-span-1 md:text-right flex flex-col justify-end mt-3">
          <p className="font-serif italic text-3xl text-stone-600 font-medium">
            {loveStory.estYear}
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoveStory;
