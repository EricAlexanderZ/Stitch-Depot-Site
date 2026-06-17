"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Order = {
  id:             string;
  created_at:     string;
  order_number:   string;
  customer_name:  string;
  customer_email: string;
  customer_phone: string | null;
  hat_style:      string;
  hat_color:      string;
  stitch_type:    string;
  placement:      string[];
  quantity:       number;
  total:          number;
  per_hat:        number;
  artwork_urls:   string[];
  instructions:   string | null;
  status:         string;
  notes:          string | null;
};

const STATUSES = [
  "new", "proof_sent", "proof_approved", "in_production", "shipped", "complete", "cancelled",
];

const STATUS_COLORS: Record<string, string> = {
  new:            "bg-blue-900/50   text-blue-300",
  proof_sent:     "bg-yellow-900/50 text-yellow-300",
  proof_approved: "bg-purple-900/50 text-purple-300",
  in_production:  "bg-orange-900/50 text-orange-300",
  shipped:        "bg-teal-900/50   text-teal-300",
  complete:       "bg-green-900/50  text-green-300",
  cancelled:      "bg-red-900/50    text-red-300",
};

function statusLabel(s: string) {
  return s.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

export default function AdminOrderPage() {
  const { id }                      = useParams<{ id: string }>();
  const router                      = useRouter();
  const [order,   setOrder]         = useState<Order | null>(null);
  const [loading, setLoading]       = useState(true);
  const [status,  setStatus]        = useState("");
  const [notes,   setNotes]         = useState("");
  const [saving,  setSaving]        = useState(false);
  const [saved,   setSaved]         = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/orders/${id}`);
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) { setLoading(false); return; }
      const data = await res.json();
      setOrder(data);
      setStatus(data.status);
      setNotes(data.notes ?? "");
      setLoading(false);
    }
    load();
  }, [id, router]);

  async function handleSave() {
    if (!order) return;
    setSaving(true);
    const res = await fetch(`/api/admin/orders/${order.id}`, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ status, notes }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111111] text-sm text-[#A8B4BC]">
        Loading…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111111]">
        <p className="text-sm text-[#A8B4BC]">Order not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#111111] text-[#F0F0F0]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/20 bg-[#161616]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-sm text-[#A8B4BC] hover:text-[#F0F0F0]">← Orders</Link>
            <span className="text-white/20">/</span>
            <span className="font-extrabold text-[#F0F0F0]">{order.order_number}</span>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[order.status] ?? "bg-white/10 text-[#A8B4BC]"}`}>
            {statusLabel(order.status)}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">

          {/* Left, details */}
          <div className="space-y-6">

            {/* Customer */}
            <section className="rounded-[1.75rem] bg-[#222222] p-6 shadow-sm border border-white/20">
              <h2 className="text-base font-bold text-[#F0F0F0]">Customer</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
                <Detail label="Name"   value={order.customer_name} />
                <Detail label="Email"  value={<a href={`mailto:${order.customer_email}`} className="text-[#4A90C4] underline">{order.customer_email}</a>} />
                {order.customer_phone && <Detail label="Phone" value={order.customer_phone} />}
                <Detail label="Ordered" value={new Date(order.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })} />
              </div>
            </section>

            {/* Order details */}
            <section className="rounded-[1.75rem] bg-[#222222] p-6 shadow-sm border border-white/20">
              <h2 className="text-base font-bold text-[#F0F0F0]">Order Details</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <Detail label="Hat Style"   value={order.hat_style} />
                <Detail label="Color"       value={order.hat_color} />
                <Detail label="Stitch Type" value={order.stitch_type} />
                <Detail label="Placement"   value={order.placement.join(", ")} />
                <Detail label="Quantity"    value={`${order.quantity} hats`} />
                <Detail label="Total"       value={`$${Number(order.total).toFixed(2)} ($${Number(order.per_hat).toFixed(2)}/hat)`} />
              </div>
              {order.instructions && (
                <div className="mt-5 rounded-2xl bg-[#222222] p-4">
                  <p className="text-xs font-semibold text-[#A8B4BC]">Customer Instructions</p>
                  <p className="mt-1 text-sm text-[#F0F0F0]">{order.instructions}</p>
                </div>
              )}
            </section>

            {/* Artwork */}
            <section className="rounded-[1.75rem] bg-[#222222] p-6 shadow-sm border border-white/20">
              <h2 className="text-base font-bold text-[#F0F0F0]">Artwork Files</h2>
              {order.artwork_urls.length === 0 ? (
                <p className="mt-3 text-sm text-[#A8B4BC]/60">No artwork uploaded.</p>
              ) : (
                <div className="mt-4 flex flex-wrap gap-4">
                  {order.artwork_urls.map((url, i) => {
                    const isImage = /\.(png|jpe?g|webp|svg)$/i.test(url);
                    return (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[#222222] transition hover:border-[#4A90C4]"
                      >
                        {isImage ? (
                          <Image src={url} alt={`Artwork ${i + 1}`} fill className="object-contain p-2" />
                        ) : (
                          <div className="text-center">
                            <p className="text-2xl">📄</p>
                            <p className="mt-1 text-xs font-semibold text-[#A8B4BC]">File {i + 1}</p>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-xs font-bold text-white opacity-0 transition group-hover:bg-black/50 group-hover:opacity-100">
                          Open →
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* Right, actions */}
          <div className="space-y-6">
            <section className="rounded-[1.75rem] bg-[#222222] p-6 shadow-sm border border-white/20">
              <h2 className="text-base font-bold text-[#F0F0F0]">Update Order</h2>

              <div className="mt-4">
                <label className="mb-1 block text-xs font-semibold text-[#A8B4BC]">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-2xl border border-white/20 bg-[#222222] px-4 py-3 text-sm text-[#F0F0F0] outline-none focus:border-[#4A90C4]"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{statusLabel(s)}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-xs font-semibold text-[#A8B4BC]">Internal Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Production notes, proof links, tracking numbers…"
                  className="h-28 w-full rounded-2xl border border-white/20 bg-[#222222] p-4 text-sm text-[#F0F0F0] placeholder:text-[#A8B4BC]/50 outline-none focus:border-[#4A90C4]"
                />
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className={`mt-4 w-full rounded-2xl py-3 text-sm font-bold text-white transition ${
                  saving ? "cursor-not-allowed bg-[#444]" : "bg-[#4A90C4] hover:bg-[#4A90C4]"
                }`}
              >
                {saved ? "Saved ✓" : saving ? "Saving…" : "Save Changes"}
              </button>
            </section>

            <section className="rounded-[1.75rem] bg-[#222222] p-5 shadow-sm border border-white/20 text-sm">
              <p className="font-semibold text-[#F0F0F0]">Quick Actions</p>
              <div className="mt-3 space-y-2">
                <a
                  href={`mailto:${order.customer_email}?subject=Your Stitch Depot Order ${order.order_number}&body=Hi ${order.customer_name},%0A%0A`}
                  className="block rounded-xl bg-[#222222] px-4 py-2.5 text-center font-semibold text-[#4A90C4] transition hover:bg-[#0C2340]"
                >
                  Email Customer
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-[#A8B4BC]/60">{label}</p>
      <p className="mt-0.5 font-medium text-[#F0F0F0]">{value}</p>
    </div>
  );
}
