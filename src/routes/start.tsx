import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import heroRig from "@/assets/hero-rig.jpg";
import {
  User,
  Briefcase,
  Linkedin,
  FileText,
  UploadCloud,
  ShieldCheck,
  Users,
  Lock,
  ClipboardList,
  Clock,
  CheckCircle2,
  Send,
  Headphones,
  StickyNote,
  Anchor,
  Wind,
  Ship,
  Mountain,
  HardHat,
  MoreHorizontal,
} from "lucide-react";

const NAVY = "#0a1a3f";
const DEEP = "#060f2a";
const BLUE = "#2563eb";
const LIGHT = "#eff6ff";

type PackageKey = "cv" | "cv-cover" | "cv-cover-linkedin";

const PACKAGES: Record<PackageKey, { name: string; price: string }> = {
  "cv": { name: "Professional CV", price: "£100 GBP" },
  "cv-cover": { name: "Professional CV & Cover Letter", price: "£125 GBP" },
  "cv-cover-linkedin": { name: "Professional CV, Cover Letter & LinkedIn Update", price: "£160 GBP" },
};

const searchSchema = z.object({
  package: z.enum(["cv", "cv-cover", "cv-cover-linkedin"]).catch("cv-cover"),
});

export const Route = createFileRoute("/start")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Start Your OffshoreCV Package — OffshoreCV" },
      { name: "description", content: "Complete the form and upload your current CV so our team can begin creating your professional offshore CV package." },
    ],
  }),
  component: StartPage,
});

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  address: z.string().trim().max(200).optional(),
  town: z.string().trim().max(80).optional(),
  county: z.string().trim().max(80).optional(),
  postcode: z.string().trim().max(20).optional(),
  country: z.string().trim().max(80).optional(),
  phone: z.string().trim().max(30).optional(),
  email: z.string().trim().email("Enter a valid email").max(255),
  dob: z.string().trim().max(40).optional(),
  jobTitle: z.string().trim().max(120).optional(),
  desiredPosition: z.string().trim().max(120).optional(),
  experience: z.string().trim().max(40).optional(),
  sector: z.string().trim().max(60).optional(),
  industries: z.array(z.string()).optional(),
  linkedinUrl: z.string().trim().max(255).optional(),
  linkedinOpt: z.enum(["yes", "no"]).optional(),
  notes: z.string().trim().max(1000).optional(),
});

const INDUSTRIES = [
  { key: "oil-gas", label: "Oil & Gas", Icon: Anchor },
  { key: "wind", label: "Offshore Wind", Icon: Wind },
  { key: "maritime", label: "Maritime", Icon: Ship },
  { key: "rope", label: "Rope Access", Icon: Mountain },
  { key: "construction", label: "Construction", Icon: HardHat },
  { key: "other", label: "Other", Icon: MoreHorizontal },
] as const;

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

function CardHeading({ n, title, Icon }: { n: number; title: string; Icon: React.ElementType }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <StepBadge n={n} />
        <h2 className="font-display text-sm lg:text-base font-extrabold uppercase tracking-wider" style={{ color: NAVY }}>
          {title}
        </h2>
      </div>
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: LIGHT }}>
        <Icon className="w-5 h-5" style={{ color: BLUE }} strokeWidth={2} />
      </div>
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

function StartPage() {
  const { package: pkgKey } = Route.useSearch();
  const pkg = PACKAGES[pkgKey as PackageKey] ?? PACKAGES["cv-cover"];
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [linkedinOpt, setLinkedinOpt] = useState<"yes" | "no">("yes");

  function toggleIndustry(key: string) {
    setSelectedIndustries((cur) => (cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key]));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = formSchema.safeParse({
      fullName: fd.get("fullName"),
      address: fd.get("address") || undefined,
      town: fd.get("town") || undefined,
      county: fd.get("county") || undefined,
      postcode: fd.get("postcode") || undefined,
      country: fd.get("country") || undefined,
      phone: fd.get("phone") || undefined,
      email: fd.get("email"),
      dob: fd.get("dob") || undefined,
      jobTitle: fd.get("jobTitle") || undefined,
      desiredPosition: fd.get("desiredPosition") || undefined,
      experience: fd.get("experience") || undefined,
      sector: fd.get("sector") || undefined,
      industries: selectedIndustries,
      linkedinUrl: fd.get("linkedinUrl") || undefined,
      linkedinOpt,
      notes: fd.get("notes") || undefined,
    });
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      for (const i of parsed.error.issues) fe[i.path[0] as string] = i.message;
      setErrors(fe);
      return;
    }
    setErrors({});
    const d = parsed.data;
    const subject = `New Package Order: ${pkg.name} (${pkg.price})`;
    const body =
      `Package: ${pkg.name}\nPrice: ${pkg.price}\n\n` +
      `--- Personal ---\n` +
      `Name: ${d.fullName}\nEmail: ${d.email}\nPhone: ${d.phone ?? "-"}\n` +
      `Address: ${d.address ?? "-"}\nTown: ${d.town ?? "-"}\nCounty: ${d.county ?? "-"}\n` +
      `Postcode: ${d.postcode ?? "-"}\nCountry: ${d.country ?? "-"}\nDOB: ${d.dob ?? "-"}\n\n` +
      `--- Professional ---\n` +
      `Job Title: ${d.jobTitle ?? "-"}\nDesired Position: ${d.desiredPosition ?? "-"}\n` +
      `Experience: ${d.experience ?? "-"}\nSector: ${d.sector ?? "-"}\n` +
      `Industries: ${(d.industries ?? []).join(", ") || "-"}\n\n` +
      `--- LinkedIn ---\nURL: ${d.linkedinUrl ?? "-"}\nOptimise: ${linkedinOpt}\n\n` +
      `--- Notes ---\n${d.notes ?? "(none)"}\n`;
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
              <span className="text-white font-semibold">Order Your Package</span>
            </nav>
            <h1 className="font-display text-3xl lg:text-5xl font-extrabold leading-tight mb-4">
              Start Your OffshoreCV Package
            </h1>
            <p className="text-white/70 text-base max-w-xl leading-relaxed">
              Complete the form below and upload your current CV so our team can begin creating your professional offshore CV package.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 shadow-2xl border" style={{ borderColor: "#e2e8f0" }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: BLUE }}>
                You Have Selected
              </div>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: LIGHT }}>
                  <FileText className="w-7 h-7" style={{ color: BLUE }} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base lg:text-lg font-extrabold leading-tight" style={{ color: NAVY }}>
                    {pkg.name}
                  </h3>
                  <div className="text-xl font-extrabold mt-1" style={{ color: BLUE }}>{pkg.price}</div>
                </div>
              </div>
              <Link to="/guide" className="inline-flex items-center gap-1.5 text-xs font-semibold mt-4 pt-4 border-t w-full" style={{ color: BLUE, borderColor: "#e2e8f0" }}>
                <ClipboardList className="w-3.5 h-3.5" /> Change Package
              </Link>
            </div>
          </div>
        </div>
      </section>

      {submitted ? (
        <section className="py-20 bg-white">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5" style={{ backgroundColor: LIGHT }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: BLUE }} />
            </div>
            <h2 className="font-display text-3xl font-extrabold mb-3" style={{ color: NAVY }}>
              Details Received
            </h2>
            <p className="text-muted-foreground mb-6">
              Your email client should have opened with your details. Our team will be in touch within 24 hours to confirm next steps.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: BLUE }}>
              Back to Home
            </Link>
          </div>
        </section>
      ) : (
        <section className="py-12 lg:py-16 bg-white">
          <form onSubmit={handleSubmit} noValidate className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Personal Details */}
              <div className="bg-white rounded-2xl border p-6 lg:p-7" style={{ borderColor: "#e2e8f0" }}>
                <CardHeading n={1} title="Personal Details" Icon={User} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <Label required>Full Name</Label>
                    <input name="fullName" placeholder="Enter your full name" className={inputClass} style={inputStyle} />
                    {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label>Address</Label>
                    <input name="address" placeholder="Enter your address" className={inputClass} style={inputStyle} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label>Town / City</Label>
                    <input name="town" placeholder="Enter your town / city" className={inputClass} style={inputStyle} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label>County / State</Label>
                    <input name="county" placeholder="Enter your county / state" className={inputClass} style={inputStyle} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label>Postcode / ZIP Code</Label>
                    <input name="postcode" placeholder="Enter postcode / zip code" className={inputClass} style={inputStyle} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label>Country</Label>
                    <select name="country" className={inputClass} style={inputStyle} defaultValue="">
                      <option value="" disabled>Select your country</option>
                      <option>United Kingdom</option>
                      <option>Norway</option>
                      <option>United States</option>
                      <option>Australia</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label>Phone Number</Label>
                    <input name="phone" placeholder="07 1234 567890" className={inputClass} style={inputStyle} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label required>Email Address</Label>
                    <input name="email" type="email" placeholder="Enter your email address" className={inputClass} style={inputStyle} />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                  <div className="col-span-2">
                    <Label>Date of Birth (Optional)</Label>
                    <input name="dob" type="date" className={inputClass} style={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div className="bg-white rounded-2xl border p-6 lg:p-7" style={{ borderColor: "#e2e8f0" }}>
                <CardHeading n={2} title="Professional Details" Icon={Briefcase} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <Label>Current Job Title</Label>
                    <input name="jobTitle" placeholder="Enter your current job title" className={inputClass} style={inputStyle} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label>Desired Offshore Position</Label>
                    <input name="desiredPosition" placeholder="Enter desired position" className={inputClass} style={inputStyle} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label>Years Experience</Label>
                    <select name="experience" className={inputClass} style={inputStyle} defaultValue="">
                      <option value="" disabled>Select experience</option>
                      <option>Less than 1 year</option>
                      <option>1-3 years</option>
                      <option>3-5 years</option>
                      <option>5-10 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label>Offshore Sector</Label>
                    <select name="sector" className={inputClass} style={inputStyle} defaultValue="">
                      <option value="" disabled>Select your sector</option>
                      <option>Oil & Gas</option>
                      <option>Offshore Wind</option>
                      <option>Maritime</option>
                      <option>Subsea</option>
                      <option>Construction</option>
                    </select>
                  </div>
                  <div className="col-span-2 grid grid-cols-3 gap-3 mt-1">
                    {INDUSTRIES.map(({ key, label, Icon }) => {
                      const active = selectedIndustries.includes(key);
                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => toggleIndustry(key)}
                          className="flex items-center gap-2 px-3 py-3 rounded-md border text-xs font-semibold transition-all"
                          style={{
                            backgroundColor: active ? BLUE : "#f8fafc",
                            borderColor: active ? BLUE : "#e2e8f0",
                            color: active ? "#fff" : NAVY,
                          }}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="truncate">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Upload Your CV */}
              <div className="bg-white rounded-2xl border p-6 lg:p-7" style={{ borderColor: "#e2e8f0" }}>
                <CardHeading n={4} title="Upload Your Current CV" Icon={FileText} />
                <div className="rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: "#cbd5e1", backgroundColor: "#f8fafc" }}>
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#fff", border: `2px solid ${LIGHT}` }}>
                    <UploadCloud className="w-8 h-8" style={{ color: BLUE }} strokeWidth={2} />
                  </div>
                  <p className="text-sm font-semibold mb-1" style={{ color: NAVY }}>Drag & drop your CV here</p>
                  <p className="text-xs text-muted-foreground mb-4">or</p>
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider text-white cursor-pointer" style={{ backgroundColor: BLUE }}>
                    <UploadCloud className="w-4 h-4" /> Upload CV
                    <input type="file" name="cv" accept=".pdf,.doc,.docx" className="hidden" />
                  </label>
                  <div className="mt-5 pt-4 border-t text-xs text-muted-foreground space-y-1" style={{ borderColor: "#e2e8f0" }}>
                    <p>Supported Files: PDF / DOC / DOCX</p>
                    <p>Max file size: 10MB</p>
                  </div>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="bg-white rounded-2xl border p-6 lg:p-7" style={{ borderColor: "#e2e8f0" }}>
                <CardHeading n={3} title="LinkedIn Information" Icon={Linkedin} />
                <Label>LinkedIn Profile URL</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: BLUE }} />
                  <input name="linkedinUrl" placeholder="https://www.linkedin.com/in/yourprofile" className={`${inputClass} pl-9`} style={inputStyle} />
                </div>
                <div className="mt-5">
                  <Label>Need LinkedIn Optimisation?</Label>
                  <div className="space-y-2">
                    {(["yes", "no"] as const).map((v) => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: NAVY }}>
                        <input
                          type="radio"
                          name="linkedinOpt"
                          value={v}
                          checked={linkedinOpt === v}
                          onChange={() => setLinkedinOpt(v)}
                          className="accent-[#2563eb]"
                        />
                        {v === "yes" ? "Yes, please optimise my LinkedIn profile" : "No, thank you"}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="bg-white rounded-2xl border p-6 lg:p-7" style={{ borderColor: "#e2e8f0" }}>
                <CardHeading n={5} title="Additional Notes" Icon={StickyNote} />
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  Please include any additional information you would like our writers to know such as offshore experience, desired job roles, gaps in employment, certifications, or career goals.
                </p>
                <textarea
                  name="notes"
                  rows={5}
                  maxLength={1000}
                  placeholder="Type your notes here..."
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                />
                <div className="text-right text-xs text-muted-foreground mt-1">0 / 1000</div>
              </div>

              {/* No Payment panel */}
              <div className="rounded-2xl p-6 lg:p-7 border" style={{ backgroundColor: LIGHT, borderColor: "#bfdbfe" }}>
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-white">
                    <ShieldCheck className="w-6 h-6" style={{ color: BLUE }} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-extrabold mb-2" style={{ color: NAVY }}>No Payment Required Today</h3>
                    <p className="text-xs leading-relaxed" style={{ color: NAVY, opacity: 0.75 }}>
                      Your package will only require payment once your CV package has been completed and is ready for release.
                      Our team will contact you with your completed documents before payment is requested.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "No upfront payment",
                    "Pay only when you are 100% satisfied",
                    "Secure & trusted process",
                    "We never share your information",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2 text-xs font-semibold" style={{ color: NAVY }}>
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: BLUE }} /> {t}
                    </li>
                  ))}
                </ul>
              </div>
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
                  <span>Submit My Details</span>
                  <span className="text-[10px] font-normal opacity-90 normal-case tracking-normal">
                    We&apos;ll review your information and get started on your CV.
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

      {/* Trust strip */}
      <section className="py-10 border-t" style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { Icon: ShieldCheck, title: "ATS Optimised CVs", body: "Designed to pass ATS systems and get you noticed." },
            { Icon: Users, title: "Offshore Industry Specialists", body: "Writers with real offshore and maritime experience." },
            { Icon: Lock, title: "Secure File Upload", body: "Your data is encrypted and stored securely." },
            { Icon: ClipboardList, title: "Professional Formatting", body: "Clean, modern and industry-leading CVs." },
            { Icon: Clock, title: "Fast Turnaround", body: "Quick delivery without compromising on quality." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: LIGHT }}>
                <Icon className="w-6 h-6" style={{ color: BLUE }} strokeWidth={2} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: NAVY }}>{title}</h3>
              <p className="text-xs text-muted-foreground max-w-[180px]">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
