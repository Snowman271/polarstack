"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const budgetOptions = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Not sure yet",
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    details: "",
    budget: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState("success");
        setForm({ name: "", email: "", details: "", budget: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputClass =
    "contact-input w-full bg-[rgba(13,17,23,0.8)] border border-[rgba(61,220,176,0.12)] rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3DDCB0] focus:ring-offset-1 focus:ring-offset-[#080C10] focus:border-[rgba(61,220,176,0.4)] focus:bg-[rgba(13,17,23,0.95)] transition-all";

  return (
    <section id="contact" className="relative py-20 lg:py-32 px-5 sm:px-6 lg:px-12">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(61,220,176,0.3), transparent)",
        }}
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-medium text-[#3DDCB0] tracking-widest uppercase">
            Let&apos;s talk
          </span>
          <h2 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
            Start a Project
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-lg mx-auto">
            Tell us what you&apos;re building. We&apos;ll respond within 24 hours with an
            honest assessment and a clear path forward.
          </p>
          <p className="mt-3 text-sm text-slate-500 font-mono tracking-wide">
            or call{" "}
            <a href="tel:7143360671" className="text-[#3DDCB0] hover:underline">
              (714)-336-0671
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="glass rounded-2xl p-5 sm:p-8 lg:p-10"
        >
          {formState === "success" ? (
            <div className="text-center py-12 space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle size={56} className="text-[#3DDCB0] mx-auto" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-white">
                Message received.
              </h3>
              <p className="text-slate-400">
                We&apos;ll be in touch within 24 hours.
              </p>
              <button
                onClick={() => setFormState("idle")}
                className="mt-4 text-sm text-[#3DDCB0] underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-details" className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                  Project Details
                </label>
                <textarea
                  id="contact-details"
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  placeholder="What are you building? What's the timeline? Any technical constraints?"
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-budget" className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                  Budget Range
                </label>
                <select
                  id="contact-budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none`}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0D1117]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {formState === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  Something went wrong. Try emailing us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={formState === "loading"}
                className="group w-full flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#3DDCB0] to-[#00B4D8] text-[#080C10] font-semibold text-sm tracking-wide hover:opacity-90 transition-all teal-glow-sm disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#3DDCB0] focus:ring-offset-2 focus:ring-offset-[#080C10]"
              >
                {formState === "loading" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#080C10] border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
