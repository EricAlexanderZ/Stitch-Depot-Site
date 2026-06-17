import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_APP_PASSWORD;
  const to   = process.env.ADMIN_NOTIFICATION_EMAIL ?? user;

  if (user && pass && to) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from:    `Stitch Depot Contact <${user}>`,
      to,
      subject: `Contact Form: ${name}, ${email}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px">
          <h2 style="margin:0 0 16px">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="background:#f6f6f4;padding:16px;border-radius:8px;white-space:pre-wrap">${message}</p>
        </div>
      `,
    });
  }

  return NextResponse.json({ ok: true });
}
