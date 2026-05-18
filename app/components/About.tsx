"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Zap, Shield } from "lucide-react";

const principles = [
  {
    icon: Terminal,
    title: "No templates. Ever.",
    body: "Every line is intentional. We don't theme WordPress sites or swap out Bootstrap components. We write code that fits your product exactly.",
  },
  {
    icon: Zap,
    title: "Performance is non-negotiable.",
    body: "Lighthouse 90+ isn't a goal, it's a baseline. We ship fast by default - optimized images, edge caching, zero render-blocking assets.",
  },
  {
    icon: Shield,
    title: "Built to last.",
    body: "Clean architecture, typed everything, documented handoffs. When you need to hand it to another developer, it won't be a nightmare.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-14 lg:py-32 px-5 sm:px-6 lg:px-12">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(61,220,176,0.3), transparent)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0,180,216,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <span className="text-xs font-medium text-[#3DDCB0] tracking-widest uppercase">
              Who we are
            </span>
            <h2 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
              Cold.{" "}
              <span className="gradient-text">Carved</span>
              <br />
              for you.
            </h2>
            <div className="mt-6 space-y-4 text-slate-400 leading-relaxed text-lg">
              <p>
                Polar Stack is a lean, opinionated web development studio. We take on a limited
                number of projects at a time - by design. That&apos;s how we stay sharp.
              </p>
              <p>
                We don&apos;t pitch bloated contracts or inflate scope to justify retainers.
                You come with a problem. We build the solution. The result speaks for itself.
              </p>
              <p>
                No agency overhead. No account managers in the middle. Direct communication,
                direct accountability, direct code.
              </p>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="space-y-4"
          >
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.1, duration: 0.6 }}
                  className="glass glass-hover rounded-2xl p-6 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[rgba(61,220,176,0.08)] border border-[rgba(61,220,176,0.12)] flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#3DDCB0]" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1.5">
                      {p.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{p.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
