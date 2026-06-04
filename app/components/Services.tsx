"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, ShoppingCart, FileText, Search, Sparkles, LayoutGrid, ArrowRight, Wand2 } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Custom Web Development",
    description:
      "Full-stack builds engineered from scratch. React, Next.js, TypeScript — whatever the job demands. No boilerplate, no compromises. Every line of code is written with performance and conversion in mind.",
    tags: ["Next.js", "TypeScript", "Performance", "React", "Tailwind"],
    featured: true,
    color: "#3DDCB0",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Integration",
    description:
      "Stripe, Shopify headless, or custom checkout flows. Built to convert, not just exist.",
    tags: ["Stripe", "Shopify", "Payments"],
    featured: false,
    color: "#F59E0B",
  },
  {
    icon: FileText,
    title: "CMS Integration",
    description:
      "Want to update your own content without touching code? We build in a simple dashboard so you can edit text, images, and pages yourself anytime.",
    tags: ["Sanity", "Contentful", "Headless"],
    featured: false,
    color: "#A78BFA",
  },
  {
    icon: Search,
    title: "SEO & Visibility",
    description:
      "Structured data, sitemap, metadata, Core Web Vitals — all of it. Search visibility built in from day one, not bolted on after.",
    tags: ["Core Web Vitals", "Structured Data"],
    featured: false,
    color: "#38BDF8",
  },
  {
    icon: Sparkles,
    title: "Custom Animations",
    description:
      "Framer Motion, GSAP, or pure CSS. Motion that enhances the experience, not distracts from it.",
    tags: ["Framer Motion", "GSAP"],
    featured: false,
    color: "#F472B6",
  },
  {
    icon: LayoutGrid,
    title: "Additional Pages",
    description:
      "Each extra page built with the same precision as the rest. No rushed filler.",
    tags: ["Scalable", "Consistent"],
    featured: false,
    color: "#16A34A",
  },
  {
    icon: Wand2,
    title: "Custom Builds",
    description:
      "Have something unique in mind? If your idea doesn't fit neatly into a box, that's exactly where we thrive. Anything you can think of, we can talk about making it real.",
    tags: ["Bespoke", "Anything"],
    featured: false,
    color: "#F97316",
    rainbow: true,
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const check = () => setIsLight(el.classList.contains("light"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const featured = services[0];
  const addons = services.slice(1);

  return (
    <section id="services" className="relative py-14 lg:py-32 px-5 sm:px-6 lg:px-12">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(61,220,176,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 lg:gap-6"
        >
          <div className="text-center lg:text-left">
            <span className="text-xs font-medium text-[#3DDCB0] tracking-widest uppercase">
              What we build
            </span>
            <h2 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
              Services
            </h2>
            <p className="mt-4 text-slate-400 max-w-lg text-lg mx-auto lg:mx-0">
              Support plans from <span className="text-white font-medium">$399/mo</span>. Every build is scoped to your project — just ask.
            </p>
          </div>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl border border-[rgba(61,220,176,0.2)] text-slate-300 text-sm font-medium hover:border-[rgba(61,220,176,0.5)] hover:text-[#3DDCB0] transition-all self-center lg:self-auto mx-auto lg:mx-0"
          >
            Get a quote
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Featured card — Custom Web Development */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="service-featured-card relative rounded-2xl p-8 lg:p-10 mb-4 overflow-hidden cursor-default transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(61,220,176,0.07) 0%, rgba(0,180,216,0.04) 60%, rgba(8,12,16,0.8) 100%)",
            border: `1px solid ${hoveredIndex === 0 ? "rgba(61,220,176,0.45)" : "rgba(61,220,176,0.22)"}`,
            boxShadow: hoveredIndex === 0
              ? "0 0 60px rgba(61,220,176,0.12), inset 0 1px 0 rgba(61,220,176,0.15)"
              : "0 0 30px rgba(61,220,176,0.06), inset 0 1px 0 rgba(61,220,176,0.08)",
          }}
        >
          {/* Always-on top glow bar */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(61,220,176,0.7), transparent)",
            }}
          />

          {/* Ambient corner glow */}
          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
            style={{
              background: "radial-gradient(circle at top right, rgba(61,220,176,0.08) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Left */}
            <div className="flex-1 space-y-5">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: hoveredIndex === 0 ? "rgba(61,220,176,0.18)" : "rgba(61,220,176,0.1)",
                    border: "1px solid rgba(61,220,176,0.3)",
                    boxShadow: "0 0 20px rgba(61,220,176,0.12)",
                  }}
                >
                  <Code2 size={26} color="#3DDCB0" />
                </div>
                <span
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase"
                  style={{
                    background: "rgba(61,220,176,0.1)",
                    border: "1px solid rgba(61,220,176,0.3)",
                    color: "#3DDCB0",
                  }}
                >
                  Core service
                </span>
              </div>

              <div>
                <h3
                  className="font-display font-bold text-2xl lg:text-3xl mb-3 transition-colors duration-300"
                  style={{ color: hoveredIndex === 0 ? (isLight ? "#064d38" : "#3DDCB0") : (isLight ? "#111827" : "white") }}
                >
                  Custom Web Development
                </h3>
                <p className="text-slate-400 leading-relaxed max-w-xl">
                  {featured.description}
                </p>
              </div>
            </div>

            {/* Right — tags + divider */}
            <div className="lg:w-64 flex flex-col gap-4">
              <div
                className="hidden lg:block self-stretch w-px"
                style={{ background: "linear-gradient(180deg, transparent, rgba(61,220,176,0.2), transparent)" }}
              />
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300"
                    style={{
                      background: hoveredIndex === 0 ? "rgba(61,220,176,0.12)" : "rgba(61,220,176,0.06)",
                      border: `1px solid ${hoveredIndex === 0 ? "rgba(61,220,176,0.35)" : "rgba(61,220,176,0.12)"}`,
                      color: hoveredIndex === 0 ? "#3DDCB0" : "#94a3b8",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add-on cards */}
        {(() => {
          const RAINBOW = "linear-gradient(135deg, #ef4444 0%, #f97316 20%, #eab308 40%, #22c55e 60%, #3b82f6 80%, #a855f7 100%)";

          const renderAddon = (service: typeof services[0], i: number) => {
            const idx = i + 1;
            const Icon = service.icon;
            const isHovered = hoveredIndex === idx;
            const c = service.color;
            const isRainbow = !!(service as typeof services[0] & { rainbow?: boolean }).rainbow && isHovered;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="service-addon-card glass rounded-2xl p-4 md:p-6 flex flex-col gap-3 md:gap-5 relative overflow-hidden cursor-default transition-all duration-300"
                style={{
                  borderColor: isRainbow ? "transparent" : (isHovered ? `${c}40` : undefined),
                  boxShadow: isRainbow ? "0 0 40px rgba(168,85,247,0.2)" : (isHovered ? `0 0 30px ${c}18` : undefined),
                  ...(isRainbow ? {
                    background: `linear-gradient(#0d1117, #0d1117) padding-box, ${RAINBOW} border-box`,
                    border: "1px solid transparent",
                  } : {}),
                }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isHovered ? (isRainbow ? "rgba(168,85,247,0.12)" : `${c}18`) : "rgba(61,220,176,0.08)",
                      border: `1px solid ${isHovered ? (isRainbow ? "rgba(168,85,247,0.4)" : `${c}50`) : "rgba(61,220,176,0.12)"}`,
                    }}
                  >
                    <Icon size={20} style={{ color: isRainbow ? "#a855f7" : (isHovered ? c : "#3DDCB0") }} className="transition-colors duration-300" />
                  </div>
                  <span className="hidden md:block px-2.5 py-1 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-slate-400 text-xs font-medium">
                    Add-on
                  </span>
                </div>

                <div className="flex-1">
                  <h3
                    className="font-display font-semibold text-sm md:text-lg mb-1 md:mb-2 transition-all duration-300"
                    style={isRainbow ? {
                      backgroundImage: RAINBOW,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    } : { color: isHovered ? c : (isLight ? "#111827" : "white") }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-xs transition-all duration-300"
                      style={{
                        background: isHovered ? `${c}0d` : "rgba(61,220,176,0.05)",
                        border: `1px solid ${isHovered ? `${c}30` : "rgba(61,220,176,0.08)"}`,
                        color: isHovered ? `${c}cc` : "#94a3b8",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          };

          return (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {addons.map((service, i) => renderAddon(service, i))}
            </div>
          );
        })()}

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-3 text-sm text-slate-400"
        >
          <div className="h-px flex-1 max-w-[120px] bg-[rgba(255,255,255,0.05)]" />
          <span>Every site is custom built per client · no templates, no shortcuts.</span>
          <div className="h-px flex-1 max-w-[120px] bg-[rgba(255,255,255,0.05)]" />
        </motion.div>
      </div>
    </section>
  );
}
