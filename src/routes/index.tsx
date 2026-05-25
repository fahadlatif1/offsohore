import { createFileRoute, Link } from "@tanstack/react-router";
import heroRig from "@/assets/hero-rig.jpg";
import { Reveal } from "@/components/site/Reveal";
import {
  CheckCircle2,
  ArrowRight,
  Factory,
  Wind,
  Ship,
  Construction,
  Mountain,
  BookOpen,
  FileCheck2,
  Mail,
  Users,
  FileSearch,
  Layout,
  Clock,
  Globe2,
  TrendingUp,
  Star,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OffshoreCV — Professional CV Writing for Offshore Careers" },
      { name: "description", content: "Specialists in Offshore, Maritime & Renewable Energy CVs that get you hired. ATS optimised, recruiter friendly, fast turnaround." },
      { property: "og:title", content: "OffshoreCV — Professional CV Writing for Offshore Careers" },
      { property: "og:description", content: "Specialists in Offshore, Maritime & Renewable Energy CVs that get you hired." },
    ],
  }),
  component: HomePage,
});

const BLUE = "#2563eb";
const NAVY = "#0c1f4a";

const heroBullets = [
  "ATS Optimised CVs",
  "Recruiter Friendly Layouts",
  "Industry Specific Templates",
  "Fast Turnaround",
];

const industries = [
  { icon: Factory, label: "Offshore Oil & Gas" },
  { icon: Wind, label: "Offshore Wind" },
  { icon: Ship, label: "Maritime & Marine" },
  { icon: Construction, label: "Offshore Construction" },
  { icon: Mountain, label: "Rope Access & NDT" },
  { icon: BookOpen, label: "Career Guides" },
  { icon: FileCheck2, label: "ATS CV Checker" },
  { icon: Mail, label: "Contact OffshoreCV" },
];

const features = [
  { icon: Users, title: "Offshore Industry Specialists", body: "We understand offshore recruitment inside out." },
  { icon: FileSearch, title: "ATS Optimised CVs", body: "Our CVs are designed to pass ATS systems." },
  { icon: Layout, title: "Recruiter Friendly Layouts", body: "Clear, professional and easy to read." },
  { icon: Clock, title: "Fast Turnaround", body: "Quick delivery without compromising quality." },
  { icon: Globe2, title: "International Clients", body: "Trusted by clients worldwide." },
  { icon: TrendingUp, title: "Offshore Career Guidance", body: "We don't just write CVs, we help careers." },
];

const stats = [
  { icon: Users, big: "500+", label: "Offshore CVs Created" },
  { icon: Globe2, big: null, label: "Clients Working Worldwide" },
  { icon: Factory, big: null, label: "Offshore Wind & Oil Recruitment Focus" },
  { icon: ShieldCheck, big: null, label: "Professional ATS Optimisation" },
];

const testimonials = [
  { quote: "Within 2 weeks of using OffshoreCV I secured interviews offshore in Norway. Highly recommended!", name: "Mark D." },
  { quote: "Excellent CV layout and very professional service. Got me short-listed for multiple offshore roles.", name: "James R." },
  { quote: "The ATS report and optimisation made a huge difference. Very happy with the results!", name: "Steven L." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-6 items-center py-12 lg:py-20">
          <div className="lg:col-span-6 relative z-10 animate-slide-up">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.05] mb-5 text-primary">
              PROFESSIONAL CV WRITING FOR <span style={{ color: BLUE }}>OFFSHORE CAREERS</span>
            </h1>
            <p className="text-base lg:text-lg text-primary/75 max-w-xl mb-7 leading-relaxed">
              Specialists in Offshore, Maritime & Renewable Energy CVs that Get You Hired.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-lg">
              {heroBullets.map((b) => (
                <div key={b} className="flex items-center gap-2.5 text-sm font-medium text-primary">
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: BLUE }} strokeWidth={2.5} />
                  {b}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3.5 text-white text-xs font-bold tracking-wider uppercase rounded-md hover:brightness-110 transition-all shadow-md" style={{ backgroundColor: NAVY }}>
                Get My CV Started <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/guide" className="inline-flex items-center gap-2 px-6 py-3.5 border-2 text-xs font-bold tracking-wider uppercase rounded-md hover:bg-primary/5 transition-all" style={{ borderColor: BLUE, color: BLUE }}>
                View Packages & Pricing
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative animate-slide-up">
            {/* curved blue shape behind */}
            <div className="absolute -left-10 -top-10 -bottom-10 -right-4 hidden lg:block">
              <svg viewBox="0 0 600 600" className="w-full h-full" preserveAspectRatio="none">
                <path d="M 100 0 Q 0 300 100 600 L 600 600 L 600 0 Z" fill={BLUE} opacity="0.9" />
                <path d="M 130 0 Q 30 300 130 600 L 600 600 L 600 0 Z" fill="white" />
              </svg>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img src={heroRig} alt="Offshore rig and wind farm at sunset" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES STRIP */}
      <section className="py-10 lg:py-12" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {industries.map((i) => (
              <Link key={i.label} to="/services" className="group flex flex-col items-center text-center text-white/90 hover:text-white">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:bg-[#2563eb] group-hover:border-[#2563eb] transition-all">
                  <i.icon className="w-6 h-6" strokeWidth={1.8} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider leading-tight">
                  {i.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6 text-center">
            {features.map((f, idx) => (
              <Reveal key={f.title} delay={idx * 60} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#eff6ff" }}>
                  <f.icon className="w-7 h-7" style={{ color: BLUE }} strokeWidth={1.8} />
                </div>
                <h3 className="text-xs lg:text-sm font-bold uppercase tracking-wider text-primary mb-3 leading-tight">{f.title}</h3>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-10" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-white">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <s.icon className="w-9 h-9 shrink-0" style={{ color: "#60a5fa" }} strokeWidth={1.5} />
              <div>
                {s.big && <div className="text-2xl font-extrabold">{s.big}</div>}
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/85 leading-tight">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-16 lg:py-20 overflow-hidden" style={{ backgroundColor: NAVY }}>
        <img src={heroRig} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${NAVY}f0, ${NAVY}f5)` }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-12" style={{ backgroundColor: "#60a5fa" }} />
              <h2 className="font-display text-2xl lg:text-3xl font-extrabold text-white uppercase tracking-wide">What Our Clients Say</h2>
              <span className="h-px w-12" style={{ backgroundColor: "#60a5fa" }} />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 h-full">
                  <div className="flex gap-1 mb-4 justify-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
                    ))}
                  </div>
                  <p className="text-sm text-white/85 leading-relaxed mb-4 text-center italic">"{t.quote}"</p>
                  <div className="text-xs font-semibold text-white/70 text-center">– {t.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* READY CTA BANNER */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-white border border-border rounded-xl shadow-lg p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: BLUE }}>
                <ClipboardList className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg lg:text-xl font-extrabold uppercase tracking-wide text-primary">Ready to take the next step?</h3>
                <p className="text-sm text-muted-foreground mt-1">Let us create a CV that gets you noticed and hired.</p>
              </div>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3.5 text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-md hover:brightness-110 transition-all shrink-0" style={{ backgroundColor: BLUE }}>
              Get My CV Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
