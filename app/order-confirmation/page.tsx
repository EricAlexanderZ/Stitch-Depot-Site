"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteHeader, TopBanner } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/context/cart-context";

function ConfirmationContent() {
  const params      = useSearchParams();
  const orderNumber = params.get("order") ?? "";
  const email       = params.get("email") ?? "";
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-dvh bg-[#111111] text-[#F0F0F0]">
      <TopBanner />
      <SiteHeader />

      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#4A90C4]/30">
          <span className="text-4xl">✓</span>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Order Received!
        </h1>

        {orderNumber && (
          <p className="mt-3 text-lg font-semibold text-[#4A90C4]">
            Order #{orderNumber}
          </p>
        )}

        <p className="mt-4 text-base leading-7 text-[#A8B4BC]">
          Thanks for your order. We&apos;ll digitize your artwork and send you a digital proof by
          email{email ? ` at ${email}` : ""} before we stitch anything, usually within 1–2 business days.
        </p>

        <div className="mt-8 rounded-[1.75rem] bg-[#222222] p-8 text-left shadow-sm">
          <p className="text-base font-bold text-[#F0F0F0]">What happens next</p>
          <ol className="mt-4 space-y-4">
            {[
              ["Proof by email", "We&apos;ll send a digital mockup of your logo on the hat for your review."],
              ["Approve or revise", "Request changes until the proof is exactly right, no rush."],
              ["Production begins", "Once you approve, we stitch in-house and ship to your door."],
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4A90C4] text-xs font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-[#F0F0F0]">{title}</p>
                  <p className="mt-0.5 text-sm text-[#A8B4BC]" dangerouslySetInnerHTML={{ __html: text }} />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/hats"
            className="rounded-full bg-gradient-to-b from-[#7AB3D4] to-[#1E5A8C] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:from-[#5B9BD5] hover:to-[#0C2340]"
          >
            Order More Hats
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/10 bg-[#222222] px-6 py-3 text-sm font-semibold text-[#F0F0F0] transition hover:bg-[#222222]"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-10 text-sm text-[#A8B4BC]">
          Questions? Email us at{" "}
          <a href="mailto:Owner@thestitchdepot.com" className="font-semibold text-[#4A90C4] underline">
            Owner@thestitchdepot.com
          </a>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center text-[#A8B4BC] text-sm bg-[#111111]">
        Loading…
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
