"use client";

import { Suspense, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SiteHeader, TopBanner } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// ─── Artwork upload widget ────────────────────────────────────

function ArtworkUpload({
  title,
  subtitle,
  onUploaded,
}: {
  title: string;
  subtitle: string;
  onUploaded: (url: string) => void;
}) {
  const inputRef                          = useRef<HTMLInputElement | null>(null);
  const [status, setStatus]               = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [fileName, setFileName]           = useState("");
  const [fileSize, setFileSize]           = useState("");
  const [error, setError]                 = useState("");

  async function handleFile(file: File) {
    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10 MB.");
      return;
    }
    setFileName(file.name);
    setFileSize(`${(file.size / 1024 / 1024).toFixed(2)} MB`);
    setStatus("uploading");
    setError("");

    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setStatus("done");
      onUploaded(data.url);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    }
  }

  function handleRemove() {
    setStatus("idle");
    setFileName("");
    setFileSize("");
    setError("");
    onUploaded("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="rounded-[1.5rem] bg-[#222222] p-6 shadow-sm">
      <p className="text-lg font-bold text-[#F0F0F0]">{title}</p>
      <p className="mt-1 text-sm text-[#A8B4BC]">{subtitle}</p>

      {status === "idle" && (
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full bg-gradient-to-b from-[#7AB3D4] to-[#1E5A8C] px-8 py-3 text-sm font-bold text-white shadow-md transition hover:from-[#5B9BD5] hover:to-[#0C2340]"
          >
            Choose file
          </button>
          <p className="mt-3 text-xs text-[#A8B4BC]/60">PNG, JPG, PDF, SVG, up to 10 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.pdf,.svg,.ai,.eps"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}

      {status === "uploading" && (
        <div className="mt-5 text-center text-sm text-[#A8B4BC]">
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#4A90C4] border-t-transparent" />
          <p className="mt-3">Uploading {fileName}…</p>
        </div>
      )}

      {(status === "done" || status === "error") && (
        <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-[#222222] px-4 py-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {status === "done" && <span className="text-green-400 text-sm">✓</span>}
              <p className="truncate text-sm font-semibold text-[#F0F0F0]">{fileName}</p>
            </div>
            <p className="text-xs text-[#A8B4BC]">{fileSize}</p>
            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 text-sm font-semibold text-red-400 hover:underline"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Inner page (needs useSearchParams) ──────────────────────

function UploadContent() {
  const params  = useSearchParams();
  const router  = useRouter();

  const hatStyle   = params.get("style")     ?? "Custom Hat";
  const hatColor   = params.get("color")     ?? "";
  const stitchType = params.get("stitch")    ?? "Regular Stitched Hat";
  const placement  = (params.get("placement") ?? "Front of Cap").split(",").map((p) => p.trim()).filter(Boolean);
  const quantity   = params.get("qty")       ?? "1";
  const total      = Number(params.get("total")  ?? 0);
  const perHat     = Number(params.get("perHat") ?? 0);

  const [name,         setName]         = useState("");
  const [email,        setEmail]        = useState("");
  const [phone,        setPhone]        = useState("");
  const [instructions, setInstructions] = useState("");
  const [artworkUrls,  setArtworkUrls]  = useState<Record<number, string>>({});
  const [submitting,   setSubmitting]   = useState(false);
  const [errors,       setErrors]       = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim())  e.name  = "Name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    const urls = Object.entries(artworkUrls)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([, url]) => url)
      .filter(Boolean);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName:  name.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        hatStyle,
        hatColor,
        stitchType,
        placement,
        quantity: Number(quantity),
        total,
        perHat,
        artworkUrls: urls,
        instructions: instructions.trim(),
      }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setErrors({ form: body.error ?? "Something went wrong. Please try again." });
      return;
    }

    const { orderNumber } = await res.json();
    router.push(`/order-confirmation?order=${orderNumber}&email=${encodeURIComponent(email.trim())}`);
  }

  const summaryRows = [
    { label: "Hat Style",   value: hatStyle },
    { label: "Color",       value: hatColor },
    { label: "Stitch Type", value: stitchType },
    { label: "Placement",   value: placement.join(", ") },
    { label: "Quantity",    value: `${quantity} hats` },
    { label: "Total",       value: `$${total.toFixed(2)}` },
    { label: "Per Hat",     value: `$${perHat.toFixed(2)}` },
  ].filter((r) => r.value && r.value !== "$0.00");

  return (
    <main className="min-h-dvh bg-[#111111] text-[#F0F0F0]">
      <TopBanner />
      <SiteHeader />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Upload Your Artwork
          </h1>
          <p className="mt-3 text-base text-[#A8B4BC]">
            Free artwork setup. Digital proof included. We stitch only after you approve.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">

            {/* Left column */}
            <div className="space-y-6">

              {/* Artwork uploads per placement */}
              {placement.map((p, i) => (
                <ArtworkUpload
                  key={p}
                  title={`${p} Artwork`}
                  subtitle={`Upload your artwork file for the ${p.toLowerCase()} embroidery position.`}
                  onUploaded={(url) => setArtworkUrls((prev) => ({ ...prev, [i]: url }))}
                />
              ))}

              {/* Contact info */}
              <div className="rounded-[1.5rem] bg-[#222222] p-6 shadow-sm">
                <p className="text-lg font-bold text-[#F0F0F0]">Your Contact Info</p>
                <p className="mt-1 text-sm text-[#A8B4BC]">
                  We&apos;ll send your digital proof and order updates here.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-semibold text-[#A8B4BC]">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: "" })); }}
                      placeholder="John Smith"
                      className={`w-full rounded-2xl border bg-[#222222] px-4 py-3 text-sm text-[#F0F0F0] placeholder:text-[#A8B4BC]/50 outline-none focus:border-[#4A90C4] ${errors.name ? "border-red-400" : "border-white/20"}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#A8B4BC]">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: "" })); }}
                      placeholder="you@example.com"
                      className={`w-full rounded-2xl border bg-[#222222] px-4 py-3 text-sm text-[#F0F0F0] placeholder:text-[#A8B4BC]/50 outline-none focus:border-[#4A90C4] ${errors.email ? "border-red-400" : "border-white/20"}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#A8B4BC]">
                      Phone <span className="text-[#A8B4BC]/60 font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full rounded-2xl border border-white/20 bg-[#222222] px-4 py-3 text-sm text-[#F0F0F0] placeholder:text-[#A8B4BC]/50 outline-none focus:border-[#4A90C4]"
                    />
                  </div>
                </div>
              </div>

              {/* Optional instructions */}
              <div className="rounded-[1.5rem] bg-[#222222] p-6 shadow-sm">
                <label className="block text-base font-bold text-[#F0F0F0]">
                  Additional Instructions{" "}
                  <span className="text-sm font-normal text-[#A8B4BC]/60">(optional)</span>
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Stitch color preferences, sizing notes, or anything else we should know…"
                  className="mt-3 h-28 w-full rounded-2xl border border-white/20 bg-[#222222] p-4 text-sm text-[#F0F0F0] placeholder:text-[#A8B4BC]/50 outline-none focus:border-[#4A90C4]"
                />
              </div>

              {errors.form && (
                <p className="rounded-2xl bg-red-900/30 px-5 py-3 text-sm font-semibold text-red-400">
                  {errors.form}
                </p>
              )}

              <div className="flex gap-3">
                <Link
                  href="/hats"
                  className="rounded-2xl border border-white/20 bg-[#222222] px-6 py-3 text-sm font-semibold text-[#F0F0F0] transition hover:bg-[#222222]"
                >
                  ← Back
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`flex-1 rounded-2xl px-6 py-3 text-sm font-bold text-white transition ${
                    submitting
                      ? "cursor-not-allowed bg-[#444]"
                      : "bg-gradient-to-b from-[#7AB3D4] to-[#1E5A8C] shadow-sm hover:from-[#5B9BD5] hover:to-[#0C2340] hover:scale-[1.01]"
                  }`}
                >
                  {submitting ? "Submitting…" : "Submit Order"}
                </button>
              </div>
            </div>

            {/* Right column, order summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="rounded-[1.75rem] border border-white/20 bg-[#222222] p-6 shadow-sm">
                <p className="text-base font-bold text-[#F0F0F0]">Order Summary</p>
                <div className="mt-4 space-y-2 text-sm text-[#A8B4BC]">
                  {summaryRows.map((row) => (
                    <p key={row.label}>
                      <span className="font-semibold text-[#F0F0F0]">{row.label}:</span>{" "}
                      {row.value}
                    </p>
                  ))}
                </div>

                <div className="mt-5 border-t border-white/5 pt-5">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold text-[#A8B4BC]">Order Total</p>
                    <p className="text-2xl font-extrabold text-[#F0F0F0]">${total.toFixed(2)}</p>
                  </div>
                  <p className="text-right text-xs text-[#A8B4BC]">${perHat.toFixed(2)} / hat</p>
                </div>
              </div>

              <div className="mt-4 rounded-[1.5rem] bg-[#4A90C4]/30 p-5 text-sm">
                <p className="font-bold text-[#F0F0F0]">What happens next?</p>
                <ol className="mt-3 space-y-2 text-xs leading-5 text-[#A8B4BC]">
                  <li><span className="font-semibold text-[#4A90C4]">1.</span> We digitize your artwork and send a proof by email.</li>
                  <li><span className="font-semibold text-[#4A90C4]">2.</span> You review and approve, or request changes.</li>
                  <li><span className="font-semibold text-[#4A90C4]">3.</span> Production begins only after your approval.</li>
                </ol>
              </div>
            </div>
          </div>
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center text-[#A8B4BC] text-sm bg-[#111111]">
        Loading…
      </div>
    }>
      <UploadContent />
    </Suspense>
  );
}
