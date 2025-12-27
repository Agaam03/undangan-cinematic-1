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
import MusicPlayer from "@/components/MusicPlayer";

const Page: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  // Prevent scroll when SplashScreen is active
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpened]);

  return (
    <div className="min-h-screen text-stone-900 overflow-hidden bg-ornament">
      {!isOpened && <SplashScreen onOpen={() => setIsOpened(true)} />}

      <Navbar />

      {/* Background Music Player */}
      <MusicPlayer isOpened={isOpened} />

      <main
        className={`relative transition-opacity duration-1000 ${isOpened ? "opacity-100" : "opacity-0"
          }`}
      >
        {/* Fixed Background Video Layer (Rendered inside Hero) */}
        <Hero />

        <div className="relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] ">
          <Intro />
          <Couple />
          <Schedule />
          <LoveStory />
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
