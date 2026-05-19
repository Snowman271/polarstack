"use client";

import { motion, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const metrics = [
  { label: "Traffic", value: "+70%", color: "#4a9b6f" },
  { label: "Leads Generated", value: "+50%", color: "#4a9b6f" },
  { label: "Bounce Rate", value: "-42%", color: "#2d6a4f" },
];

const floatVariants = [
  { y: [0, -10, 0], duration: 5.2 },
  { y: [0, -7, 0], duration: 4.0 },
  { y: [0, -9, 0], duration: 6.1 },
];

// Each card has a default side and an alternate side it flips to on collision
const POS: [React.CSSProperties, React.CSSProperties][] = [
  [{ top: "18%", left: "-10%" },   { top: "18%",    right: "-8%" }],
  [{ top: "48%", right: "-8%" },   { top: "48%",    left: "-10%" }],
  [{ bottom: "14%", left: "-6%" }, { bottom: "14%", right: "-8%" }],
];

const phrases = [
  "your space alive.",
  "your home a sanctuary.",
  "your office inspiring.",
  "any room feel lush.",
];

function useTypewriter(phrases: string[], typeSpeed = 55, pauseMs = 5000) {
  const [display, setDisplay] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [pausing, setPausing] = useState(false);

  useEffect(() => {
    if (pausing) {
      const t = setTimeout(() => {
        setPausing(false);
        setCharIndex(0);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, pauseMs);
      return () => clearTimeout(t);
    }
    const current = phrases[phraseIndex];
    if (charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplay(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, typeSpeed);
      return () => clearTimeout(t);
    } else {
      setPausing(true);
    }
  }, [charIndex, phraseIndex, pausing, phrases, typeSpeed, pauseMs]);

  return display;
}

export default function HeroVisual() {
  const typed = useTypewriter(phrases);

  // Per-card drag offsets — kept as motion values so we can reset on flip
  const x0 = useMotionValue(0); const y0 = useMotionValue(0);
  const x1 = useMotionValue(0); const y1 = useMotionValue(0);
  const x2 = useMotionValue(0); const y2 = useMotionValue(0);
  const mv = [[x0, y0], [x1, y1], [x2, y2]];

  const [flipped, setFlipped] = useState([false, false, false]);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const wasOverlapping = useRef([false, false, false]);

  const flipCard = (i: number) => {
    // Reset drag offset so the flip position is clean
    mv[i][0].set(0);
    mv[i][1].set(0);
    setFlipped((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const checkCollisions = (draggedIdx: number) => {
    const draggedEl = cardRefs.current[draggedIdx];
    if (!draggedEl) return;
    const a = draggedEl.getBoundingClientRect();

    metrics.forEach((_, i) => {
      if (i === draggedIdx) return;
      const el = cardRefs.current[i];
      if (!el) return;
      const b = el.getBoundingClientRect();
      const overlapping = !(
        a.right < b.left || a.left > b.right ||
        a.bottom < b.top || a.top > b.bottom
      );
      // Only flip on first contact — prevents rapid toggling
      if (overlapping && !wasOverlapping.current[i]) flipCard(i);
      wasOverlapping.current[i] = overlapping;
    });
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 55% 45%, rgba(61,220,176,0.1) 0%, transparent 65%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative w-full max-w-[580px]"
      >
        <motion.div
          animate={{ y: [0, -11, 0], rotate: [0, 0.4, 0, -0.4, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
        >
          {/* Browser frame */}
          <div className="glass rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-[#0d1117] px-4 py-3 flex items-center gap-3 border-b border-[rgba(61,220,176,0.08)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] opacity-80" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e] opacity-80" />
                <div className="w-3 h-3 rounded-full bg-[#28c840] opacity-80" />
              </div>
              <div className="flex-1 bg-[rgba(255,255,255,0.04)] rounded-md px-3 py-1 text-xs text-slate-500 font-mono">
                verdantplants.co
              </div>
            </div>

            <div style={{ background: "#f5f0e8", fontSize: "0.6rem" }} className="overflow-hidden">
              {/* Nav */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ background: "#1a2e20", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span style={{ fontSize: "0.72rem", color: "#e8f5e9", letterSpacing: "0.18em", fontWeight: 700 }}>
                  VERDANT
                </span>
                <div className="flex items-center gap-4" style={{ color: "#7aab8a", fontSize: "0.58rem" }}>
                  <span>Shop</span>
                  <span>Journal</span>
                  <span>About</span>
                  <span
                    className="font-semibold text-white"
                    style={{ background: "#3a7d55", fontSize: "0.55rem", borderRadius: "4px", padding: "4px 9px", letterSpacing: "0.04em" }}
                  >
                    Shop Now
                  </span>
                </div>
              </div>

              {/* Hero — full-width image layout */}
              <div className="relative w-full overflow-hidden" style={{ height: "170px" }}>
                <Image src="/everglow.jpg" alt="Afterglow Echeveria" fill className="object-cover object-center" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(247,244,239,0.94) 38%, transparent 75%)" }} />
                <div className="absolute inset-0 flex flex-col justify-center px-8 gap-1.5">
                  <div style={{ fontSize: "0.48rem", color: "#8a9e8e", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    New arrivals · Spring 2025
                  </div>
                  <h2 className="font-bold" style={{ fontSize: "0.95rem", lineHeight: 1.2, color: "#0f1f14" }}>
                    Plants that<br />
                    <span style={{ color: "#3a7d55" }}>
                      {typed}
                      <span style={{ display: "inline-block", width: "1px", height: "0.9em", background: "#3a7d55", marginLeft: "1px", verticalAlign: "text-bottom", animation: "blink 1s step-end infinite" }} />
                    </span>
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold text-white" style={{ background: "#1a2e20", fontSize: "0.52rem", borderRadius: "4px", padding: "4px 9px" }}>
                      Shop Now
                    </span>
                    <span style={{ color: "#3a7d55", fontSize: "0.5rem", borderBottom: "1px solid #3a7d5580" }}>200+ varieties</span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-8 text-right">
                  <div className="font-semibold" style={{ fontSize: "0.52rem", color: "white", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>Afterglow Echeveria</div>
                  <div className="font-bold" style={{ fontSize: "0.6rem", color: "white", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>$28</div>
                </div>
              </div>

              {/* Category strip */}
              <div className="flex gap-2 px-5 pt-3 pb-4">
                {["Tropicals", "Succulents", "Flowering", "Pots & Soil"].map((label) => (
                  <div
                    key={label}
                    className="flex-1 flex items-center justify-center rounded-lg py-1.5"
                    style={{ background: "white", border: "1px solid #ddeae0" }}
                  >
                    <span style={{ fontSize: "0.48rem", color: "#2d6a4f", fontWeight: 600, letterSpacing: "0.03em" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-[22%] left-[8%] right-[8%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(61,220,176,0.3), transparent)" }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Draggable metric cards */}
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className="absolute"
            style={{
              ...POS[i][flipped[i] ? 1 : 0],
              transition: "top 0.4s cubic-bezier(0.34,1.56,0.64,1), bottom 0.4s cubic-bezier(0.34,1.56,0.64,1), left 0.4s cubic-bezier(0.34,1.56,0.64,1), right 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              zIndex: draggingIdx === i ? 50 : 1,
            }}
          >
            <motion.div
              ref={(el) => { cardRefs.current[i] = el as HTMLDivElement | null; }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
              drag
              dragMomentum={false}
              dragElastic={0.08}
              style={{ x: mv[i][0], y: mv[i][1], cursor: "grab", touchAction: "none" }}
              whileDrag={{ scale: 1.06 }}
              onDragStart={() => setDraggingIdx(i)}
              onDrag={() => checkCollisions(i)}
              onDragEnd={() => {
                setDraggingIdx(null);
                wasOverlapping.current = [false, false, false];
              }}
            >
              <motion.div
                animate={{ y: floatVariants[i].y }}
                transition={{
                  duration: floatVariants[i].duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.1 + i * 0.55,
                }}
                className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: "#f5f0e8",
                  border: `1px solid ${metric.color}55`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: metric.color }}
                />
                <div>
                  <div className="text-[10px] leading-none mb-1" style={{ color: "#5a6e5f" }}>
                    {metric.label}
                  </div>
                  <div className="text-sm font-bold font-display" style={{ color: metric.color }}>
                    {metric.value}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
