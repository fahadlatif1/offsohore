import { createFileRoute, Link } from "@tanstack/react-router";
import heroRig from "@/assets/hero-rig.jpg";
import { Reveal } from "@/components/site/Reveal";
import {
  CheckCircle2,
  ArrowRight,
  FileText,
  FileBadge,
  Linkedin,
  ChartNoAxesColumn,
  FilePen,
  ShieldCheck,
  Building2,
  Users,
  Lock,
  Clock,
  Headphones,
  FileCheck2,
} from "lucide-react";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Packages & Pricing — OffshoreCV" },
      { name: "description", content: "Professional CV writing packages designed for offshore, maritime and renewable energy professionals. All CVs include a FREE ATS scan." },
      { property: "og:title", content: "Packages & Pricing — OffshoreCV" },
      { property: "og:description", content: "Professional CV writing packages for offshore, maritime and renewable energy professionals." },
    ],
  }),
  component: PackagesPage,
});

const BLUE = "#2563eb";
const NAVY = "#0c1f4a";
const LIGHT = "#eff6ff";

const packages = [
  {
    key: "cv",
    icon: FileText,
    name: "Professional CV",
    sub: "A powerful, ATS-optimised CV that highlights your skills and experience.",
    price: "£100",
    features: [
      "Professionally written CV",
      "ATS Optimised",
      "Industry focused content",
      "Unlimited revisions",
      "FREE ATS scan included",
    ],
    featured: false,
  },
  {
    key: "cv-cover",
    icon: FileBadge,
    name: "Professional CV & Cover Letter",
    sub: "Stand out with a tailored CV and a custom cover letter.",
    price: "£125",
    features: [
      "Professionally written CV",
      "Custom cover letter",
      "ATS Optimised",
      "Unlimited revisions",
      "FREE ATS scan included",
    ],
    featured: false,
  },
  {
    key: "cv-cover-linkedin",
    icon: Linkedin,
    name: "Professional CV & Cover Letter & LinkedIn Update",
    sub: "The complete package to elevate your professional brand.",
    price: "£160",
    features: [
      "Professionally written CV",
      "Custom cover letter",
      "LinkedIn profile update",
      "ATS Optimised",
      "Unlimited revisions",
      "FREE ATS scan included",
    ],
    featured: true,
  },
] as const;

const addons = [
  {
    icon: ChartNoAxesColumn,
    title: "Upload Your Own CV ATS CV Scan",
    body: "Get your CV analysed with our ATS checker and receive a full report with score and improvement tips.",
    price: "£25",
    cta: "Order ATS Scan",
    featured: false,
  },
  {
    icon: FilePen,
    title: "CV We Have Already Created Update",
    body: "Need to make changes to your existing CV? We've got you covered.",
    price: "£25",
    cta: "Order CV Update",
    featured: false,
  },
  {
    icon: ShieldCheck,
    title: "FREE With Every CV We Create",
    body: "Every CV package includes a FREE ATS scan to ensure your CV is optimised and ready to pass ATS systems.",
    price: "FREE",
    cta: null,
    featured: false,
    highlightPrice: true,
  },
  {
    icon: Linkedin,
    title: "New LinkedIn Account With CV Information Added",
    body: "We will create a new LinkedIn account and add your CV information to get you started.",
    price: "£50",
    cta: "Order LinkedIn Setup",
    featured: false,
  },
  {
    icon: Building2,
    title: "New UK LTD Company Formation",
    body: "We will form your new UK LTD company and handle everything from start to finish.",
    price: "£100",
    cta: "Order Company Formation",
    featured: false,
  },
  {
    icon: Users,
    title: "Upload Your Details to Our Candidate Database",
    body: "Get discovered by recruiters using our platform to find skilled offshore, maritime & energy professionals. Your profile, visible to recruiters.",
    price: "£100",
    priceSuffix: "/ YEAR",
    cta: "Join Database",
    featured: true,
  },
];

const whyChoose = [
  { icon: Users, title: "Industry Experts", body: "Specialist CV writers with offshore and maritime experience." },
  { icon: FileCheck2, title: "ATS Optimised", body: "CVs written to pass ATS systems and get you noticed." },
  { icon: Lock, title: "Confidential", body: "Your information is 100% confidential and secure." },
  { icon: Clock, title: "Fast Turnaround", body: "Quick delivery without compromising on quality." },
  { icon: Headphones, title: "Support", body: "We're here to help you every step of the way." },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-3">
      <span className="h-px w-12" style={{ backgroundColor: BLUE }} />
      <h2 className="font-display text-xl lg:text-2xl font-extrabold uppercase tracking-wide text-primary text-center">
        {children}
      </h2>
      <span className="h-px w-12" style={{ backgroundColor: BLUE }} />
    </div>
  );
}

function PackagesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-8 items-center py-10 lg:py-14">
          <div className="lg:col-span-6 relative z-10">
            <div className="text-xs text-primary/60 mb-4">
              <Link to="/" className="hover:text-[color:var(--blue)]" style={{ ["--blue" as never]: BLUE }}>Home</Link>
              <span className="mx-2">&gt;</span>
              <span className="font-semibold text-primary">Packages & Pricing</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.05] mb-5 text-primary">
              PACKAGES & <span style={{ color: BLUE }}>PRICING</span>
            </h1>
            <p className="text-base lg:text-lg text-primary/75 max-w-xl mb-5 leading-relaxed">
              Professional CV writing packages designed for offshore, maritime and renewable energy professionals.
            </p>
            <div className="flex items-center gap-2.5 text-sm font-medium text-primary">
              <CheckCircle2 className="w-5 h-5" style={{ color: BLUE }} strokeWidth={2.5} />
              All CVs we create come with a <span className="font-bold" style={{ color: BLUE }}>FREE</span> ATS scan
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute -left-10 -top-10 -bottom-10 -right-4 hidden lg:block">
              <svg viewBox="0 0 600 600" className="w-full h-full" preserveAspectRatio="none">
                <path d="M 130 0 Q 30 300 130 600 L 600 600 L 600 0 Z" fill={LIGHT} />
              </svg>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img src={heroRig} alt="Offshore rig and wind farm" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <SectionHeading>Our CV Writing Packages</SectionHeading>
            <p className="text-muted-foreground">Choose the right package to showcase your experience and land your next offshore opportunity.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((p, idx) => {
              const featured = p.featured;
              return (
                <Reveal key={p.name} delay={idx * 100}>
                  <div
                    className={`rounded-2xl p-8 h-full flex flex-col border ${featured ? "text-white shadow-2xl" : "bg-[#f5f9ff] border-[#dbeafe]"}`}
                    style={featured ? { backgroundColor: NAVY, borderColor: NAVY } : {}}
                  >
                    <div className="flex justify-center mb-5">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${featured ? "bg-white" : ""}`} style={featured ? {} : { backgroundColor: BLUE }}>
                        <p.icon className={`w-8 h-8 ${featured ? "" : "text-white"}`} style={featured ? { color: NAVY } : {}} strokeWidth={2} />
                      </div>
                    </div>
                    <h3 className={`text-center font-display text-lg font-extrabold uppercase tracking-wide mb-3 leading-tight ${featured ? "text-white" : "text-primary"}`}>
                      {p.name}
                    </h3>
                    <p className={`text-center text-sm mb-5 ${featured ? "text-white/80" : "text-muted-foreground"}`}>
                      {p.sub}
                    </p>
                    <div className={`border-t my-2 ${featured ? "border-white/15" : "border-[#dbeafe]"}`} />
                    <div className="text-center my-5">
                      <span className={`text-5xl font-extrabold ${featured ? "text-white" : ""}`} style={featured ? {} : { color: BLUE }}>{p.price}</span>
                      <span className={`ml-2 text-xs font-semibold ${featured ? "text-white/70" : "text-muted-foreground"}`}>GBP</span>
                    </div>
                    <ul className="space-y-2.5 mb-7 flex-1">
                      {p.features.map((f) => (
                        <li key={f} className={`flex items-start gap-2.5 text-sm ${featured ? "text-white/90" : "text-primary/85"}`}>
                          <CheckCircle2 className="w-4.5 h-4.5 shrink-0 mt-0.5" style={{ color: featured ? "#ffffff" : BLUE }} strokeWidth={2.5} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/start"
                      search={{ package: p.key }}
                      className={`block text-center py-3.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                        featured ? "bg-white hover:brightness-95" : "border-2 hover:bg-[#dbeafe]"
                      }`}
                      style={featured ? { color: NAVY } : { borderColor: BLUE, color: BLUE }}
                    >
                      Choose This Package <ArrowRight className="inline w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADDITIONAL SERVICES */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <SectionHeading>Additional Services</SectionHeading>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addons.map((a, idx) => {
              const featured = a.featured;
              return (
                <Reveal key={a.title} delay={idx * 80}>
                  <div
                    className={`rounded-2xl p-6 h-full flex flex-col border ${featured ? "text-white shadow-xl" : "bg-[#f5f9ff] border-[#dbeafe]"}`}
                    style={featured ? { backgroundColor: NAVY, borderColor: NAVY } : {}}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${featured ? "bg-white" : "bg-white border-2"}`} style={featured ? {} : { borderColor: "#dbeafe" }}>
                        <a.icon className="w-7 h-7" style={{ color: featured ? NAVY : BLUE }} strokeWidth={2} />
                      </div>
                      <h3 className={`font-display text-sm font-extrabold uppercase tracking-wide leading-tight pt-2 ${featured ? "text-white" : "text-primary"}`}>
                        {a.title}
                      </h3>
                    </div>
                    <p className={`text-sm mb-5 flex-1 ${featured ? "text-white/80" : "text-muted-foreground"}`}>
                      {a.body}
                    </p>
                    <div className="mb-5">
                      <span className={`text-3xl font-extrabold ${featured ? "text-white" : ""}`} style={featured ? {} : { color: BLUE }}>{a.price}</span>
                      {a.priceSuffix ? (
                        <span className={`ml-2 text-xs font-semibold ${featured ? "text-white/70" : "text-muted-foreground"}`}>GBP {a.priceSuffix}</span>
                      ) : a.price !== "FREE" ? (
                        <span className={`ml-2 text-xs font-semibold ${featured ? "text-white/70" : "text-muted-foreground"}`}>GBP</span>
                      ) : null}
                    </div>
                    {a.cta ? (
                      <Link
                        to="/contact"
                        className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${
                          featured ? "bg-white hover:brightness-95" : "border-2 hover:bg-[#dbeafe]"
                        }`}
                        style={featured ? { color: NAVY } : { borderColor: BLUE, color: BLUE }}
                      >
                        {a.cta} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : null}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <SectionHeading>Why Choose OffshoreCV?</SectionHeading>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
            {whyChoose.map((w, idx) => (
              <Reveal key={w.title} delay={idx * 60} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: LIGHT }}>
                  <w.icon className="w-7 h-7" style={{ color: BLUE }} strokeWidth={1.8} />
                </div>
                <h3 className="text-xs lg:text-sm font-bold uppercase tracking-wider text-primary mb-3 leading-tight">{w.title}</h3>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed max-w-[180px]">{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
