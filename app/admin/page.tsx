import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import AdminLogout from "./logout";

type Order = {
  id:             string;
  created_at:     string;
  order_number:   string;
  customer_name:  string;
  customer_email: string;
  hat_style:      string;
  hat_color:      string;
  quantity:       number;
  total:          number;
  status:         string;
};

const STATUS_COLORS: Record<string, string> = {
  new:              "bg-blue-900/50   text-blue-300",
  proof_sent:       "bg-yellow-900/50 text-yellow-300",
  proof_approved:   "bg-purple-900/50 text-purple-300",
  in_production:    "bg-orange-900/50 text-orange-300",
  shipped:          "bg-teal-900/50   text-teal-300",
  complete:         "bg-green-900/50  text-green-300",
  cancelled:        "bg-red-900/50    text-red-300",
};

function statusLabel(s: string) {
  return s.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    redirect("/admin/login");
  }

  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("id, created_at, order_number, customer_name, customer_email, hat_style, hat_color, quantity, total, status")
    .order("created_at", { ascending: false });

  const stats = {
    total:      orders?.length ?? 0,
    new:        orders?.filter((o) => o.status === "new").length ?? 0,
    inProd:     orders?.filter((o) => o.status === "in_production").length ?? 0,
    complete:   orders?.filter((o) => o.status === "complete").length ?? 0,
    revenue:    orders?.reduce((sum, o) => sum + Number(o.total), 0) ?? 0,
  };

  return (
    <main className="min-h-screen bg-[#111111] text-[#F0F0F0]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#161616]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A90C4] text-xs font-bold text-white">
              SD
            </div>
            <span className="font-extrabold text-[#F0F0F0]">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-[#A8B4BC] hover:text-[#F0F0F0]">
              ← Site
            </Link>
            <AdminLogout />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
          {[
            { label: "Total Orders",   value: stats.total },
            { label: "New",            value: stats.new },
            { label: "In Production",  value: stats.inProd },
            { label: "Complete",       value: stats.complete },
            { label: "Revenue",        value: `$${stats.revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
          ].map((s) => (
            <div key={s.label} className="rounded-[1.5rem] bg-[#222222] p-5 shadow-sm border border-white/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#A8B4BC]/60">{s.label}</p>
              <p className="mt-1 text-2xl font-extrabold text-[#F0F0F0]">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <div className="mt-8 overflow-hidden rounded-[1.75rem] bg-[#222222] shadow-sm border border-white/10">
          <div className="px-6 py-4">
            <h2 className="text-lg font-extrabold text-[#F0F0F0]">All Orders</h2>
          </div>

          {!orders?.length ? (
            <div className="px-6 py-16 text-center text-sm text-[#A8B4BC]/60">
              No orders yet. They&apos;ll appear here when customers submit.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-t border-white/10 bg-[#161616]">
                    {["Order #", "Date", "Customer", "Hat", "Qty", "Total", "Status", ""].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#A8B4BC]/60">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(orders as Order[]).map((order) => (
                    <tr key={order.id} className="border-t border-white/10 hover:bg-[#222222]">
                      <td className="px-4 py-3 font-semibold text-[#F0F0F0]">{order.order_number}</td>
                      <td className="px-4 py-3 text-[#A8B4BC]">
                        {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#F0F0F0]">{order.customer_name}</p>
                        <p className="text-xs text-[#A8B4BC]/60">{order.customer_email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#F0F0F0]">{order.hat_style}</p>
                        <p className="text-xs text-[#A8B4BC]/60">{order.hat_color}</p>
                      </td>
                      <td className="px-4 py-3 text-[#A8B4BC]">{order.quantity}</td>
                      <td className="px-4 py-3 font-semibold text-[#F0F0F0]">${Number(order.total).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_COLORS[order.status] ?? "bg-white/10 text-[#A8B4BC]"}`}>
                          {statusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-xs font-semibold text-[#4A90C4] hover:underline"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
