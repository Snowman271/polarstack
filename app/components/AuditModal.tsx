"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, AlertCircle } from "lucide-react";

const positions = [
  "CEO / Founder",
  "COO / Operations Manager",
  "CMO / Marketing Director",
  "Marketing Manager",
  "Sales Director / Manager",
  "Developer / Tech Lead",
  "Other / Just exploring",
];

type FormState = "idle" | "loading" | "success" | "error";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AuditModal({ open, onClose }: Props) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  const reset = () => {
    setFormState("idle");
    setForm({ name: "", email: "", phone: "", position: "" });
    onClose();
  };

  const inputClass =
    "audit-input w-full bg-[rgba(8,12,16,0.6)] border border-[rgba(61,220,176,0.12)] rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3DDCB0] focus:ring-offset-1 focus:ring-offset-[#080C10] focus:border-[rgba(61,220,176,0.4)] transition-all";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-[rgba(8,12,16,0.8)] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[201] flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="audit-modal-title"
              className="glass rounded-2xl w-full max-w-md p-8 pointer-events-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#3DDCB0] rounded"
              >
                <X size={18} />
              </button>

              {formState === "success" ? (
                <div className="text-center py-8 space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle size={52} className="text-[#3DDCB0] mx-auto" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-white">You&apos;re on the list.</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We&apos;ll review your site and have your audit ready within 24 hours.
                    Check your inbox.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-2 text-sm text-[#3DDCB0] underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[#3DDCB0] rounded"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[rgba(61,220,176,0.08)] border border-[rgba(61,220,176,0.2)] text-[#3DDCB0] text-xs font-medium mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3DDCB0] animate-pulse" />
                      Free - no strings attached
                    </div>
                    <h2 id="audit-modal-title" className="font-display text-2xl font-bold text-white leading-snug">
                      Get your free landing page audit
                    </h2>
                    <p className="mt-2 text-slate-400 text-sm leading-relaxed">
                      We&apos;ll go through your site, find what&apos;s killing conversions,
                      and send you a clear breakdown.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label htmlFor="audit-name" className="text-xs text-slate-400 uppercase tracking-wide">Name</label>
                        <input
                          id="audit-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="audit-phone" className="text-xs text-slate-400 uppercase tracking-wide">Phone</label>
                        <input
                          id="audit-phone"
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="audit-email" className="text-xs text-slate-400 uppercase tracking-wide">Email</label>
                      <input
                        id="audit-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                        className={inputClass}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="audit-position" className="text-xs text-slate-400 uppercase tracking-wide">Your role</label>
                      <select
                        id="audit-position"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        required
                        className={`${inputClass} appearance-none`}
                      >
                        <option value="" disabled>Select your position</option>
                        {positions.map((p) => (
                          <option key={p} value={p} className="bg-[#0D1117]">{p}</option>
                        ))}
                      </select>
                    </div>

                    {formState === "error" && (
                      <div className="flex items-center gap-2 text-red-400 text-sm" role="alert">
                        <AlertCircle size={14} />
                        Something went wrong. Try again.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#3DDCB0] to-[#00B4D8] text-[#080C10] font-semibold text-sm tracking-wide hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2 focus:outline-none focus:ring-2 focus:ring-[#3DDCB0] focus:ring-offset-2 focus:ring-offset-[#080C10]"
                    >
                      {formState === "loading" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#080C10] border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send my free audit
                          <Send size={14} />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-400">
                      We don&apos;t spam. Your info stays with us.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
