"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { WEDDING_DATA } from "../data";

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define navigation items based on the landing page sections
  const navItems = [
    { name: "Couple", href: "#couple" },
    { name: "Schedule", href: "#roundown-acara" },
    { name: "Gallery", href: "#gallery" },
    { name: "RSVP", href: "#ucapan-rsvp" },
  ];

  // Construct Initials (e.g., C & A)
  const initials = `${WEDDING_DATA.couple.groom.firstName.charAt(
    0
  )} & ${WEDDING_DATA.couple.bride.firstName.charAt(0)}`;
  const fullNames = `${WEDDING_DATA.couple.groom.firstName} & ${WEDDING_DATA.couple.bride.firstName}`;

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Initial state: Hidden above the viewport
    gsap.set(nav, {
      yPercent: -100,
      autoAlpha: 0,
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const showThreshold = 100; // Show navbar after scrolling 100px

      if (scrollY > showThreshold) {
        // Slide In (Visible State)
        gsap.to(nav, {
          yPercent: 0,
          autoAlpha: 1,
          width: "85%",
          minWidth: "340px",
          maxWidth: "1200px",
          marginTop: "20px",
          borderRadius: "9999px",
          backgroundColor: "rgba(249, 248, 246, 0.9)", // bg-stone-50 (cream) with opacity
          color: "#000000", // Black text
          backdropFilter: "blur(12px)",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          border: "1px solid rgba(0, 0, 0, 0.05)", // subtle border
          boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.05)",
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      } else {
        // Slide Out (Hidden State)
        gsap.to(nav, {
          yPercent: -100,
          autoAlpha: 0,
          marginTop: "0px",
          width: "100%", // Reset width while hiding to prevent layout jumps
          duration: 0.4,
          ease: "power3.in",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Outer container to ensure centering when fixed */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
        <nav
          ref={navRef}
          className="pointer-events-auto text-stone-900 flex justify-between items-center w-full invisible"
        >
          {/* Logo */}
          <div className="text-xl md:text-2xl font-serif font-bold tracking-tight shrink-0 flex items-center">
            <a
              href="#"
              className="text-stone-900 hover:text-stone-500 transition-colors"
            >
              {initials}
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-sans text-xs tracking-[0.2em] uppercase">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-stone-500 transition-colors relative group text-stone-900 font-bold"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-1 text-stone-900"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-stone-50 flex flex-col p-8 md:hidden animate-in slide-in-from-top-10 fade-in duration-300">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-serif font-bold text-stone-900">
              {fullNames}
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-white rounded-full text-stone-900 border border-stone-200"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-8 items-center text-center justify-center flex-grow pb-20">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-3xl font-serif italic text-stone-900 hover:text-stone-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#ucapan-rsvp"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-8 px-8 py-3 border border-stone-900 text-stone-900 font-sans text-xs uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors"
            >
              RSVP Now
            </a>
          </div>
        </div>
      )}
    </>
  );
};
