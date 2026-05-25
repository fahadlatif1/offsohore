import { createFileRoute } from "@tanstack/react-router";
import heroRig from "@/assets/hero-rig.jpg";
import { Reveal } from "@/components/site/Reveal";
import {
  CheckCircle2,
  Ship,
  Anchor,
  Compass,
  Waves,
  Factory,
  Construction,
  Wind,
  Leaf,
  ShieldCheck,
  Target,
  FileCheck2,
  Lock,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — OffshoreCV" },
      { name: "description", content: "OffshoreCV was created by a professional with real hands-on experience in the Maritime & Offshore industry since 1997." },
      { property: "og:title", content: "About Us — OffshoreCV" },
      { property: "og:description", content: "Real industry experience. Real CV results." },
    ],
  }),
  component: AboutPage,
});

const BLUE = "#2563eb";
const NAVY = "#0a1a3f";
const NAVY_DEEP = "#060f2a";
const LIGHT_BLUE = "#60a5fa";

const sectors = [
  { icon: Ship, label: "Fishing Industry" },
  { icon: Anchor, label: "Tug Boat Operations" },
  { icon: Compass, label: "Towing & Escort Vessels" },
  { icon: Waves, label: "Marine Survey & Inspection" },
  { icon: Factory, label: "Offshore Oil & Gas" },
  { icon: Construction, label: "Pipe Lay Operations" },
  { icon: Wind, label: "Offshore Wind Installation" },
  { icon: Leaf, label: "Renewable Energy" },
];

const differentiators = [
  "Real offshore & maritime industry experience since 1997",
  "In-depth understanding of vessel and offshore installation roles",
  "CVs written with a recruiter's perspective",
  "Highlight the right skills, experience and certifications",
  "CVs that stand out in a competitive job market",
  "Personal, professional & confidential service",
  "100% focused on helping you get noticed and get hired",
];

const valueProps = [
  { icon: ShieldCheck, title: "Industry Knowledge", body: "Real-world experience across maritime and offshore sectors." },
  { icon: Target, title: "Focused on You", body: "Every CV is tailored to your experience and the role you are applying for." },
  { icon: FileCheck2, title: "Proven Results", body: "Helping professionals secure interviews and land the jobs they deserve." },
  { icon: Lock, title: "Confidential & Secure", body: "Your information is safe with us and never shared with third parties." },
];

function AboutPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden text-white" style={{ backgroundColor: NAVY }}>
        <img src={heroRig} alt="" aria-hidden className="absolute right-0 top-0 h-full w-full lg:w-1/2 object-cover" />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(90deg, ${NAVY} 0%, ${NAVY} 45%, ${NAVY}cc 55%, transparent 75%)`,
        }} />
        <div className="absolute inset-0 lg:hidden" style={{ backgroundColor: `${NAVY}cc` }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-[0.25em]" style={{ color: LIGHT_BLUE }}>ABOUT US</div>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-extrabold mt-4 mb-3 leading-[1.05]">
              A Bit About OffshoreCV
            </h1>
            <div className="text-sm lg:text-base font-bold tracking-wider uppercase mb-6" style={{ color: LIGHT_BLUE }}>
              Real Industry Experience. Real CV Results.
            </div>
            <p className="text-base text-white/80 leading-relaxed max-w-xl">
              OffshoreCV was created by a professional with real hands-on experience in the Maritime & Offshore industry since 1997. This real-world knowledge gives me the edge in creating CVs that stand out from the rest.
            </p>
          </div>
        </div>
      </section>

      {/* THREE COLUMN BLOCK */}
      <section className="relative py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-3 gap-8">
          {/* OUR STORY */}
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold mb-4" style={{ color: NAVY }}>OUR STORY</h2>
            <span className="block h-0.5 w-12 mb-6" style={{ backgroundColor: BLUE }} />
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>I have been involved in the Maritime & Offshore industry since 1997. This gives me an edge in creating a CV that will stand out from the rest. I understand most roles, whether on a Vessel or Offshore installation. This understanding helps me create CVs that get noticed and stand out from the rest, which is more important than ever today, as the number of personnel far outweighs the vacancies available.</p>
              <p>Other CV creators create CVs and they have never been on a Vessel or an Offshore installation and have no real understanding of the industry or what clients are looking for in future employees.</p>
              <p>My experience means I know what matters, what to highlight and how to present your skills and experience in a way that gets results.</p>
            </div>
          </Reveal>

          {/* INDUSTRY EXPERIENCE */}
          <Reveal delay={100}>
            <div className="rounded-2xl p-7 h-full border border-slate-200 bg-slate-50">
              <h2 className="font-display text-xl font-extrabold mb-3" style={{ color: NAVY }}>INDUSTRY EXPERIENCE</h2>
              <span className="block h-0.5 w-12 mb-5" style={{ backgroundColor: BLUE }} />
              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                With experience across a wide range of sectors, I understand the roles, the environments and what employers are really looking for.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {sectors.map((s) => (
                  <div key={s.label} className="flex flex-col items-center text-center">
                    <s.icon className="w-9 h-9 mb-2" style={{ color: BLUE }} strokeWidth={1.5} />
                    <div className="text-[10.5px] font-bold leading-tight" style={{ color: NAVY }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* WHAT MAKES US DIFFERENT */}
          <Reveal delay={200}>
            <div className="rounded-2xl p-7 h-full border border-slate-200 bg-slate-50">
              <h2 className="font-display text-xl font-extrabold mb-3" style={{ color: NAVY }}>WHAT MAKES US DIFFERENT</h2>
              <span className="block h-0.5 w-12 mb-5" style={{ backgroundColor: BLUE }} />
              <ul className="space-y-3.5">
                {differentiators.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-slate-700 leading-snug">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: BLUE }} strokeWidth={2.5} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUE PROPS STRIP */}
      <section className="border-t border-slate-200 py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((v, idx) => (
            <Reveal key={v.title} delay={idx * 80} className="flex items-start gap-4">
              <div className="shrink-0">
                <v.icon className="w-11 h-11" style={{ color: BLUE }} strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="text-base font-bold mb-1.5" style={{ color: NAVY }}>{v.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
