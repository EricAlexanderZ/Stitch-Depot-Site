import Link from "next/link";
import { SiteHeader, TopBanner } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function TermsPage() {
  return (
    <main className="min-h-dvh bg-[#111111] text-[#F0F0F0]">
      <TopBanner />
      <SiteHeader />

      <article className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-[#A8B4BC]">Last updated: June 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-[#A8B4BC]">

          <Section title="1. Overview">
            <p>
              By placing an order with Stitch Depot, you agree to these Terms of Service. Please
              read them carefully before submitting an order.
            </p>
          </Section>

          <Section title="2. Orders and Pricing">
            <p>
              Prices displayed in our configurator are accurate at the time of submission.
              The minimum order quantity is 5 hats. Order totals are calculated based on
              quantity, hat style, stitch type, and embroidery placement selections made during checkout.
            </p>
            <p>
              We reserve the right to contact you if there is a pricing discrepancy or if your
              order requires clarification before production begins.
            </p>
          </Section>

          <Section title="3. Digital Proofs and Approval">
            <p>
              Every order includes a free digital proof sent to the email address you provide.
              Production does not begin until you have explicitly approved the proof in writing
              (by email reply or digital confirmation).
            </p>
            <p>
              By approving a proof, you confirm that the design, placement, colors, and spelling
              are correct. Stitch Depot is not responsible for errors that were present in an
              approved proof.
            </p>
          </Section>

          <Section title="4. Artwork">
            <p>
              By uploading artwork, you confirm that you own or have the legal right to use the
              design for embroidery reproduction. Stitch Depot is not responsible for any
              intellectual property claims arising from customer-provided artwork.
            </p>
          </Section>

          <Section title="5. Production and Turnaround">
            <p>
              Standard production time is 7–10 business days after proof approval. Turnaround
              times are estimates and may vary. We will notify you of any significant delays.
            </p>
          </Section>

          <Section title="6. Returns and Revisions">
            <p>
              Because all hats are custom-made to order, we do not accept returns based on
              change of mind. If the finished product does not match the approved proof, we will
              remake the affected hats at no charge.
            </p>
            <p>
              Claims must be submitted within 7 days of delivery with photo documentation to{" "}
              <a href="mailto:Owner@thestitchdepot.com" className="text-[#4A90C4] underline">
                Owner@thestitchdepot.com
              </a>
              .
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              Stitch Depot&apos;s liability is limited to the value of the order in question. We
              are not liable for indirect, incidental, or consequential damages.
            </p>
          </Section>

          <Section title="8. Contact">
            <p>
              Questions about these terms? Contact us at{" "}
              <a href="mailto:Owner@thestitchdepot.com" className="text-[#4A90C4] underline">
                Owner@thestitchdepot.com
              </a>{" "}
              or via our{" "}
              <Link href="/contact" className="text-[#4A90C4] underline">
                contact page
              </Link>
              .
            </p>
          </Section>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-extrabold text-[#F0F0F0]">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}
