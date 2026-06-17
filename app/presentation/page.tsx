import Image from "next/image";

const DESKTOP_IFRAME_W = 1440;
const DESKTOP_DISPLAY_W = 880;
const DESKTOP_SCALE = DESKTOP_DISPLAY_W / DESKTOP_IFRAME_W;
const DESKTOP_DISPLAY_H = 560;
const DESKTOP_IFRAME_H = Math.round(DESKTOP_DISPLAY_H / DESKTOP_SCALE);

const MOBILE_IFRAME_W = 390;
const MOBILE_DISPLAY_W = 248;
const MOBILE_SCALE = MOBILE_DISPLAY_W / MOBILE_IFRAME_W;
const MOBILE_DISPLAY_H = 536;
const MOBILE_IFRAME_H = Math.round(MOBILE_DISPLAY_H / MOBILE_SCALE);

const PALETTE = [
  { name: "Background",  hex: "#111111" },
  { name: "Card",        hex: "#222222" },
  { name: "Light Stone", hex: "#EBE7E1" },
  { name: "Cream",       hex: "#F0F0F0" },
  { name: "Warm Greige", hex: "#A8B4BC" },
];

export default function PresentationPage() {
  return (
    <div
      className="min-h-screen bg-[#0d0d0d] text-white"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto max-w-[1360px] px-6 py-10 sm:px-12 sm:py-14">

        {/* ── Top bar ─────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image src="/images/home/stitch_depot_logo.png" alt="Stitch Depot" width={56} height={56} className="object-contain" />
            <div>
              <p className="text-xl font-extrabold tracking-tight sm:text-2xl">Stitch Depot</p>
              <p className="mt-0.5 text-[11px] text-white/40 tracking-wide sm:text-xs">Custom Embroidered Hats · Website Preview</p>
            </div>
          </div>

          <div className="text-right text-xs leading-5 text-white/25">
            <p className="font-semibold">Confidential Client Preview</p>
            <p>June 2026 · v1.0</p>
          </div>
        </div>

        {/* ── Brand Identity ──────────────────────────────────── */}
        <SectionLabel label="Brand Identity" className="mt-10 sm:mt-14" />

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">

          {/* Logo showcase */}
          <div className="flex items-center gap-4 lg:flex-col lg:items-start">
            <div className="flex h-32 w-44 items-center justify-center rounded-2xl border border-white/10 bg-[#111111] shadow-lg sm:h-40 sm:w-52">
              <Image src="/images/home/stitch_depot_logo.png" alt="on dark" width={100} height={100} className="object-contain" />
            </div>
            <div className="flex h-32 w-44 items-center justify-center rounded-2xl border border-black/10 bg-[#EBE7E1] shadow-lg sm:h-40 sm:w-52">
              <Image src="/images/home/stitch_depot_logo.png" alt="on light" width={100} height={100} className="object-contain" />
            </div>
            <p className="hidden text-[10px] uppercase tracking-widest text-white/30 lg:block">Logo</p>
          </div>

          {/* Colour palette */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-24 rounded-xl shadow-md sm:h-10 sm:w-28" style={{ background: "linear-gradient(to bottom, #7AB3D4, #1E5A8C)" }} />
              <div>
                <p className="text-xs font-semibold text-white/80">Gold Gradient</p>
                <p className="text-[10px] text-white/30">#7AB3D4 → #1E5A8C</p>
              </div>
            </div>
            {PALETTE.map((s) => (
              <div key={s.hex} className="flex items-center gap-3">
                <div className="h-9 w-24 rounded-xl border border-white/10 shadow-md sm:h-10 sm:w-28" style={{ background: s.hex }} />
                <div>
                  <p className="text-xs font-semibold text-white/80">{s.name}</p>
                  <p className="text-[10px] text-white/30">{s.hex}</p>
                </div>
              </div>
            ))}
            <p className="mt-1 text-[10px] uppercase tracking-widest text-white/30">Colour Palette</p>
          </div>

          {/* Typography */}
          <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div>
              <p className="text-5xl font-extrabold leading-none tracking-tight">Aa</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-white/30">Display · Extrabold</p>
            </div>
            <div>
              <p className="text-2xl font-bold">Section heading</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-white/30">Heading · Bold</p>
            </div>
            <div>
              <p className="text-sm leading-6 text-[#A8B4BC]">Body copy in warm greige<br />for readability on dark.</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-white/30">Body · Regular</p>
            </div>
          </div>
        </div>

        {/* ── Homepage Preview ────────────────────────────────── */}
        <SectionLabel label="Homepage Preview" className="mt-12 sm:mt-16" />

        <div className="mt-8 overflow-x-auto pb-4">
          <div className="flex min-w-max items-start gap-10">

            {/* Desktop frame */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Desktop</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/40">1440 × 900</span>
              </div>
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
                {/* Browser chrome */}
                <div className="flex items-center gap-3 bg-[#1c1c1c] px-5 py-3">
                  <div className="flex shrink-0 gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="mx-auto w-56 rounded-lg bg-[#2a2a2a] px-4 py-1.5 text-center text-[11px] text-white/25">
                    stitchdepot.com
                  </div>
                </div>
                {/* Viewport */}
                <div style={{ width: DESKTOP_DISPLAY_W, height: DESKTOP_DISPLAY_H, overflow: "hidden", position: "relative" }}>
                  {/* PDF fallback – visible when iframe is hidden */}
                  <DeviceFallback />
                  {/* Live preview */}
                  <iframe
                    src="/"
                    title="Desktop Preview"
                    style={{
                      position: "absolute", inset: 0,
                      width: DESKTOP_IFRAME_W,
                      height: DESKTOP_IFRAME_H,
                      transform: `scale(${DESKTOP_SCALE})`,
                      transformOrigin: "top left",
                      border: "none",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Mobile frame */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Mobile</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/40">390 × 844</span>
              </div>
              {/* iPhone shell */}
              <div
                className="relative shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                style={{ background: "#1a1a1a", borderRadius: "3rem", padding: "14px", border: "2px solid rgba(255,255,255,0.12)" }}
              >
                {/* Dynamic Island */}
                <div style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", width: 90, height: 26, background: "#0d0d0d", borderRadius: 999, zIndex: 10 }} />
                {/* Screen */}
                <div style={{ width: MOBILE_DISPLAY_W, height: MOBILE_DISPLAY_H, overflow: "hidden", borderRadius: "2.4rem", background: "#000", position: "relative" }}>
                  {/* PDF fallback */}
                  <DeviceFallback small />
                  {/* Live preview */}
                  <iframe
                    src="/"
                    title="Mobile Preview"
                    style={{
                      position: "absolute", inset: 0,
                      width: MOBILE_IFRAME_W,
                      height: MOBILE_IFRAME_H,
                      transform: `scale(${MOBILE_SCALE})`,
                      transformOrigin: "top left",
                      border: "none",
                      pointerEvents: "none",
                    }}
                  />
                </div>
                {/* Home indicator */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                  <div style={{ height: 4, width: 88, borderRadius: 999, background: "rgba(255,255,255,0.2)" }} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────── */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 sm:mt-16">
          <div className="flex items-center gap-3">
            <Image src="/images/home/stitch_depot_logo.png" alt="" width={24} height={24} className="object-contain opacity-30" />
            <p className="text-xs text-white/25">Stitch Depot © 2026</p>
          </div>
          <p className="text-xs text-white/20">For client review only · Not for distribution</p>
        </div>

      </div>
    </div>
  );
}

function DeviceFallback({ small }: { small?: boolean }) {
  return (
    <div
      style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "#111111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: small ? 8 : 12,
      }}
    >
      <div style={{ width: small ? 32 : 40, height: 3, background: "linear-gradient(to right, #0C2340, #7AB3D4, #0C2340)", borderRadius: 999 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/home/stitch_depot_logo.png" alt="Stitch Depot" width={small ? 44 : 60} height={small ? 44 : 60} style={{ objectFit: "contain" }} />
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#F0F0F0", fontWeight: 700, fontSize: small ? 11 : 14, margin: 0 }}>Stitch Depot</p>
        <p style={{ color: "#4A90C4", fontSize: small ? 9 : 11, marginTop: 4 }}>stitchdepot.com</p>
      </div>
    </div>
  );
}

function SectionLabel({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="h-px flex-1 bg-white/10" />
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/25">{label}</p>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}
