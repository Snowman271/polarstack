"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Wifi } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    index: "01",
    title: "Polaris Adventures",
    category: "Booking & E-commerce",
    description: "Off-road rental platform with online booking, fleet management, and conversion-focused design.",
    tags: ["Next.js", "Stripe", "Resend"],
    accent: "#00B4D8",
    year: "2025",
    href: "https://www.ironwoodsrentals.com",
    screenshot: "/screenshot-ironwoodsrentals.jpg",
    metrics: [
      { label: "Load Time", value: "0.8s" },
      { label: "Lighthouse", value: "96" },
      { label: "Conv. Rate", value: "+47%" },
    ],
    status: "LIVE",
  },
  {
    index: "02",
    title: "Desert Ironwoods",
    category: "Hospitality",
    description: "Resort site built to sell the experience. Immersive visuals and a seamless path to booking.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    accent: "#F59E0B",
    year: "2025",
    href: "https://desertironwoods.com",
    screenshot: "/screenshot-desertironwoods.jpg",
    metrics: [
      { label: "Load Time", value: "0.7s" },
      { label: "Lighthouse", value: "94" },
      { label: "Bounce Rate", value: "-42%" },
    ],
    status: "LIVE",
  },
  {
    index: "03",
    title: "PolarSentry",
    category: "Security Platform",
    description: "Threat monitoring and alerting platform. Real-time detection engineered for speed and reliability.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    accent: "#818CF8",
    year: "2025",
    href: "https://polarsentry.com",
    screenshot: "/screenshot-polarsentry.jpg",
    metrics: [
      { label: "Response", value: "42ms" },
      { label: "Uptime", value: "99.9%" },
      { label: "Lighthouse", value: "97" },
    ],
    status: "LIVE",
  },
];

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const active = projects[activeIdx];

  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setMobileActive(Math.min(index, projects.length - 1));
  }, []);

  return (
    <section id="work" className="relative py-20 lg:py-32">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(61,220,176,0.3), transparent)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(61,220,176,1) 1px, transparent 1px), linear-gradient(90deg, rgba(61,220,176,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16 text-center lg:text-left"
        >
          <span className="text-xs font-medium text-[#3DDCB0] tracking-widest uppercase font-mono">
            {'// Selected work'}
          </span>
          <h2 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
            What we&apos;ve built
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl text-base lg:text-lg mx-auto lg:mx-0">
            Every project starts from zero. Here&apos;s what zero can look like.
          </p>
        </motion.div>

        {/* ── Desktop: editorial layout ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1fr] gap-12 items-start">

          {/* Left: project list */}
          <div className="space-y-1">
            {projects.map((project, i) => {
              const isActive = activeIdx === i;
              return (
                <motion.div
                  key={project.index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                  onMouseEnter={() => setActiveIdx(i)}
                  className="relative flex items-start gap-5 px-6 py-5 rounded-2xl cursor-default transition-all duration-300"
                  style={{
                    background: isActive ? `${project.accent}08` : "transparent",
                    border: `1px solid ${isActive ? project.accent + "28" : "transparent"}`,
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-all duration-300"
                    style={{ background: project.accent, opacity: isActive ? 1 : 0 }}
                  />

                  {/* Index number */}
                  <span
                    className="font-display font-black text-4xl leading-none flex-shrink-0 mt-1 transition-all duration-300"
                    style={{ color: isActive ? project.accent : "rgba(255,255,255,0.07)" }}
                  >
                    {project.index}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span
                          className="text-[10px] font-mono uppercase tracking-[0.15em] transition-colors duration-300"
                          style={{ color: isActive ? `${project.accent}99` : "#334155" }}
                        >
                          {project.category}
                        </span>
                        <h3
                          className="font-display font-bold text-xl mt-0.5 leading-tight transition-colors duration-300"
                          style={{ color: isActive ? "white" : "#475569" }}
                        >
                          {project.title}
                        </h3>
                      </div>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-300 mt-1"
                        style={{
                          border: `1px solid ${project.accent}35`,
                          color: project.accent,
                          background: `${project.accent}12`,
                          opacity: isActive ? 1 : 0,
                          pointerEvents: isActive ? "auto" : "none",
                        }}
                      >
                        Visit <ArrowUpRight size={11} />
                      </a>
                    </div>

                    <div
                      className="transition-all duration-300 overflow-hidden"
                      style={{ maxHeight: isActive ? "200px" : "0", opacity: isActive ? 1 : 0 }}
                    >
                      <p className="text-sm text-slate-400 leading-relaxed mt-2">{project.description}</p>

                      {/* Metrics */}
                      <div className="flex gap-6 mt-3">
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="font-mono font-bold text-base leading-none" style={{ color: project.accent }}>{m.value}</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-wide">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                            style={{
                              background: `${project.accent}0d`,
                              border: `1px solid ${project.accent}28`,
                              color: `${project.accent}cc`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: sticky browser mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="sticky top-28"
          >
            <div
              className="glass rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
              style={{ border: `1px solid ${active.accent}25` }}
            >
              {/* Browser chrome */}
              <div className="bg-[#0d1117] px-4 py-3 flex items-center gap-3 border-b border-[rgba(255,255,255,0.05)]">
                <div className="flex gap-1.5 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57] opacity-70" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e] opacity-70" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840] opacity-70" />
                </div>
                <div className="flex-1 bg-[rgba(255,255,255,0.04)] rounded-md px-3 py-1 flex items-center gap-2 text-xs text-slate-500 font-mono min-w-0">
                  <Wifi size={10} className="flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeIdx}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      {active.href.replace("https://", "").replace("www.", "")}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: active.accent, animation: "blink 1.8s ease-in-out infinite" }}
                  />
                  <span
                    className="text-[10px] font-mono font-semibold tracking-widest transition-colors duration-300"
                    style={{ color: active.accent }}
                  >
                    {active.status}
                  </span>
                </div>
              </div>

              {/* Screenshot */}
              <div className="relative h-[320px] bg-[#060d14] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.screenshot}
                      alt={active.title}
                      fill
                      className="object-cover object-top"
                    />
                  </motion.div>
                </AnimatePresence>
                <div
                  className="absolute inset-x-0 h-[2px] pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${active.accent}80, transparent)`,
                    animation: "scanline 3.5s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Metrics footer */}
              <div className="grid grid-cols-3" style={{ borderTop: `1px solid ${active.accent}18` }}>
                {active.metrics.map((m, i) => (
                  <div
                    key={m.label}
                    className="py-4 text-center transition-all duration-300"
                    style={{ borderRight: i < 2 ? `1px solid ${active.accent}18` : "none" }}
                  >
                    <div className="font-mono font-bold text-xl leading-none" style={{ color: active.accent }}>{m.value}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-wide">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Mobile: swipe carousel ── */}
        <div className="lg:hidden">
          <div ref={carouselRef} onScroll={handleCarouselScroll} className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4" style={{ scrollbarWidth: "none" }}>
            {projects.map((project, i) => (
              <motion.div
                key={project.index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex-shrink-0 w-full snap-start glass rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${project.accent}25` }}
              >
                {/* Browser chrome */}
                <div className="bg-[#0d1117] px-4 py-2.5 flex items-center gap-3 border-b border-[rgba(255,255,255,0.05)]">
                  <div className="flex gap-1.5 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-70" />
                  </div>
                  <div className="flex-1 bg-[rgba(255,255,255,0.04)] rounded-md px-3 py-1 text-xs text-slate-500 font-mono truncate">
                    {project.href.replace("https://", "").replace("www.", "")}
                  </div>
                  <span className="text-[10px] font-mono font-semibold flex-shrink-0" style={{ color: project.accent }}>LIVE</span>
                </div>

                {/* Screenshot */}
                <div className="relative h-44 bg-[#060d14]">
                  <Image
                    src={project.screenshot}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Info */}
                <div className="px-4 pt-4 pb-3">
                  <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: `${project.accent}99` }}>{project.category}</div>
                  <h3 className="font-display font-bold text-white text-lg leading-tight">{project.title}</h3>
                  <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{project.description}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3" style={{ borderTop: `1px solid ${project.accent}18` }}>
                  {project.metrics.map((m, j) => (
                    <div key={m.label} className="py-3 text-center" style={{ borderRight: j < 2 ? `1px solid ${project.accent}18` : "none" }}>
                      <div className="font-mono font-bold text-base leading-none" style={{ color: project.accent }}>{m.value}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-wide">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Visit button */}
                <div className="px-4 py-3" style={{ borderTop: `1px solid ${project.accent}18` }}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-[#080C10] active:opacity-80"
                    style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}bb)` }}
                  >
                    Visit Live Site <ArrowUpRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-3">
            {projects.map((p, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === mobileActive ? "20px" : "6px",
                  background: i === mobileActive ? p.accent : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
