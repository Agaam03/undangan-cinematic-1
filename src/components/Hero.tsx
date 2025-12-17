"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../data";

// Dynamically import ReactPlayer to fix hydration issues and type errors
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as React.ComponentType<any>;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
  const [isClient, setIsClient] = useState(false);

  // Format date for display (e.g. 14 July 2026)
  const eventDate = new Date(WEDDING_DATA.hero.targetDate);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString("default", { month: "long" });
  const year = eventDate.getFullYear();

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. PINNING LOGIC (The "Diam" effect)
      // We pin the inner hero section while the outer wrapper scrolls away
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom top",
        pin: heroRef.current,
        pinSpacing: false, // Allows the next section to scroll over this one
        scrub: true,
      });

      // 2. Entrance Animations
      gsap.fromTo(
        ".hero-bg",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );

      gsap.from(".hero-text-element", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.from(".hero-bottom-bar", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.2,
      });

      // 3. Parallax Scroll Effect (Internal elements)
      // Moves the text slightly faster than the pinned container to give depth
      gsap.to(textRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    // Wrapper acts as the spacer in the document flow
    <div ref={wrapperRef} className="relative h-screen w-full overflow-hidden">
      {/* Hero Content - This gets pinned */}
      <section
        ref={heroRef}
        className="relative h-full w-full flex flex-col items-center justify-between overflow-hidden bg-stone-50 z-100"
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="hero-bg w-full h-full relative">
            {/* Video Background */}
            {isClient && (
              <ReactPlayer
                src={WEDDING_DATA.hero.videoUrl}
                width="100%"
                height="100%"
                className="react-player absolute top-0 left-0 object-cover"
                playing
                loop
                muted
                playsinline
                controls={false}
                config={
                  {
                    file: {
                      attributes: {
                        style: {
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        },
                      },
                    },
                  } as any
                }
              />
            )}

            {/* Dark Cinematic Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
            {/* Gradient to unify bottom area */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/30"></div>
          </div>
        </div>

        {/* Top Decoration */}
        <div className="hero-text-element pt-12 z-10 text-white">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs md:text-xs tracking-widest uppercase font-serif font-bold text-stone-200/90 drop-shadow-md">
              The Wedding Celebration Of
            </span>
          </div>
        </div>

        {/* Main Content: Names */}
        <div
          ref={textRef}
          className="relative z-10 flex flex-col items-center justify-center w-full px-4 -mt-16 md:-mt-0 will-change-transform"
        >
          {/* Artistic Ampersand */}
          <div className="hero-text-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none">
            <span className="font-serif italic text-[12rem] md:text-[20rem] text-white/5 leading-none pr-4 blur-sm">
              &
            </span>
          </div>

          {/* Groom's Name */}
          <h1 className="hero-text-element text-7xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight leading-[0.9] text-center drop-shadow-2xl">
            {WEDDING_DATA.couple.groom.firstName}
          </h1>

          {/* Bride's Name */}
          <h1 className="hero-text-element text-7xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight leading-[0.9] text-center md:pl-24 drop-shadow-2xl">
            {WEDDING_DATA.couple.bride.firstName}
          </h1>

          <div className="hero-text-element mt-8 flex items-center gap-4 text-stone-200">
            <span className="w-8 h-[1px] bg-stone-200/50"></span>
            <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase font-medium drop-shadow-md">
              {WEDDING_DATA.hero.location}
            </p>
            <span className="w-8 h-[1px] bg-stone-200/50"></span>
          </div>
        </div>

        {/* Bottom Floating Glass Bar */}
        <div className="hero-bottom-bar w-full z-20 pb-10 px-4 md:px-8">
          <div className="max-w-4xl mx-auto bg-white/10 border border-white/20 shadow-2xl rounded-2xl px-2 py-1 flex flex-row items-center justify-between gap-2 md:gap-8 ring-1 ring-white/10 relative overflow-hidden backdrop-blur-md">
            {/* Subtle Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-50 pointer-events-none"></div>

            {/* Date Section */}
            <div className="flex items-center gap-2 md:gap-5 px-3 md:px-6 py-2 border-r border-white/10 w-auto justify-start z-10 shrink-0">
              <div className="flex flex-col items-center leading-none">
                <span className="font-serif text-4xl md:text-6xl text-white italic drop-shadow-lg pr-1 md:pr-2">
                  {day}
                </span>
              </div>

              <div className="flex flex-col text-left space-y-0.5 md:space-y-1 justify-center">
                <span className="text-[8px] md:text-[12px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold text-stone-200">
                  {month}
                </span>
                <span className="text-[8px] md:text-[12px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold text-stone-300">
                  {year}
                </span>
              </div>
            </div>

            {/* Countdown Section */}
            <div className="flex items-center justify-center gap-3 md:gap-10 px-1 md:px-4 z-10 flex-1">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hrs", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center group cursor-default"
                >
                  <span className="block font-serif text-xl md:text-3xl text-white leading-none group-hover:-translate-y-1 transition-transform duration-300 tabular-nums">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[6px] md:text-[8px] uppercase tracking-widest text-stone-300 mt-1 block font-bold group-hover:text-stone-100 transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="hidden md:block pr-2 z-10">
              <button className="bg-stone-50 hover:bg-white text-stone-900 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] flex items-center gap-2 group">
                <span>Save the Date</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Hero), { ssr: false });
