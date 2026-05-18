"use client";

import { ExternalLink, MessageSquare, Rss } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Support", href: "#retainer" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const social = [
  { icon: ExternalLink, href: "#", label: "GitHub" },
  { icon: MessageSquare, href: "#", label: "Twitter" },
  { icon: Rss, href: "#", label: "LinkedIn" },
];

const leftLinks = links.slice(0, 3);
const rightLinks = links.slice(3);

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer-section relative border-t border-[rgba(61,220,176,0.08)] py-12 lg:py-16 px-5 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Top: Brand + Ready to build */}
        <div className="grid md:grid-cols-2 gap-10 items-start mb-10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3DDCB0] to-[#00B4D8] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 11 Q2 2.5 8 2.5 Q14 2.5 14 11Z" fill="white"/>
                  <path d="M5.5 11 Q5.5 7.8 8 7.8 Q10.5 7.8 10.5 11Z" fill="rgba(8,12,16,0.35)"/>
                  <path d="M3.5 8.5 Q5.5 6.8 8 6.8 Q10.5 6.8 12.5 8.5" stroke="rgba(8,12,16,0.12)" strokeWidth="0.7" fill="none"/>
                  <rect x="1" y="11" width="14" height="2.2" rx="1.1" fill="white"/>
                </svg>
              </div>
              <span className="font-display font-semibold text-white tracking-tight">
                Polar<span className="gradient-text">Stack</span> LLC
              </span>
            </a>
            <p className="text-slate-400 text-sm max-w-[220px] leading-relaxed">
              Cold. Carved for you. Custom web development that ships.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-[rgba(61,220,176,0.12)] flex items-center justify-center text-slate-400 hover:text-[#3DDCB0] hover:border-[rgba(61,220,176,0.3)] transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Ready to build CTA */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-3">
              Ready to build?
            </div>
            <p className="text-slate-400 text-sm mb-5 leading-relaxed max-w-[260px]">
              Most projects kick off within a week. Let&apos;s get started.
            </p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="inline-flex px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3DDCB0] to-[#00B4D8] text-[#080C10] text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Start a Project
            </a>
          </div>
        </div>

        {/* Navigation — split on sides */}
        <div className="border-t border-[rgba(61,220,176,0.06)] py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <ul className="flex gap-8">
            {leftLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-sm text-slate-400 hover:text-[#3DDCB0] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden sm:block h-px w-px opacity-0 select-none" aria-hidden />
          <ul className="flex gap-8">
            {rightLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-sm text-slate-400 hover:text-[#3DDCB0] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(61,220,176,0.06)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <span>© {new Date().getFullYear()} Polar Stack LLC. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with{" "}
            <span className="text-[#3DDCB0]">Next.js</span> &amp;{" "}
            <span className="text-[#3DDCB0]">Framer Motion</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
