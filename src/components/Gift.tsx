"use client";

import React, { useState, useEffect, useRef } from "react";
import { Gift, Copy, Check, CreditCard, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../data";

const GiftSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"bank" | "address" | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const { gift } = WEDDING_DATA;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".gift-card", {
        scrollTrigger: {
          trigger: ".gift-card",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    // Changed bg-stone-50 to bg-stone-50/70 backdrop-blur-sm
    <section ref={containerRef} className="py-4 px-4 bg-white relative">
      <div className="max-w-4xl mx-auto">
        {/* Main Card Container */}
        <div className="gift-card bg-white/90 backdrop-blur-md border border-stone-200 p-8 md:p-16 relative text-center">
          {/* Floating Icon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full border border-stone-200">
            <Gift className="w-6 h-6 text-stone-900" />
          </div>

          <h2 className="font-script text-5xl md:text-6xl mb-6 text-stone-900 mt-6">
            Wedding Gift
          </h2>
          <p className="font-sans text-stone-800 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
            {gift.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <button
              onClick={() => setActiveTab(activeTab === "bank" ? null : "bank")}
              className={`px-8 py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${activeTab === "bank"
                ? "bg-stone-900 text-stone-50 border-stone-900"
                : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-900 hover:text-stone-900"
                }`}
            >
              <CreditCard className="w-4 h-4" />
              Digital Transfer
            </button>
            <button
              onClick={() =>
                setActiveTab(activeTab === "address" ? null : "address")
              }
              className={`px-8 py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${activeTab === "address"
                ? "bg-stone-900 text-stone-50 border-stone-900"
                : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-900 hover:text-stone-900"
                }`}
            >
              <MapPin className="w-4 h-4" />
              Send Gift
            </button>
          </div>

          {/* Content Area - Bank Transfer */}
          {activeTab === "bank" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {gift.accounts.map((account, index) => (
                <div
                  key={index}
                  className="bg-stone-50 p-6 border border-stone-200 text-left group hover:border-stone-400 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-800">
                      {account.bankName}
                    </span>
                    <img
                      src={account.logoUrl}
                      alt={account.bankName}
                      className="h-4 opacity-70 grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-mono text-xl text-stone-900 font-bold tracking-wider">
                      {account.accountNumber}
                    </p>
                    <button
                      onClick={() =>
                        handleCopy(
                          account.accountNumber.replace(/\s/g, ""),
                          `acc${index}`
                        )
                      }
                      className="text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      {copiedIndex === `acc${index}` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm font-serif italic text-stone-800">
                    a/n {account.holderName}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Content Area - Address */}
          {activeTab === "address" && (
            <div className="bg-stone-50 p-8 border border-stone-200 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-800 block mb-2">
                    Delivery Address
                  </span>
                  <p className="font-display text-lg text-stone-900 leading-snug">
                    {gift.address.street},<br />
                    {gift.address.city}
                  </p>
                  <p className="text-sm text-stone-600 mt-2 font-sans">
                    Receiver: {gift.address.receiver}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      `${gift.address.street}, ${gift.address.city}`,
                      "addr"
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-stone-50 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors rounded-sm border border-stone-900"
                >
                  {copiedIndex === "addr" ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>Copy Address</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
