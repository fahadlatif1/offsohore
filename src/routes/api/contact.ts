import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(5000),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed", issues: parsed.error.issues },
            { status: 400 },
          );
        }
        const { name, email, subject, message } = parsed.data;

        const host = process.env.SMTP_HOST;
        const port = Number(process.env.SMTP_PORT || "465");
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASSWORD;
        const to = process.env.CONTACT_TO_EMAIL || user;
        if (!host || !user || !pass || !to) {
          console.error("SMTP env vars missing");
          return Response.json({ error: "Email not configured" }, { status: 500 });
        }

        const html = `
          <div style="font-family:Arial,sans-serif;font-size:14px;color:#0a1a3f">
            <h2 style="color:#0a1a3f;margin:0 0 12px">New contact form enquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0" />
            <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0" />
            <p style="color:#64748b;font-size:12px">Sent from offshorecv.com contact form</p>
          </div>`;

        const text =
          `New contact form enquiry\n\n` +
          `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}\n`;

        try {
          const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
          });

          await transporter.sendMail({
            from: { name: "OffshoreCV Website", address: user },
            to,
            replyTo: { name, address: email },
            subject: `[Contact] ${subject}`,
            html,
            text,
          });

          return Response.json({ ok: true });
        } catch (err) {
          console.error("SMTP send failed:", err);
          return Response.json(
            { error: "Failed to send email" },
            { status: 502 },
          );
        }
      },
    },
  },
});
