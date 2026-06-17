"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { productLinks } from "@/lib/navigation";
import { useCart } from "@/context/cart-context";

const BANNER_MESSAGES = [
  "Premium embroidered hats · Free digital proofs · Fast 7–10 day turnaround",
  "Nationwide shipping on every order",
  "New customer? Use code FIRSTORDER for 15% off your first order",
];

export function TopBanner() { return null; }

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="drawer-slide-in fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-[#111111] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Image src="/images/home/stitch_depot_logo.png" alt="Stitch Depot" height={36} width={36} className="object-contain" />
          <button type="button" onClick={onClose} className="text-lg text-[#A8B4BC]/60" aria-label="Close menu">
            &#x2715;
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#A8B4BC]/60">Hat Styles</p>
          <div className="space-y-1">
            {productLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-[#0C2340]"
              >
                <div className="relative h-10 w-10 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-contain" />
                </div>
                <span className="font-semibold text-[#F0F0F0]">{item.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 space-y-1 border-t border-white/10 pt-5">
            <Link href="/about"   onClick={onClose} className="block rounded-2xl p-3 text-sm font-semibold text-[#F0F0F0] transition hover:bg-[#0C2340]">Our Story</Link>
            <Link href="/contact" onClick={onClose} className="block rounded-2xl p-3 text-sm font-semibold text-[#F0F0F0] transition hover:bg-[#0C2340]">Contact</Link>
            <Link href="/faq"     onClick={onClose} className="block rounded-2xl p-3 text-sm font-semibold text-[#F0F0F0] transition hover:bg-[#0C2340]">FAQ</Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export function SiteHeader() {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [bannerIndex,   setBannerIndex]   = useState(0);
  const [bannerKey,     setBannerKey]     = useState(0);
  const [bannerExiting, setBannerExiting] = useState(false);
  const swapRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { total } = useCart();

  useEffect(() => {
    const id = setInterval(() => {
      setBannerExiting(true);
      swapRef.current = setTimeout(() => {
        setBannerIndex((i) => (i + 1) % BANNER_MESSAGES.length);
        setBannerKey((k) => k + 1);
        setBannerExiting(false);
      }, 350);
    }, 4500);

    return () => {
      clearInterval(id);
      if (swapRef.current) clearTimeout(swapRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111111]">
      {/* Rotating banner */}
      <div className="overflow-hidden bg-gradient-to-r from-[#0C2340] via-[#7AB3D4] to-[#0C2340] px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">
        <span
          key={bannerKey}
          className="banner-slide-in inline-block"
          style={
            bannerExiting
              ? { opacity: 0, transform: "translateY(-8px)", transition: "opacity 0.3s ease, transform 0.3s ease" }
              : undefined
          }
        >
          {BANNER_MESSAGES[bannerIndex]}
        </span>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between px-4 py-4 md:hidden">
        <Link href="/">
          <Image src="/images/home/stitch_depot_logo.png" alt="Stitch Depot" height={52} width={52} className="object-contain" />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/contact" aria-label="Account" className="text-[#F0F0F0]/60 transition hover:text-[#F0F0F0]">
            <PersonIcon />
          </Link>
          <Link
            href="/cart"
            className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold text-[#F0F0F0] transition hover:border-white/60"
          >
            ${total.toFixed(2)}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex flex-col gap-[5px] p-1"
          >
            <span className="block h-[2px] w-6 bg-[#F0F0F0]" />
            <span className="block h-[2px] w-6 bg-[#F0F0F0]" />
            <span className="block h-[2px] w-6 bg-[#F0F0F0]" />
          </button>
        </div>
      </div>

      {/* Desktop */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between px-6 py-4 md:flex">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/home/stitch_depot_logo.png" alt="Stitch Depot" height={60} width={60} className="object-contain" />
        </Link>

        <nav className="flex items-center gap-8">
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-[#F0F0F0] hover:text-[#4A90C4]">
              Hat Styles <span>▾</span>
            </button>
            <div className="invisible absolute left-0 top-full mt-3 w-[320px] rounded-[1.75rem] border border-black/10 bg-[#EBE7E1] p-4 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="space-y-2">
                {productLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group/item flex items-center gap-4 rounded-2xl p-3 transition duration-200 hover:bg-black/10"
                  >
                    <div className="relative h-16 w-16 transition duration-200 group-hover/item:scale-105">
                      <Image src={item.image} alt={item.name} fill className="object-contain" />
                    </div>
                    <p className="text-base font-bold text-[#111111] transition group-hover/item:text-[#4A90C4]">
                      {item.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/about"   className="text-sm font-medium text-[#F0F0F0] hover:text-[#4A90C4]">Our Story</Link>
          <Link href="/contact" className="text-sm font-medium text-[#F0F0F0] hover:text-[#4A90C4]">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/contact" aria-label="Account" className="text-[#F0F0F0]/60 transition hover:text-[#F0F0F0]">
            <PersonIcon />
          </Link>
          <Link
            href="/cart"
            className="rounded-full border border-white/25 px-4 py-1.5 text-sm font-semibold text-[#F0F0F0] transition hover:border-white/60"
          >
            ${total.toFixed(2)}
          </Link>
        </div>
      </div>

      {menuOpen && <MobileDrawer onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

function PersonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}
