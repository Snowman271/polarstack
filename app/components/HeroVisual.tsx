"use client";

import { motion, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

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

              {/* Hero */}
              <div className="flex gap-4 px-5 pt-5 pb-4" style={{ background: "#f7f4ef" }}>
                <div className="flex-1 space-y-3">
                  <div style={{ fontSize: "0.52rem", color: "#8a9e8e", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    New arrivals · Spring 2025
                  </div>
                  <h2 className="font-bold leading-tight" style={{ fontSize: "1.05rem", lineHeight: 1.2, color: "#0f1f14" }}>
                    Plants that make<br />
                    <span style={{ color: "#3a7d55" }}>
                      {typed}
                      <span
                        style={{
                          display: "inline-block",
                          width: "1px",
                          height: "0.9em",
                          background: "#3a7d55",
                          marginLeft: "1px",
                          verticalAlign: "text-bottom",
                          animation: "blink 1s step-end infinite",
                        }}
                      />
                    </span>
                  </h2>
                  <p style={{ fontSize: "0.57rem", color: "#6b7e6f", lineHeight: 1.6, maxWidth: "92%" }}>
                    Curated indoor &amp; outdoor plants, delivered fresh from our Oregon greenhouses.
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className="font-semibold text-white"
                      style={{ background: "#1a2e20", fontSize: "0.57rem", borderRadius: "5px", padding: "5px 11px", letterSpacing: "0.04em" }}
                    >
                      View Collection
                    </span>
                    <span style={{ color: "#3a7d55", fontSize: "0.55rem", borderBottom: "1px solid #3a7d5580", paddingBottom: "1px" }}>
                      200+ varieties
                    </span>
                  </div>
                </div>

                {/* Product card — photo treatment */}
                <div
                  className="flex-shrink-0 rounded-xl overflow-hidden"
                  style={{ width: "120px", border: "1px solid #d8e8dc" }}
                >
                  <div
                    style={{
                      height: "80px",
                      background: "linear-gradient(160deg, #c8e6c9 0%, #a5d6a7 40%, #2d6a4f 100%)",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      padding: "0 8px 6px",
                    }}
                  >
                    {/* Simplified leaf silhouette */}
                    <svg width="38" height="52" viewBox="0 0 38 52" fill="none">
                      <path d="M19 50 C19 50 2 36 2 20 C2 10 10 2 19 2 C28 2 36 10 36 20 C36 36 19 50 19 50Z" fill="#1a3d25" opacity="0.85"/>
                      <path d="M19 50 C19 50 8 34 10 22 C12 14 15 8 19 6" stroke="#2d6a4f" strokeWidth="0.8" fill="none"/>
                      <path d="M19 50 C19 50 30 34 28 22 C26 14 23 8 19 6" stroke="#2d6a4f" strokeWidth="0.8" fill="none"/>
                      <path d="M19 6 L19 50" stroke="#1a3d25" strokeWidth="0.7" opacity="0.5"/>
                      <rect x="17" y="48" width="4" height="4" rx="1" fill="#6b4c2a"/>
                    </svg>
                  </div>
                  <div style={{ background: "white", padding: "7px 8px" }}>
                    <div className="font-semibold" style={{ fontSize: "0.55rem", color: "#0f1f14", lineHeight: 1.3 }}>Monstera Deliciosa</div>
                    <div style={{ fontSize: "0.5rem", color: "#8a9e8e", marginTop: "2px" }}>Low light · Easy care</div>
                    <div className="font-bold" style={{ fontSize: "0.65rem", color: "#1a2e20", marginTop: "4px" }}>$34</div>
                  </div>
                </div>
              </div>

              {/* Category strip */}
              <div className="flex gap-2 px-5 pb-4">
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
