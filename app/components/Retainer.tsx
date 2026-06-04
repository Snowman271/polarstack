"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, Zap, Shield, Layers } from "lucide-react";

const plans = [
  {
    name: "Essential",
    price: "$399",
    tagline: "Keep the lights on.",
    description:
      "Covers everything a live site needs to stay healthy. Miss any of this and things start breaking quietly.",
    accent: "#3DDCB0",
    icon: Shield,
    features: [
      "Managed hosting & SSL",
      "Uptime monitoring & alerts",
      "Security patches & updates",
      "Bug fixes (up to 2 hrs/mo)",
      "Monthly health report",
      "Email support",
    ],
    badge: null,
  },
  {
    name: "Growth",
    price: "$649",
    tagline: "Built to move forward.",
    description:
      "For sites that need more than just maintenance. Content changes, SEO, and feature work — all handled.",
    accent: "#00B4D8",
    icon: Zap,
    features: [
      "Everything in Essential",
      "Unlimited content updates",
      "SEO monitoring & fixes",
      "Performance optimization",
      "Feature work (up to 8 hrs/mo)",
      "Priority response",
    ],
    badge: "Most Popular",
  },
  {
    name: "Full Stack",
    price: "$999",
    tagline: "We're on your team.",
    description:
      "A dedicated development partner. Your site stays cutting-edge and we're always within reach.",
    accent: "#818CF8",
    icon: Layers,
    features: [
      "Everything in Growth",
      "Feature development (up to 20 hrs/mo)",
      "Direct Slack access",
      "Same-day response",
      "Quarterly design refresh",
      "Analytics & conversion tracking",
    ],
    badge: null,
  },
];

export default function Retainer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="retainer" className="relative py-14 lg:py-32 px-5 sm:px-6 lg:px-12">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(61,220,176,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16 text-center"
        >
          <span className="text-xs font-medium text-[#3DDCB0] tracking-widest uppercase font-mono">
            {'// Support plans'}
          </span>
          <h2 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
            Your site doesn&apos;t run itself.
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-base lg:text-lg">
            Hosting lapses. Security gaps open. Performance drifts. A support plan keeps everything working the way it was built to — quietly, consistently, in the background.
          </p>
          <p className="mt-2 text-slate-500 text-sm">
            Plans start at <span className="text-[#3DDCB0] font-medium">$399/mo</span> · First month free with any new build.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const isHovered = hovered === i;
            const isMiddle = i === 1;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.6 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: isMiddle
                    ? `linear-gradient(160deg, ${plan.accent}10 0%, rgba(8,12,16,0.9) 60%)`
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isHovered || isMiddle ? plan.accent + "40" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isHovered
                    ? `0 0 40px ${plan.accent}18`
                    : isMiddle
                    ? `0 0 30px ${plan.accent}10`
                    : "none",
                  transform: isMiddle && !isHovered ? "scale(1.02)" : isHovered ? "scale(1.02)" : "scale(1)",
                }}
              >
                {/* Top glow bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${plan.accent}80, transparent)`,
                    opacity: isHovered || isMiddle ? 1 : 0.3,
                  }}
                />

                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <span
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full tracking-widest uppercase"
                      style={{
                        background: `${plan.accent}18`,
                        border: `1px solid ${plan.accent}40`,
                        color: plan.accent,
                      }}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-7 lg:p-8">
                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${plan.accent}12`,
                        border: `1px solid ${plan.accent}30`,
                      }}
                    >
                      <Icon size={18} style={{ color: plan.accent }} />
                    </div>
                    <span className="font-display font-bold text-white text-lg">{plan.name}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span
                      className="font-display font-black text-4xl lg:text-5xl leading-none"
                      style={{ color: plan.accent }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-slate-500 text-sm">/month</span>
                  </div>

                  <p className="text-xs font-mono font-semibold tracking-wide mb-1" style={{ color: `${plan.accent}99` }}>
                    {plan.tagline}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-7">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check size={13} className="flex-shrink-0 mt-0.5" style={{ color: plan.accent }} />
                        <span className="text-slate-300 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() =>
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                    style={
                      isMiddle || isHovered
                        ? {
                            background: `linear-gradient(135deg, ${plan.accent}, ${plan.accent}bb)`,
                            color: "#080C10",
                          }
                        : {
                            background: `${plan.accent}0d`,
                            border: `1px solid ${plan.accent}28`,
                            color: plan.accent,
                          }
                    }
                  >
                    Get Started
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-center text-xs text-slate-500 font-mono"
        >
          All plans include the infrastructure your site depends on. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
