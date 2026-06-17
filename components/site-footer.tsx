import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/images/home/stitch_depot_logo.png" alt="Stitch Depot" width={48} height={48} className="object-contain" />
              <div>
                <p className="text-xl font-extrabold">Stitch Depot</p>
                <p className="mt-1 text-xs text-white/50">Premium embroidered hats for brands &amp; teams</p>
              <p className="mt-2 text-sm text-white/70">Owner@thestitchdepot.com</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/60">Hat Styles</p>
            <div className="mt-4 space-y-3 text-sm">
              <Link href="/hats" className="block text-white/70 hover:text-white">Structured Trucker Hats</Link>
              <Link href="/hats" className="block text-white/70 hover:text-white">Performance Rope Hats</Link>
              <Link href="/hats" className="block text-white/70 hover:text-white">Flex Fit Caps</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/60">Support</p>
            <div className="mt-4 space-y-3 text-sm">
              <Link href="/faq" className="block text-white/70 hover:text-white">FAQ</Link>
              <Link href="/contact" className="block text-white/70 hover:text-white">Contact Us</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/60">Legal</p>
            <div className="mt-4 space-y-3 text-sm">
              <Link href="/privacy" className="block text-white/70 hover:text-white">Privacy</Link>
              <Link href="/terms" className="block text-white/70 hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
          © 2026 Stitch Depot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
