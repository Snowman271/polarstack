"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Star, Quote } from "lucide-react";
import HeroVisual from "./HeroVisual";
import AuroraBackground from "./AuroraBackground";
import AuditModal from "./AuditModal";

const reviews = [
  { quote: "Our bookings have pretty much doubled and I really love how it turned out. Really happy with it.", name: "Pam S.", company: "Polaris Adventures" },
  { quote: "Guests comment on the website before they've even arrived. It sells the experience.", name: "Rachael H.", company: "Desert Ironwoods" },
  { quote: "Launched in days, not weeks. Clean, fast, and exactly what we needed.", name: "Sarah M.", company: "PolarSentry" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7 },
});

export default function Hero() {
  const [auditOpen, setAuditOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden pt-16"
      >
        <AuroraBackground />

        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(61,220,176,1) 1px, transparent 1px), linear-gradient(90deg, rgba(61,220,176,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-10 pb-14 lg:py-20">
          <div className="grid lg:grid-cols-[42%_58%] gap-10 items-center">

            {/* Left — copy */}
            <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.div
                {...fadeUp(0)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(61,220,176,0.2)] bg-[rgba(61,220,176,0.05)] text-xs text-[#3DDCB0] font-medium tracking-widest uppercase max-w-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DDCB0] animate-pulse flex-shrink-0" />
                <span>Free homepage · try before you commit</span>
              </motion.div>

              <div className="space-y-5">
                <motion.h1
                  {...fadeUp(0.1)}
                  className="font-display text-5xl sm:text-6xl lg:text-[64px] font-bold leading-[1.05] tracking-tight text-white"
                >
                  Make your
                  <br />
                  website your
                  <br />
                  <span className="gradient-text">best closer.</span>
                </motion.h1>

                <motion.p
                  {...fadeUp(0.22)}
                  className="text-lg text-slate-400 max-w-md leading-relaxed mx-auto lg:mx-0"
                >
                  Most business websites look fine and do nothing. We build sites
                  engineered to convert visitors into paying customers - measurably,
                  repeatably.
                </motion.p>
              </div>

              <motion.div {...fadeUp(0.34)} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setAuditOpen(true)}
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#3DDCB0] to-[#00B4D8] text-[#080C10] font-semibold text-sm tracking-wide hover:opacity-90 transition-all teal-glow-sm"
                >
                  Get a free audit
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[rgba(61,220,176,0.15)] text-slate-400 text-sm font-medium hover:border-[rgba(61,220,176,0.4)] hover:text-white transition-all"
                >
                  See our work
                </button>
              </motion.div>

              <motion.div
                {...fadeUp(0.46)}
                className="flex items-center gap-6 sm:gap-8 pt-4 border-t border-[rgba(255,255,255,0.05)] justify-center lg:justify-start w-full"
              >
                {[
                  { num: "20+", label: "Sites launched" },
                  { num: "100%", label: "Custom built" },
                  { num: "24h", label: "Audit turnaround" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-display font-bold text-white">{stat.num}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

            </div>

            {/* Right — browser mockup (desktop only) */}
            <div className="hidden lg:flex relative h-[620px] items-center">
              <HeroVisual />
            </div>
          </div>

          {/* Reviews */}
          <motion.div {...fadeUp(0.54)} className="mt-10 lg:mt-14">
            <div className="flex items-center justify-center gap-1.5 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
              ))}
              <span className="ml-2 text-xs text-slate-500 font-mono">5.0 · verified clients</span>
            </div>

            {/* Mobile: auto-rotating single review */}
            <div className="md:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-2 px-5 py-5 rounded-xl border border-[rgba(61,220,176,0.08)] bg-[rgba(61,220,176,0.02)] text-center"
                >
                  <Quote size={14} className="text-[rgba(61,220,176,0.4)] flex-shrink-0" />
                  <p className="text-sm text-slate-400 leading-relaxed">{reviews[activeReview].quote}</p>
                  <span className="text-[11px] text-slate-600 font-medium mt-1">
                    {reviews[activeReview].name} · {reviews[activeReview].company}
                  </span>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center gap-2 mt-3">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveReview(i)}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{ background: i === activeReview ? "#3DDCB0" : "rgba(255,255,255,0.15)" }}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: all 3 side by side */}
            <div className="hidden md:grid md:grid-cols-3 gap-4">
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl border border-[rgba(61,220,176,0.08)] bg-[rgba(61,220,176,0.02)] text-center"
                >
                  <Quote size={14} className="text-[rgba(61,220,176,0.4)] flex-shrink-0" />
                  <p className="text-xs text-slate-400 leading-relaxed">{review.quote}</p>
                  <span className="text-[11px] text-slate-600 font-medium mt-1">
                    {review.name} · {review.company}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
