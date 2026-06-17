"use client";

import Link from "next/link";
import Image from "next/image";
import { SiteHeader, TopBanner } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart, type CartItem } from "@/context/cart-context";
import { productLinks } from "@/lib/navigation";

export default function CartPage() {
  const { item, total, clearCart } = useCart();

  return (
    <main className="min-h-dvh bg-[#111111] text-[#F0F0F0]">
      <TopBanner />
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">My Cart</h1>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Left — cart item */}
          <div>
            {item ? (
              <CartItemCard item={item} onRemove={clearCart} />
            ) : (
              <EmptyCart />
            )}
          </div>

          {/* Right — summary + promo */}
          <div className="space-y-4">
            <OrderSummaryCard total={total} item={item} />
            <PromoCodeCard />
          </div>
        </div>

        {/* Browse more */}
        <div className="mt-20">
          <h2 className="text-center text-4xl font-extrabold tracking-tight">Browse Hat Styles</h2>
          <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#161616] p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {productLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex flex-col items-center rounded-2xl p-4 text-center transition duration-300 hover:bg-white/5"
                >
                  <div className="relative h-28 w-28 transition duration-300 group-hover:scale-110 sm:h-40 sm:w-40">
                    <Image src={link.image} alt={link.name} fill className="object-contain drop-shadow-lg" />
                  </div>
                  <span className="mt-3 text-base font-bold text-[#F0F0F0] transition duration-300 group-hover:text-[#4A90C4] sm:mt-4 sm:text-lg">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function EmptyCart() {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-[#222222] p-10 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#4A90C4]/20">
        <CartIcon />
      </div>
      <p className="mt-5 text-xl font-semibold text-[#F0F0F0]">Your cart is empty</p>
      <p className="mt-2 text-sm text-[#A8B4BC]">
        Configure your order on the hats page to get started.
      </p>
      <Link
        href="/hats"
        className="mt-6 inline-block rounded-full bg-gradient-to-b from-[#7AB3D4] to-[#1E5A8C] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:from-[#5B9BD5] hover:to-[#0C2340]"
      >
        Browse Hats
      </Link>
    </div>
  );
}

function CartItemCard({ item, onRemove }: { item: CartItem; onRemove: () => void }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-[#222222] p-5 shadow-sm sm:p-6">
      <div className="flex gap-4 sm:gap-6">
        {/* Hat preview */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#2a2a2a] sm:h-28 sm:w-28">
          {item.previewImage ? (
            <Image src={item.previewImage} alt={item.style} fill className="object-contain p-2" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl">🧢</div>
          )}
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-lg font-bold text-[#F0F0F0] sm:text-xl">Custom Embroidered Hat</p>
            <button
              type="button"
              onClick={onRemove}
              className="shrink-0 text-sm text-[#A8B4BC] transition hover:text-red-400"
            >
              Remove
            </button>
          </div>

          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex gap-2">
              <dt className="font-semibold text-[#F0F0F0]">Style:</dt>
              <dd className="text-[#A8B4BC]">{item.style}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-[#F0F0F0]">Color:</dt>
              <dd className="text-[#A8B4BC]">{item.color}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-[#F0F0F0]">Stitch:</dt>
              <dd className="text-[#A8B4BC]">{item.stitch}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-[#F0F0F0]">
                {item.placements.length > 1 ? "Placements:" : "Placement:"}
              </dt>
              <dd className="text-[#A8B4BC]">{item.placements.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Bottom row — qty + price */}
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
        <div className="rounded-xl border border-white/20 bg-[#1a1a1a] px-4 py-2 text-sm font-semibold text-[#F0F0F0]">
          Qty: {item.quantity}
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold text-[#F0F0F0]">${item.total.toFixed(2)}</p>
          <p className="text-xs text-[#A8B4BC]">${item.perHat.toFixed(2)} / hat</p>
        </div>
      </div>
    </div>
  );
}

function OrderSummaryCard({ total, item }: { total: number; item: CartItem | null }) {
  const uploadHref = item
    ? `/upload?${new URLSearchParams({
        style:     item.style,
        color:     item.color,
        stitch:    item.stitch,
        placement: item.placements.join(","),
        qty:       String(item.quantity),
        total:     item.total.toFixed(2),
        perHat:    item.perHat.toFixed(2),
      }).toString()}`
    : "/hats";

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-[#222222] p-6 shadow-sm">
      <p className="text-xl font-bold text-[#F0F0F0]">Order Summary</p>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[#A8B4BC]">Subtotal ({item ? item.quantity : 0} hats)</span>
          <span className="font-semibold text-[#F0F0F0]">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A8B4BC]">Shipping</span>
          <span className="text-[#A8B4BC]">Nationwide</span>
        </div>
      </div>

      <div className="mt-5 border-t border-white/10 pt-5">
        <div className="flex items-baseline justify-between">
          <span className="text-base font-bold text-[#F0F0F0]">Total</span>
          <span className="text-2xl font-extrabold text-[#F0F0F0]">${total.toFixed(2)}</span>
        </div>
      </div>

      <Link
        href={uploadHref}
        className={`mt-6 block w-full rounded-2xl px-5 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition ${
          item
            ? "bg-gradient-to-b from-[#7AB3D4] to-[#1E5A8C] hover:scale-[1.02] hover:from-[#5B9BD5] hover:to-[#0C2340]"
            : "bg-[#333] text-[#A8B4BC] hover:bg-[#3a3a3a]"
        }`}
      >
        {item ? "Proceed to Upload" : "Configure Your Order"}
      </Link>
    </div>
  );
}

function PromoCodeCard() {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-[#222222] p-5 shadow-sm">
      <p className="text-sm font-bold text-[#F0F0F0]">Promo Code</p>
      <p className="mt-1 text-xs text-[#A8B4BC]">
        First time customer? Try <span className="font-semibold text-[#4A90C4]">FIRSTORDER</span> for 15% off.
      </p>
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          placeholder="Enter code"
          className="min-w-0 flex-1 rounded-xl border border-white/20 bg-[#1a1a1a] px-3 py-2 text-sm text-[#F0F0F0] outline-none placeholder:text-[#A8B4BC]/50 focus:border-[#4A90C4]"
        />
        <button
          type="button"
          className="rounded-xl bg-[#4A90C4] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5B9BD5]"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4A90C4"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
