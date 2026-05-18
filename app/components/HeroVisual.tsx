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
                style={{ background: "#1f3d2b", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="font-bold tracking-tight" style={{ fontSize: "0.72rem", color: "#e8f5e9", letterSpacing: "0.05em" }}>
                  🌿 Verdant
                </span>
                <div className="flex items-center gap-4" style={{ color: "#a8c5a0" }}>
                  <span>Shop</span>
                  <span>Care Guides</span>
                  <span>About</span>
                  <span
                    className="font-semibold px-2.5 py-1 rounded-full text-white"
                    style={{ background: "#4a9b6f", fontSize: "0.6rem" }}
                  >
                    Order Now
                  </span>
                </div>
              </div>

              {/* Hero */}
              <div className="flex gap-4 px-5 pt-5 pb-4" style={{ background: "#f5f0e8" }}>
                <div className="flex-1 space-y-3">
                  <h2 className="font-bold leading-tight" style={{ fontSize: "1.05rem", lineHeight: 1.25, color: "#1a2e1f" }}>
                    Plants that make<br />
                    <span style={{ color: "#4a9b6f" }}>
                      {typed}
                      <span
                        style={{
                          display: "inline-block",
                          width: "1px",
                          height: "0.9em",
                          background: "#4a9b6f",
                          marginLeft: "1px",
                          verticalAlign: "text-bottom",
                          animation: "blink 1s step-end infinite",
                        }}
                      />
                    </span>
                  </h2>
                  <p style={{ fontSize: "0.58rem", color: "#5a6e5f", lineHeight: 1.5, maxWidth: "90%" }}>
                    Curated indoor &amp; outdoor plants, delivered fresh from our Oregon greenhouses. Every order includes a care guide.
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className="font-semibold text-white"
                      style={{ background: "#2d6a4f", fontSize: "0.6rem", borderRadius: "6px", padding: "5px 10px", letterSpacing: "0.02em" }}
                    >
                      View Collection
                    </span>
                    <span style={{ color: "#4a9b6f", fontSize: "0.58rem", textDecoration: "underline", textUnderlineOffset: "2px" }}>
                      Browse 200+ varieties
                    </span>
                  </div>
                </div>

                <div
                  className="flex-shrink-0 flex flex-col items-center justify-center rounded-2xl"
                  style={{ width: "130px", background: "#d4edda", border: "1px solid #a8d5b5", padding: "14px 10px", gap: "6px" }}
                >
                  <div style={{ fontSize: "3.5rem", lineHeight: 1 }}>🪴</div>
                  <div className="font-semibold text-center" style={{ fontSize: "0.6rem", color: "#1a2e1f" }}>Monstera Deliciosa</div>
                  <div style={{ fontSize: "0.55rem", color: "#4a9b6f" }}>Easy care · Low light</div>
                  <div className="font-bold" style={{ fontSize: "0.7rem", color: "#2d6a4f", marginTop: "2px" }}>$34</div>
                </div>
              </div>

              {/* Category strip */}
              <div className="grid grid-cols-4 gap-1.5 px-5 pb-4">
                {[
                  { icon: "🌵", label: "Succulents" },
                  { icon: "🌸", label: "Flowering" },
                  { icon: "🌿", label: "Tropicals" },
                  { icon: "🪴", label: "Pots & Soil" },
                ].map((cat) => (
                  <div
                    key={cat.label}
                    className="flex flex-col items-center rounded-xl py-2 gap-1"
                    style={{ background: "white", border: "1px solid #d4edda" }}
                  >
                    <span style={{ fontSize: "0.9rem" }}>{cat.icon}</span>
                    <span style={{ fontSize: "0.5rem", color: "#2d6a4f", fontWeight: 600 }}>{cat.label}</span>
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
