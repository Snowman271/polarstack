"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Lightbulb, ArrowRight } from "lucide-react";
import AuditModal from "./AuditModal";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Support", href: "#retainer" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState<string>("");
  const [clickedLink, setClickedLink] = useState<string>("");
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener("touchmove", close, { passive: true });
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      window.removeEventListener("touchmove", close);
      window.removeEventListener("scroll", close);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved === "light") {
      setTheme("light");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    localStorage.setItem("theme", next);
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    setClickedLink(id);
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => setClickedLink(""), 600);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[100]"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? theme === "light"
                ? "bg-[rgba(240,247,245,0.92)] backdrop-blur-xl border-b border-[rgba(61,220,176,0.2)]"
                : "bg-[rgba(8,12,16,0.88)] backdrop-blur-xl border-b border-[rgba(61,220,176,0.08)]"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16">

            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
              className="flex items-center gap-0.5 transition-transform duration-200 hover:scale-105"
            >
              <div className="w-12 h-12 flex-shrink-0">
                <Image src="/polarstack-logo.png" alt="Polar Stack logo" width={48} height={48} className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-semibold text-white tracking-tight text-[15px]">
                POLΛR <span className="gradient-text">STΛCK</span>
              </span>
            </a>

            {/* Desktop links — centered */}
            <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                const isClicked = clickedLink === id;
                const activeColor   = theme === "light" ? "#111827" : "#ffffff";
                const inactiveColor = theme === "light" ? "#6b7280" : "#94a3b8";
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="relative text-sm font-medium flex flex-col items-center gap-0.5 px-2 py-1 rounded-md"
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    animate={isClicked ? { y: [0, -3, 0] } : "rest"}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Hover pill background */}
                    <motion.span
                      className="absolute inset-0 rounded-md"
                      style={{ background: theme === "light" ? "rgba(61,220,176,0.08)" : "rgba(61,220,176,0.08)" }}
                      variants={{ rest: { opacity: 0, scale: 0.85 }, hover: { opacity: 1, scale: 1 }, tap: { opacity: 0.6, scale: 0.95 } }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    />

                    {/* Label */}
                    <motion.span
                      variants={{ rest: { y: 0 }, hover: { y: -1.5 }, tap: { y: 0 } }}
                      animate={{ color: isActive ? activeColor : inactiveColor }}
                      transition={{ duration: 0.18 }}
                    >
                      {link.label}
                    </motion.span>

                    {/* Active underline */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-0.5 left-2 right-2 h-[2px] rounded-full"
                          style={{ background: "linear-gradient(90deg, #3DDCB0, #00B4D8)" }}
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Click ripple */}
                    {isClicked && (
                      <motion.span
                        className="absolute inset-0 rounded-md"
                        style={{ background: "rgba(61,220,176,0.18)" }}
                        initial={{ opacity: 1, scale: 0.6 }}
                        animate={{ opacity: 0, scale: 1.8 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* CTA + theme toggle */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative group">
                <motion.button
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.88 }}
                  className="relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300"
                  style={{
                    background: theme === "light" ? "rgba(217,119,6,0.12)" : "rgba(255,255,255,0.05)",
                    border: theme === "light" ? "1px solid rgba(217,119,6,0.45)" : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: theme === "light" ? "0 0 16px rgba(217,119,6,0.35)" : "none",
                  }}
                >
                  <Lightbulb
                    size={16}
                    style={{
                      color: theme === "light" ? "#d97706" : "#64748b",
                      fill: theme === "light" ? "rgba(217,119,6,0.3)" : "none",
                      transition: "all 0.3s",
                    }}
                  />
                </motion.button>
                <span
                  className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={theme === "dark"
                    ? { background: "rgba(13,17,23,0.85)", border: "1px solid rgba(255,255,255,0.06)", color: "#94a3b8" }
                    : { background: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", color: "#111827" }
                  }
                >
                  {theme === "dark" ? "light mode" : "dark mode"}
                </span>
              </div>
              <button
                onClick={() => setAuditOpen(true)}
                className="group flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#3DDCB0] to-[#00B4D8] text-[#080C10] text-sm font-semibold tracking-wide hover:opacity-90 transition-all teal-glow-sm"
              >
                Free Audit
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-slate-400 hover:text-white transition-colors p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className={`backdrop-blur-xl border-b border-[rgba(61,220,176,0.1)] px-5 sm:px-8 pb-6 pt-2 flex flex-col gap-1 ${theme === "light" ? "bg-[rgba(240,247,245,0.97)]" : "bg-[rgba(8,12,16,0.95)]"}`}
            >
              {/* Light / Dark toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2.5 py-3 border-b text-sm font-medium transition-colors"
                style={{
                  color: theme === "light" ? "#d97706" : "#94a3b8",
                  borderColor: theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)",
                }}
              >
                <Lightbulb
                  size={15}
                  style={{
                    color: theme === "light" ? "#d97706" : "#64748b",
                    fill: theme === "light" ? "rgba(217,119,6,0.3)" : "none",
                  }}
                />
                {theme === "dark" ? "Light" : "Dark"} Mode
              </button>

              {navLinks.map((link, i) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                const mobileInactive = theme === "light" ? "#374151" : "#cbd5e1";
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="flex items-center justify-between text-sm font-medium py-3 border-b last:border-0"
                    style={{
                      color: isActive ? "#3DDCB0" : mobileInactive,
                      borderColor: theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)",
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    whileHover={{ x: 4, color: theme === "light" ? "#111827" : "#ffffff" }}
                    whileTap={{ scale: 0.97, x: 6 }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="mobile-dot"
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#3DDCB0", boxShadow: "0 0 6px #3DDCB0" }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.a>
                );
              })}
              <button
                onClick={() => { setMobileOpen(false); setAuditOpen(true); }}
                className="group mt-3 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3DDCB0] to-[#00B4D8] text-[#080C10] text-sm font-semibold tracking-wide teal-glow-sm"
              >
                Free Audit
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
