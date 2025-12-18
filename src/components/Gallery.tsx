"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { WEDDING_DATA } from "../data";

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // 1. Entrance Animation (Safe for all devices)
      gsap.from(".gallery-item", {
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      // 2. Parallax Effect (Desktop Only)
      if (isDesktop) {
        const items = gsap.utils.toArray(".gallery-item");
        items.forEach((container: any) => {
          const img = container.querySelector("img");
          if (img) {
            gsap.set(img, { scale: 1.15 });
            gsap.fromTo(
              img,
              { yPercent: -15 },
              {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                  trigger: container,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }
        });
      } else {
        // Reset images for mobile performance
        gsap.set(".gallery-item img", {
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
      id="gallery"
      className="py-24 bg-stone-50 relative overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold text-stone-400 mb-4 block">
            The Gallery
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic text-stone-900 font-medium">
            {WEDDING_DATA.gallery.title}
          </h2>
        </div>

        <div className="gallery-grid grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 auto-rows-[200px] md:auto-rows-[300px] grid-flow-dense pb-10">
          {WEDDING_DATA.gallery.images.map((image, index) => (
            <div
              key={index}
              className={`gallery-item ${image.spanClass} overflow-hidden relative shadow-md group border border-stone-200`}
            >
              <img
                src={image.src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95 group-hover:opacity-100 will-change-transform"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
