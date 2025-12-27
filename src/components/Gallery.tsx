"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { WEDDING_DATA } from "../data";

// LightGallery imports
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';

// LightGallery CSS
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

gsap.registerPlugin(ScrollTrigger);

export const GallerySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.from(".gallery-header", {
        scrollTrigger: { trigger: ".gallery-header", start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      if (isDesktop) {
        ScrollTrigger.batch(".gallery-item", {
          onEnter: (batch) =>
            gsap.from(batch, {
              opacity: 0,
              y: 50,
              scale: 0.95,
              stagger: 0.1,
              duration: 1,
              ease: "power3.out",
            }),
          start: "top 85%",
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]);

  // Render all gallery items in a flat structure for proper LightGallery ordering
  const renderGalleryItems = () => {
    const allItems: React.ReactNode[] = [];

    // Process in blocks of 5
    [0, 5, 10].forEach((startIndex, blockKey) => {
      const images = WEDDING_DATA.gallery.slice(startIndex, startIndex + 5);
      if (images.length === 0) return;

      allItems.push(
        <div key={`block-${blockKey}`} className="flex flex-col gap-2">
          {/* Row 1: Portrait left + Landscape right */}
          <div className="flex gap-1 h-[200px] md:h-[400px]">
            {images[0] && (
              <a
                key={`img-${startIndex}`}
                className="gallery-item w-1/3 relative rounded-sm overflow-hidden group border border-white/10 cursor-pointer block"
                data-src={images[0].src}
                data-thumb={images[0].src}
              >
                <Image src={images[0].src} alt={`Gallery ${startIndex + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </a>
            )}
            {images[1] && (
              <a
                key={`img-${startIndex + 1}`}
                className="gallery-item w-2/3 relative rounded-sm overflow-hidden group border border-white/10 cursor-pointer block"
                data-src={images[1].src}
                data-thumb={images[1].src}
              >
                <Image src={images[1].src} alt={`Gallery ${startIndex + 2}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </a>
            )}
          </div>

          {/* Row 2: Portrait left + Portrait right */}
          <div className="flex gap-2 h-[280px] md:h-[500px]">
            {images[2] && (
              <a
                key={`img-${startIndex + 2}`}
                className="gallery-item w-1/2 relative rounded-sm overflow-hidden group border border-white/10 cursor-pointer block"
                data-src={images[2].src}
                data-thumb={images[2].src}
              >
                <Image src={images[2].src} alt={`Gallery ${startIndex + 3}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </a>
            )}
            {images[3] && (
              <a
                key={`img-${startIndex + 3}`}
                className="gallery-item w-1/2 relative rounded-sm overflow-hidden group border border-white/10 cursor-pointer block"
                data-src={images[3].src}
                data-thumb={images[3].src}
              >
                <Image src={images[3].src} alt={`Gallery ${startIndex + 4}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </a>
            )}
          </div>

          {/* Row 3: Full width landscape */}
          {images[4] && (
            <a
              key={`img-${startIndex + 4}`}
              className="gallery-item w-full h-[200px] md:h-[300px] relative rounded-sm overflow-hidden group border border-white/10 cursor-pointer block"
              data-src={images[4].src}
              data-thumb={images[4].src}
            >
              <Image src={images[4].src} alt={`Gallery ${startIndex + 5}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </a>
          )}
        </div>
      );
    });

    return allItems;
  };

  const onInit = useCallback(() => {
    console.log('LightGallery initialized');
  }, []);

  return (
    <section ref={containerRef} id="gallery" className="py-4 bg-white relative overflow-hidden scroll-mt-20">
      <div className="max-w-[90rem] mx-auto px-4 md:px-8">
        <div className="text-center mb-16 gallery-header">
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold text-stone-400 mb-4 block">
            The Gallery
          </span>
          <h2 className="font-script text-5xl md:text-6xl text-stone-900">
            Captured Moments
          </h2>
        </div>

        {/* Gallery Grid with LightGallery */}
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgZoom, lgThumbnail]}
          elementClassNames="flex flex-col gap-2 pb-10"
          selector=".gallery-item"
          download={false}
          counter={true}
          closable={true}
          closeOnTap={true}
          escKey={true}
          hideControlOnEnd={false}
          mobileSettings={{
            controls: true,
            showCloseIcon: true,
            download: false,
          }}
        >
          {renderGalleryItems()}
        </LightGallery>
      </div>
    </section>
  );
};

export default GallerySection;
