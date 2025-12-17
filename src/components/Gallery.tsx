"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "@/data";

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // 1. Entrance Animation (Fade Up)
      gsap.from(".gallery-item", {
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      // 2. Parallax Effect (Image Only)
      const items = gsap.utils.toArray(".gallery-item");

      items.forEach((container: any) => {
        const img = container.querySelector("img");

        if (img) {
          gsap.set(img, { scale: 1.2 });

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="py-20 bg-stone-100 overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl italic text-stone-900 font-medium">
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
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 opacity-95 group-hover:opacity-100 will-change-transform"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
