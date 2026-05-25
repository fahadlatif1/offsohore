import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import heroRig from "@/assets/hero-rig.jpg";
import {
  ShieldCheck,
  Anchor,
  Filter,
  LayoutDashboard,
  Zap,
  Check,
  Search,
  Users,
  Lock,
  Waves,
  Handshake,
  BadgeCheck,
  Headphones,
  ArrowRight,
  Star,
} from "lucide-react";

const NAVY = "#0a1a3f";
const DEEP = "#060f2a";
const BLUE = "#2563eb";
const LIGHT_BLUE = "#60a5fa";

export const Route = createFileRoute("/recruiters")({
  head: () => ({
    meta: [
      { title: "Recruiter Portal — Hire Offshore & Maritime Talent | OffshoreCV" },
      {
        name: "description",
        content:
          "Search and connect with verified offshore, renewable energy and maritime professionals through the OffshoreCV recruiter network.",
      },
      { property: "og:title", content: "OffshoreCV Recruiter Portal" },
      {
        property: "og:description",
        content:
          "Access skilled offshore and maritime candidates. Choose a recruiter plan and start hiring verified talent today.",
      },
    ],
  }),
  component: RecruitersPage,
});

const schema = z.object({
  companyName: z.string().trim().min(2, "Enter company name").max(120),
  recruiterName: z.string().trim().min(2, "Enter your full name").max(100),
  businessEmail: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(5, "Enter phone number").max(40),
  website: z.string().trim().max(255).optional(),
  industry: z.string().trim().min(1, "Select an industry"),
  numRecruiters: z.string().trim().min(1, "Select a number"),
  countries: z.string().trim().min(1, "Select countries"),
  packageKey: z.string().trim().min(1, "Select a package"),
  needs: z.string().trim().max(500).optional(),
  agree: z.literal(true, { errorMap: () => ({ message: "You must agree to continue" }) }),
});

type FormData = z.infer<typeof schema>;

const PLANS = [
  {
    key: "starter",
    name: "Starter Recruiter",
    price: "£99",
    cadence: "/month",
    tagline: "Best for small recruitment companies",
    features: ["Limited candidate searches", "View basic profiles", "Save candidates", "OffshoreCV support"],
    popular: false,
  },
  {
    key: "professional",
    name: "Professional Recruiter",
    price: "£249",
    cadence: "/month",
    tagline: "Best for growing recruitment companies",
    features: [
      "Unlimited candidate searches",
      "Full profile access",
      "CV downloads",
      "Certification visibility",
      "Availability filters",
      "Candidate shortlist system",
      "Direct messaging access",
      "Priority support",
    ],
    popular: true,
  },
  {
    key: "enterprise",
    name: "Enterprise Recruiter",
    price: "£499",
    cadence: "/month",
    tagline: "For large recruitment companies",
    features: [
      "Everything in Professional",
      "Multi-user recruiter accounts",
      "Priority candidate access",
      "Featured recruiter listing",
      "Priority support",
      "Early access to new candidates",
      "Custom recruitment support",
    ],
    popular: false,
  },
  {
    key: "oneoff",
    name: "One-Off Candidate Unlock",
    price: "£25",
    cadence: "/candidate",
    tagline: "Unlock a single candidate profile without a membership",
    features: ["Full profile access", "CV download", "Certification visibility", "Contact candidate"],
    popular: false,
  },
];

const SAMPLE_CANDIDATES = [
  { name: "John Smith", role: "Rigger", years: "8 Years", loc: "Aberdeen, UK", avail: "Available", rate: "£220" },
  { name: "Michael Brown", role: "Crane Operator", years: "6 Years", loc: "Newcastle, UK", avail: "Available", rate: "£240" },
  { name: "David Wilson", role: "HSE Advisor", years: "10 Years", loc: "Stavanger, NO", avail: "Not Available", rate: "£280" },
  { name: "James Carter", role: "Mechanic", years: "7 Years", loc: "Dubai, UAE", avail: "Available", rate: "£210" },
];

const inputCls =
  "w-full px-3.5 py-2.5 rounded-md border border-white/10 bg-white/5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 focus:border-[#2563eb] transition";

function RecruitersPage() {
  const [data, setData] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path.join(".")] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const v = result.data;
    const body = encodeURIComponent(
      `New Recruiter Registration\n\n` +
        `Company: ${v.companyName}\nRecruiter: ${v.recruiterName}\nEmail: ${v.businessEmail}\n` +
        `Phone: ${v.phone}\nWebsite: ${v.website || "—"}\nIndustry: ${v.industry}\n` +
        `Number of Recruiters: ${v.numRecruiters}\nCountries: ${v.countries}\n` +
        `Package: ${v.packageKey}\n\nNeeds: ${v.needs || "—"}\n`,
    );
    window.location.href = `mailto:cv@offshorecv.com?subject=${encodeURIComponent(
      "New Recruiter Registration — " + v.companyName,
    )}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div style={{ background: DEEP }} className="min-h-screen text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroRig})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(100deg, ${DEEP} 35%, ${NAVY}cc 60%, transparent 95%)`,
          }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-14 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: LIGHT_BLUE }}>
              Recruit Top Offshore Talent
            </p>
            <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5">
              Access Skilled Offshore &<br />
              Maritime Candidates
            </h1>
            <p className="text-white/75 max-w-xl text-sm lg:text-base leading-relaxed mb-7">
              Search and connect with verified offshore, renewable energy and maritime
              professionals through the OffshoreCV recruiter network.
            </p>
            <div className="flex flex-wrap gap-3 mb-5">
              <a
                href="#register"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-95 transition"
                style={{ background: BLUE }}
              >
                Register as Recruiter <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#plans"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-white/20 bg-white/5 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition"
              >
                View Membership Plans
              </a>
            </div>
            <p className="text-xs text-white/60 inline-flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" /> Recruiter accounts are reviewed and approved before database access is granted.
            </p>
          </div>
          <div className="hidden lg:block" />
        </div>

        {/* Feature strip */}
        <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: ShieldCheck, t: "Verified Offshore Candidates", d: "All candidates are verified before joining our database" },
              { icon: Anchor, t: "Offshore Industry Specific", d: "Candidates from offshore, marine & renewable sectors" },
              { icon: Filter, t: "Advanced Search & Filtering", d: "Find the right talent fast with powerful search tools" },
              { icon: LayoutDashboard, t: "Recruiter Dashboard Access", d: "Manage searches, shortlisted candidates & activity" },
              { icon: Zap, t: "Fast Candidate Matching", d: "Save time and connect with suitable candidates faster" },
            ].map(({ icon: Ic, t, d }) => (
              <div key={t} className="flex flex-col items-center text-center gap-2">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(96,165,250,0.4)" }}
                >
                  <Ic className="w-5 h-5" style={{ color: LIGHT_BLUE }} />
                </div>
                <p className="text-xs font-bold text-white">{t}</p>
                <p className="text-[11px] text-white/60 leading-snug max-w-[180px]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans + Search demo */}
      <section id="plans" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight">
              RECRUITER MEMBERSHIP PLANS
            </h2>
            <p className="text-white/60 text-sm mt-2">
              Choose the plan that works best for your recruitment business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLANS.map((p) => (
              <div
                key={p.key}
                className={`relative rounded-xl p-6 flex flex-col ${
                  p.popular
                    ? "border-2 border-[#2563eb] bg-gradient-to-b from-[#0f2960] to-[#0a1a3f] shadow-2xl shadow-blue-500/20 lg:scale-105"
                    : "border border-white/10 bg-white/[0.03]"
                }`}
              >
                {p.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white inline-flex items-center gap-1"
                    style={{ background: BLUE }}
                  >
                    <Star className="w-3 h-3 fill-white" /> Most Popular
                  </span>
                )}
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-4 text-center">
                  {p.name}
                </p>
                <div className="text-center mb-3">
                  <span className="text-4xl font-extrabold" style={{ color: p.popular ? LIGHT_BLUE : "#fff" }}>
                    {p.price}
                  </span>
                  <span className="text-sm text-white/60 ml-1">{p.cadence}</span>
                </div>
                <p className="text-[11px] text-white/60 text-center mb-5 min-h-[32px]">{p.tagline}</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-white/80">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: LIGHT_BLUE }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#register"
                  onClick={() => set("packageKey", p.key)}
                  className={`block text-center py-3 rounded-md text-xs font-bold uppercase tracking-wider transition ${
                    p.popular
                      ? "text-white shadow-lg hover:opacity-95"
                      : "border border-white/15 text-white hover:bg-white/5"
                  }`}
                  style={p.popular ? { background: BLUE } : undefined}
                >
                  {p.key === "oneoff" ? "Unlock Candidate" : "Choose Plan"}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-white/50 mt-5 inline-flex items-center gap-2 w-full justify-center">
            <Lock className="w-3 h-3" /> All plans are billed monthly. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Powerful Search Preview */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight">
              <Search className="inline w-7 h-7 mr-2 -mt-1" style={{ color: LIGHT_BLUE }} />
              POWERFUL SEARCH. BETTER RESULTS.
            </h2>
          </div>

          <div
            className="rounded-2xl border border-white/10 p-6 lg:p-8"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
              {["Industry", "Position", "BOSIET", "GWO", "IRATA", "Nationality", "Location"].map((f) => (
                <select
                  key={f}
                  className="px-3 py-2.5 rounded-md bg-white text-slate-800 text-xs font-semibold border border-white/10"
                  defaultValue=""
                >
                  <option value="">{f}</option>
                </select>
              ))}
              <button
                className="px-3 py-2.5 rounded-md text-white text-xs font-bold uppercase inline-flex items-center justify-center gap-1.5 col-span-2 lg:col-span-1"
                style={{ background: BLUE }}
              >
                <Search className="w-3.5 h-3.5" /> Search
              </button>
            </div>

            <div className="bg-white rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1.5fr_1fr_0.8fr_1fr_1fr_0.8fr_auto] gap-3 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <span>Candidate</span>
                <span>Position</span>
                <span>Experience</span>
                <span>Location</span>
                <span>Availability</span>
                <span>Day Rate</span>
                <span />
              </div>
              {SAMPLE_CANDIDATES.map((c) => (
                <div
                  key={c.name}
                  className="grid grid-cols-[1.5fr_1fr_0.8fr_1fr_1fr_0.8fr_auto] gap-3 items-center px-5 py-3 text-xs text-slate-700 border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="font-semibold text-slate-900">{c.name}</span>
                  </div>
                  <span>{c.role}</span>
                  <span>{c.years}</span>
                  <span>{c.loc}</span>
                  <span>
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                        c.avail === "Available"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {c.avail}
                    </span>
                  </span>
                  <span className="font-semibold">{c.rate}</span>
                  <button className="px-3 py-1.5 rounded-md border border-[#2563eb] text-[#2563eb] text-[10px] font-bold uppercase tracking-wider hover:bg-[#eff6ff]">
                    View Profile
                  </button>
                </div>
              ))}
              <div className="text-center py-3">
                <a href="#" className="text-xs font-bold text-[#2563eb] inline-flex items-center gap-1">
                  View all candidates <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div
            className="rounded-2xl border border-white/10 p-6 lg:p-8"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <h2 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">
              REGISTER AS A RECRUITER
            </h2>
            <p className="text-white/60 text-sm mb-6">
              Create your recruiter account to access our database.
            </p>

            {submitted ? (
              <div className="text-center py-10">
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: BLUE }}
                >
                  <Check className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Registration Submitted</h3>
                <p className="text-sm text-white/70">
                  Our team will review your details and reach out within 1–2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Company Name" required error={errors.companyName}>
                  <input
                    className={inputCls}
                    placeholder="Enter company name"
                    value={data.companyName || ""}
                    onChange={(e) => set("companyName", e.target.value)}
                  />
                </FormField>
                <FormField label="Recruiter Name" required error={errors.recruiterName}>
                  <input
                    className={inputCls}
                    placeholder="Enter your full name"
                    value={data.recruiterName || ""}
                    onChange={(e) => set("recruiterName", e.target.value)}
                  />
                </FormField>
                <FormField label="Business Email" required error={errors.businessEmail}>
                  <input
                    type="email"
                    className={inputCls}
                    placeholder="Enter your business email"
                    value={data.businessEmail || ""}
                    onChange={(e) => set("businessEmail", e.target.value)}
                  />
                </FormField>
                <FormField label="Phone Number" required error={errors.phone}>
                  <input
                    type="tel"
                    className={inputCls}
                    placeholder="Enter phone number"
                    value={data.phone || ""}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </FormField>
                <FormField label="Company Website" error={errors.website}>
                  <input
                    className={inputCls}
                    placeholder="Enter website"
                    value={data.website || ""}
                    onChange={(e) => set("website", e.target.value)}
                  />
                </FormField>
                <FormField label="Industry Sector" required error={errors.industry}>
                  <select
                    className={inputCls}
                    value={data.industry || ""}
                    onChange={(e) => set("industry", e.target.value)}
                  >
                    <option value="">Select industry sector</option>
                    <option>Oil & Gas</option>
                    <option>Offshore Wind</option>
                    <option>Maritime</option>
                    <option>Rope Access</option>
                    <option>Subsea</option>
                    <option>Construction</option>
                    <option>Other</option>
                  </select>
                </FormField>
                <FormField label="Number of Recruiters" required error={errors.numRecruiters}>
                  <select
                    className={inputCls}
                    value={data.numRecruiters || ""}
                    onChange={(e) => set("numRecruiters", e.target.value)}
                  >
                    <option value="">Select number</option>
                    <option>1</option>
                    <option>2–5</option>
                    <option>6–10</option>
                    <option>11–25</option>
                    <option>25+</option>
                  </select>
                </FormField>
                <FormField label="Countries Recruiting In" required error={errors.countries}>
                  <select
                    className={inputCls}
                    value={data.countries || ""}
                    onChange={(e) => set("countries", e.target.value)}
                  >
                    <option value="">Select countries</option>
                    <option>UK</option>
                    <option>Europe</option>
                    <option>Middle East</option>
                    <option>Asia Pacific</option>
                    <option>Africa</option>
                    <option>Worldwide</option>
                  </select>
                </FormField>
                <FormField label="Preferred Package" required error={errors.packageKey} className="md:col-span-2">
                  <select
                    className={inputCls}
                    value={data.packageKey || ""}
                    onChange={(e) => set("packageKey", e.target.value)}
                  >
                    <option value="">Select package</option>
                    {PLANS.map((p) => (
                      <option key={p.key} value={p.key}>
                        {p.name} — {p.price}{p.cadence}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField
                  label="Tell us about your recruitment needs"
                  hint="(Optional)"
                  error={errors.needs}
                  className="md:col-span-2"
                >
                  <textarea
                    rows={4}
                    className={`${inputCls} resize-none`}
                    placeholder="e.g. Types of roles you recruit for, offshore regions, specific requirements etc."
                    value={data.needs || ""}
                    onChange={(e) => set("needs", e.target.value)}
                    maxLength={500}
                  />
                </FormField>

                <div className="md:col-span-2">
                  <label className="flex items-start gap-2 text-xs text-white/80 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5 accent-[#2563eb]"
                      checked={!!data.agree}
                      onChange={(e) => set("agree", e.target.checked as true)}
                    />
                    <span>
                      I agree to the{" "}
                      <Link to="/about" className="text-[#60a5fa] underline">Terms & Conditions</Link> and{" "}
                      <Link to="/about" className="text-[#60a5fa] underline">Privacy Policy</Link>{" "}
                      <span className="text-red-400">*</span>
                    </span>
                  </label>
                  {errors.agree && <p className="text-xs mt-1 text-red-400">{errors.agree}</p>}
                </div>

                <button
                  type="submit"
                  className="md:col-span-2 w-full py-3.5 rounded-md text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-95 transition"
                  style={{ background: BLUE }}
                >
                  Submit Registration
                </button>

                <div
                  className="md:col-span-2 rounded-md p-4 flex gap-3 items-start"
                  style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(96,165,250,0.25)" }}
                >
                  <Lock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: LIGHT_BLUE }} />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: LIGHT_BLUE }}>
                      Recruiter Accounts Require Approval
                    </p>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      To protect candidate privacy and maintain database quality, all recruiter
                      registrations are manually reviewed before access is granted.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Privacy strip */}
          <div className="grid md:grid-cols-3 gap-5 mt-8">
            {[
              { icon: ShieldCheck, t: "Candidate Privacy Protected", d: "Candidate profiles are only visible to approved recruiters using the OffshoreCV platform." },
              { icon: Users, t: "Recruiter Accounts Require Approval", d: "All recruiter registrations are manually reviewed before database access is granted." },
              { icon: Lock, t: "Your Data is Secure", d: "We use industry-standard security to protect all data on our platform." },
            ].map(({ icon: Ic, t, d }) => (
              <div key={t} className="flex gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(96,165,250,0.3)" }}
                >
                  <Ic className="w-5 h-5" style={{ color: LIGHT_BLUE }} />
                </div>
                <div>
                  <p className="text-xs font-bold mb-1 text-white">{t}</p>
                  <p className="text-[11px] text-white/60 leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom trust strip */}
      <section className="border-t border-white/10 py-10" style={{ background: "rgba(0,0,0,0.25)" }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { icon: Users, t: "Thousands of", t2: "Qualified Candidates" },
            { icon: Waves, t: "Offshore, Marine &", t2: "Renewable Energy" },
            { icon: Handshake, t: "Trusted by Recruitment", t2: "Professionals" },
            { icon: BadgeCheck, t: "GDPR Compliant", t2: "& Secure" },
            { icon: Headphones, t: "Dedicated Support", t2: "Team" },
          ].map(({ icon: Ic, t, t2 }) => (
            <div key={t} className="flex items-center gap-3">
              <Ic className="w-9 h-9 shrink-0" style={{ color: LIGHT_BLUE }} />
              <div className="text-xs leading-tight">
                <p className="font-bold text-white">{t}</p>
                <p className="text-white/70">{t2}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  required,
  hint,
  error,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-white/80 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
        {hint && <span className="font-normal text-white/50"> {hint}</span>}
      </label>
      {children}
      {error && <p className="text-xs mt-1 text-red-400">{error}</p>}
    </div>
  );
}
