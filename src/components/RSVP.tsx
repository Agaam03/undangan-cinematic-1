"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, MessageSquare, CheckCircle, Send, ChevronDown } from "lucide-react";
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

interface Option {
  value: string | number;
  label: string;
}

const CustomSelect = ({
  value,
  onChange,
  options,
  disabled,
}: {
  value: string | number;
  onChange: (value: any) => void;
  options: Option[];
  disabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div
      className={`relative ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      ref={selectRef}
    >
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full border-0 border-b bg-transparent py-2 flex justify-between items-center cursor-pointer transition-colors ${isOpen ? "border-stone-900" : "border-stone-300 hover:border-stone-400"
          }`}
      >
        <span className="font-serif text-lg font-medium text-stone-900">
          {selectedOption ? selectedOption.label : "Select..."}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-stone-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full left-0 top-full mt-2 bg-white border border-stone-200 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer font-serif text-lg transition-colors ${option.value === value
                ? "bg-stone-100 text-stone-900 font-medium"
                : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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
      gsap.from(".rsvp-form-col", {
        scrollTrigger: { trigger: ".rsvp-form-col", start: "top 80%" },
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

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
    <section
      ref={containerRef}
      id="ucapan-rsvp"
      className="py-24 px-6 md:px-12 bg-white relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold text-stone-400 mb-4 block">
            Join Our Celebration
          </span>
          <h2 className="font-script text-5xl md:text-6xl text-stone-900">
            RSVP
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-stone-300" />
            <span className="h-2 w-2 rounded-full bg-stone-400" />
            <span className="h-px w-12 bg-stone-300" />
          </div>
          <p className="mt-6 text-stone-600 font-sans text-sm md:text-base max-w-lg mx-auto">
            We would be honored by your presence. Please confirm your attendance by{" "}
            <span className="font-semibold text-stone-800">{WEDDING_DATA.rsvp.deadline}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column: RSVP Form */}
          <div className="rsvp-form-col">
            <div className="bg-white border border-stone-200 p-8 md:p-10">
              <h3 className="font-script text-3xl text-stone-900 mb-8 text-center">
                Confirm Your Attendance
              </h3>

              {submitted ? (
                <div className="text-center py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 text-stone-900 mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-script text-3xl text-stone-900 mb-2">
                    Thank You!
                  </h4>
                  <p className="text-stone-600 font-sans mb-8 text-sm">
                    We have received your response and warm wishes.
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 underline underline-offset-4 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Input */}
                  <div className="relative">
                    <label className="text-xs font-sans text-stone-500 uppercase tracking-widest font-medium block mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="block w-full border-0 border-b border-stone-200 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:ring-0 text-lg font-serif placeholder:text-stone-400 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Attendance & Guests Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="text-xs font-sans text-stone-500 uppercase tracking-widest font-medium block mb-2">
                        Attendance
                      </label>
                      <CustomSelect
                        value={formData.attendance}
                        onChange={(value) =>
                          setFormData({ ...formData, attendance: value })
                        }
                        options={[
                          { value: "attending", label: "Will Attend" },
                          { value: "not_attending", label: "Cannot Attend" },
                        ]}
                      />
                    </div>

                    <div
                      className={`relative transition-opacity duration-300 ${formData.attendance === "not_attending"
                        ? "opacity-30 pointer-events-none"
                        : "opacity-100"
                        }`}
                    >
                      <label className="text-xs font-sans text-stone-500 uppercase tracking-widest font-medium block mb-2">
                        Number of Guests
                      </label>
                      <CustomSelect
                        value={formData.guests}
                        onChange={(value) =>
                          setFormData({
                            ...formData,
                            guests: Number(value),
                          })
                        }
                        disabled={formData.attendance === "not_attending"}
                        options={[1, 2, 3, 4].map((num) => ({
                          value: num,
                          label: `${num} Person(s)`,
                        }))}
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <label className="text-xs font-sans text-stone-500 uppercase tracking-widest font-medium block mb-2">
                      Your Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="block w-full border-0 border-b border-stone-200 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:ring-0 text-lg font-serif placeholder:text-stone-400 resize-none"
                      placeholder="Write a message for the couple..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-stone-900 text-stone-50 py-4 px-8 flex items-center justify-center gap-3 hover:bg-stone-800 transition-all duration-300 group"
                  >
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.2em]">
                      Confirm & Send
                    </span>
                    <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Message Wall */}
          <div className="rsvp-msg-col">
            <div className="bg-white border border-stone-200 p-6 md:p-8 h-[600px] flex flex-col">
              <div className="mb-6 flex items-end justify-between border-b border-stone-200 pb-4">
                <div>
                  <h3 className="font-script text-3xl md:text-4xl text-stone-900">
                    Wedding Wishes
                  </h3>
                  <p className="text-xs font-sans tracking-widest uppercase text-stone-500 mt-1">
                    {messages.length} Messages
                  </p>
                </div>
                <MessageSquare className="w-5 h-5 text-stone-400" />
              </div>

              {/* Scrollable Area */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-hide">
                {messages.map((msg, idx) => (
                  <div
                    key={msg.id}
                    className="p-2 border-b border-stone-200 hover:border-stone-300 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 fill-mode-backwards"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-serif text-base font-semibold text-stone-900 leading-none mb-1">
                            {msg.name}
                          </h4>
                          <span
                            className={`inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold ${msg.attendance === "attending"
                              ? "bg-stone-100 text-stone-700"
                              : "bg-stone-100 text-stone-400"
                              }`}
                          >
                            {msg.attendance === "attending"
                              ? "Will Attend"
                              : "Cannot Attend"}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-stone-400 font-sans">
                        {msg.date}
                      </span>
                    </div>
                    <p className="text-stone-700 text-sm leading-relaxed pl-12">
                      "{msg.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
