"use client";

import React, { useEffect, useRef } from "react";
import { Instagram, Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../data";

const Couple: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { groom, bride } = WEDDING_DATA.couple;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".couple-header", {
        scrollTrigger: { trigger: ".couple-header", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Card animations
      gsap.from(".groom-card", {
        scrollTrigger: { trigger: ".groom-card", start: "top 80%" },
        x: -40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".bride-card", {
        scrollTrigger: { trigger: ".bride-card", start: "top 80%" },
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Heart icon animation
      gsap.from(".heart-icon", {
        scrollTrigger: { trigger: ".heart-icon", start: "top 80%" },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="couple"
      className="py-4 px-6 md:px-12 bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="couple-header text-center mb-16">
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold text-stone-400 mb-4 block">
            The Happy Couple
          </span>
          <h2 className="font-script text-5xl md:text-7xl text-stone-900">
            Meet Us
          </h2>
        </div>

        {/* Couple Cards */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {/* Groom Card */}
          <div className="groom-card w-full max-w-sm md:max-w-md group">
            <div className="relative">
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4] border border-stone-200">
                <img
                  src={groom.photoUrl}
                  alt={groom.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Name Card - overlapping */}
              <div className="absolute -bottom-6 left-4 right-4 bg-white border border-stone-200 p-6 text-center">
                <h3 className="font-script text-4xl md:text-5xl text-stone-900 mb-2">
                  {groom.name}
                </h3>
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-stone-500 mb-4">
                  {groom.role}
                </p>
                <a
                  href={groom.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-xs tracking-wide">{groom.handle}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Heart Icon - Center */}
          <div className="heart-icon hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-white border border-stone-200 items-center justify-center">
            <Heart className="w-6 h-6 text-stone-900 fill-stone-900" />
          </div>

          {/* Mobile Heart */}
          <div className="heart-icon md:hidden flex items-center justify-center my-4">
            <div className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center">
              <Heart className="w-5 h-5 text-stone-900 fill-stone-900" />
            </div>
          </div>

          {/* Bride Card */}
          <div className="bride-card w-full max-w-sm md:max-w-md group md:mt-24">
            <div className="relative">
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4] border border-stone-200">
                <img
                  src={bride.photoUrl}
                  alt={bride.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Name Card - overlapping */}
              <div className="absolute -bottom-6 left-4 right-4 bg-white border border-stone-200 p-6 text-center">
                <h3 className="font-script text-4xl md:text-5xl text-stone-900 mb-2">
                  {bride.name}
                </h3>
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-stone-500 mb-4">
                  {bride.role}
                </p>
                <a
                  href={bride.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-xs tracking-wide">{bride.handle}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing for overlapping cards */}
        <div className="h-12" />
      </div>
    </section>
  );
};

export default Couple;
