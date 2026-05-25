import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, GraduationCap, Briefcase, Users, Newspaper, Compass } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Offshore Industry Hub, OffshoreCV" },
      {
        name: "description",
        content:
          "One stop shop for offshore: training centres, job boards, specialist recruiters, industry news and live vessel, weather and wind farm maps.",
      },
      { property: "og:title", content: "Offshore Industry Hub, OffshoreCV" },
      {
        property: "og:description",
        content:
          "Training, jobs, recruiters, news and live offshore tools, all in one place for the offshore workforce.",
      },
    ],
  }),
  component: ResourcesPage,
});

type LinkItem = { name: string; url: string };
type Group = { heading?: string; links: LinkItem[] };
type Section = {
  number: string;
  title: string;
  intro: string;
  icon: LucideIcon;
  accent: string; // tailwind gradient classes
  groups: Group[];
};

const sections: Section[] = [
  {
    number: "01",
    title: "Training Centre Directories",
    intro:
      "Find accredited centres for OPITO, GWO, WINDA and STCW offshore safety and maritime certifications.",
    icon: GraduationCap,
    accent: "from-[#7dd3fc] via-[#38bdf8] to-[#0ea5e9]",
    groups: [
      {
        links: [
          { name: "OPITO Approved Training Centres", url: "https://opito.com/centre-network" },
          {
            name: "GWO Certified Training Providers",
            url: "https://www.globalwindsafety.org/trainingproviders/findttraningprovider",
          },
          {
            name: "WINDA Training Provider Map",
            url: "https://winda.globalwindsafety.org/training-providers-map/",
          },
          { name: "STCW Maritime Training Schools", url: "https://www.stcwdirect.com/schools/" },
        ],
      },
    ],
  },
  {
    number: "02",
    title: "Offshore & Energy Job Boards",
    intro:
      "Live vacancies across oil & gas, offshore wind and maritime, from rig crews to project managers.",
    icon: Briefcase,
    accent: "from-[#fcd34d] via-[#f59e0b] to-[#ea580c]",
    groups: [
      {
        heading: "Global Offshore & Energy Jobs",
        links: [
          { name: "Energy Jobline", url: "https://www.energyjobline.com/" },
          { name: "Rigzone Jobs", url: "https://www.rigzone.com/a-offshore-jobs/" },
          { name: "Energy JobSearch", url: "https://energyjobsearch.com/" },
          { name: "Sea Career", url: "https://www.seacareer.com/" },
          { name: "gCaptain Jobs", url: "https://jobsite.gcaptain.com/" },
        ],
      },
      {
        heading: "Offshore Wind Jobs",
        links: [
          { name: "Ørsted Careers", url: "https://orsted.com/en/careers" },
          {
            name: "Select Offshore Wind Jobs",
            url: "https://www.selectoffshore.com/offshore/offshore-wind/",
          },
          {
            name: "EarthStream Offshore Wind Jobs",
            url: "https://www.earthstreamglobal.com/specialisms/offshore-wind",
          },
          {
            name: "Airswift Offshore Wind Careers",
            url: "https://www.airswift.com/our-industries/energy/offshore-wind",
          },
          {
            name: "NES Fircroft Wind Jobs",
            url: "https://www.nesfircroft.com/industries/renewable-energy-recruitment/wind-jobs/",
          },
        ],
      },
      {
        heading: "Maritime & Vessel Jobs",
        links: [
          { name: "JobWave Offshore Jobs", url: "https://thejobwave.com/offshore/offshore-jobs" },
          { name: "Faststream Energy Jobs", url: "https://www.faststream.com/disciplines/energy-jobs" },
        ],
      },
    ],
  },
  {
    number: "03",
    title: "Recruitment Agencies",
    intro:
      "Specialist recruiters placing offshore, energy and renewables talent into operator and contractor roles worldwide.",
    icon: Users,
    accent: "from-[#c4b5fd] via-[#8b5cf6] to-[#6d28d9]",
    groups: [
      {
        links: [
          { name: "Airswift Offshore & Marine", url: "https://www.airswift.com/our-industries/energy/offshore-marine" },
          { name: "Worldwide Recruitment Solutions", url: "https://www.worldwide-rs.com/our-industries/offshore-and-maritime/" },
          { name: "Select Offshore", url: "https://www.selectoffshore.com/" },
          { name: "IRS Offshore Recruitment", url: "https://www.irs-recruitment.com/offshore" },
          { name: "Rigzone", url: "https://www.rigzone.com/" },
          { name: "IPS Powerful People", url: "https://ipspowerfulpeople.com/offshore-recruitment/" },
          { name: "Orion Oil & Gas Recruitment", url: "https://www.orionjobs.com/sectors/oil-and-gas-recruitment/" },
          { name: "Atlas Nextwave", url: "https://atlasnextwave.com/" },
          { name: "The Offshore Partners", url: "https://www.theoffshorepartners.com/working-with-us/" },
          { name: "OJ Crew Vacancies", url: "https://ojcrew.com/all-vacancies/" },
        ],
      },
    ],
  },
  {
    number: "04",
    title: "Offshore & Energy News",
    intro:
      "Daily reporting on offshore wind, oil & gas and the wider energy transition. Know who's hiring before the jobs are posted.",
    icon: Newspaper,
    accent: "from-[#5cbdb9] via-[#2d8a9e] to-[#0c2340]",
    groups: [
      {
        links: [
          { name: "Offshore Wind", url: "https://www.offshorewind.biz/" },
          { name: "Offshore Energy, Fossil", url: "https://www.offshore-energy.biz/fossilenergy/" },
        ],
      },
    ],
  },
  {
    number: "05",
    title: "Live Maps, Weather & Vessel Tracking",
    intro:
      "Working tools for offshore crews: track vessels, check the weather window, see where the wind farms are.",
    icon: Compass,
    accent: "from-[#fbbf24] via-[#06b6d4] to-[#1e3a8a]",
    groups: [
      {
        heading: "Vessel Tracking",
        links: [
          { name: "Marine Traffic, Global Vessel Map", url: "https://www.marinetraffic.com/" },
        ],
      },
      {
        heading: "Weather",
        links: [
          { name: "XC Weather", url: "https://xcweather.co.uk/" },
          { name: "Windy", url: "https://www.windy.com/" },
        ],
      },
      {
        heading: "Offshore Wind Maps",
        links: [
          { name: "TGS 4C Offshore Wind Map", url: "https://map.tgs4c.com/offshorewind/" },
        ],
      },
    ],
  },
];

function ResourcesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-10 lg:pb-32 bg-gradient-to-b from-background via-background to-primary/5">
        {/* floating orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.55), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-20 -right-24 w-[480px] h-[480px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.45), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.4), transparent 60%)",
          }}
        />
        {/* grid overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-primary/15 shadow-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary/80">
              Resources
            </span>
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl xl:text-8xl leading-[0.95] max-w-5xl text-balance">
            The offshore industry,{" "}
            <span className="italic bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              one click away.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Your one stop shop for offshore. Training centres, live job boards, specialist recruiters, industry news and the maps, weather and vessel tracking tools crews actually use.
          </p>
        </div>
      </section>

      {/* SECTIONS, 3D floating cards */}
      <section className="relative py-12 lg:py-16" style={{ perspective: "1800px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-28 lg:space-y-36">
          {sections.map((s, idx) => {
            const Icon = s.icon;
            const offset = idx % 2 === 0 ? "lg:translate-x-0" : "lg:translate-x-8";
            return (
              <article
                key={s.number}
                className={`relative grid lg:grid-cols-12 gap-10 lg:gap-16 ${offset}`}
              >
                {/* Header column */}
                <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
                  <div
                    className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${s.accent} shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] mb-6`}
                    style={{ transform: "rotateX(15deg) rotateY(-15deg)" }}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent opacity-60" />
                  </div>
                  <div className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase mb-3">
                    {s.number}
                  </div>
                  <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05]">{s.title}</h2>
                  <p className="mt-5 text-muted-foreground leading-relaxed">{s.intro}</p>
                </div>

                {/* Links column */}
                <div className="lg:col-span-8 space-y-10">
                  {s.groups.map((g, gi) => (
                    <div key={gi}>
                      {g.heading && (
                        <div className="flex items-center gap-4 mb-6">
                          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70">
                            {g.heading}
                          </h3>
                          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
                        </div>
                      )}
                      <ul className="grid sm:grid-cols-2 gap-4">
                        {g.links.map((l) => (
                          <li key={l.url} className="[perspective:1200px]">
                            <a
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative block h-full rounded-2xl p-[1px] bg-gradient-to-br from-primary/15 via-primary/5 to-transparent transition-all duration-500 hover:from-accent/40 hover:via-primary/10 hover:to-transparent hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] [transform-style:preserve-3d] hover:[transform:rotateX(-4deg)_rotateY(4deg)]"
                            >
                              <div className="relative h-full rounded-[15px] bg-background/70 backdrop-blur-xl border border-white/40 dark:border-white/5 p-6 overflow-hidden">
                                {/* glow */}
                                <div
                                  aria-hidden
                                  className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500`}
                                />
                                {/* sheen */}
                                <div
                                  aria-hidden
                                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/30 via-transparent to-transparent"
                                />
                                <div className="relative flex items-start justify-between gap-4">
                                  <span className="font-serif text-lg lg:text-xl leading-snug text-primary group-hover:text-accent transition-colors">
                                    {l.name}
                                  </span>
                                  <span
                                    className={`flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/5 border border-primary/10 group-hover:bg-gradient-to-br group-hover:${s.accent} group-hover:border-transparent transition-all duration-500`}
                                  >
                                    <ArrowUpRight
                                      className="w-4 h-4 text-primary/60 group-hover:text-white transition-all duration-500 group-hover:rotate-12"
                                      strokeWidth={2}
                                    />
                                  </span>
                                </div>
                                <div className="relative mt-6 text-[10px] tracking-[0.25em] uppercase text-primary/40 font-bold">
                                  Visit site
                                </div>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="relative py-12 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"
        />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.3)]">
            <div className="rounded-[23px] bg-background/80 backdrop-blur-xl p-10 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-4">
                Disclaimer
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                External links are provided for convenience. OffshoreCV is not affiliated with
                these organisations and is not responsible for their content, services or hiring
                decisions. Always verify accreditation and credentials directly with the provider.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
