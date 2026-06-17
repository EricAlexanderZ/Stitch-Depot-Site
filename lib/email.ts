import nodemailer from "nodemailer";

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

async function send({ to, subject, html }: EmailPayload) {
  const transporter = getTransporter();
  if (!transporter) return;
  const from = process.env.EMAIL_USER;
  await transporter.sendMail({ from: `Stitch Depot <${from}>`, to, subject, html });
}

export function sendOrderConfirmation({
  to,
  name,
  orderId,
  orderNumber,
  hatStyle,
  hatColor,
  quantity,
  total,
}: {
  to: string;
  name: string;
  orderId: string;
  orderNumber: string;
  hatStyle: string;
  hatColor: string;
  quantity: number;
  total: number;
}) {
  void orderId;
  return send({
    to,
    subject: `Order Received, Stitch Depot ${orderNumber}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#111">
        <div style="background:#13294b;padding:24px 32px;border-radius:16px 16px 0 0">
          <p style="color:#fff;font-weight:900;font-size:22px;letter-spacing:0.05em;margin:0">STITCH DEPOT</p>
        </div>
        <div style="background:#fff;padding:32px;border-radius:0 0 16px 16px;border:1px solid #eee">
          <h1 style="font-size:24px;margin:0 0 8px">Order Received!</h1>
          <p style="color:#555;margin:0 0 24px">
            Hi ${name}, we've received your hat order. We'll send you a digital proof by email before
            anything gets stitched, so you can review and approve the design first.
          </p>

          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <thead>
              <tr style="background:#f6f6f4">
                <th style="padding:8px;text-align:left">Detail</th>
                <th style="padding:8px;text-align:right">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #eee">Order #</td>
                <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;font-weight:700">${orderNumber}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #eee">Hat Style</td>
                <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${hatStyle}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #eee">Color</td>
                <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${hatColor}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #eee">Quantity</td>
                <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${quantity} hats</td>
              </tr>
              <tr>
                <td style="padding:12px 0;font-weight:700;font-size:16px">Total</td>
                <td style="padding:12px 0;font-weight:700;font-size:16px;text-align:right">$${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top:24px;background:#eef2f7;border-radius:12px;padding:16px;font-size:13px;color:#555">
            <p style="margin:0 0 8px"><strong>What happens next?</strong></p>
            <p style="margin:0 0 4px">✓ Our team will digitize your artwork and send a proof by email.</p>
            <p style="margin:0 0 4px">✓ Review and approve your proof, or request changes.</p>
            <p style="margin:0">✓ Production begins only after you approve.</p>
          </div>

          <p style="margin-top:24px;font-size:13px;color:#888">
            Questions? Email us at <a href="mailto:Owner@thestitchdepot.com" style="color:#13294b">Owner@thestitchdepot.com</a>
          </p>
        </div>
      </div>
    `,
  });
}

export function sendAdminNewOrderAlert({
  orderId,
  orderNumber,
  customerName,
  customerEmail,
  customerPhone,
  hatStyle,
  hatColor,
  stitchType,
  placement,
  quantity,
  total,
}: {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  hatStyle: string;
  hatColor: string;
  stitchType: string;
  placement: string[];
  quantity: number;
  total: number;
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!adminEmail) return Promise.resolve();

  return send({
    to: adminEmail,
    subject: `New Order ${orderNumber}, ${customerName}, $${total.toFixed(2)}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto">
        <h2 style="margin:0 0 16px">New Hat Order Received</h2>
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#555">Order #</td><td style="font-weight:700">${orderNumber}</td></tr>
          <tr><td style="padding:6px 0;color:#555">Customer</td><td>${customerName}</td></tr>
          <tr><td style="padding:6px 0;color:#555">Email</td><td>${customerEmail}</td></tr>
          ${customerPhone ? `<tr><td style="padding:6px 0;color:#555">Phone</td><td>${customerPhone}</td></tr>` : ""}
          <tr><td style="padding:6px 0;color:#555">Hat Style</td><td>${hatStyle}</td></tr>
          <tr><td style="padding:6px 0;color:#555">Color</td><td>${hatColor}</td></tr>
          <tr><td style="padding:6px 0;color:#555">Stitch</td><td>${stitchType}</td></tr>
          <tr><td style="padding:6px 0;color:#555">Placement</td><td>${placement.join(", ")}</td></tr>
          <tr><td style="padding:6px 0;color:#555">Quantity</td><td>${quantity} hats</td></tr>
          <tr><td style="padding:6px 0;color:#555">Total</td><td style="font-weight:700">$${total.toFixed(2)}</td></tr>
        </table>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/admin/orders/${orderId}"
           style="display:inline-block;margin-top:20px;background:#13294b;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700">
          View Order in Admin
        </a>
      </div>
    `,
  });
}
