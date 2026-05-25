import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { z } from "zod";
import heroRig from "@/assets/hero-rig.jpg";
import {
  ShieldCheck,
  Users,
  Target,
  BadgeCheck,
  User as UserIcon,
  Briefcase,
  Building2,
  Camera,
  FileText,
  Award,
  Info,
  Lock,
  Settings2,
  UploadCloud,
  Plus,
  Trash2,
  Send,
  RotateCcw,
  Eye,
  EyeOff,
  Anchor,
  Wind,
  Ship,
  HardHat,
  Hammer,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react";

const NAVY = "#0a1a3f";
const DEEP = "#060f2a";
const BLUE = "#2563eb";

export const Route = createFileRoute("/candidates")({
  head: () => ({
    meta: [
      { title: "Candidate Profile Registration — OffshoreCV" },
      {
        name: "description",
        content:
          "Register your candidate profile and showcase your skills to verified offshore recruiters. Free for candidates — update your information anytime.",
      },
      { property: "og:title", content: "Candidate Profile Registration — OffshoreCV" },
      {
        property: "og:description",
        content:
          "Get matched with offshore, maritime, and renewables recruiters. Create your secure candidate profile in minutes.",
      },
    ],
  }),
  component: CandidatesPage,
});

const certSchema = z.object({
  name: z.string().trim().max(100),
  number: z.string().trim().max(60).optional(),
  issue: z.string().trim().max(20).optional(),
  expiry: z.string().trim().max(20).optional(),
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  dob: z.string().trim().min(1, "Enter your date of birth").max(20),
  nationality: z.string().trim().min(1, "Select nationality").max(60),
  rightToWork: z.string().trim().min(1, "Select right to work status").max(60),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(5, "Enter phone number").max(40),
  location: z.string().trim().min(2, "Enter current location").max(120),
  relocate: z.enum(["yes", "no", "possibly"]),
  currentJobTitle: z.string().trim().min(2, "Enter job title").max(100),
  yearsExperience: z.string().trim().max(10),
  yearsOffshore: z.string().trim().max(10),
  noticePeriod: z.string().trim().max(60),
  availability: z.number().min(0).max(100),
  dayRate: z.string().trim().max(40).optional(),
  industries: z.array(z.string()).min(1, "Select at least one industry"),
  positions: z.array(z.string()),
  otherPosition: z.string().trim().max(120).optional(),
  skills: z.string().trim().max(500).optional(),
  languages: z.string().trim().max(200).optional(),
  notes: z.string().trim().max(500).optional(),
  certificates: z.array(certSchema),
  contractType: z.string().trim().max(60).optional(),
  preferredLocation: z.string().trim().max(60).optional(),
  willingToTravel: z.enum(["yes", "no"]),
  hearAbout: z.string().trim().max(60).optional(),
  password: z.string().min(8, "Min 8 characters").max(72),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

const INDUSTRIES = [
  { key: "oil-gas", label: "Oil & Gas", icon: Anchor },
  { key: "offshore-wind", label: "Offshore Wind", icon: Wind },
  { key: "maritime", label: "Maritime", icon: Ship },
  { key: "rope-access", label: "Rope Access", icon: HardHat },
  { key: "construction", label: "Offshore Construction", icon: Hammer },
  { key: "subsea", label: "Subsea", icon: Anchor },
  { key: "other", label: "Other", icon: MoreHorizontal },
];

function SectionCard({
  number,
  title,
  icon: Icon,
  children,
  className = "",
}: {
  number: number;
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 ${className}`}>
      <header className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
        <span
          className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ background: BLUE }}
        >
          {number}
        </span>
        <Icon className="w-5 h-5" style={{ color: NAVY }} />
        <h2 className="text-sm font-bold tracking-wider uppercase" style={{ color: NAVY }}>
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}


function Field({
  label,
  required,
  children,
  error,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: NAVY }}>
        {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
        {hint && <span className="font-normal text-slate-500"> {hint}</span>}
      </label>
      {children}
      {error && <p className="text-xs mt-1 text-red-600">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-md border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb] transition";

function CandidatesPage() {
  const [data, setData] = useState<Partial<FormData>>({
    industries: [],
    positions: [],
    certificates: [
      { name: "BOSIET", number: "", issue: "", expiry: "" },
      { name: "HUET", number: "", issue: "", expiry: "" },
      { name: "OGUK Med Certificate", number: "", issue: "", expiry: "" },
    ],
    availability: 50,
    relocate: "no",
    willingToTravel: "yes",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [cvName, setCvName] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const cvRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const toggleArr = (k: "industries" | "positions", v: string) => {
    setData((d) => {
      const cur = (d[k] as string[]) || [];
      return { ...d, [k]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });
  };

  const updateCert = (i: number, field: keyof z.infer<typeof certSchema>, v: string) => {
    setData((d) => {
      const certs = [...(d.certificates || [])];
      certs[i] = { ...certs[i], [field]: v };
      return { ...d, certificates: certs };
    });
  };

  const addCert = () =>
    setData((d) => ({
      ...d,
      certificates: [...(d.certificates || []), { name: "", number: "", issue: "", expiry: "" }],
    }));

  const removeCert = (i: number) =>
    setData((d) => ({
      ...d,
      certificates: (d.certificates || []).filter((_, idx) => idx !== i),
    }));

  const reset = () => {
    setData({
      industries: [],
      positions: [],
      certificates: [],
      availability: 50,
      relocate: "no",
      willingToTravel: "yes",
    });
    setErrors({});
    setPhotoName(null);
    setCvName(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        errs[i.path.join(".")] = i.message;
      });
      setErrors(errs);
      const firstErr = document.querySelector("[data-error='true']");
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    const v = result.data;
    const body = encodeURIComponent(
      `New Candidate Profile Registration\n\n` +
        `Name: ${v.fullName}\nDOB: ${v.dob}\nNationality: ${v.nationality}\n` +
        `Right to Work: ${v.rightToWork}\nEmail: ${v.email}\nPhone: ${v.phone}\n` +
        `Location: ${v.location}\nRelocate: ${v.relocate}\n\n` +
        `Current Role: ${v.currentJobTitle}\nTotal Experience: ${v.yearsExperience}\n` +
        `Years Offshore/Marine/Wind: ${v.yearsOffshore}\nNotice: ${v.noticePeriod}\n` +
        `Availability: ${v.availability}/100\nDay Rate: ${v.dayRate || "—"}\n\n` +
        `Industries: ${v.industries.join(", ")}\nPositions: ${v.positions.join(", ")}\n` +
        `Other Position: ${v.otherPosition || "—"}\n\n` +
        `Certificates:\n${v.certificates
          .map((c) => `- ${c.name} | ${c.number || "—"} | Issue ${c.issue || "—"} | Expiry ${c.expiry || "—"}`)
          .join("\n")}\n\n` +
        `Skills: ${v.skills || "—"}\nLanguages: ${v.languages || "—"}\nNotes: ${v.notes || "—"}\n\n` +
        `Preferred Contract: ${v.contractType || "—"}\nPreferred Location: ${v.preferredLocation || "—"}\n` +
        `Willing to Travel: ${v.willingToTravel}\nHeard about us via: ${v.hearAbout || "—"}\n`,
    );
    window.location.href = `mailto:cv@offshorecv.com?subject=${encodeURIComponent(
      "New Candidate Profile — " + v.fullName,
    )}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-lg p-10 text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
            style={{ background: BLUE }}
          >
            <CheckCircle2 className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold mb-3" style={{ color: NAVY }}>
            Profile Submitted
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            Thanks for registering. Our team will review your profile and notify verified recruiters
            matching your skill set. Check your inbox for confirmation.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-md text-xs font-bold uppercase tracking-wider text-white"
            style={{ background: BLUE }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: DEEP }}>
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroRig})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(110deg, ${DEEP} 30%, ${NAVY}cc 70%, transparent)` }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-14 lg:py-20">
          <nav className="text-xs text-white/60 mb-5 flex items-center gap-2">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <span>Candidates</span>
            <span>›</span>
            <span className="text-white">Register Your Profile</span>
          </nav>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                Candidate Profile Registration
              </h1>
              <p className="text-white/80 max-w-2xl text-sm lg:text-base leading-relaxed">
                Create your profile and showcase your skills to verified offshore recruiters.
                Update your information anytime to stay visible for new opportunities.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: ShieldCheck, t: "Secure &", t2: "Confidential" },
                { icon: Users, t: "Industry", t2: "Opportunities" },
                { icon: Target, t: "Targeted", t2: "Job Matching" },
                { icon: BadgeCheck, t: "100% Free for", t2: "Candidates" },
              ].map(({ icon: Ic, t, t2 }) => (
                <div key={t} className="text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                    style={{ background: "rgba(37,99,235,0.2)", border: "1px solid rgba(96,165,250,0.4)" }}
                  >
                    <Ic className="w-6 h-6" style={{ color: "#60a5fa" }} />
                  </div>
                  <div className="text-[11px] text-white/80 leading-tight">
                    {t}<br />{t2}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <form onSubmit={onSubmit} className="max-w-7xl mx-auto px-4 lg:px-6 py-10 lg:py-14 space-y-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Personal Information */}
          <SectionCard number={1} title="Personal Information" icon={UserIcon} className="lg:col-span-4">
            <div className="space-y-4">
              <Field label="Full Name" required error={errors.fullName}>
                <input
                  data-error={!!errors.fullName}
                  className={inputCls}
                  placeholder="Enter your full name"
                  value={data.fullName || ""}
                  onChange={(e) => set("fullName", e.target.value)}
                />
              </Field>
              <Field label="Date of Birth" required error={errors.dob}>
                <input
                  type="date"
                  className={inputCls}
                  value={data.dob || ""}
                  onChange={(e) => set("dob", e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Nationality" required error={errors.nationality}>
                  <input
                    className={inputCls}
                    placeholder="e.g. British"
                    value={data.nationality || ""}
                    onChange={(e) => set("nationality", e.target.value)}
                  />
                </Field>
                <Field label="Right to Work" required error={errors.rightToWork}>
                  <select
                    className={inputCls}
                    value={data.rightToWork || ""}
                    onChange={(e) => set("rightToWork", e.target.value)}
                  >
                    <option value="">Select status</option>
                    <option value="UK Citizen">UK Citizen</option>
                    <option value="EU Citizen">EU Citizen</option>
                    <option value="Work Visa">Work Visa</option>
                    <option value="Sponsorship Required">Sponsorship Required</option>
                  </select>
                </Field>
              </div>
              <Field label="Email Address" required error={errors.email}>
                <input
                  type="email"
                  className={inputCls}
                  placeholder="Enter your email address"
                  value={data.email || ""}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>
              <Field label="Phone Number" required error={errors.phone}>
                <input
                  type="tel"
                  className={inputCls}
                  placeholder="07 1234 567890"
                  value={data.phone || ""}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </Field>
              <Field label="Current Location" required error={errors.location}>
                <input
                  className={inputCls}
                  placeholder="Enter your current location"
                  value={data.location || ""}
                  onChange={(e) => set("location", e.target.value)}
                />
              </Field>
              <Field label="Willing to Relocate?">
                <div className="flex gap-5 mt-1">
                  {[
                    { v: "yes", l: "Yes" },
                    { v: "no", l: "No" },
                    { v: "possibly", l: "Possibly" },
                  ].map((o) => (
                    <label key={o.v} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="relocate"
                        value={o.v}
                        checked={data.relocate === o.v}
                        onChange={(e) => set("relocate", e.target.value as FormData["relocate"])}
                        className="accent-[#2563eb]"
                      />
                      {o.l}
                    </label>
                  ))}
                </div>
              </Field>
            </div>
          </SectionCard>

          {/* Professional Summary */}
          <SectionCard number={2} title="Professional Summary" icon={Briefcase} className="lg:col-span-4">
            <div className="space-y-4">
              <Field label="Current Job Title" required error={errors.currentJobTitle}>
                <input
                  className={inputCls}
                  placeholder="e.g. Rigger"
                  value={data.currentJobTitle || ""}
                  onChange={(e) => set("currentJobTitle", e.target.value)}
                />
              </Field>
              <Field label="Total Years of Experience" required error={errors.yearsExperience}>
                <input
                  type="number"
                  className={inputCls}
                  placeholder="e.g. 8"
                  value={data.yearsExperience || ""}
                  onChange={(e) => set("yearsExperience", e.target.value)}
                />
              </Field>
              <Field label="Years in Offshore / Marine / Wind" required error={errors.yearsOffshore}>
                <input
                  type="number"
                  className={inputCls}
                  placeholder="e.g. 6"
                  value={data.yearsOffshore || ""}
                  onChange={(e) => set("yearsOffshore", e.target.value)}
                />
              </Field>
              <Field label="Notice Period" required error={errors.noticePeriod}>
                <select
                  className={inputCls}
                  value={data.noticePeriod || ""}
                  onChange={(e) => set("noticePeriod", e.target.value)}
                >
                  <option value="">Select notice period</option>
                  <option>Immediate</option>
                  <option>1 week</option>
                  <option>2 weeks</option>
                  <option>1 month</option>
                  <option>3 months</option>
                </select>
              </Field>
              <Field label="Availability" required>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={data.availability ?? 50}
                  onChange={(e) => set("availability", Number(e.target.value))}
                  className="w-full accent-[#2563eb]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>Not Available</span>
                  <span>Immediately Available</span>
                </div>
              </Field>
              <Field label="Expected Day Rate" hint="(Optional)">
                <input
                  className={inputCls}
                  placeholder="e.g. £250"
                  value={data.dayRate || ""}
                  onChange={(e) => set("dayRate", e.target.value)}
                />
              </Field>
            </div>
          </SectionCard>

          {/* Industry & Positions */}
          <SectionCard number={3} title="Industry & Positions" icon={Building2} className="lg:col-span-4">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: NAVY }}>
                  Select Industry <span style={{ color: "#dc2626" }}>*</span>
                  <span className="font-normal text-slate-500"> (you can choose multiple)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INDUSTRIES.map(({ key, label, icon: Ic }) => {
                    const active = (data.industries || []).includes(key);
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => toggleArr("industries", key)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-md border text-xs font-semibold transition ${
                          active
                            ? "border-[#2563eb] bg-[#eff6ff] text-[#1e3a8a]"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <Ic className="w-4 h-4 shrink-0" />
                        {label}
                      </button>
                    );
                  })}
                </div>
                {errors.industries && <p className="text-xs mt-1.5 text-red-600">{errors.industries}</p>}
              </div>

              <Field label="Positions Available For" hint="(you can choose multiple)">
                <select
                  multiple
                  className={`${inputCls} h-28`}
                  value={data.positions || []}
                  onChange={(e) =>
                    set(
                      "positions",
                      Array.from(e.target.selectedOptions).map((o) => o.value),
                    )
                  }
                >
                  <option>Rigger</option>
                  <option>Scaffolder</option>
                  <option>Crane Operator</option>
                  <option>Deckhand</option>
                  <option>Wind Turbine Technician</option>
                  <option>Rope Access Technician</option>
                  <option>NDT Technician</option>
                  <option>Welder / Fabricator</option>
                  <option>HSE Advisor</option>
                  <option>Project Manager</option>
                </select>
              </Field>

              <Field label="Other Position" hint="(if not listed)">
                <input
                  className={inputCls}
                  placeholder="Please specify"
                  value={data.otherPosition || ""}
                  onChange={(e) => set("otherPosition", e.target.value)}
                />
              </Field>
            </div>
          </SectionCard>
        </div>

        {/* Photo + CV row */}
        <div className="grid lg:grid-cols-12 gap-6">
          <SectionCard number={4} title="Profile Picture" icon={Camera} className="lg:col-span-6">
            <div
              onClick={() => photoRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-[#2563eb] hover:bg-[#eff6ff]/40 transition cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: NAVY }}>
                Upload Your Photo
              </p>
              <p className="text-xs text-slate-500 mb-4">Clear headshot or passport style photo</p>
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white text-xs font-bold"
                style={{ background: BLUE }}
              >
                <UploadCloud className="w-4 h-4" /> {photoName ? "Change Photo" : "Upload Photo"}
              </span>
              <p className="text-[11px] text-slate-500 mt-3">JPG, PNG (Max 5MB)</p>
              {photoName && <p className="text-xs mt-2 text-slate-700">{photoName}</p>}
              <input
                ref={photoRef}
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={(e) => setPhotoName(e.target.files?.[0]?.name || null)}
              />
            </div>
          </SectionCard>

          <SectionCard number={5} title="CV Upload" icon={FileText} className="lg:col-span-6">
            <div
              onClick={() => cvRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-[#2563eb] hover:bg-[#eff6ff]/40 transition cursor-pointer flex items-center gap-4"
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "#eff6ff" }}
              >
                <FileText className="w-7 h-7" style={{ color: BLUE }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold mb-1" style={{ color: NAVY }}>
                  Upload Your CV
                </p>
                <p className="text-xs text-slate-500 mb-3">Accepted formats: PDF, DOC, DOCX</p>
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white text-xs font-bold"
                  style={{ background: BLUE }}
                >
                  <UploadCloud className="w-4 h-4" /> {cvName ? "Replace CV" : "Upload CV"}
                </span>
                {cvName && <p className="text-xs mt-2 text-slate-700">{cvName}</p>}
              </div>
              <input
                ref={cvRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => setCvName(e.target.files?.[0]?.name || null)}
              />
            </div>
          </SectionCard>
        </div>

        {/* Certificates */}
        <SectionCard number={6} title="Certificates" icon={Award}>
          <p className="text-xs text-slate-500 -mt-2 mb-4">Add your certificates and qualifications</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="py-2 pr-3 font-semibold">Certificate Name</th>
                  <th className="py-2 pr-3 font-semibold">Certificate Number (Optional)</th>
                  <th className="py-2 pr-3 font-semibold">Issue Date</th>
                  <th className="py-2 pr-3 font-semibold">Expiry Date</th>
                  <th className="py-2 pr-3 font-semibold">Upload Certificate</th>
                  <th className="py-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {(data.certificates || []).map((c, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-2 pr-3">
                      <input
                        className={inputCls}
                        placeholder="e.g. BOSIET"
                        value={c.name}
                        onChange={(e) => updateCert(i, "name", e.target.value)}
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <input
                        className={inputCls}
                        placeholder="Certificate #"
                        value={c.number || ""}
                        onChange={(e) => updateCert(i, "number", e.target.value)}
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <input
                        type="date"
                        className={inputCls}
                        value={c.issue || ""}
                        onChange={(e) => updateCert(i, "issue", e.target.value)}
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <input
                        type="date"
                        className={inputCls}
                        value={c.expiry || ""}
                        onChange={(e) => updateCert(i, "expiry", e.target.value)}
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-white text-xs font-bold"
                        style={{ background: BLUE }}
                      >
                        <UploadCloud className="w-3.5 h-3.5" /> Upload File
                      </button>
                    </td>
                    <td className="py-2">
                      <button
                        type="button"
                        onClick={() => removeCert(i)}
                        className="w-9 h-9 rounded-md flex items-center justify-center text-red-500 hover:bg-red-50"
                        aria-label="Remove certificate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={addCert}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb] transition"
          >
            <Plus className="w-4 h-4" /> Add Another Certificate
          </button>
        </SectionCard>

        {/* Additional Info + Security + Preferences */}
        <div className="grid lg:grid-cols-12 gap-6">
          <SectionCard number={7} title="Additional Information" icon={Info} className="lg:col-span-5">
            <div className="space-y-4">
              <Field label="Skills & Competencies" hint="(Optional)">
                <input
                  className={inputCls}
                  placeholder="e.g. Working at Height, Confined Space, Crane Operations"
                  value={data.skills || ""}
                  onChange={(e) => set("skills", e.target.value)}
                />
              </Field>
              <Field label="Languages Spoken" hint="(Optional)">
                <input
                  className={inputCls}
                  placeholder="e.g. English, Norwegian, Dutch"
                  value={data.languages || ""}
                  onChange={(e) => set("languages", e.target.value)}
                />
              </Field>
              <Field label="Additional Notes" hint="(Optional)">
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={5}
                  maxLength={500}
                  placeholder="Tell us anything else that may help us find the right opportunities for you..."
                  value={data.notes || ""}
                  onChange={(e) => set("notes", e.target.value)}
                />
                <p className="text-[11px] text-slate-400 text-right mt-1">
                  {(data.notes || "").length} / 500
                </p>
              </Field>
            </div>
          </SectionCard>

          <SectionCard number={8} title="Account Security" icon={Lock} className="lg:col-span-3">
            <p className="text-xs text-slate-500 -mt-2 mb-4">
              Create a password to access and manage your profile anytime. You can log in using your
              email address and password to update your information, certifications, CV and preferences.
            </p>
            <div className="space-y-4">
              <Field label="Email Address" required error={errors.email}>
                <input
                  type="email"
                  className={inputCls}
                  placeholder="Enter your email address"
                  value={data.email || ""}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>
              <Field label="Password" required error={errors.password}>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    className={`${inputCls} pr-10`}
                    placeholder="Enter your password"
                    value={data.password || ""}
                    onChange={(e) => set("password", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password"
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </Field>
              <Field label="Confirm Password" required error={errors.confirmPassword}>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className={`${inputCls} pr-10`}
                    placeholder="Confirm your password"
                    value={data.confirmPassword || ""}
                    onChange={(e) => set("confirmPassword", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </Field>
            </div>
          </SectionCard>

          <SectionCard number={9} title="Preferences" icon={Settings2} className="lg:col-span-4">
            <div className="space-y-4">
              <Field label="Preferred Contract Type">
                <select
                  className={inputCls}
                  value={data.contractType || ""}
                  onChange={(e) => set("contractType", e.target.value)}
                >
                  <option value="">Select contract type</option>
                  <option>Permanent</option>
                  <option>Contract / Rotational</option>
                  <option>Ad-hoc / Project</option>
                </select>
              </Field>
              <Field label="Preferred Location">
                <select
                  className={inputCls}
                  value={data.preferredLocation || ""}
                  onChange={(e) => set("preferredLocation", e.target.value)}
                >
                  <option value="">Select preferred location</option>
                  <option>UK / North Sea</option>
                  <option>Europe</option>
                  <option>Middle East</option>
                  <option>Africa</option>
                  <option>Asia Pacific</option>
                  <option>Worldwide</option>
                </select>
              </Field>
              <Field label="Willing to Travel?">
                <div className="flex gap-5 mt-1">
                  {[
                    { v: "yes", l: "Yes" },
                    { v: "no", l: "No" },
                  ].map((o) => (
                    <label key={o.v} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="travel"
                        value={o.v}
                        checked={data.willingToTravel === o.v}
                        onChange={(e) => set("willingToTravel", e.target.value as FormData["willingToTravel"])}
                        className="accent-[#2563eb]"
                      />
                      {o.l}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="How did you hear about us?">
                <select
                  className={inputCls}
                  value={data.hearAbout || ""}
                  onChange={(e) => set("hearAbout", e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option>Google Search</option>
                  <option>Social Media</option>
                  <option>Recruiter Referral</option>
                  <option>Friend / Colleague</option>
                  <option>Other</option>
                </select>
              </Field>
            </div>
          </SectionCard>
        </div>

        {/* Trust strip */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShieldCheck,
              t: "Your Privacy Is Our Priority",
              d: "Your information is completely secure and confidential. We will never share your details without your permission.",
            },
            {
              icon: EyeOff,
              t: "No Other Users Can See This",
              d: "Your profile is private and will never be visible to other users or the public.",
            },
            {
              icon: Users,
              t: "Only Recruiters Can See Your Information",
              d: "Only verified recruiters who use our service can view your profile to match you with suitable opportunities.",
            },
            {
              icon: Lock,
              t: "Access & Update Anytime",
              d: "Log in using your email and password at any time to update your profile and information.",
            },
          ].map(({ icon: Ic, t, d }) => (
            <div key={t} className="flex gap-3">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "#eff6ff" }}
              >
                <Ic className="w-5 h-5" style={{ color: BLUE }} />
              </div>
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: NAVY }}>{t}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-md text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition"
              style={{ background: BLUE }}
            >
              <Send className="w-4 h-4" /> Submit Candidate Profile
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-md border border-slate-300 bg-white text-xs font-bold uppercase tracking-wider text-slate-700 hover:border-slate-400 transition"
            >
              <RotateCcw className="w-4 h-4" /> Clear Form
            </button>
          </div>
          <p className="text-xs text-slate-500 inline-flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" /> All information is secure and will never be shared without your consent.
          </p>
        </div>
      </form>
    </div>
  );
}
