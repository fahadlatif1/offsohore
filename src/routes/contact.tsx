import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import heroRig from "@/assets/hero-rig.jpg";
import {
  Mail,
  Linkedin,
  Facebook,
  ExternalLink,
  Send,
  Lock,
  Ban,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — OffshoreCV" },
      { name: "description", content: "We're here to help. The fastest way to get in touch is by email. We aim to respond to all enquiries as quickly as possible." },
      { property: "og:title", content: "Contact Us — OffshoreCV" },
      { property: "og:description", content: "We're here to help. Email us for the fastest response." },
    ],
  }),
  component: ContactPage,
});

const NAVY = "#0a1a3f";
const NAVY_DEEP = "#060f2a";
const NAVY_CARD = "#0c1f4a";
const BLUE = "#2563eb";
const LIGHT_BLUE = "#60a5fa";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(1, "Message is required").max(1500),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setServerError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message");
      }
      setSent(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-md bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-colors";

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden text-white" style={{ backgroundColor: NAVY }}>
        <img src={heroRig} alt="" aria-hidden className="absolute right-0 top-0 h-full w-full lg:w-1/2 object-cover" />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(90deg, ${NAVY} 0%, ${NAVY} 45%, ${NAVY}cc 55%, transparent 75%)`,
        }} />
        <div className="absolute inset-0 lg:hidden" style={{ backgroundColor: `${NAVY}cc` }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-[0.25em]" style={{ color: LIGHT_BLUE }}>CONTACT US</div>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-extrabold mt-4 mb-4 leading-[1.05]">
              We're Here to Help
            </h1>
            <div className="text-sm lg:text-base font-bold mb-5" style={{ color: LIGHT_BLUE }}>
              The fastest way to get in touch is by Email.
            </div>
            <p className="text-base text-white/80 leading-relaxed">
              We aim to respond to all enquiries as quickly as possible.<br />
              For the fastest response, please reach out via email.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-6">
          {/* CONTACT FORM */}
          <div className="rounded-2xl p-7 lg:p-9 border border-slate-200 bg-slate-50">
            <h2 className="font-display text-xl font-extrabold mb-2" style={{ color: NAVY }}>QUICK CONTACT FORM</h2>
            <span className="block h-0.5 w-12 mb-4" style={{ backgroundColor: BLUE }} />
            <p className="text-sm text-slate-600 mb-6">
              Have a question or need help? Send us a message and we'll get back to you as soon as possible.
            </p>

            {sent ? (
              <div className="flex items-start gap-3 p-5 rounded-md bg-emerald-50 border border-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold" style={{ color: NAVY }}>Message sent successfully</div>
                  <p className="text-sm text-slate-600 mt-1">Thanks for getting in touch. We'll reply to your email as soon as possible.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: NAVY }}>Your Name <span className="text-red-500">*</span></label>
                    <input name="name" required maxLength={100} placeholder="Enter your full name" className={inputCls} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: NAVY }}>Your Email <span className="text-red-500">*</span></label>
                    <input name="email" type="email" required maxLength={255} placeholder="Enter your email address" className={inputCls} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: NAVY }}>Subject <span className="text-red-500">*</span></label>
                  <input name="subject" required maxLength={150} placeholder="Enter the subject of your enquiry" className={inputCls} />
                  {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: NAVY }}>Message <span className="text-red-500">*</span></label>
                  <textarea name="message" required maxLength={1500} rows={5} placeholder="Type your message here..." className={inputCls + " resize-none"} />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                {serverError && (
                  <div className="p-3 rounded-md bg-red-50 border border-red-300 text-sm text-red-700">
                    {serverError}. Please email us directly at cv@offshorecv.com.
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                  <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed" style={{ backgroundColor: BLUE }}>
                    <Send className="w-4 h-4" />
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                  <div className="flex items-start gap-2 text-xs text-slate-500">
                    <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Your information is safe with us and will never be shared with third parties.</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* GET IN TOUCH */}
          <div className="space-y-6">
            <div className="rounded-2xl p-7 lg:p-9 border border-slate-200 bg-slate-50">
              <h2 className="font-display text-xl font-extrabold mb-2" style={{ color: NAVY }}>GET IN TOUCH</h2>
              <span className="block h-0.5 w-12 mb-6" style={{ backgroundColor: BLUE }} />

              {/* Email */}
              <div className="flex items-start gap-4 mb-7">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: BLUE }}>
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: BLUE }}>Email (Fastest Response)</div>
                  <a href="mailto:cv@offshorecv.com" className="block text-lg font-bold hover:underline mt-1" style={{ color: NAVY }}>cv@offshorecv.com</a>
                  <p className="text-sm text-slate-600 mt-1">We aim to respond to all emails as quickly as possible.</p>
                </div>
              </div>

              <div className="text-sm font-semibold mb-5" style={{ color: BLUE }}>Connect with us</div>

              {/* LinkedIn */}
              <div className="flex items-center justify-between gap-3 py-4 border-t border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: BLUE }}>
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-bold" style={{ color: NAVY }}>LinkedIn</div>
                    <p className="text-sm text-slate-600 mt-0.5">Follow us on LinkedIn for updates, news and insights.</p>
                  </div>
                </div>
                <a href="https://www.linkedin.com/in/offshorecv/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border text-[11px] font-bold uppercase tracking-wider hover:bg-slate-100 shrink-0" style={{ borderColor: NAVY, color: NAVY }}>
                  Connect <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Facebook */}
              <div className="flex items-center justify-between gap-3 py-4 border-t border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: BLUE }}>
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-bold" style={{ color: NAVY }}>Facebook Messenger</div>
                    <p className="text-sm text-slate-600 mt-0.5">Message us on Facebook Messenger and we'll reply as quickly as possible during business hours.</p>
                  </div>
                </div>
                <a href="https://www.facebook.com/offshorecv/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border text-[11px] font-bold uppercase tracking-wider hover:bg-slate-100 shrink-0" style={{ borderColor: NAVY, color: NAVY }}>
                  Message Us <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Why not WhatsApp */}
            <div className="rounded-2xl p-6 border bg-white" style={{ borderColor: "rgba(37,99,235,0.25)" }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 border-2 border-red-300 flex items-center justify-center shrink-0">
                  <Ban className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-display text-base font-extrabold mb-2" style={{ color: NAVY }}>Why We Don't Use Phone or WhatsApp</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    We previously received hundreds of enquiries daily via phone and WhatsApp. Managing conversations across multiple devices (computers and phones) caused important messages and information to get lost, leading to delays and missed communications.
                  </p>
                  <p className="text-sm font-semibold mt-3 leading-relaxed" style={{ color: BLUE }}>
                    To ensure every enquiry is handled efficiently and nothing gets missed, we now communicate via email and our official channels only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
