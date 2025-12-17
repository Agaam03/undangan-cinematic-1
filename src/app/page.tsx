"use client";
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Couple from "../components/Couple";
import Schedule from "../components/Schedule";
import LoveStory from "../components/LoveStory";
import Gallery from "../components/Gallery";
import GiftSection from "../components/Gift";
import RSVP from "../components/RSVP";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import SplashScreen from "@/components/SplashScreen";
import { Volume2, VolumeX } from "lucide-react";

const Page: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  // Mencegah scroll saat SplashScreen aktif
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpened]);

  return (
    <div className="min-h-screen text-stone-900 selection:bg-stone-400 selection:text-white overflow-hidden">
      {!isOpened && <SplashScreen onOpen={() => setIsOpened(true)} />}

      <Navbar />
      {/* Floating Audio Control Button */}
      {isOpened && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="fixed bottom-6 right-6 z-[60] w-12 h-12 bg-white/80 backdrop-blur-md border border-stone-200 rounded-full flex items-center justify-center text-stone-900 shadow-xl transition-all hover:scale-110 active:scale-90 group"
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? (
            <VolumeX
              size={20}
              className="text-stone-400 group-hover:text-stone-900"
            />
          ) : (
            <Volume2 size={20} className="text-stone-900 animate-pulse" />
          )}
          {/* Subtle Ring animation for unmuted state */}
          {!isMuted && (
            <span className="absolute inset-0 rounded-full border border-stone-900 animate-ping opacity-20"></span>
          )}
        </button>
      )}
      <main
        className={`relative transition-opacity duration-1000 ${
          isOpened ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Fixed Background Video Layer (Rendered inside Hero) */}
        <Hero />

        <div className="relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] ">
          <Intro />
          <Couple />
          <Schedule />
          {/* Mengirimkan state isOpened ke LoveStory */}
          <LoveStory isOpened={isOpened} isMuted={isMuted} />
          <Gallery />
          <GiftSection />
          <RSVP />
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Page;
