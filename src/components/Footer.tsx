"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUp, Heart, Instagram, Mail, MapPin, Share2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../data";

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const monogram = `${WEDDING_DATA.couple.groom.firstName.charAt(
    0
  )} & ${WEDDING_DATA.couple.bride.firstName.charAt(0)}`;
  const copyrightNames = `${WEDDING_DATA.couple.bride.firstName} & ${WEDDING_DATA.couple.groom.firstName}`;
  const weddingYear = new Date(WEDDING_DATA.hero.targetDate).getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // 1. Parallax Background Image
      gsap.fromTo(
        imageRef.current,
        { yPercent: -20, scale: 1.1 },
        {
          yPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      // 2. Parallax Giant Watermark
      gsap.to(watermarkRef.current, {
        y: -150,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // 3. REVEAL ANIMATION
      gsap.fromTo(
        ".footer-reveal",
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          stagger: 0.05, // Stagger dipercepat sedikit agar mobile tidak menunggu lama
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Line Draw Animation
      gsap.fromTo(
        ".footer-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden text-stone-100 z-20 bg-stone-950"
    >
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-[140%] bg-cover bg-center opacity-30 grayscale mix-blend-luminosity"
          style={{
            backgroundImage: `url(${WEDDING_DATA.footer.backgroundImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/20" />
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'url("https://grainy-gradients.vercel.app/noise.svg")',
          }}
        ></div>
      </div>

      {/* --- GIANT WATERMARK --- */}
      <div
        ref={watermarkRef}
        className="absolute top-[15%] left-0 w-full flex justify-center items-center z-0 pointer-events-none select-none"
      >
        <span className="font-serif italic text-[30vw] md:text-[25vw] leading-none text-white/[0.03] tracking-tighter mix-blend-overlay blur-sm">
          {monogram}
        </span>
      </div>

      {/* --- MAIN CONTENT --- */}
      {/* Padding mobile dikurangi (pt-20) agar tidak terlalu kosong */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 pb-8 md:pb-12 pt-20 md:pt-32 flex flex-col h-full justify-between">
        {/* Top Section: Emotional Closing */}
        {/* Margin bottom mobile dikurangi (mb-12) */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-32">
          <div className="footer-reveal mb-4 md:mb-6 invisible">
            <p className="text-[9px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] text-stone-400 font-medium">
              The Beginning of Forever
            </p>
          </div>

          <h2 className="footer-reveal font-serif text-5xl md:text-[9rem] leading-[0.9] md:leading-[0.85] tracking-tight text-stone-100 mix-blend-screen invisible">
            Thank You
          </h2>

          <div className="footer-reveal mt-6 md:mt-8 max-w-xs md:max-w-lg invisible">
            <p className="font-serif italic text-lg md:text-2xl text-stone-300/80 leading-relaxed">
              "For being part of our story, sharing our joy, and making this day
              unforgettable."
            </p>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-white/10 mb-10 md:mb-16 footer-line origin-left" />

        {/* Bottom Grid: Information */}
        {/* Mobile: Grid 2 kolom, Desktop: Grid 12 kolom */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-4 md:gap-8 items-start mb-16 md:mb-20">
          {/* 1. Brand/Names (Full Width on Mobile, Centered) */}
          <div className="col-span-2 md:col-span-4 flex flex-col space-y-6 text-center md:text-left items-center md:items-start">
            <h3 className="footer-reveal font-serif text-3xl md:text-5xl text-white invisible leading-none flex flex-row items-center justify-center gap-2">
              {WEDDING_DATA.couple.groom.firstName}
              <span className=" text-stone-500 md:mx-0">&</span>
              {WEDDING_DATA.couple.bride.firstName}
            </h3>

            <div className="footer-reveal flex gap-4 pt-2 invisible justify-center md:justify-start">
              {WEDDING_DATA.footer.socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center overflow-hidden hover:border-white transition-colors duration-500"
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <Instagram className="w-4 h-4 text-white group-hover:text-stone-950 relative z-10 transition-colors duration-500" />
                </a>
              ))}
              <button className="group relative w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center overflow-hidden hover:border-white transition-colors duration-500">
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <Share2 className="w-4 h-4 text-white group-hover:text-stone-950 relative z-10 transition-colors duration-500" />
              </button>
            </div>
          </div>

          {/* 2. Menu (Kiri di Mobile) */}
          <div className="col-span-1 md:col-span-2 flex flex-col space-y-4 pl-2 md:pl-0">
            <h4 className="footer-reveal text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-2 invisible">
              Menu
            </h4>
            {["Our Story", "The Event", "Gallery", "RSVP"].map((item) => (
              <div key={item} className="footer-reveal invisible">
                <a
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className="inline-block text-xs md:text-sm text-stone-300 hover:text-white hover:translate-x-2 transition-all duration-300 uppercase tracking-widest font-light py-1"
                >
                  {item}
                </a>
              </div>
            ))}
          </div>

          {/* 3. Venue (Kanan di Mobile) */}
          <div className="col-span-1 md:col-span-3 flex flex-col space-y-4">
            <h4 className="footer-reveal text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-2 invisible">
              The Venue
            </h4>
            <div className="footer-reveal flex flex-col space-y-1 invisible pr-2 md:pr-0">
              <span className="text-lg md:text-xl font-serif italic text-white leading-tight">
                {WEDDING_DATA.hero.location}
              </span>
              <span className="text-[10px] md:text-xs text-stone-400 uppercase tracking-wider font-light mt-1">
                Grand Ballroom & Garden
              </span>
              <div className="flex items-center gap-2 mt-3 text-stone-500 text-[10px] md:text-xs tracking-widest hover:text-white cursor-pointer transition-colors">
                <MapPin className="w-3 h-3" />
                <span>View Map</span>
              </div>
            </div>
          </div>

          {/* 4. Scroll Top (Full Width Centered on Mobile) */}
          <div className="col-span-2 md:col-span-3 flex flex-col items-center md:items-end justify-between h-full pt-8 md:pt-0 border-t border-white/5 md:border-none">
            <button
              onClick={scrollToTop}
              className="footer-reveal group flex flex-col md:flex-row items-center gap-4 cursor-pointer invisible"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 group-hover:text-white transition-colors font-bold order-2 md:order-1">
                Back to Top
              </span>
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-stone-800/50 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] order-1 md:order-2">
                <ArrowUp className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-stone-950 transition-colors duration-500" />
              </div>
            </button>
          </div>
        </div>

        {/* Footer Bottom: Copyright */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-6 md:pt-8 border-t border-white/5 gap-4 md:gap-0">
          <p className="footer-reveal text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold invisible text-center md:text-left">
            © {weddingYear} — All Rights Reserved
          </p>

          <div className="footer-reveal hidden md:flex items-center gap-2 invisible">
            <span className="w-1 h-1 rounded-full bg-stone-700" />
            <span className="w-16 h-[1px] bg-stone-800" />
            <span className="w-1 h-1 rounded-full bg-stone-700" />
          </div>

          <p className="footer-reveal flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold invisible">
            Made with{" "}
            <Heart className="w-3 h-3 text-stone-800 fill-stone-800" /> by Avela
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
