import Link from "next/link";
import { SiteHeader, TopBanner } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

type FAQItem = { q: string; a: string };

const faqs: FAQItem[] = [
  {
    q: "What is the minimum order quantity?",
    a: "The minimum order is 5 hats. Pricing scales down significantly as quantity increases, check the hat configurator for a full price breakdown.",
  },
  {
    q: "What hat styles do you offer?",
    a: "We carry a variety of styles including structured trucker hats, performance rope hats, flex fit caps, snapbacks, and more. All are available in a wide range of colors.",
  },
  {
    q: "What's the difference between regular and 3D puff embroidery?",
    a: "Regular embroidery stitches your logo flat against the hat for a clean, classic look. 3D puff embroidery uses a foam underlay to raise the design off the surface, giving it a bold, dimensional appearance. 3D puff works best for simple block letters and logos.",
  },
  {
    q: "Do you provide a digital proof before production?",
    a: "Yes, every order includes a free digital proof. We'll send you a mockup by email before a single stitch is made. You can request changes until you're happy with it.",
  },
  {
    q: "What file formats do you accept for artwork?",
    a: "We accept PNG, JPG, PDF, SVG, AI, and EPS files up to 10 MB. Vector files (AI, EPS, SVG) give the cleanest results. If you only have a PNG or JPG, our team will handle digitizing it for embroidery.",
  },
  {
    q: "How long does production take?",
    a: "Most orders ship within 7–10 business days after proof approval. Rush orders may be available, contact us before ordering.",
  },
  {
    q: "Can I embroider on more than one location?",
    a: "Yes. You can add Front of Cap, Left Side, and Right Side placements. Each additional placement beyond the first adds $5 per hat.",
  },
  {
    q: "Do you ship nationwide?",
    a: "Yes, we ship across the entire United States.",
  },
  {
    q: "Can I order different colors in the same batch?",
    a: "Yes. If you want a mix of colors in a single order, reach out via our contact form or email Owner@thestitchdepot.com and we'll set it up manually.",
  },
  {
    q: "What is your refund or revision policy?",
    a: "We stand behind our work. If the finished hats don't match the approved proof, we'll make it right. Contact us within 7 days of receiving your order.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-dvh bg-[#111111] text-[#F0F0F0]">
      <TopBanner />
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-4 text-base leading-7 text-[#A8B4BC]">
            Everything you need to know about ordering custom embroidered hats.
          </p>
        </div>

        <div className="mt-12 divide-y divide-white/10">
          {faqs.map(({ q, a }) => (
            <div key={q} className="py-7">
              <h2 className="text-base font-bold text-[#F0F0F0]">{q}</h2>
              <p className="mt-2 text-sm leading-7 text-[#A8B4BC]">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] border border-[#4A90C4] bg-[#222222] p-8 text-center shadow-sm">
          <h3 className="text-xl font-extrabold">Still have questions?</h3>
          <p className="mt-2 text-sm text-[#A8B4BC]">We&apos;re happy to help. Reach out directly.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-b from-[#7AB3D4] to-[#1E5A8C] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:from-[#5B9BD5] hover:to-[#0C2340]"
            >
              Contact Us
            </Link>
            <Link
              href="/hats"
              className="rounded-full border border-[#4A90C4] px-6 py-3 text-sm font-semibold text-[#A8B4BC] transition hover:bg-[#0C2340]"
            >
              Build Your Order
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
