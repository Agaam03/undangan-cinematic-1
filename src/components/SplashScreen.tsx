"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MailOpen } from "lucide-react";
import { WEDDING_DATA } from "../data";

interface SplashScreenProps {
  onOpen: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [guestName, setGuestName] = useState<string>("Our Dear Guest");

  useEffect(() => {
    // Ambil nama tamu dari URL parameter '?to='
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      setGuestName(decodeURIComponent(to).replace(/\+/g, " "));
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".splash-fade-in", {
        y: 40,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out",
      }).from(
        ".couple-image-frame",
        {
          scale: 0.9,
          opacity: 0,
          duration: 2,
          ease: "power2.out",
        },
        "-=1.2"
      );

      // Loop breathing animation for frame
      gsap.to(".couple-image-frame", {
        scale: 1.02,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOpen = () => {
    const tl = gsap.timeline({
      onComplete: () => onOpen(),
    });

    tl.to(contentRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power4.in",
    }).to(containerRef.current, {
      yPercent: -100,
      duration: 1.4,
      ease: "expo.inOut",
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-50 overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-40 bg-paper-texture pointer-events-none"></div>

      {/* Decorative Ornaments */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-stone-200 pointer-events-none"></div>
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-stone-200 pointer-events-none"></div>

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-8 w-full max-w-2xl"
      >
        {/* Wedding Header */}
        <div className="splash-fade-in mb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-stone-400 font-bold">
            The Wedding Invitation of
          </span>
        </div>

        {/* Couple Image Frame - Premium Look */}
        <div className="couple-image-frame mb-5 relative group">
          <div className="w-56 h-72 md:w-64 md:h-80 overflow-hidden border-[16px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rotate-[-2deg] transition-transform duration-700 group-hover:rotate-0">
            <img
              src={
                WEDDING_DATA.hero.posterUrl || "https://picsum.photos/600/800"
              }
              alt="The Happy Couple"
              className="w-full h-full object-cover scale-110"
            />
          </div>
          {/* Accent Frame */}
          <div className="absolute -inset-4 border border-stone-200 -z-10 rotate-[3deg] group-hover:rotate-0 transition-transform duration-700"></div>
        </div>

        {/* Couple Names */}
        <div className="splash-fade-in mb-8">
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-none">
            {WEDDING_DATA.couple.groom.firstName}
            <span className="block md:inline md:mx-4 text-stone-300 font-serif italic text-4xl md:text-6xl">
              &
            </span>
            {WEDDING_DATA.couple.bride.firstName}
          </h1>
        </div>

        {/* Personalized Guest Box */}
        <div className="splash-fade-in mb-7 w-full max-w-sm">
          <div className="space-y-3">
            <p className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-bold">
              Dear Honored Guest,
            </p>
            <div className="h-px w-12 bg-stone-300 mx-auto"></div>
            <h2 className="text-2xl md:text-4xl font-serif italic text-stone-800 px-4 line-clamp-2">
              {guestName}
            </h2>
          </div>
        </div>

        {/* Open Button */}
        <div className="splash-fade-in">
          <button
            onClick={handleOpen}
            className="group relative flex items-center gap-4 bg-stone-900 text-stone-50 md:px-12 md:py-5 py-3 px-12 mb-12 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <span className="relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
              Buka Undangan
            </span>
            <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center relative z-10 transition-transform group-hover:translate-x-1">
              <MailOpen className="w-4 h-4 text-stone-100" />
            </div>
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-stone-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo"></div>
          </button>
        </div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-8 text-[8px] uppercase tracking-[0.3em] text-stone-300 font-bold splash-fade-in">
        #KAIAandLEO • Kyoto 2026
      </div>
    </div>
  );
};

export default SplashScreen;
