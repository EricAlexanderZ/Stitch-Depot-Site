import Link from "next/link";
import { SiteHeader, TopBanner } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProcessSteps } from "@/components/process-steps";

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-[#111111] text-[#F0F0F0]">
      <TopBanner />
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-white/5 bg-[#161616]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Built for brands that care about quality.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#A8B4BC]">
            Stitch Depot is a custom embroidery shop focused on one thing: premium embroidered hats
            for brands, teams, and businesses. Every hat is digitized and stitched in-house, no
            middlemen, no overseas handoffs.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {[
            {
              title: "In-House Embroidery",
              text: "We don't outsource production. Every hat is stitched in our own shop, which means tighter quality control and faster turnaround.",
            },
            {
              title: "Free Digital Proof",
              text: "Nothing gets stitched until you approve a digital mockup of your design on the hat. You can request changes, no extra charge.",
            },
            {
              title: "Low Minimums",
              text: "Order as few as 5 hats. Whether you're a startup or a national brand, we scale with your order size without compromising quality.",
            },
          ].map(({ title, text }) => (
            <div key={title} className="rounded-[1.75rem] bg-[#222222] p-7">
              <h3 className="text-base font-extrabold text-[#F0F0F0]">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#A8B4BC]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-[#4A90C4] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-8 text-center text-white md:grid-cols-4">
            {[
              { value: "680+",  label: "Happy customers" },
              { value: "5/5",   label: "Average review score" },
              { value: "3",     label: "Hat styles" },
              { value: "7–10",  label: "Day turnaround" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-extrabold">{value}</p>
                <p className="mt-1 text-sm text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Ready to put your logo on a hat?
        </h2>
        <p className="mt-4 text-base text-[#A8B4BC]">
          Use our online configurator to build your order, upload your artwork, and get a free
          digital proof, all in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/hats"
            className="rounded-full bg-gradient-to-b from-[#7AB3D4] to-[#1E5A8C] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:from-[#5B9BD5] hover:to-[#0C2340]"
          >
            Order Custom Hats
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-[#4A90C4] px-6 py-3 text-sm font-semibold text-[#A8B4BC] transition hover:bg-[#0C2340]"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
