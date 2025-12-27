"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, Calendar } from "lucide-react";
import { WEDDING_DATA } from "../data";

const Schedule: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".schedule-header", {
        scrollTrigger: { trigger: ".schedule-header", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Card animations
      gsap.utils.toArray(".event-card").forEach((card: any, index) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 50,
          opacity: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Parse date string to get day, month, year
  const parseDate = (dateStr: string) => {
    // Expected format: "14th July 2026"
    const parts = dateStr.match(/(\d+)\w*\s+(\w+)\s+(\d+)/);
    if (parts) {
      return {
        day: parts[1],
        month: parts[2],
        year: parts[3],
      };
    }
    return { day: "", month: "", year: "" };
  };

  return (
    <section
      ref={containerRef}
      className="py-2 px-6 md:px-12 bg-white relative"
      id="roundown-acara"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="schedule-header text-center mb-20">
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold text-stone-400 mb-4 block">
            Save The Date
          </span>
          <h2 className="font-script text-5xl md:text-7xl text-stone-900 mb-4">
            Wedding Schedule
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-stone-300" />
            <Calendar className="w-4 h-4 text-stone-400" />
            <span className="h-px w-16 bg-stone-300" />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {WEDDING_DATA.schedule.map((event) => {
            const { day, month, year } = parseDate(event.date);

            return (
              <div
                key={event.id}
                className="event-card group bg-white border border-stone-200 overflow-hidden hover:border-stone-400 transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <img
                    src={event.imageMain}
                    alt={event.title.replace("\n", " ")}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-4 text-center border border-stone-100">
                    <span className="block font-script text-4xl text-stone-900 leading-none">
                      {day}
                    </span>
                    <span className="block text-[10px] tracking-[0.2em] uppercase font-bold text-stone-500 mt-1">
                      {month}
                    </span>
                    <span className="block text-[10px] tracking-widest text-stone-400 mt-0.5">
                      {year}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-10">
                  {/* Title */}
                  <h3 className="font-script text-4xl md:text-5xl text-stone-900 mb-6 leading-tight">
                    {event.title.replace("\n", " ")}
                  </h3>

                  {/* Sub Events or Primary Info */}
                  {event.subEvents ? (
                    <div className="space-y-5">
                      {event.subEvents.map((sub, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 group/item"
                        >
                          {/* Time Icon */}
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center group-hover/item:bg-stone-200 transition-colors">
                            <Clock className="w-4 h-4 text-stone-600" />
                          </div>
                          {/* Event Info */}
                          <div className="flex-1 border-b border-stone-100 pb-4">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-xs font-bold text-stone-900 tracking-wide">
                                {sub.time}
                              </span>
                              <span className="text-stone-300">—</span>
                              <span className="font-script text-2xl text-stone-800">
                                {sub.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-stone-500">
                              <MapPin className="w-3 h-3" />
                              <span className="text-xs tracking-wide">
                                {sub.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {event.primaryTime && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-stone-600" />
                          </div>
                          <span className="text-sm font-bold text-stone-900 tracking-wide">
                            {event.primaryTime}
                          </span>
                        </div>
                      )}
                      {event.primaryLocation && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-stone-600" />
                          </div>
                          <span className="text-sm text-stone-700">
                            {event.primaryLocation}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  {event.description && (
                    <p className="mt-6 text-sm text-stone-500 leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-xs text-stone-400 tracking-widest uppercase">
            We can't wait to celebrate with you
          </p>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
