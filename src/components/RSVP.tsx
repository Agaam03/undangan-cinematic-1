"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, MessageSquare, CheckCircle, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../data";

interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
  attendance: "attending" | "not_attending";
}

const RSVP: React.FC = () => {
  const [messages, setMessages] = useState<Wish[]>([
    {
      id: "1",
      name: "Sarah & James",
      message:
        "So happy for you two! Can't wait to celebrate in Kyoto. It's going to be magical.",
      date: "2 hours ago",
      attendance: "attending",
    },
    {
      id: "2",
      name: "Uncle Bob",
      message:
        "Wishing you a lifetime of love and happiness. Sorry I can't make the trip.",
      date: "5 hours ago",
      attendance: "not_attending",
    },
    {
      id: "3",
      name: "Elena Gilbert",
      message: "Congratulations Kaia & Leo! See you at the altar.",
      date: "1 day ago",
      attendance: "attending",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    guests: 1,
    message: "",
    attendance: "attending",
  });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Animate Form Column
      gsap.from(".rsvp-form-col", {
        scrollTrigger: { trigger: ".rsvp-form-col", start: "top 80%" },
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Animate Messages Column
      gsap.from(".rsvp-msg-col", {
        scrollTrigger: { trigger: ".rsvp-msg-col", start: "top 80%" },
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newWish: Wish = {
      id: Date.now().toString(),
      name: formData.name,
      message: formData.message,
      date: "Just now",
      attendance: formData.attendance as "attending" | "not_attending",
    };
    setMessages([newWish, ...messages]);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: "", guests: 1, message: "", attendance: "attending" });
  };

  return (
    // Changed bg-stone-100 to bg-stone-50/80 backdrop-blur-sm
    <section
      ref={containerRef}
      id="ucapan-rsvp"
      className="py-24 px-6 md:px-12 bg-stone-50 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {/* Left Column: RSVP Form */}
          <div className="rsvp-form-col flex flex-col justify-center order-2 lg:order-1">
            <div className="mb-10 text-left">
              <span className="text-xs font-sans tracking-[0.4em] uppercase text-stone-600 font-bold block mb-4">
                Celebration
              </span>
              <h2 className="text-5xl md:text-6xl font-serif mb-6 text-stone-900 leading-none font-medium">
                RSVP
              </h2>
              <p className="text-stone-800 font-sans text-lg leading-relaxed max-w-md">
                We would be honored by your presence. Please confirm your
                attendance by{" "}
                <span className="font-bold text-stone-900">
                  {WEDDING_DATA.rsvp.deadline}
                </span>
                .
              </p>
            </div>

            {submitted ? (
              <div className="p-10 bg-white border border-stone-200 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 text-stone-900 mb-6 shadow-sm">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-stone-900 mb-2 font-medium">
                  Thank You!
                </h3>
                <p className="text-stone-800 font-sans mb-8">
                  We have received your response and warm wishes.
                </p>
                <button
                  onClick={resetForm}
                  className="text-xs font-bold uppercase tracking-widest text-stone-600 hover:text-stone-900 underline transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Name Input */}
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="block w-full border-0 border-b border-stone-300 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:ring-0 text-xl font-serif placeholder:text-stone-500 transition-all font-medium"
                    placeholder="Your Name"
                  />
                </div>

                {/* Attendance & Guests Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="text-xs font-sans text-stone-800 uppercase tracking-widest font-bold block mb-2">
                      Attendance
                    </label>
                    <select
                      value={formData.attendance}
                      onChange={(e) =>
                        setFormData({ ...formData, attendance: e.target.value })
                      }
                      className="w-full border-0 border-b border-stone-300 bg-transparent py-2 pr-8 text-stone-900 focus:border-stone-900 focus:ring-0 font-serif text-lg font-medium cursor-pointer [&>option]:text-stone-900"
                    >
                      <option value="attending">Will Attend</option>
                      <option value="not_attending">Cannot Attend</option>
                    </select>
                  </div>

                  <div
                    className={`relative transition-opacity duration-300 ${
                      formData.attendance === "not_attending"
                        ? "opacity-30 pointer-events-none"
                        : "opacity-100"
                    }`}
                  >
                    <label className="text-xs font-sans text-stone-800 uppercase tracking-widest font-bold block mb-2">
                      Number of Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: Number(e.target.value),
                        })
                      }
                      disabled={formData.attendance === "not_attending"}
                      className="w-full border-0 border-b border-stone-300 bg-transparent py-2 pr-8 text-stone-900 focus:border-stone-900 focus:ring-0 font-serif text-lg font-medium cursor-pointer [&>option]:text-stone-900"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} Person(s)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative">
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="block w-full border-0 border-b border-stone-300 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:ring-0 text-xl font-serif placeholder:text-stone-500 resize-none font-medium"
                    placeholder="Write a message for the couple..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-stone-900 text-stone-50 py-4 px-8 flex items-center justify-center gap-3 hover:bg-stone-800 transition-all duration-300 group shadow-md"
                >
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.2em]">
                    Confirm & Send
                  </span>
                  <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Message Wall */}
          <div className="rsvp-msg-col order-1 lg:order-2 bg-white/90 backdrop-blur-md p-8 md:p-12 border border-stone-200 h-[650px] flex flex-col relative shadow-xl">
            <div className="mb-8 flex items-end justify-between border-b border-stone-200 pb-6">
              <div>
                <h3 className="font-serif text-3xl md:text-4xl text-stone-900 font-medium">
                  Wedding Wishes
                </h3>
                <p className="text-xs font-sans tracking-widest uppercase text-stone-600 mt-2 font-bold">
                  {messages.length} Messages
                </p>
              </div>
              <MessageSquare className="w-6 h-6 text-stone-500" />
            </div>

            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className="bg-stone-50/80 p-6 shadow-sm border border-stone-100 hover:border-stone-300 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-2 fill-mode-backwards"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-stone-500 border border-stone-200">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-stone-900 leading-none mb-1">
                          {msg.name}
                        </h4>
                        <span
                          className={`inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-sm ${
                            msg.attendance === "attending"
                              ? "bg-stone-200 text-stone-800"
                              : "bg-stone-200 text-stone-500"
                          }`}
                        >
                          {msg.attendance === "attending"
                            ? "Will Attend"
                            : "Cannot Attend"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-500 font-sans font-bold">
                      {msg.date}
                    </span>
                  </div>
                  <p className="font-serif text-stone-800 text-lg leading-relaxed border-l-2 border-stone-300 pl-4">
                    "{msg.message}"
                  </p>
                </div>
              ))}
            </div>

            {/* Decorative Fade at Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/90 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
