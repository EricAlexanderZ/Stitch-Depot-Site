"use client";

import { useState } from "react";
import { SiteHeader, TopBanner } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function ContactPage() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/contact", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name, email, message }),
    });

    setLoading(false);

    if (res.ok) {
      setSent(true);
    } else {
      setError("Something went wrong. Please email us directly at Owner@thestitchdepot.com");
    }
  }

  return (
    <main className="min-h-dvh bg-[#111111] text-[#F0F0F0]">
      <TopBanner />
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="mt-4 text-base leading-7 text-[#A8B4BC]">
            Questions about your order, artwork, or just want to get a quote? We&apos;re happy to help.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">

          {sent ? (
            <div className="flex flex-col items-center justify-center rounded-[2rem] bg-[#4A90C4]/30 p-12 text-center">
              <div className="text-4xl">✓</div>
              <h2 className="mt-4 text-xl font-extrabold">Message Sent!</h2>
              <p className="mt-2 text-sm text-[#A8B4BC]">
                We&apos;ll get back to you within 1 business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#A8B4BC]">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full rounded-2xl border border-white/20 bg-[#222222] px-4 py-3 text-sm text-[#F0F0F0] placeholder:text-[#A8B4BC]/50 outline-none focus:border-[#4A90C4]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#A8B4BC]">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/20 bg-[#222222] px-4 py-3 text-sm text-[#F0F0F0] placeholder:text-[#A8B4BC]/50 outline-none focus:border-[#4A90C4]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#A8B4BC]">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your order, your brand, or any questions you have…"
                  className="h-36 w-full rounded-2xl border border-white/20 bg-[#222222] p-4 text-sm text-[#F0F0F0] placeholder:text-[#A8B4BC]/50 outline-none focus:border-[#4A90C4]"
                />
              </div>

              {error && (
                <p className="text-sm font-semibold text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-full py-3 text-sm font-bold text-white transition ${
                  loading ? "cursor-not-allowed bg-[#444]" : "bg-gradient-to-b from-[#7AB3D4] to-[#1E5A8C] shadow-sm hover:from-[#5B9BD5] hover:to-[#0C2340] hover:scale-[1.01]"
                }`}
              >
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}

          {/* Contact info sidebar */}
          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-white/20 bg-[#222222] p-6">
              <h3 className="font-extrabold text-[#F0F0F0]">Get In Touch</h3>
              <div className="mt-4 space-y-4 text-sm text-[#A8B4BC]">
                <div>
                  <p className="font-semibold text-[#F0F0F0]">Email</p>
                  <a href="mailto:Owner@thestitchdepot.com" className="text-[#4A90C4] hover:underline">
                    Owner@thestitchdepot.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-[#F0F0F0]">Response Time</p>
                  <p>Within 1 business day</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F0F0F0]">Social Media</p>
                  <div className="mt-1 flex flex-col gap-1">
                    <a href="https://www.instagram.com/stitch.depot/" target="_blank" rel="noopener noreferrer" className="text-[#4A90C4] hover:underline">
                      Instagram @stitch.depot
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61578274506220" target="_blank" rel="noopener noreferrer" className="text-[#4A90C4] hover:underline">
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-[#4A90C4] p-6 text-white">
              <h3 className="font-extrabold">Ready to order?</h3>
              <p className="mt-2 text-sm text-white/80 leading-6">
                Skip the form and go straight to our hat configurator to build and submit your order.
              </p>
              <a
                href="/hats"
                className="mt-5 block rounded-full bg-white px-5 py-2.5 text-center text-sm font-bold text-[#4A90C4] transition hover:bg-[#F0F0F0]"
              >
                Order Custom Hats →
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
