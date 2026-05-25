import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import windFarm from "@/assets/wind-farm.jpg";
import vessel from "@/assets/vessel.jpg";
import heroRig from "@/assets/hero-rig.jpg";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve, OffshoreCV" },
      { name: "description", content: "Offshore oil & gas, offshore wind, renewables, marine construction, subsea and workboat sectors served globally." },
      { property: "og:title", content: "Industries, OffshoreCV" },
      { property: "og:description", content: "Offshore energy sectors we serve worldwide." },
      { property: "og:image", content: typeof windFarm === "string" ? windFarm : "" },
    ],
  }),
  component: IndustriesPage,
});

type Sector = {
  name: string;
  short: string;
  img: string;
  body: string;
  roles: string[];
  regions: string[];
  stat: { value: string; label: string };
};

const sectors: Sector[] = [
  {
    name: "Offshore Oil & Gas",
    short: "Drilling, production, completions, well services.",
    img: heroRig,
    body: "From rig hands to OIMs and drilling superintendents on jackups, semi subs and drillships. Day rate contracts, rotation patterns, OPITO compliant CV formats, built for the operators and IRC agencies who fill these seats.",
    roles: ["Drillers & Toolpushers", "OIMs / Barge Masters", "Subsea Engineers", "HSE Advisors", "Completion Specialists"],
    regions: ["North Sea", "GoM", "West Africa", "MENA"],
    stat: { value: "6,400+", label: "O&G CVs delivered" },
  },
  {
    name: "Offshore Wind & Renewables",
    short: "Installation, O&M, project management.",
    img: windFarm,
    body: "From CTV crews and GWO-certified technicians to package managers on fixed and floating wind farms. Built for the new generation of offshore, where green credentials and turbine OEM exposure matter as much as sea time.",
    roles: ["GWO Technicians", "CTV Masters", "Package Managers", "Cable Engineers", "HLV Crew"],
    regions: ["UK / Europe", "Taiwan", "Japan", "US East Coast"],
    stat: { value: "3,200+", label: "Wind CVs delivered" },
  },
  {
    name: "Marine Construction & Subsea",
    short: "Cable lay, decommissioning, anchor handling.",
    img: vessel,
    body: "Subsea installation, IMR, anchor handling, platform supply, heavy lift and decommissioning. Crew, deck officers, masters, ROV pilots and superintendents who keep the construction fleets moving across every basin.",
    roles: ["ROV Pilots", "DP Operators", "Masters & C/O", "Project Engineers", "Survey Crew"],
    regions: ["Worldwide"],
    stat: { value: "4,600+", label: "Marine CVs delivered" },
  },
];

function IndustriesPage() {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* HERO with floating sector tabs */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-accent/15" />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase mb-6"
          >
            Industries / Globally Served
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl lg:text-8xl leading-[0.92] max-w-5xl text-balance"
          >
            Three oceans. <span className="italic text-accent">One studio.</span>
            <br />Built for every basin.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mt-8"
          >
            Whether you're chasing a rotation on a North Sea semi-sub or a CTV crew slot in Taiwan, we know the recruiters, the formats, and the language that opens doors.
          </motion.p>
        </div>
      </section>

      {/* Interactive sector explorer */}
      <section className="py-12 lg:py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Tab list */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase mb-8">,  Choose a sector</div>
              {sectors.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActive(i)}
                  className={`w-full text-left p-6 rounded-lg border transition-all ${
                    active === i
                      ? "bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20 -translate-y-0.5"
                      : "bg-background border-border hover:border-accent/60"
                  }`}
                >
                  <div className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${active === i ? "text-accent" : "text-muted-foreground"}`}>
                    Sector / {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-serif text-2xl lg:text-3xl leading-tight">{s.name}</div>
                  <div className={`text-sm mt-2 ${active === i ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{s.short}</div>
                </button>
              ))}
            </div>

            {/* Active sector display */}
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-8 space-y-8"
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl shadow-primary/30 group">
                <img src={sectors[active].img} alt={sectors[active].name} className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-primary-foreground">
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-accent mb-2">,  Now showing</div>
                    <div className="font-serif text-3xl lg:text-4xl italic">{sectors[active].name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-3xl lg:text-4xl text-accent">{sectors[active].stat.value}</div>
                    <div className="text-[10px] font-bold tracking-[0.25em] uppercase opacity-80">{sectors[active].stat.label}</div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg">{sectors[active].body}</p>

              <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-border">
                <div>
                  <div className="text-[10px] font-bold text-accent tracking-[0.25em] uppercase mb-4">,  Roles we write for</div>
                  <ul className="space-y-2">
                    {sectors[active].roles.map((r) => (
                      <li key={r} className="flex items-baseline gap-3 text-sm">
                        <span className="text-accent font-bold">+</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-accent tracking-[0.25em] uppercase mb-4">,  Regions covered</div>
                  <div className="flex flex-wrap gap-2">
                    {sectors[active].regions.map((r) => (
                      <span key={r} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full border border-border">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee-style sector strip */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-12">
          <div className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase mb-4">,  Also serving</div>
          <h2 className="font-serif text-3xl lg:text-5xl">Specialist crews across every offshore vertical.</h2>
        </div>
        <div className="relative">
          <div className="flex gap-6 animate-[slide_40s_linear_infinite] whitespace-nowrap">
            {[...Array(2)].flatMap((_, j) =>
              ["Diving & ROV", "Geotechnical Survey", "FPSO / FLNG", "Decommissioning", "Heavy Lift", "Cable Lay", "Anchor Handling", "DP Operations", "IRM Subsea", "Floating Wind"].map((t, i) => (
                <div key={`${j}-${i}`} className="px-8 py-5 border border-border rounded-full font-serif text-2xl italic bg-card">
                  {t}
                </div>
              ))
            )}
          </div>
        </div>
        <style>{`@keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      {/* CTA */}
      <section className="relative py-16 bg-gradient-to-br from-primary via-primary to-accent/40 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.78_0.1_195/0.4),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl lg:text-6xl mb-8 leading-[1.05]">Don't see your sector? <span className="italic text-accent">Talk to us.</span></h2>
          <Link to="/contact" className="inline-block px-12 py-5 bg-accent text-accent-foreground text-[11px] font-bold uppercase tracking-[0.25em] rounded hover:bg-card hover:text-primary transition-all hover:scale-105">
            Get in Touch →
          </Link>
        </div>
      </section>
    </>
  );
}
