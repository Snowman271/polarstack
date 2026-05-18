"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AuroraBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -80]);
  const y2 = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora blobs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 20, 0],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, #3DDCB0 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -15, 0],
          opacity: [0.05, 0.09, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, #00B4D8 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.04, 0.07, 0.04],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, #3DDCB0 0%, transparent 60%)",
            filter: "blur(70px)",
          }}
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${8 + i * 8}%`,
            top: `${15 + (i % 4) * 20}%`,
            background: i % 2 === 0 ? "#3DDCB0" : "#00B4D8",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
