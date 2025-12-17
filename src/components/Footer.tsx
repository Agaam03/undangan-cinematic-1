"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUp, Heart, Instagram, Mail, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../data";

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
      // Content reveal animation
      gsap.from(".footer-content-item", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Background Image Parallax
      gsap.fromTo(
        imageRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Monogram Watermark Parallax
      gsap.to(".footer-watermark", {
        y: -80,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden text-stone-50 z-20"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-stone-900">
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-[130%] bg-cover bg-center opacity-40 scale-110"
          style={{
            backgroundImage: `url(${WEDDING_DATA.footer.backgroundImage})`,
          }}
        />
        {/* Deep dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-900/40 to-stone-950"></div>
      </div>

      {/* Large Monogram Watermark */}
      <div className="footer-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[35rem] font-serif leading-none text-white/[0.03] select-none pointer-events-none whitespace-nowrap z-0">
        {monogram}
      </div>

      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-400/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full px-6 pt-32 pb-12 flex-grow flex flex-col justify-between">
        {/* Upper Section: Main Branding */}
        <div className="text-center space-y-8 mb-20">
          <div className="footer-content-item inline-block">
            <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold border-b border-stone-400/30 pb-2">
              Our New Chapter
            </span>
          </div>
          <h2 className="footer-content-item text-6xl md:text-8xl font-serif italic text-white leading-tight">
            Thank You
          </h2>
          <p className="footer-content-item font-sans text-stone-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed italic">
            "Your presence at our wedding means the world to us. Thank you for
            being a part of our story and for sharing in our joy."
          </p>
        </div>

        {/* Middle Section: Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-y border-white/10 py-16">
          {/* Col 1: Quick Links */}
          <div className="footer-content-item flex flex-col items-center md:items-start space-y-5">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
              Navigation
            </h4>
            <div className="flex flex-col space-y-3 items-center md:items-start">
              {["Couple", "Schedule", "Gallery", "RSVP"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-serif text-lg hover:text-stone-300 transition-colors hover:italic"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Location Info */}
          <div className="footer-content-item flex flex-col items-center md:items-start space-y-5">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
              The Destination
            </h4>
            <div className="text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2 text-stone-200">
                <MapPin className="w-4 h-4 text-stone-400" />
                <span className="font-serif text-lg">
                  {WEDDING_DATA.hero.location}
                </span>
              </div>
              <p className="text-stone-400 text-xs font-sans uppercase tracking-widest">
                Hyatt Regency Kyoto
              </p>
            </div>
          </div>

          {/* Col 3: Hashtag */}
          <div className="footer-content-item flex flex-col items-center space-y-5">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
              Wedding Tag
            </h4>
            <div className="space-y-2">
              {WEDDING_DATA.footer.hashtags.map((tag) => (
                <p
                  key={tag}
                  className="font-serif text-2xl md:text-3xl italic text-white tracking-wide"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>

          {/* Col 4: Socials */}
          <div className="footer-content-item flex flex-col items-center md:items-end space-y-5">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
              Connect With Us
            </h4>
            <div className="flex gap-4">
              {WEDDING_DATA.footer.socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all duration-500 group"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
              <button className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all duration-500 group">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold mt-2">
              @kaiaandleo.official
            </p>
          </div>
        </div>

        {/* Bottom Section: Copyright & Scroll Up */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="footer-content-item text-[9px] uppercase tracking-[0.3em] text-stone-500 font-bold order-2 md:order-1 text-center md:text-left">
            © {weddingYear} {copyrightNames}. <br className="md:hidden" />{" "}
            Crafted with Elegance for the Special Day.
          </div>

          <button
            onClick={scrollToTop}
            className="footer-content-item group flex flex-col items-center gap-3 order-1 md:order-2"
          >
            <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 group-hover:bg-stone-50 group-hover:text-stone-900 group-hover:border-stone-50 transition-all duration-700 relative overflow-hidden">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-8 transition-all duration-500 absolute" />
              <ArrowUp className="w-4 h-4 translate-y-8 group-hover:translate-y-0 transition-all duration-500 absolute" />
            </div>
            <span className="text-[8px] uppercase tracking-[0.4em] text-stone-500 font-bold group-hover:text-stone-200 transition-colors">
              Back to Top
            </span>
          </button>

          <div className="footer-content-item flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-stone-500 font-bold order-3">
            <span>By Avela White</span>
            <div className="w-6 h-px bg-stone-700"></div>
            <Heart className="w-3 h-3 text-stone-600 fill-stone-600/30" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
