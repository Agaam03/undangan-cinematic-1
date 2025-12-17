"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUp, Heart, Instagram } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../data";

const Footer: React.FC = () => {
  const footerContentRef = useRef<HTMLElement>(null);

  // Get first chars for monogram (e.g. "K & L")
  const monogram = `${WEDDING_DATA.couple.groom.firstName.charAt(
    0
  )} & ${WEDDING_DATA.couple.bride.firstName.charAt(0)}`;
  const copyrightNames = `${WEDDING_DATA.couple.bride.firstName} & ${WEDDING_DATA.couple.groom.firstName}`;
  // Approx wedding year
  const weddingYear = new Date(WEDDING_DATA.hero.targetDate).getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Use the footer itself as the trigger
    const triggerElement = footerContentRef.current;

    const ctx = gsap.context(() => {
      // Staggered reveal for footer content
      gsap.from(".footer-item", {
        scrollTrigger: {
          trigger: triggerElement,
          start: "top 60%", // Adjusted trigger point
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Monogram Parallax
      gsap.to(".footer-monogram", {
        y: -50,
        scrollTrigger: {
          trigger: triggerElement,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Background image parallax
      gsap.fromTo(
        ".footer-bg-img",
        { scale: 1.1, yPercent: -5 },
        {
          scale: 1,
          yPercent: 0,
          scrollTrigger: {
            trigger: triggerElement,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, footerContentRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerContentRef}
      className="relative w-full h-[80vh] overflow-hidden text-stone-50 z-0"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Background Monogram Watermark */}
      <div className="footer-monogram absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-serif leading-none text-white/10 select-none pointer-events-none whitespace-nowrap z-0">
        {monogram}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col justify-center px-6">
        {/* Main Content Grid - Centered Vertically */}
        <div className="flex-grow flex items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-b border-white/20 pb-12">
            {/* Column 1: Navigation */}
            <div className="footer-item flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-300 mb-2">
                Explore
              </h3>
              <a
                href="#couple"
                className="font-serif text-xl hover:text-stone-300 hover:italic transition-all duration-300"
              >
                The Couple
              </a>
              <a
                href="#roundown-acara"
                className="font-serif text-xl hover:text-stone-300 hover:italic transition-all duration-300"
              >
                The Schedule
              </a>
              <a
                href="#gallery"
                className="font-serif text-xl hover:text-stone-300 hover:italic transition-all duration-300"
              >
                Moments
              </a>
              <a
                href="#ucapan-rsvp"
                className="font-serif text-xl hover:text-stone-300 hover:italic transition-all duration-300"
              >
                RSVP
              </a>
            </div>

            {/* Column 2: Main Message */}
            <div className="footer-item flex flex-col items-center text-center space-y-6">
              <h2 className="font-serif text-4xl md:text-5xl text-stone-50 italic font-medium">
                Thank You
              </h2>
              <p className="font-sans text-sm md:text-base leading-relaxed text-stone-200 max-w-sm">
                It is an honor and happiness for us if you are willing to attend
                and give your blessings to us. We look forward to celebrating
                with you in {WEDDING_DATA.hero.location.split(",")[0]}.
              </p>
              <p className="font-serif italic text-stone-300 text-lg">
                Wassalamu’alaikum Wr. Wb.
              </p>
            </div>

            {/* Column 3: Social & Hashtag */}
            <div className="footer-item flex flex-col items-center md:items-end text-center md:text-right space-y-6">
              <div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-300 mb-3">
                  Wedding Hashtag
                </h3>
                {WEDDING_DATA.footer.hashtags.map((tag, idx) => (
                  <p key={idx} className="font-serif text-2xl text-stone-100">
                    {tag}
                  </p>
                ))}
              </div>

              <div className="pt-4">
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-300 mb-3">
                  Follow Us
                </h3>
                <div className="flex gap-4 justify-center md:justify-end">
                  {WEDDING_DATA.footer.socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-stone-900 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="footer-item text-[10px] uppercase tracking-widest text-stone-400 font-bold order-2 md:order-1">
            © {weddingYear} {copyrightNames}. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="footer-item group flex flex-col items-center gap-2 order-1 md:order-2"
          >
            <div className="w-10 h-10 rounded-full border border-stone-500 flex items-center justify-center text-stone-300 group-hover:bg-stone-50 group-hover:text-stone-900 group-hover:border-stone-50 transition-all duration-500">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </div>
            <span className="text-[9px] uppercase tracking-widest text-stone-400 group-hover:text-stone-200 transition-colors">
              Back to Top
            </span>
          </button>

          <div className="footer-item flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 font-bold order-3">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500/50" />
            <span>by Avela White</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
