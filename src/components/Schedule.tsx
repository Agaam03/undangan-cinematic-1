"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../data";

const Schedule: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(".schedule-row");
      rows.forEach((row: any) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          },
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      });

      // Vertical Title Animation
      gsap.from(".vertical-title", {
        scrollTrigger: { trigger: ".vertical-title" },
        x: -50,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      // Parallax Effect for Images within .parallax-wrapper
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
                scrub: 1, // Slight smoothing
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Changed bg-stone-100 to bg-stone-50/80 backdrop-blur-sm
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center items-center py-24 bg-stone-50 overflow-hidden min-h-screen"
      id="roundown-acara"
    >
      {/* Vertical Title */}
      <h1
        className="vertical-title hidden lg:block absolute left-8 top-32 text-xs font-sans tracking-[0.5em] uppercase text-stone-400 font-bold z-10"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}
      >
        Schedule
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
                    : "items-center justify-center pl-0 md:pl-12"
                } gap-4 relative`}
              >
                {isEven ? (
                  // Layout A (Like Akad Nikah)
                  <>
                    <div className="parallax-wrapper w-2/3 aspect-[3/4] overflow-hidden shadow-2xl   relative">
                      <img
                        src={event.imageMain}
                        alt={event.title.replace("\n", " ")}
                        className="w-full h-full object-cover will-change-transform opacity-95"
                      />
                    </div>
                    {event.imageDetail && (
                      <div className="w-1/3 aspect-square overflow-hidden  z-10   shadow-xl">
                        <img
                          src={event.imageDetail}
                          alt="Detail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  // Layout B (Like Reception)
                  <div className="parallax-wrapper w-full md:w-[85%] aspect-[3/4] overflow-hidden relative shadow-2xl">
                    <img
                      src={event.imageMain}
                      alt={event.title.replace("\n", " ")}
                      className="w-full h-full object-cover will-change-transform opacity-95 hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/3 mx-auto flex flex-col items-center justify-center text-center space-y-6  ">
                <p className="text-xl md:text-2xl font-sans tracking-[0.2em] uppercase text-stone-600 font-bold mb-2">
                  {event.date}
                </p>

                <h1 className="text-5xl md:text-7xl font-serif text-stone-900 uppercase tracking-widest leading-snug font-bold whitespace-pre-line">
                  {event.title}
                </h1>

                {/* If subEvents exist (e.g. Ceremony & Reception), list them */}
                {event.subEvents ? (
                  <div className="space-y-12 w-full max-w-md mx-auto pt-6">
                    {event.subEvents.map((sub, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <span className="font-sans text-lg md:text-xl font-bold text-stone-800 tracking-widest mb-2">
                          {sub.time}
                        </span>
                        <p className="font-serif text-2xl text-stone-900 font-bold">
                          {sub.title}
                        </p>
                        <p className="font-serif italic text-stone-800 text-base font-medium border-b border-transparent hover:border-stone-500 transition-colors cursor-pointer">
                          {sub.location}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Simple Single Event Layout
                  <div className="flex flex-col items-center gap-2 pt-4">
                    {event.primaryTime && (
                      <span className="font-sans text-lg md:text-xl font-bold text-stone-800 tracking-widest mb-1">
                        {event.primaryTime}
                      </span>
                    )}
                    {event.primaryLocation && (
                      <p className="font-serif italic text-stone-800 text-lg border-b border-stone-300 pb-1 font-medium">
                        {event.primaryLocation}
                      </p>
                    )}
                  </div>
                )}

                {event.description && (
                  <p className="font-sans text-stone-800 max-w-sm pt-4">
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
