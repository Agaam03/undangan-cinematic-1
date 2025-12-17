"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../data";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Countdown Logic
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. PIN THE HERO
      // This makes the Hero stay fixed while the next sections "stack" on top of it.
      // Fix: Removed invalid 'zIndex' property from ScrollTrigger.create options
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false, // Important: allows next sections to overlap
      });

      // 2. ANIMATE BLUR AND DARKEN ON SCROLL
      // As the user scrolls, the hero background gets blurrier and darker
      gsap.to(".hero-fixed-bg", {
        filter: "blur(12px)  ",
        ease: "none",
        scrollTrigger: {
          trigger: "body", // Start blurring based on page scroll
          start: "top top",
          end: "500px top",
          scrub: true,
        },
      });

      // 3. FADE CONTENT ELEMENTS
      // Content fades out and moves up as you scroll away
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

      // 4. Entrance Animations
      gsap.from(".hero-text-element", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(".hero-bottom-bar", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Fix: Moved the z-index to the section className to ensure it stays below overlapping sections
  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden z-0"
    >
      {/* BACKGROUND VIDEO */}
      <div className="hero-fixed-bg absolute inset-0 w-full h-full z-[-1] pointer-events-none overflow-hidden scale-110 bg-black">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={WEDDING_DATA.hero.videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/20"></div>
      </div>

      {/* CONTENT CONTAINER */}
      <div
        ref={contentRef}
        className="relative h-full w-full flex flex-col items-center justify-between z-10 py-12 px-6"
      >
        {/* Top Header */}
        <div className="hero-text-element text-center">
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold text-stone-200/80 drop-shadow-lg">
            The Wedding Celebration Of
          </span>
        </div>

        {/* Main Names */}
        <div className="flex flex-col items-center justify-center relative w-full">
          <div className="hero-text-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none">
            <span className="font-serif italic text-[14rem] md:text-[22rem] text-white/5 leading-none pr-4 blur-sm">
              &
            </span>
          </div>

          <h1 className="hero-text-element text-7xl md:text-9xl font-serif text-white tracking-tight leading-none text-center drop-shadow-2xl">
            {WEDDING_DATA.couple.groom.firstName}
          </h1>
          <h1 className="hero-text-element text-7xl md:text-9xl font-serif text-white tracking-tight leading-none text-center md:pl-32 drop-shadow-2xl">
            {WEDDING_DATA.couple.bride.firstName}
          </h1>

          <div className="hero-text-element mt-10 flex items-center gap-6 text-stone-200">
            <span className="w-12 h-[1px] bg-stone-200/30"></span>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold drop-shadow-md">
              {WEDDING_DATA.hero.location}
            </p>
            <span className="w-12 h-[1px] bg-stone-200/30"></span>
          </div>
        </div>

        {/* Bottom Glass Bar */}
        <div className="hero-bottom-bar w-full max-w-5xl mx-auto">
          <div className="bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-1 flex flex-row items-center justify-between relative overflow-hidden backdrop-blur-xl ring-1 ring-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-pulse"></div>

            {/* Date Section */}
            <div className="flex items-center gap-3 md:gap-6 px-4 md:px-8 py-3 border-r border-white/10 z-10 shrink-0">
              <span className="font-serif text-4xl md:text-6xl text-white italic drop-shadow-lg">
                {day}
              </span>
              <div className="flex flex-col text-left space-y-0.5">
                <span className="text-[9px] md:text-[11px] tracking-widest uppercase font-bold text-stone-200">
                  {month}
                </span>
                <span className="text-[9px] md:text-[11px] tracking-widest uppercase font-bold text-stone-400">
                  {year}
                </span>
              </div>
            </div>

            {/* Countdown Section */}
            <div className="flex items-center justify-center gap-4 md:gap-12 px-2 md:px-6 z-10 flex-1">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="font-serif text-xl md:text-3xl text-white tabular-nums leading-none">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-stone-400 mt-1 font-bold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block pr-3 z-10">
              <button className="bg-stone-50 hover:bg-white text-stone-900 px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 shadow-xl flex items-center gap-2 group">
                <span>Save Date</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
