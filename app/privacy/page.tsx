import Link from "next/link";
import { SiteHeader, TopBanner } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-[#111111] text-[#F0F0F0]">
      <TopBanner />
      <SiteHeader />

      <article className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[#A8B4BC]">Last updated: June 2026</p>

        <div className="mt-10 max-w-none space-y-8 text-sm leading-7 text-[#A8B4BC]">

          <Section title="1. Information We Collect">
            <p>When you place an order or contact us, we collect:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Your name, email address, and phone number (if provided)</li>
              <li>Order details including hat style, color, quantity, and embroidery placement</li>
              <li>Artwork files you upload for embroidery</li>
              <li>Messages you send through our contact form</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use your information solely to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Process and fulfill your embroidery order</li>
              <li>Send you a digital proof and order updates by email</li>
              <li>Respond to contact form inquiries</li>
              <li>Improve our website and services</li>
            </ul>
            <p className="mt-2">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </Section>

          <Section title="3. Artwork Files">
            <p>
              Artwork files you upload are stored securely and used exclusively for producing your
              order. We do not share your artwork with any third party. Files may be retained for up
              to 90 days after order completion for re-order convenience, after which they are deleted.
            </p>
          </Section>

          <Section title="4. Data Storage">
            <p>
              Order data is stored in Supabase, a secure cloud database. We use industry-standard
              security practices to protect your information.
            </p>
          </Section>

          <Section title="5. Cookies">
            <p>
              We use a single session cookie for our admin dashboard (internal use only). We do not
              use tracking cookies, analytics cookies, or third-party advertising cookies on our
              customer-facing pages.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>
              You may request deletion of your personal data at any time by emailing{" "}
              <a href="mailto:Owner@thestitchdepot.com" className="text-[#4A90C4] underline">
                Owner@thestitchdepot.com
              </a>
              . We will process your request within 30 days.
            </p>
          </Section>

          <Section title="7. Contact">
            <p>
              Questions about this policy? Email us at{" "}
              <a href="mailto:Owner@thestitchdepot.com" className="text-[#4A90C4] underline">
                Owner@thestitchdepot.com
              </a>{" "}
              or use our{" "}
              <Link href="/contact" className="text-[#4A90C4] underline">
                contact form
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
