"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { WEDDING_DATA } from "../data";
import dynamic from "next/dynamic";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date(WEDDING_DATA.hero.targetDate);
    const difference = +targetDate - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  const eventDate = new Date(WEDDING_DATA.hero.targetDate);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString("default", { month: "long" });
  const year = eventDate.getFullYear();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- KODE GSAP (TIDAK DIUBAH SAMA SEKALI) ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      if (isDesktop) {
        gsap.to(".hero-fixed-bg", {
          filter: "blur(12px)",
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "500px top",
            scrub: true,
          },
        });

        gsap.to(contentRef.current, {
          opacity: 0,
          y: -150,
          scale: 0.9,
          ease: "power1.in",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "400px top",
            scrub: true,
          },
        });
      }

      gsap.from(".hero-text-element", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.from(".hero-bottom-bar", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden z-0 bg-stone-950 text-white"
    >
      {/* --- BACKGROUND AREA --- */}
      <div className="hero-fixed-bg absolute inset-0 w-full h-full z-[-1] pointer-events-none overflow-hidden">
        <video
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={WEDDING_DATA.hero.posterUrl}
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src={WEDDING_DATA.hero.videoUrl} />
        </video>

        {!videoLoaded && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
            style={{ backgroundImage: `url(${WEDDING_DATA.hero.posterUrl})` }}
          />
        )}

        {/* Cinematic Layers */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Film Grain Texture Overlay for Cinema Look */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'url("https://grainy-gradients.vercel.app/noise.svg")',
          }}
        ></div>
        {/* Gradient untuk fokus ke teks tengah */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/60"></div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div
        ref={contentRef}
        className="relative h-full w-full flex flex-col items-center justify-between z-10 py-10 px-6"
      >
        {/* TOP: Small Header */}
        <div className="hero-text-element text-center pt-4">
          <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase font-medium text-stone-300 drop-shadow-md">
            The Wedding Celebration Of
          </p>
        </div>

        {/* CENTER: Names & Location */}
        <div className="flex flex-col items-center justify-center relative w-full flex-1">
          {/* Background Ampersand */}
          <div className="hero-text-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none mix-blend-overlay opacity-10">
            <span className="font-serif italic text-[11rem] md:text-[22rem] text-white leading-none blur-[9px]">
              &
            </span>
          </div>

          {/* Names */}
          <div className="relative z-10 space-y-[0.1rem] md:space-y-[-1rem]">
            <h1 className="hero-text-element text-7xl md:text-[11rem] font-serif text-white tracking-tighter leading-[0.9] text-center drop-shadow-2xl md:pr-40 pr-12">
              {WEDDING_DATA.couple.groom.firstName}
            </h1>
            <h1 className="hero-text-element text-7xl md:text-[11rem] font-serif    text-white tracking-tighter leading-[0.9] text-center md:pl-40 drop-shadow-2xl pl-20">
              {WEDDING_DATA.couple.bride.firstName}
            </h1>
          </div>

          {/* Location with Lines */}
          <div className="hero-text-element mt-4 flex items-center gap-6">
            <span className="w-8 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-stone-400"></span>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-stone-300 drop-shadow-md">
              {WEDDING_DATA.hero.location}
            </p>
            <span className="w-8 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-stone-400"></span>
          </div>
        </div>

        {/* BOTTOM: Date Display (Sesuai request) */}
        <div className="hero-bottom-bar w-full max-w-4xl mx-auto pb-6 mb-12 md:mb-0">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Design Date yang lebih menyatu */}
            <div className="flex items-end justify-center gap-3 text-white drop-shadow-lg">
              {/* Tanggal (Angka) */}
              <span className="font-serif text-7xl md:text-9xl italic leading-none">
                {day}
              </span>

              {/* Bulan & Tahun (Teks) */}
              <div className="flex flex-col justify-end pb-3 md:pb-5">
                <span className="text-3xl md:text-5xl font-serif tracking-wide uppercase leading-none text-stone-200">
                  {month}
                </span>
                <span className="text-sm md:text-lg tracking-[0.5em] uppercase font-light text-stone-400 leading-none mt-1 md:mt-2">
                  {year}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(Hero), { ssr: false });
