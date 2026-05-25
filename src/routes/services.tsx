import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import {
  Target,
  Award,
  FileCheck,
  Timer,
  Ship,
  Wind,
  Anchor,
  Mountain,
  HardHat,
  ClipboardCheck,
  BookOpen,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Mail,
  Facebook,
  Linkedin,
  Users,
} from "lucide-react";
import heroRig from "@/assets/hero-rig.jpg";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "OffshoreCV Services | Industry-Specific CV Writing" },
      {
        name: "description",
        content:
          "Industry specific CV writing services for offshore, maritime and renewable energy professionals. ATS optimised, recruiter friendly, fast turnaround.",
      },
      { property: "og:title", content: "OffshoreCV Services — Industry-Specific CV Writing" },
      {
        property: "og:description",
        content:
          "Professional ATS-optimised CVs for all offshore, maritime and renewable energy professions.",
      },
    ],
  }),
});

type Service = {
  title: string;
  icon: typeof Ship;
  items: string[];
};

const SERVICES: Service[] = [
  { title: "Offshore Oil & Gas CVs", icon: Mountain, items: ["Roustabout", "Rigging", "Drilling", "Production", "Mechanical", "Electrical"] },
  { title: "Offshore Wind CVs", icon: Wind, items: ["GWO", "Wind Turbine Technicians", "Rope Access", "Blade Repair", "HV Technicians"] },
  { title: "Maritime & Marine CVs", icon: Ship, items: ["AB Seaman", "Deck Crew", "Crane Ops", "DP Vessels", "Bosun"] },
  { title: "Rope Access & NDT CVs", icon: Anchor, items: ["IRATA", "NDT", "QA/QC", "Inspection", "Welding Inspection"] },
  { title: "Offshore Construction CVs", icon: HardHat, items: ["Pipefitting", "Fabrication", "Structural", "Heavy Lift", "Commissioning"] },
  { title: "ATS CV Checker", icon: ClipboardCheck, items: ["CV Match %", "Job Description Scan", "Offshore Keyword Optimisation", "Download ATS Report"] },
  { title: "Career Guides", icon: BookOpen, items: ["Beginner Offshore Guide", "Offshore Wind Guide", "Welding Guide", "Rigger Guide", "Maritime Guide"] },
  { title: "Contact OffshoreCV", icon: Headphones, items: ["Email", "Facebook", "LinkedIn"] },
];

const HERO_FEATURES = [
  { icon: Target, title: "ATS Optimised", text: "Designed to pass ATS systems" },
  { icon: Award, title: "Industry Specific", text: "Tailored for your profession" },
  { icon: FileCheck, title: "Recruiter Friendly", text: "Clean, professional and easy to read" },
  { icon: Timer, title: "Fast Turnaround", text: "Quick delivery without compromising quality." },
];

function ServicesPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a1a3f] text-white">
        <div className="absolute inset-y-0 right-0 w-full lg:w-3/5">
          <img src={heroRig} alt="Offshore rig and wind farm" className="w-full h-full object-cover opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3f] via-[#0a1a3f]/85 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-14 lg:py-20">
          <Reveal>
            <div className="text-xs text-white/70 mb-4">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2 text-white/40">&gt;</span>
              <span className="text-white">Services</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[1.02]">
              OffshoreCV Services
            </h1>
            <div className="h-1 w-20 bg-[#2563eb] mt-4 mb-7" />
            <p className="text-white/85 max-w-xl leading-relaxed text-base md:text-lg">
              Industry specific CV writing services designed to get you hired faster.
            </p>
            <p className="text-white/70 max-w-xl leading-relaxed mt-3">
              We write professional, ATS optimised CVs for all offshore, maritime and renewable energy professions.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl">
              {HERO_FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#2563eb]/15 border border-[#2563eb]/40 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-[#60a5fa]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{f.title}</div>
                    <div className="text-xs text-white/65 leading-snug mt-0.5">{f.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        {/* Curve bottom */}
        <div className="relative h-12 lg:h-16 bg-[#0a1a3f]">
          <svg className="absolute inset-x-0 bottom-0 w-full h-full" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
            <path d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="white" />
            <path d="M0,80 C360,20 1080,20 1440,80" stroke="#2563eb" strokeWidth="3" fill="none" />
          </svg>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-[2px] w-16 bg-[#2563eb]" />
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-[#0a1a3f]">
                Our CV Services
              </h2>
              <div className="h-[2px] w-16 bg-[#2563eb]" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="rounded-2xl bg-[#0a1a3f] text-white px-6 md:px-10 py-7 md:py-8 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#60a5fa]" />
              </div>
              <div>
                <div className="font-display text-xl md:text-2xl font-extrabold uppercase tracking-tight">
                  Ready to take the next step?
                </div>
                <div className="text-white/70 text-sm mt-1">Let us create a CV that gets you noticed and hired.</div>
              </div>
            </div>

            <Link
              to="/guide"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#2563eb] hover:bg-[#1d4fd8] text-white text-xs font-bold uppercase tracking-wider transition"
            >
              Get My CV Started <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-wider">
              <a href="mailto:cv@offshorecv.com" className="flex items-center gap-2 text-white/85 hover:text-white">
                <Mail className="w-4 h-4" /> Email
              </a>
              <a href="#" className="flex items-center gap-2 text-white/85 hover:text-white">
                <Facebook className="w-4 h-4" /> Facebook
              </a>
              <a href="#" className="flex items-center gap-2 text-white/85 hover:text-white">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 hover:shadow-lg hover:border-[#2563eb]/40 transition-all h-full flex flex-col">
      <div className="flex flex-col items-center text-center mb-4">
        <div className="w-20 h-20 rounded-full bg-[#eff6ff] border border-[#dbeafe] flex items-center justify-center mb-3">
          <Icon className="w-10 h-10 text-[#0a1a3f]" strokeWidth={1.8} />
        </div>
        <div className="font-display text-sm font-extrabold tracking-wider uppercase text-[#0a1a3f]">
          {service.title}
        </div>
      </div>
      <ul className="space-y-2 mb-5 flex-1">
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-[#0a1a3f]/80">
            <CheckCircle2 className="w-4 h-4 text-[#2563eb] mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/guide"
        className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-md bg-[#2563eb] hover:bg-[#1d4fd8] text-white text-[11px] font-bold uppercase tracking-wider transition mt-auto"
      >
        Learn More
      </Link>
    </div>
  );
}
