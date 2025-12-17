import React from "react";
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

export default function Page() {
  return (
    <div className="min-h-screen  text-stone-900  selection:text-stone-900 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Couple />
        <Schedule />
        <LoveStory />
        <Gallery />
        <GiftSection />
        <RSVP />
      </main>
      <Footer />
    </div>
  );
}
