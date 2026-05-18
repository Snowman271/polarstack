"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PolarBear() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Ground glow */}
      <div
        className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-72 h-10 rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(61,220,176,0.18) 0%, transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-[420px] aspect-square"
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            filter: [
              "drop-shadow(0 0 10px rgba(61,220,176,0.12))",
              "drop-shadow(0 0 28px rgba(61,220,176,0.32))",
              "drop-shadow(0 0 10px rgba(61,220,176,0.12))",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/bear.png"
            alt="Polar bear coding at a desk"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
