import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import windFarm from "@/assets/wind-farm.jpg";
import heroRig from "@/assets/hero-rig.jpg";
import vessel from "@/assets/vessel.jpg";
import catTrades from "@/assets/cat-trades.jpg";
import catLifting from "@/assets/cat-lifting.jpg";
import catEntry from "@/assets/cat-entry.jpg";
import {
  GraduationCap,
  ShieldCheck,
  Wind,
  Flame,
  Anchor,
  HardHat,
  ArrowRight,
  CheckCircle2,
  Award,
  Clock,
  MapPin,
  PoundSterling,
} from "lucide-react";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Offshore Training & Certifications, OffshoreCV" },
      {
        name: "description",
        content:
          "Guidance on essential offshore training and certifications, BOSIET, GWO, MIST, OPITO and more, with bundled study guides to help you prepare.",
      },
      { property: "og:title", content: "Offshore Training & Certifications, OffshoreCV" },
      {
        property: "og:description",
        content: "Plan your offshore certifications and get hired faster with our training guides.",
      },
    ],
  }),
  component: TrainingPage,
});

const tracks = [
  {
    icon: Flame,
    name: "Oil & Gas Training Track",
    img: heroRig,
    body: "Essential certifications for offshore oil & gas roles in the North Sea, Gulf of Mexico and worldwide.",
    certs: ["BOSIET (OPITO)", "FOET", "MIST", "CA-EBS", "Offshore Medical (OGUK)"],
  },
  {
    icon: Wind,
    name: "Offshore Wind Training Track",
    img: windFarm,
    body: "GWO certified pathway for wind turbine technicians and offshore wind crews.",
    certs: ["GWO Basic Safety Training", "GWO BTT", "GWO Advanced Rescue", "Sea Survival", "ENG1 Medical"],
  },
  {
    icon: Anchor,
    name: "Marine & Subsea Track",
    img: vessel,
    body: "STCW and IMCA certifications for crew, deck and subsea personnel.",
    certs: ["STCW Basic Safety", "ENG1 Medical", "IMCA ROV Pilot", "DP Induction", "Yellow / Blue Book"],
  },
  {
    icon: HardHat,
    name: "Lifting & Rigging Track",
    img: catLifting,
    body: "Slinger, banksman, rigger and crane operator certifications for offshore lifting.",
    certs: ["Stage 1, 2 & 3 Rigger", "Banksman / Slinger", "OPITO Crane Operator", "LOLER Awareness"],
  },
];

const certs = [
  {
    code: "BOSIET",
    name: "Basic Offshore Safety Induction & Emergency Training",
    duration: "3 days",
    price: "£900 – £1,200",
    body: "Mandatory OPITO certification for new offshore oil & gas workers. Covers helicopter safety, sea survival, firefighting and first aid.",
    valid: "4 years",
  },
  {
    code: "GWO BST",
    name: "Global Wind Organisation Basic Safety Training",
    duration: "5 days",
    price: "£1,100 – £1,500",
    body: "Industry standard for offshore wind. Five modules: First Aid, Manual Handling, Fire Awareness, Working at Heights, Sea Survival.",
    valid: "2 years",
  },
  {
    code: "MIST",
    name: "Minimum Industry Safety Training",
    duration: "1 day",
    price: "£200 – £350",
    body: "Required for all UKCS offshore workers. Covers the offshore safety regime, hazards and personal responsibilities.",
    valid: "4 years",
  },
  {
    code: "STCW",
    name: "Standards of Training, Certification & Watchkeeping",
    duration: "5 days",
    price: "£700 – £950",
    body: "Maritime safety baseline for anyone working on vessels. Four modules covering survival, fire, first aid and personal safety.",
    valid: "5 years",
  },
  {
    code: "OGUK / ENG1",
    name: "Offshore Medical Certificate",
    duration: "Half day",
    price: "£90 – £150",
    body: "Medical fitness assessment required before any offshore deployment. OGUK for energy sector, ENG1 for maritime.",
    valid: "2 years",
  },
  {
    code: "CA-EBS",
    name: "Compressed Air Emergency Breathing System",
    duration: "Half day",
    price: "£250 – £400",
    body: "Helicopter underwater escape add-on now required across most North Sea operators.",
    valid: "4 years",
  },
];

const steps = [
  { icon: GraduationCap, title: "1. Pick Your Track", body: "Choose the certification pathway that matches your offshore sector." },
  { icon: Award, title: "2. Get Certified", body: "Book the right courses with accredited OPITO, GWO or STCW providers." },
  { icon: ShieldCheck, title: "3. Stay Compliant", body: "Track renewal dates so your tickets stay valid for offshore mobilisation." },
  { icon: CheckCircle2, title: "4. Get Hired", body: "Use our CV services and guides to land offshore roles with your new tickets." },
];

const bundles = [
  { name: "Beginner Offshore Bundle", img: catEntry, body: "Career guide + certification planner for new entrants.", price: "£39.99" },
  { name: "Offshore Wind Training Bundle", img: windFarm, body: "GWO pathway, recruiter list and CV template.", price: "£49.99" },
  { name: "Technical Trades Bundle", img: catTrades, body: "Certifications, day rates and recruiter contacts for skilled trades.", price: "£59.99" },
];

function TrainingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-3xl">
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-4">
              Training & Certifications
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05] mb-5">
              GET CERTIFIED. <span className="text-accent">GET OFFSHORE.</span>
            </h1>
            <p className="text-base lg:text-lg text-white/75 leading-relaxed mb-7 max-w-2xl">
              The certifications you need to mobilise offshore, the providers that deliver them, and the
              guides that help you prepare. From BOSIET and GWO to STCW and OPITO crane operator tickets.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-foreground text-xs font-bold tracking-wider uppercase rounded-md hover:brightness-95 transition-all"
              >
                Browse Training Guides <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/30 text-white text-xs font-bold tracking-wider uppercase rounded-md hover:bg-white/10 transition-all"
              >
                Speak to an Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-3">
              YOUR PATH TO OFFSHORE
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four steps from no tickets to a fully certified, hired offshore worker.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <Reveal key={s.title} delay={idx * 80}>
                <div className="bg-white rounded-lg border border-border p-6 h-full">
                  <div className="w-11 h-11 rounded-md bg-primary text-accent flex items-center justify-center mb-4">
                    <s.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-3">
              CHOOSE YOUR TRAINING TRACK
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every offshore sector has its own certification framework. Find yours below.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {tracks.map((t, idx) => (
              <Reveal key={t.name} delay={idx * 80}>
                <div className="group bg-surface rounded-lg overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-[16/9] overflow-hidden bg-secondary">
                    <img
                      src={t.img}
                      alt={t.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-md bg-accent text-accent-foreground flex items-center justify-center">
                        <t.icon className="w-4 h-4" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-base font-bold uppercase tracking-wide text-primary">{t.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-5">{t.body}</p>
                    <ul className="space-y-2 mb-5">
                      {t.certs.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-sm text-primary/80">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/shop"
                      className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:gap-2.5 transition-all"
                    >
                      View Guides <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CERT INDEX */}
      <section className="py-14 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-3">
              KEY OFFSHORE CERTIFICATIONS
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Indicative costs and durations. Always confirm pricing with your chosen accredited provider.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {certs.map((c, idx) => (
              <Reveal key={c.code} delay={idx * 60}>
                <div className="bg-white rounded-lg border border-border p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-primary text-accent text-[10px] font-bold tracking-wider uppercase">
                      {c.code}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-muted-foreground">
                      <ShieldCheck className="w-3 h-3" /> Valid {c.valid}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-primary mb-2 leading-snug">{c.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{c.body}</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-border text-xs text-primary/70">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-accent" /> {c.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <PoundSterling className="w-3.5 h-3.5 text-accent" /> {c.price}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROVIDERS */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-3">
              Accredited Providers
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold mb-3">
              OPITO · GWO · STCW · IMCA approved centres worldwide
            </h3>
            <p className="text-white/70 leading-relaxed">
              We point you to accredited training centres in Aberdeen, Newcastle, Great Yarmouth,
              Rotterdam, Esbjerg, Houston, Singapore and beyond, so your tickets are recognised by every
              major offshore operator.
            </p>
          </div>
          <div className="flex items-center gap-3 lg:justify-end">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="text-sm text-white/80">Global provider network</span>
          </div>
        </div>
      </section>

      {/* RELATED BUNDLES */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-3">
              TRAINING BUNDLES
            </h2>
            <p className="text-muted-foreground">Guides paired with certification planners to fast-track your offshore career.</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {bundles.map((b, idx) => (
              <Reveal key={b.name} delay={idx * 100}>
                <div className="bg-surface rounded-lg overflow-hidden border border-border flex flex-col h-full">
                  <div className="aspect-[16/10] overflow-hidden bg-secondary">
                    <img src={b.img} alt={b.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-base font-bold uppercase tracking-wide text-primary mb-2">{b.name}</h3>
                    <p className="text-sm text-muted-foreground mb-5 flex-1">{b.body}</p>
                    <div className="text-2xl font-bold text-primary mb-4">{b.price}</div>
                    <Link
                      to="/shop"
                      className="block w-full text-center py-3 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider rounded-md hover:brightness-95 transition-all"
                    >
                      View Bundle
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
            NOT SURE WHICH TICKETS YOU NEED?
          </h2>
          <p className="text-muted-foreground mb-7">
            Tell us your target sector and role. We'll map out the exact certifications, costs and
            timelines so you can mobilise faster.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider rounded-md hover:brightness-95 transition-all"
          >
            Get a Free Training Plan
          </Link>
        </div>
      </section>
    </>
  );
}
