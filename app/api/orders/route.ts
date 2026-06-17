import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendOrderConfirmation, sendAdminNewOrderAlert } from "@/lib/email";

type OrderPayload = {
  customerName:  string;
  customerEmail: string;
  customerPhone: string;
  hatStyle:      string;
  hatColor:      string;
  stitchType:    string;
  placement:     string[];
  quantity:      number;
  total:         number;
  perHat:        number;
  artworkUrls:   string[];
  instructions:  string;
};

export async function POST(request: NextRequest) {
  const body: OrderPayload = await request.json();

  // Generate readable order number: SD1001, SD1002, …
  const { count } = await getSupabaseAdmin()
    .from("orders")
    .select("*", { count: "exact", head: true });

  const orderNumber = `SD${1001 + (count ?? 0)}`;

  const { data: order, error } = await getSupabaseAdmin()
    .from("orders")
    .insert({
      order_number:  orderNumber,
      customer_name:  body.customerName,
      customer_email: body.customerEmail,
      customer_phone: body.customerPhone || null,
      hat_style:      body.hatStyle,
      hat_color:      body.hatColor,
      stitch_type:    body.stitchType,
      placement:      body.placement,
      quantity:       body.quantity,
      total:          body.total,
      per_hat:        body.perHat,
      artwork_urls:   body.artworkUrls,
      instructions:   body.instructions || null,
      status:         "new",
    })
    .select("id, order_number")
    .single();

  if (error || !order) {
    console.error("[api/orders] insert error:", JSON.stringify(error));
    return NextResponse.json({ error: error?.message ?? "Failed to save order." }, { status: 500 });
  }

  Promise.allSettled([
    sendOrderConfirmation({
      to:          body.customerEmail,
      name:        body.customerName,
      orderId:     order.id,
      orderNumber: order.order_number,
      hatStyle:    body.hatStyle,
      hatColor:    body.hatColor,
      quantity:    body.quantity,
      total:       body.total,
    }),
    sendAdminNewOrderAlert({
      orderId:       order.id,
      orderNumber:   order.order_number,
      customerName:  body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      hatStyle:      body.hatStyle,
      hatColor:      body.hatColor,
      stitchType:    body.stitchType,
      placement:     body.placement,
      quantity:      body.quantity,
      total:         body.total,
    }),
  ]);

  return NextResponse.json({ orderId: order.id, orderNumber: order.order_number });
}
