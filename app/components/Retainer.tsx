"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const features = [
  "Priority turnaround on all requests",
  "Unlimited small updates & content changes",
  "Monthly performance audit & report",
  "Proactive bug monitoring & fixes",
  "Feature development (up to 10hrs/mo)",
  "Direct Slack access - no ticket queue",
  "Quarterly design refresh recommendations",
  "Uptime monitoring & incident response",
];

export default function Retainer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="retainer" className="relative py-14 lg:py-32 px-5 sm:px-6 lg:px-12">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(61,220,176,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <span className="text-xs font-medium text-[#3DDCB0] tracking-widest uppercase">
              Still in your corner after launch
            </span>
            <h2 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
              Comprehensive Support
            </h2>
            <div className="mt-6 flex items-baseline gap-2 justify-center lg:justify-start">
              <span className="font-display text-5xl lg:text-6xl font-bold gradient-text">$499</span>
              <span className="text-slate-400 text-lg">/month</span>
            </div>

            <div className="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-[rgba(61,220,176,0.25)] bg-[rgba(61,220,176,0.05)] max-w-full">
              <div className="w-2 h-2 rounded-full bg-[#3DDCB0] animate-pulse flex-shrink-0" />
              <span className="text-sm text-[#3DDCB0] font-medium">
                Start today · first month free with any project
              </span>
            </div>

            <p className="mt-6 text-slate-400 leading-relaxed max-w-md mx-auto lg:mx-0">
              Sites need maintenance. Products need iteration. We don&apos;t disappear after
              launch. Lock in a dedicated slot and we stay in your corner - fast, responsive,
              and already context-aware of your entire build.
            </p>

            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-8 group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#3DDCB0] to-[#00B4D8] text-[#080C10] font-semibold text-sm tracking-wide hover:opacity-90 transition-all teal-glow-sm"
            >
              Get Started
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <div className="text-xs font-medium text-slate-500 mb-5 uppercase tracking-widest">
              What&apos;s included
            </div>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <Check size={13} className="text-[#3DDCB0] flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3DDCB0]" />
              Cancel anytime. No lock-in after the free period.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
