import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import heroRig from "@/assets/hero-rig.jpg";
import {
  ShieldCheck,
  ClipboardList,
  UploadCloud,
  CheckCircle2,
  Lock,
  Clock,
  Headphones,
  Send,
} from "lucide-react";

const NAVY = "#0a1a3f";
const DEEP = "#060f2a";
const BLUE = "#2563eb";
const LIGHT = "#eff6ff";

export const Route = createFileRoute("/company-formation")({
  head: () => ({
    meta: [
      { title: "New UK LTD Company Formation — OffshoreCV" },
      { name: "description", content: "Complete the form and our team will form your new UK Limited Company quickly, professionally and hassle-free." },
    ],
  }),
  component: CompanyFormationPage,
});

const formSchema = z.object({
  companyName: z.string().trim().min(2, "Company name is required").max(160),
  tradingName: z.string().trim().max(160).optional(),
  description: z.string().trim().min(5, "Please describe your business").max(1000),
  officeAddress: z.string().trim().min(5, "Registered office address is required").max(300),
  directorName: z.string().trim().min(2, "Director name is required").max(120),
  directorDob: z.string().trim().min(1, "Date of birth is required"),
  nationality: z.string().trim().min(1).optional(),
  residence: z.string().trim().min(1).optional(),
  residentialAddress: z.string().trim().min(5).max(300),
  directorPostcode: z.string().trim().max(20).optional(),
  directorEmail: z.string().trim().email("Enter a valid email").max(255),
  directorPhone: z.string().trim().max(30).optional(),
  position: z.string().trim().min(1).optional(),
  shareholding: z.string().trim().max(10).optional(),
  totalShares: z.string().trim().min(1, "Total shares required").max(20),
  currency: z.string().optional(),
  nominalValue: z.string().trim().max(20).optional(),
  financialYearEnd: z.string().optional(),
  contactEmail: z.string().trim().email("Enter a valid email").max(255),
  vat: z.enum(["yes", "no"]).optional(),
  paye: z.enum(["yes", "no"]).optional(),
  idDocType: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().trim().max(500).optional(),
});

function StepBadge({ n }: { n: number }) {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white text-sm font-bold shrink-0"
      style={{ backgroundColor: BLUE }}
    >
      {n}
    </span>
  );
}

function CardHeading({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <StepBadge n={n} />
      <h2 className="font-display text-sm lg:text-[15px] font-extrabold uppercase tracking-wider" style={{ color: NAVY }}>
        {title}
      </h2>
    </div>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold mb-1.5" style={{ color: NAVY }}>
      {children}
      {required && <span style={{ color: BLUE }}> *</span>}
    </label>
  );
}

const inputClass =
  "w-full px-3.5 py-2.5 text-sm rounded-md border bg-white outline-none transition-colors placeholder:text-slate-400";
const inputStyle: React.CSSProperties = { borderColor: "#e2e8f0", color: NAVY };
const card = "bg-white rounded-2xl border p-6";
const cardStyle: React.CSSProperties = { borderColor: "#e2e8f0" };

function CompanyFormationPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [pscIsPerson, setPscIsPerson] = useState<"yes" | "no">("yes");
  const [vat, setVat] = useState<"yes" | "no">("no");
  const [paye, setPaye] = useState<"yes" | "no">("no");
  const [moreDirectors, setMoreDirectors] = useState<"yes" | "no">("no");
  const [notesLen, setNotesLen] = useState(0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = formSchema.safeParse({
      companyName: fd.get("companyName"),
      tradingName: fd.get("tradingName") || undefined,
      description: fd.get("description"),
      officeAddress: fd.get("officeAddress"),
      directorName: fd.get("directorName"),
      directorDob: fd.get("directorDob"),
      nationality: fd.get("nationality") || undefined,
      residence: fd.get("residence") || undefined,
      residentialAddress: fd.get("residentialAddress"),
      directorPostcode: fd.get("directorPostcode") || undefined,
      directorEmail: fd.get("directorEmail"),
      directorPhone: fd.get("directorPhone") || undefined,
      position: fd.get("position") || undefined,
      shareholding: fd.get("shareholding") || undefined,
      totalShares: fd.get("totalShares"),
      currency: fd.get("currency") || "GBP",
      nominalValue: fd.get("nominalValue") || undefined,
      financialYearEnd: fd.get("financialYearEnd") || undefined,
      contactEmail: fd.get("contactEmail"),
      vat,
      paye,
      idDocType: fd.get("idDocType") || undefined,
      source: fd.get("source") || undefined,
      notes: fd.get("notes") || undefined,
    });
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      for (const i of parsed.error.issues) fe[i.path[0] as string] = i.message;
      setErrors(fe);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setErrors({});
    const d = parsed.data;
    const subject = `UK LTD Company Formation: ${d.companyName}`;
    const body =
      `--- Company ---\n` +
      `Name: ${d.companyName}\nTrading Name: ${d.tradingName ?? "-"}\n` +
      `Description: ${d.description}\nRegistered Office: ${d.officeAddress}\n\n` +
      `--- Director ---\n` +
      `Name: ${d.directorName}\nDOB: ${d.directorDob}\nNationality: ${d.nationality ?? "-"}\n` +
      `Country of Residence: ${d.residence ?? "-"}\nResidential Address: ${d.residentialAddress}\n` +
      `Postcode: ${d.directorPostcode ?? "-"}\nEmail: ${d.directorEmail}\nPhone: ${d.directorPhone ?? "-"}\n` +
      `Position: ${d.position ?? "-"}\nShareholding: ${d.shareholding ?? "-"}%\n\n` +
      `Additional directors/shareholders: ${moreDirectors}\n\n` +
      `--- Share Capital ---\n` +
      `Total Shares: ${d.totalShares}\nCurrency: ${d.currency ?? "GBP"}\nNominal Value/Share: ${d.nominalValue ?? "-"}\n\n` +
      `--- PSC ---\nIs Person With Significant Control: ${pscIsPerson}\n\n` +
      `--- Setup Preferences ---\n` +
      `Financial Year End: ${d.financialYearEnd ?? "-"}\nContact Email: ${d.contactEmail}\nVAT Registered: ${vat}\nPAYE Registered: ${paye}\n\n` +
      `--- ID Verification ---\nID Document Type: ${d.idDocType ?? "-"}\n\n` +
      `--- Additional ---\nHow heard: ${d.source ?? "-"}\nNotes: ${d.notes ?? "-"}\n`;
    window.location.href = `mailto:cv@offshorecv.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ backgroundColor: DEEP }}>
        <div className="absolute inset-0 opacity-25">
          <img src={heroRig} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${DEEP} 0%, ${DEEP}cc 50%, transparent 100%)` }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 text-white">
            <nav className="text-xs text-white/60 mb-4">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2">&gt;</span>
              <Link to="/guide" className="hover:text-white">Packages & Pricing</Link>
              <span className="mx-2">&gt;</span>
              <span className="text-white font-semibold">New UK LTD Company Formation</span>
            </nav>
            <h1 className="font-display text-3xl lg:text-5xl font-extrabold leading-tight mb-4">
              New UK LTD Company Formation
            </h1>
            <p className="text-white/70 text-base max-w-xl leading-relaxed">
              Complete the form below and our team will form your new UK Limited Company quickly, professionally and hassle-free.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white text-center">
            {[
              { Icon: ClipboardList, label: "Companies House Registered" },
              { Icon: Clock, label: "Fast Turnaround" },
              { Icon: Headphones, label: "Expert Support" },
              { Icon: ShieldCheck, label: "100% Confidential" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: "rgba(37,99,235,0.2)" }}>
                  <Icon className="w-6 h-6" style={{ color: "#60a5fa" }} />
                </div>
                <p className="text-[11px] font-semibold leading-tight max-w-[110px]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {submitted ? (
        <section className="py-20 bg-white">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5" style={{ backgroundColor: LIGHT }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: BLUE }} />
            </div>
            <h2 className="font-display text-3xl font-extrabold mb-3" style={{ color: NAVY }}>Details Received</h2>
            <p className="text-muted-foreground mb-6">
              Your email client should have opened with your company formation details. Our team will be in touch shortly to confirm next steps.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: BLUE }}>
              Back to Home
            </Link>
          </div>
        </section>
      ) : (
        <section className="py-12 lg:py-16 bg-white">
          <form onSubmit={handleSubmit} noValidate className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Main 3-col grid spanning 9 cols */}
              <div className="lg:col-span-9 grid md:grid-cols-3 gap-6">
                {/* 1. Company Information */}
                <div className={card} style={cardStyle}>
                  <CardHeading n={1} title="Company Information" />
                  <div className="space-y-4">
                    <div>
                      <Label required>Proposed Company Name</Label>
                      <input name="companyName" placeholder="Enter your proposed company name" className={inputClass} style={inputStyle} />
                      <p className="text-[11px] text-muted-foreground mt-1">The name must be unique and not already in use.</p>
                      {errors.companyName && <p className="text-xs text-red-600 mt-1">{errors.companyName}</p>}
                    </div>
                    <div>
                      <Label>Company Trading Name (if different)</Label>
                      <input name="tradingName" placeholder="Enter trading name (optional)" className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <Label required>Company Description / Nature of Business</Label>
                      <textarea name="description" rows={4} placeholder="e.g. Offshore recruitment, Marine services, Consultancy etc." className={`${inputClass} resize-none`} style={inputStyle} />
                      {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
                    </div>
                    <div>
                      <Label required>Registered Office Address</Label>
                      <textarea name="officeAddress" rows={3} placeholder="Enter registered office address" className={`${inputClass} resize-none`} style={inputStyle} />
                      {errors.officeAddress && <p className="text-xs text-red-600 mt-1">{errors.officeAddress}</p>}
                      <label className="flex items-center gap-2 mt-2 text-xs" style={{ color: NAVY }}>
                        <input type="checkbox" className="accent-[#2563eb]" /> Same as my residential address
                      </label>
                    </div>
                  </div>
                </div>

                {/* 2. Director / Shareholder */}
                <div className={card} style={cardStyle}>
                  <CardHeading n={2} title="Director / Shareholder Information" />
                  <p className="text-[11px] text-muted-foreground -mt-3 mb-4">All directors must be 16 years or over.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <Label required>Full Name (as per ID)</Label>
                      <input name="directorName" placeholder="Enter your full name" className={inputClass} style={inputStyle} />
                      {errors.directorName && <p className="text-xs text-red-600 mt-1">{errors.directorName}</p>}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label required>Date of Birth</Label>
                      <input name="directorDob" type="date" className={inputClass} style={inputStyle} />
                      {errors.directorDob && <p className="text-xs text-red-600 mt-1">{errors.directorDob}</p>}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label>Nationality</Label>
                      <select name="nationality" className={inputClass} style={inputStyle} defaultValue="">
                        <option value="" disabled>Select nationality</option>
                        <option>British</option><option>Irish</option><option>Other</option>
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label>Country of Residence</Label>
                      <select name="residence" className={inputClass} style={inputStyle} defaultValue="">
                        <option value="" disabled>Select country</option>
                        <option>United Kingdom</option><option>Ireland</option><option>Other</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <Label required>Residential Address</Label>
                      <textarea name="residentialAddress" rows={2} placeholder="Enter your full residential address" className={`${inputClass} resize-none`} style={inputStyle} />
                      {errors.residentialAddress && <p className="text-xs text-red-600 mt-1">{errors.residentialAddress}</p>}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label>Postcode / ZIP Code</Label>
                      <input name="directorPostcode" placeholder="Enter postcode / zip code" className={inputClass} style={inputStyle} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label required>Email Address</Label>
                      <input name="directorEmail" type="email" placeholder="Enter your email address" className={inputClass} style={inputStyle} />
                      {errors.directorEmail && <p className="text-xs text-red-600 mt-1">{errors.directorEmail}</p>}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label>Phone Number</Label>
                      <input name="directorPhone" placeholder="07 1234 567890" className={inputClass} style={inputStyle} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label>Position in Company</Label>
                      <select name="position" className={inputClass} style={inputStyle} defaultValue="">
                        <option value="" disabled>Select position</option>
                        <option>Director</option><option>Director & Shareholder</option><option>Shareholder</option><option>Company Secretary</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <Label>Shareholding %</Label>
                      <input name="shareholding" placeholder="Enter % (e.g. 100)" className={inputClass} style={inputStyle} />
                      <p className="text-[11px] text-muted-foreground mt-1">Total must equal 100%.</p>
                    </div>
                  </div>
                </div>

                {/* 3 + 4 stacked */}
                <div className="space-y-6">
                  {/* 3. Additional Directors */}
                  <div className={card} style={cardStyle}>
                    <CardHeading n={3} title="Additional Directors / Shareholders" />
                    <p className="text-xs mb-3" style={{ color: NAVY }}>Will there be any more directors or shareholders?</p>
                    <div className="flex items-center gap-6">
                      {(["yes", "no"] as const).map((v) => (
                        <label key={v} className="flex items-center gap-2 text-sm font-medium cursor-pointer" style={{ color: NAVY }}>
                          <input type="radio" name="moreDirectors" checked={moreDirectors === v} onChange={() => setMoreDirectors(v)} className="accent-[#2563eb]" />
                          {v === "yes" ? "Yes" : "No"}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 4. Share Capital */}
                  <div className={card} style={cardStyle}>
                    <CardHeading n={4} title="Share Capital Information" />
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label required>Total Number of Shares</Label>
                          <input name="totalShares" placeholder="e.g. 100" className={inputClass} style={inputStyle} />
                          {errors.totalShares && <p className="text-xs text-red-600 mt-1">{errors.totalShares}</p>}
                        </div>
                        <div>
                          <Label required>Currency</Label>
                          <select name="currency" className={inputClass} style={inputStyle} defaultValue="GBP">
                            <option>GBP</option><option>EUR</option><option>USD</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label required>Nominal Value Per Share</Label>
                        <input name="nominalValue" placeholder="e.g. 1.00" className={inputClass} style={inputStyle} />
                        <p className="text-[11px] text-muted-foreground mt-1">This is usually £1.00 per share.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. PSC */}
                <div className={card} style={cardStyle}>
                  <CardHeading n={5} title="People With Significant Control (PSC)" />
                  <p className="text-[11px] text-muted-foreground mb-3">PSC is anyone who owns or controls more than 25% of the company shares or voting rights.</p>
                  <p className="text-xs mb-2 font-semibold" style={{ color: NAVY }}>Are you the person with significant control (owning more than 25%)?</p>
                  <div className="flex items-center gap-6 mb-4">
                    {(["yes", "no"] as const).map((v) => (
                      <label key={v} className="flex items-center gap-2 text-sm font-medium cursor-pointer" style={{ color: NAVY }}>
                        <input type="radio" name="pscIsPerson" checked={pscIsPerson === v} onChange={() => setPscIsPerson(v)} className="accent-[#2563eb]" />
                        {v === "yes" ? "Yes" : "No"}
                      </label>
                    ))}
                  </div>
                  {pscIsPerson === "no" && (
                    <div className="space-y-3 pt-3 border-t" style={{ borderColor: "#e2e8f0" }}>
                      <p className="text-[11px] font-semibold" style={{ color: NAVY }}>If No, please provide details below.</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Full Name</Label>
                          <input name="pscName" placeholder="Enter full name" className={inputClass} style={inputStyle} />
                        </div>
                        <div>
                          <Label>Date of Birth</Label>
                          <input name="pscDob" type="date" className={inputClass} style={inputStyle} />
                        </div>
                        <div>
                          <Label>Nationality</Label>
                          <select className={inputClass} style={inputStyle} defaultValue=""><option value="" disabled>Select nationality</option><option>British</option><option>Other</option></select>
                        </div>
                        <div>
                          <Label>Country of Residence</Label>
                          <select className={inputClass} style={inputStyle} defaultValue=""><option value="" disabled>Select country</option><option>United Kingdom</option><option>Other</option></select>
                        </div>
                      </div>
                      <div>
                        <Label>Nature of Control</Label>
                        <input placeholder="e.g. Owns 30% of shares" className={inputClass} style={inputStyle} />
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. Company Setup Preferences */}
                <div className={card} style={cardStyle}>
                  <CardHeading n={6} title="Company Setup Preferences" />
                  <div className="space-y-4">
                    <div>
                      <Label>Financial Year End</Label>
                      <select name="financialYearEnd" className={inputClass} style={inputStyle} defaultValue="">
                        <option value="" disabled>Select month</option>
                        {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m)=>(<option key={m}>{m}</option>))}
                      </select>
                      <p className="text-[11px] text-muted-foreground mt-1">Month your company's financial year will end.</p>
                    </div>
                    <div>
                      <Label required>Confirmation Statement Contact Email</Label>
                      <input name="contactEmail" type="email" placeholder="Enter email for Companies House correspondence" className={inputClass} style={inputStyle} />
                      <p className="text-[11px] text-muted-foreground mt-1">This email will be used for important company notifications.</p>
                      {errors.contactEmail && <p className="text-xs text-red-600 mt-1">{errors.contactEmail}</p>}
                    </div>
                    <div>
                      <Label>Will you be VAT Registered? (Optional)</Label>
                      <div className="flex items-center gap-6">
                        {(["yes", "no"] as const).map((v) => (
                          <label key={v} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: NAVY }}>
                            <input type="radio" checked={vat === v} onChange={() => setVat(v)} className="accent-[#2563eb]" />
                            {v === "yes" ? "Yes" : "No"}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Will you be PAYE Registered? (Optional)</Label>
                      <div className="flex items-center gap-6">
                        {(["yes", "no"] as const).map((v) => (
                          <label key={v} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: NAVY }}>
                            <input type="radio" checked={paye === v} onChange={() => setPaye(v)} className="accent-[#2563eb]" />
                            {v === "yes" ? "Yes" : "No"}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 7. Identity Verification */}
                <div className={card} style={cardStyle}>
                  <CardHeading n={7} title="Identity Verification" />
                  <p className="text-[11px] text-muted-foreground mb-4">In order to comply with UK Companies House regulations, we need a copy of your identification.</p>
                  <div className="space-y-4">
                    <div>
                      <Label required>ID Document Type</Label>
                      <select name="idDocType" className={inputClass} style={inputStyle} defaultValue="">
                        <option value="" disabled>Select document type</option>
                        <option>Passport</option><option>Driving Licence</option><option>National ID Card</option>
                      </select>
                    </div>
                    {[
                      { label: "Upload ID Document", req: true, hint: "JPG, PNG, PDF (Max 10MB)" },
                      { label: "Proof of Address (dated within 3 months)", req: true, hint: "JPG, PNG, PDF (Max 10MB)" },
                    ].map((f) => (
                      <div key={f.label}>
                        <Label required={f.req}>{f.label}</Label>
                        <label className="block rounded-lg border-2 border-dashed p-4 text-center cursor-pointer transition-colors hover:bg-slate-50" style={{ borderColor: "#cbd5e1", backgroundColor: "#f8fafc" }}>
                          <UploadCloud className="w-7 h-7 mx-auto mb-2" style={{ color: BLUE }} />
                          <p className="text-xs font-semibold" style={{ color: NAVY }}>
                            <span style={{ color: BLUE }}>Click to upload</span> or drag and drop
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-1">{f.hint}</p>
                          <input type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8. Additional Information */}
                <div className={card} style={cardStyle}>
                  <CardHeading n={8} title="Additional Information" />
                  <div className="space-y-4">
                    <div>
                      <Label>How did you hear about us?</Label>
                      <select name="source" className={inputClass} style={inputStyle} defaultValue="">
                        <option value="" disabled>Select an option</option>
                        <option>Google Search</option><option>Social Media</option><option>Referral</option><option>Other</option>
                      </select>
                    </div>
                    <div>
                      <Label>Additional Notes (Optional)</Label>
                      <textarea
                        name="notes"
                        rows={5}
                        maxLength={500}
                        placeholder="Anything else you'd like us to know..."
                        className={`${inputClass} resize-none`}
                        style={inputStyle}
                        onChange={(e) => setNotesLen(e.target.value.length)}
                      />
                      <div className="text-right text-xs text-muted-foreground mt-1">{notesLen} / 500</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-3 space-y-6">
                <div className="rounded-2xl border p-6" style={{ borderColor: "#e2e8f0", backgroundColor: "#fff" }}>
                  <h3 className="font-display text-base font-extrabold mb-4" style={{ color: NAVY }}>
                    Why Form Your UK LTD Company With Us?
                  </h3>
                  <ul className="space-y-2.5">
                    {[
                      "Fast & reliable service",
                      "Companies House registered",
                      "Expert support & guidance",
                      "Secure & confidential process",
                      "No hidden fees",
                    ].map((t) => (
                      <li key={t} className="flex items-center gap-2 text-xs font-semibold" style={{ color: NAVY }}>
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: BLUE }} /> {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl p-6 border" style={{ backgroundColor: LIGHT, borderColor: "#bfdbfe" }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white">
                      <ShieldCheck className="w-5 h-5" style={{ color: BLUE }} />
                    </div>
                    <h3 className="font-display text-sm font-extrabold" style={{ color: NAVY }}>No Payment Required Today</h3>
                  </div>
                  <p className="text-[11px] leading-relaxed mb-3" style={{ color: NAVY, opacity: 0.8 }}>
                    Your company will only require payment once your company has been successfully formed and is ready for you.
                  </p>
                  <p className="text-[11px] leading-relaxed pt-3 border-t" style={{ color: NAVY, opacity: 0.8, borderColor: "#bfdbfe" }}>
                    Our team will contact you with confirmation before any payment is requested.
                  </p>
                </div>

                <p className="text-xs text-muted-foreground flex items-center gap-2 px-1">
                  <Lock className="w-3.5 h-3.5" style={{ color: BLUE }} /> Your information is 100% secure and will never be shared.
                </p>
              </aside>
            </div>

            {/* Submit row */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mt-10">
              <button
                type="submit"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-md text-white font-bold uppercase tracking-wider text-sm hover:brightness-110 transition-all"
                style={{ backgroundColor: BLUE }}
              >
                <Send className="w-5 h-5" />
                <span className="flex flex-col items-start leading-tight">
                  <span>Submit My Company Formation Details</span>
                  <span className="text-[10px] font-normal opacity-90 normal-case tracking-normal">
                    We&apos;ll review your information and get started.
                  </span>
                </span>
              </button>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-md border-2 font-bold uppercase tracking-wider text-sm transition-all"
                style={{ borderColor: "#e2e8f0", color: NAVY, backgroundColor: "#fff" }}
              >
                <Headphones className="w-5 h-5" style={{ color: BLUE }} />
                <span className="flex flex-col items-start leading-tight">
                  <span>Contact OffshoreCV</span>
                  <span className="text-[10px] font-normal opacity-70 normal-case tracking-normal">
                    Have questions? Get in touch with our team.
                  </span>
                </span>
              </Link>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6 flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5" style={{ color: BLUE }} /> Your information is 100% secure and will never be shared.
            </p>
          </form>
        </section>
      )}
    </>
  );
}
