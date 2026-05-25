import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCertBySlug, certifications, type Certification } from "@/data/certifications";
import { Reveal } from "@/components/site/Reveal";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  PoundSterling,
  ShieldCheck,
  RefreshCw,
  MapPin,
  GraduationCap,
} from "lucide-react";

export const Route = createFileRoute("/training/$cert")({
  loader: ({ params }) => {
    const cert = getCertBySlug(params.cert);
    if (!cert) throw notFound();
    return { cert };
  },
  head: ({ loaderData }) => {
    const cert = loaderData?.cert;
    if (!cert) return { meta: [{ title: "Certification not found, OffshoreCV" }] };
    return {
      meta: [
        { title: `${cert.code} — ${cert.name}, OffshoreCV` },
        { name: "description", content: cert.summary },
        { property: "og:title", content: `${cert.code} — ${cert.name}` },
        { property: "og:description", content: cert.summary },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-primary mb-4">Certification not found</h1>
      <Link to="/training" className="text-accent font-bold uppercase tracking-wider text-xs">
        ← Back to Training
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="font-display text-2xl font-bold text-primary mb-3">Something went wrong</h1>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <Link to="/training" className="text-accent font-bold uppercase tracking-wider text-xs">
        ← Back to Training
      </Link>
    </div>
  ),
  component: CertPage,
});

function CertPage() {
  const { cert } = Route.useLoaderData() as { cert: Certification };
  const related = certifications.filter((c) => c.slug !== cert.slug).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <Link
            to="/training"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-accent mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Training
          </Link>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent text-accent-foreground text-[10px] font-bold tracking-wider uppercase mb-4">
                {cert.code} · {cert.sector}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05] mb-4">
                {cert.name}
              </h1>
              <p className="text-base lg:text-lg text-white/75 leading-relaxed max-w-3xl">
                {cert.summary}
              </p>
            </div>
            <div className="lg:col-span-4 grid grid-cols-3 gap-3">
              <Stat icon={Clock} label="Duration" value={cert.duration} />
              <Stat icon={PoundSterling} label="Cost" value={cert.price} />
              <Stat icon={ShieldCheck} label="Valid" value={cert.validity} />
            </div>
          </div>
        </div>
      </section>

      {/* COVERS */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-3">
                What it covers
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-primary mb-6">
                Course content
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3 mb-10">
                {cert.covers.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-primary/85">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-4">
                {cert.modules.map((m, idx) => (
                  <div key={m.title} className="bg-surface border border-border rounded-lg p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-md bg-primary text-accent flex items-center justify-center font-bold text-sm shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-1.5">
                          {m.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-accent" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Eligibility</h3>
                </div>
                <ul className="space-y-2.5">
                  {cert.eligibility.map((e) => (
                    <li key={e} className="flex items-start gap-2 text-sm text-primary/85">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="bg-primary text-white rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <RefreshCw className="w-5 h-5 text-accent" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-accent">Renewal</h3>
                </div>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-white/60">Renewal cycle</dt>
                    <dd className="text-white">{cert.renewal.cycle}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-white/60">Refresher</dt>
                    <dd className="text-white">{cert.renewal.refresher}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-white/60">Notes</dt>
                    <dd className="text-white/80 leading-relaxed">{cert.renewal.notes}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Providers</h3>
                </div>
                {cert.providers.map((p) => (
                  <p key={p} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
                ))}
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-2 w-full justify-center px-5 py-3 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider rounded-md hover:brightness-95 transition-all"
                >
                  Find a Provider <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-14 lg:py-20 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-primary mb-8">
            Related certifications
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((c) => (
              <Link
                key={c.slug}
                to="/training/$cert"
                params={{ cert: c.slug }}
                className="group bg-white rounded-lg border border-border p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-primary text-accent text-[10px] font-bold tracking-wider uppercase mb-3">
                  {c.code}
                </div>
                <h3 className="text-base font-bold text-primary mb-2 leading-snug">{c.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{c.summary}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent group-hover:gap-2.5 transition-all">
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-md p-3">
      <Icon className="w-4 h-4 text-accent mb-2" />
      <div className="text-[9px] font-bold uppercase tracking-wider text-white/60 mb-0.5">{label}</div>
      <div className="text-xs font-bold text-white leading-tight">{value}</div>
    </div>
  );
}
