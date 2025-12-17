"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X, Calendar } from "lucide-react";
import gsap from "gsap";
import { WEDDING_DATA } from "../data";

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items mapping
  const navItems = [
    { name: "Couple", href: "#couple" },
    { name: "Schedule", href: "#roundown-acara" },
    { name: "Gallery", href: "#gallery" },
    { name: "Story", href: "#love-story" },
    { name: "RSVP", href: "#ucapan-rsvp" },
  ];

  const initials = `${WEDDING_DATA.couple.groom.firstName.charAt(
    0
  )} & ${WEDDING_DATA.couple.bride.firstName.charAt(0)}`;
  const fullNames = `${WEDDING_DATA.couple.groom.firstName} & ${WEDDING_DATA.couple.bride.firstName}`;

  // Handle Desktop Scroll Animation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { yPercent: -100, autoAlpha: 0 });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 150) {
        gsap.to(nav, {
          yPercent: 0,
          autoAlpha: 1,
          width: "90%",
          maxWidth: "1000px",
          marginTop: "20px",
          borderRadius: "100px",
          backgroundColor: "rgba(249, 248, 246, 0.85)",
          backdropFilter: "blur(15px)",
          padding: "0.6rem 2rem",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.1)",
          duration: 0.6,
          ease: "power4.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(nav, {
          yPercent: -100,
          autoAlpha: 0,
          duration: 0.4,
          ease: "power3.in",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Mobile Menu Animations
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Disable body scroll when menu is open
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();

      gsap.set(mobileMenuRef.current, { yPercent: -100 });
      gsap.set(".mobile-link", { opacity: 0, y: 20 });

      tl.to(mobileMenuRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: "expo.out",
      }).to(
        ".mobile-link",
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => setIsMobileMenuOpen(false),
    });

    tl.to(".mobile-link", {
      opacity: 0,
      y: -10,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.in",
    }).to(
      mobileMenuRef.current,
      {
        yPercent: -100,
        duration: 0.6,
        ease: "expo.inOut",
      },
      "-=0.1"
    );
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (isMobileMenuOpen) {
      closeMenu();
    }

    if (element) {
      setTimeout(
        () => {
          window.scrollTo({
            top: element.offsetTop - 80, // Offset for navbar
            behavior: "smooth",
          });
        },
        isMobileMenuOpen ? 700 : 0
      ); // Delay if menu was closing
    }
  };

  return (
    <>
      {/* Desktop/Sticky Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none px-4">
        <nav
          ref={navRef}
          className="pointer-events-auto text-stone-900 flex justify-between items-center w-full invisible"
        >
          {/* Logo */}
          <div className="text-xl md:text-2xl font-serif font-bold tracking-tight shrink-0">
            <a href="#" className="hover:opacity-60 transition-opacity">
              {initials}
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-sans text-[10px] tracking-[0.3em] uppercase font-bold">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="hover:text-stone-400 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-stone-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </nav>
      </div>

      {/* GSAP Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[100] bg-stone-50 flex flex-col items-center justify-center md:hidden"
        >
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="absolute top-8 right-8 p-3 bg-white rounded-full text-stone-900 border border-stone-100 shadow-sm"
          >
            <X size={24} />
          </button>

          {/* Brand */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.5em] text-stone-400 font-bold mb-2">
              The Wedding of
            </span>
            <span className="text-3xl font-serif font-bold text-stone-900">
              {fullNames}
            </span>
          </div>

          {/* Links Container */}
          <div className="flex flex-col gap-6 items-center text-center w-full px-12">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="mobile-link text-4xl font-serif italic text-stone-900 hover:text-stone-400 transition-colors py-2"
              >
                {item.name}
              </a>
            ))}

            <div className="mobile-link w-full max-w-[200px] h-px bg-stone-200 my-4"></div>

            <a
              href="#ucapan-rsvp"
              onClick={(e) => scrollToSection(e, "#ucapan-rsvp")}
              className="mobile-link flex items-center gap-3 px-10 py-4 bg-stone-900 text-stone-50 font-sans text-[10px] uppercase tracking-[0.3em] font-bold rounded-full shadow-xl hover:bg-stone-800 transition-all"
            >
              <Calendar size={14} />
              Confirm RSVP
            </a>
          </div>

          {/* Decorative Footer */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2">
            <div className="h-12 w-px bg-stone-200"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-300 font-bold">
              July 14, 2026 • Kyoto
            </span>
          </div>
        </div>
      )}
    </>
  );
};
