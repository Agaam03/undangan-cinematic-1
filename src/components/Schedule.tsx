"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { WEDDING_DATA } from "../data";

const Schedule: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Entrance animations for rows (safe for mobile)
      const rows = gsap.utils.toArray(".schedule-row");
      rows.forEach((row: any) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // CONDITIONAL PARALLAX: Only for desktop
      if (isDesktop) {
        gsap.utils.toArray(".parallax-wrapper").forEach((wrapper: any) => {
          const img = wrapper.querySelector("img");
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.15, yPercent: -12 },
              {
                scale: 1.15,
                yPercent: 12,
                ease: "none",
                scrollTrigger: {
                  trigger: wrapper,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              }
            );
          }
        });

        // Vertical Title Animation (Desktop only)
        gsap.from(".vertical-title", {
          scrollTrigger: { trigger: ".vertical-title", start: "top 90%" },
          x: -30,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        });
      } else {
        // Reset transforms on mobile
        gsap.set(".parallax-wrapper img", {
          scale: 1,
          yPercent: 0,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center items-center py-24 bg-stone-50 overflow-hidden min-h-screen"
      id="roundown-acara"
    >
      {/* Vertical Title - Desktop only */}
      <h1
        className="vertical-title hidden lg:block absolute left-8 top-32 text-[10px] font-sans tracking-[0.5em] uppercase text-stone-400 font-bold z-10"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}
      >
        Event Schedule
      </h1>

      <div className="w-full max-w-[90rem] mx-auto px-6 space-y-24 md:space-y-32">
        {WEDDING_DATA.schedule.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={event.id}
              className={`schedule-row flex flex-col ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-12 md:gap-0`}
            >
              {/* Image Side */}
              <div
                className={`w-full md:w-1/2 flex flex-row ${
                  isEven
                    ? "items-end justify-center"
                    : "items-center justify-center"
                } gap-4 relative`}
              >
                {isEven ? (
                  <>
                    <div className="parallax-wrapper w-2/3 aspect-[3/4] overflow-hidden shadow-2xl relative border border-stone-200">
                      <img
                        src={event.imageMain}
                        alt={event.title.replace("\n", " ")}
                        className="w-full h-full object-cover will-change-transform opacity-95"
                      />
                    </div>
                    {event.imageDetail && (
                      <div className="w-1/3 aspect-square overflow-hidden z-10 shadow-xl border border-stone-100">
                        <img
                          src={event.imageDetail}
                          alt="Detail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="parallax-wrapper w-full md:w-[85%] aspect-[3/4] overflow-hidden relative shadow-2xl border border-stone-200">
                    <img
                      src={event.imageMain}
                      alt={event.title.replace("\n", " ")}
                      className="w-full h-full object-cover will-change-transform opacity-95 hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/3 mx-auto flex flex-col items-center justify-center text-center space-y-6">
                <p className="text-sm md:text-base font-sans tracking-[0.3em] uppercase text-stone-500 font-bold">
                  {event.date}
                </p>

                <h2 className="text-4xl md:text-6xl font-serif text-stone-900 uppercase tracking-widest leading-tight font-bold whitespace-pre-line">
                  {event.title}
                </h2>

                {event.subEvents ? (
                  <div className="space-y-10 w-full max-w-md mx-auto pt-4">
                    {event.subEvents.map((sub, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center group"
                      >
                        <span className="font-sans text-xs font-bold text-stone-400 tracking-[0.2em] mb-2 uppercase">
                          {sub.time}
                        </span>
                        <p className="font-serif text-2xl text-stone-800 font-medium mb-1">
                          {sub.title}
                        </p>
                        <p className="font-sans text-[10px] tracking-widest text-stone-500 uppercase border-b border-stone-200 pb-1 group-hover:border-stone-800 transition-colors">
                          {sub.location}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 pt-4">
                    {event.primaryTime && (
                      <span className="font-sans text-xs font-bold text-stone-400 tracking-[0.2em] mb-1 uppercase">
                        {event.primaryTime}
                      </span>
                    )}
                    {event.primaryLocation && (
                      <p className="font-serif italic text-stone-800 text-lg border-b border-stone-200 pb-1">
                        {event.primaryLocation}
                      </p>
                    )}
                  </div>
                )}

                {event.description && (
                  <p className="font-sans text-xs text-stone-500 max-w-sm pt-4 leading-relaxed tracking-wide uppercase">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Schedule;
