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

    // Menggunakan gsap.context untuk memastikan cleanup yang bersih di React
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

      // 3. REVEAL ANIMATION (FIXED)
      // Menggunakan .fromTo untuk memastikan state awal dan akhir jelas
      // autoAlpha menghandle opacity + visibility CSS agar tidak glitch
      gsap.fromTo(
        ".footer-reveal",
        {
          y: 50,
          autoAlpha: 0, // Opacity 0 + Visibility hidden
        },
        {
          y: 0,
          autoAlpha: 1, // Opacity 1 + Visibility visible
          duration: 1.2,
          stagger: 0.1, // Jeda antar elemen
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%", // Memicu animasi lebih awal (saat top footer masuk 85% viewport)
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
    }, footerRef); // Scope selector ke footerRef

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full min-h-[100vh] flex flex-col justify-end overflow-hidden text-stone-100 z-20 bg-stone-950"
    >
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Parallax Image */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-[140%] bg-cover bg-center opacity-30 grayscale mix-blend-luminosity"
          style={{
            backgroundImage: `url(${WEDDING_DATA.footer.backgroundImage})`,
          }}
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/20" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Film Grain Texture */}
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
        className="absolute top-[20%] left-0 w-full flex justify-center items-center z-0 pointer-events-none select-none"
      >
        <span className="font-serif italic text-[25vw] leading-none text-white/[0.03] tracking-tighter mix-blend-overlay blur-sm">
          {monogram}
        </span>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 pb-12 pt-32 flex flex-col h-full justify-between">
        {/* Top Section: Emotional Closing */}
        <div className="flex flex-col items-center text-center mb-24 md:mb-32">
          <div className="footer-reveal mb-6 invisible">
            {" "}
            {/* invisible awal, dihandle autoAlpha GSAP */}
            <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-stone-400 font-medium">
              The Beginning of Forever
            </p>
          </div>

          <h2 className="footer-reveal font-serif text-7xl md:text-[9rem] leading-[0.85] tracking-tight text-stone-100 mix-blend-screen invisible">
            Thank You
          </h2>

          <div className="footer-reveal mt-8 max-w-lg invisible">
            <p className="font-serif italic text-xl md:text-2xl text-stone-300/80 leading-relaxed">
              "For being part of our story, sharing our joy, and making this day
              unforgettable."
            </p>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-white/10 mb-16 footer-line origin-left" />

        {/* Bottom Grid: Information */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start mb-20">
          {/* Col 1: Brand/Names (Span 4) */}
          <div className="md:col-span-4 flex flex-col space-y-6">
            <h3 className="footer-reveal font-serif text-4xl md:text-5xl text-white invisible">
              {WEDDING_DATA.couple.groom.firstName} <br />
              <span className="italic text-stone-500">&</span>{" "}
              {WEDDING_DATA.couple.bride.firstName}
            </h3>
            <div className="footer-reveal flex gap-4 pt-2 invisible">
              {WEDDING_DATA.footer.socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center overflow-hidden hover:border-white transition-colors duration-500"
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <Instagram className="w-4 h-4 text-white group-hover:text-stone-950 relative z-10 transition-colors duration-500" />
                </a>
              ))}
              <button className="group relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center overflow-hidden hover:border-white transition-colors duration-500">
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <Share2 className="w-4 h-4 text-white group-hover:text-stone-950 relative z-10 transition-colors duration-500" />
              </button>
            </div>
          </div>

          {/* Col 2: Navigation (Span 2) - FIXED MENU VISIBILITY */}
          <div className="md:col-span-2 flex flex-col space-y-4">
            <h4 className="footer-reveal text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-2 invisible">
              Menu
            </h4>
            {["Our Story", "The Event", "Gallery", "RSVP"].map((item) => (
              <div key={item} className="footer-reveal invisible">
                {" "}
                {/* Wrap dalam div invisible agar animasi smooth */}
                <a
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className="inline-block text-sm text-stone-300 hover:text-white hover:translate-x-2 transition-all duration-300 tracking-widest  py-1 fonts-serif"
                >
                  {item}
                </a>
              </div>
            ))}
          </div>

          {/* Col 3: Details (Span 3) */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h4 className="footer-reveal text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-2 invisible">
              The Venue
            </h4>
            <div className="footer-reveal flex flex-col space-y-1 invisible">
              <span className="text-xl font-serif italic text-white">
                {WEDDING_DATA.hero.location}
              </span>
              <span className="text-xs text-stone-400 uppercase tracking-wider font-light">
                Grand Ballroom & Garden
              </span>
              <div className="flex items-center gap-2 mt-2 text-stone-500 text-xs tracking-widest hover:text-white cursor-pointer transition-colors">
                <MapPin className="w-3 h-3" />
                <span>View Map</span>
              </div>
            </div>
          </div>

          {/* Col 4: Scroll Top (Span 3 - Aligned Right) */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between h-full">
            <button
              onClick={scrollToTop}
              className="footer-reveal group flex items-center gap-4 cursor-pointer invisible"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 group-hover:text-white transition-colors font-bold">
                Back to Top
              </span>
              <div className="w-16 h-16 rounded-full bg-stone-800/50 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <ArrowUp className="w-5 h-5 text-white group-hover:text-stone-950 transition-colors duration-500" />
              </div>
            </button>
          </div>
        </div>

        {/* Footer Bottom: Copyright */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
          <p className="footer-reveal text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold invisible">
            © {weddingYear} — All Rights Reserved
          </p>

          <div className="footer-reveal hidden md:flex items-center gap-2 invisible">
            <span className="w-1 h-1 rounded-full bg-stone-700" />
            <span className="w-16 h-[1px] bg-stone-800" />
            <span className="w-1 h-1 rounded-full bg-stone-700" />
          </div>

          <p className="footer-reveal flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold mt-4 md:mt-0 invisible">
            Made with{" "}
            <Heart className="w-3 h-3 text-stone-800 fill-stone-800" /> by Avela
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
