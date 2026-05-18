"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10001]"
      style={{ x: position.x - 8, y: position.y - 8 }}
    >
      <div
        className="w-4 h-4 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(61,220,176,0.6) 0%, rgba(61,220,176,0.15) 50%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
    </motion.div>
  );
}
