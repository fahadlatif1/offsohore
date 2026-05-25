import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import {
  Search,
  ShoppingCart,
  ShieldCheck,
  Download,
  Lock,
  FileText,
  CheckCircle2,
  Headphones,
  LayoutGrid,
  List as ListIcon,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import heroRig from "@/assets/hero-rig.jpg";
import catLifting from "@/assets/cat-lifting.jpg";
import catTrades from "@/assets/cat-trades.jpg";
import catEntry from "@/assets/cat-entry.jpg";
import offshoreRig from "@/assets/offshore-rig.jpg";
import vessel from "@/assets/vessel.jpg";
import windFarm from "@/assets/wind-farm.jpg";
import worker from "@/assets/worker.jpg";
import guideCover from "@/assets/guide-cover.jpg";

export const Route = createFileRoute("/shop")({
  component: PdfDownloadsPage,
  head: () => ({
    meta: [
      { title: "PDF Downloads | Offshore Documents & Templates | OffshoreCV" },
      {
        name: "description",
        content:
          "Download professionally created offshore, marine and renewable energy documents, templates, risk assessments, method statements and HSEQ guides.",
      },
      { property: "og:title", content: "PDF Downloads — Offshore Documents & Templates" },
      {
        property: "og:description",
        content:
          "Industry-compliant offshore documents, templates and guides. Instant download after secure payment.",
      },
    ],
  }),
});

type Category =
  | "All Documents"
  | "Risk Assessments"
  | "Method Statements"
  | "HSEQ Documents"
  | "Permit to Work"
  | "Forms & Checklists"
  | "Guides & Policies";

type Doc = {
  title: string;
  desc: string;
  price: number;
  image: string;
  category: Exclude<Category, "All Documents">;
};

const DOCS: Doc[] = [
  { title: "Offshore Risk Assessment Template", desc: "Comprehensive risk assessment template for offshore operations.", price: 19.99, image: worker, category: "Risk Assessments" },
  { title: "Method Statement Template", desc: "Step by step method statement template for any offshore task.", price: 19.99, image: offshoreRig, category: "Method Statements" },
  { title: "Permit to Work System Template", desc: "Complete permit to work system with forms and guidance.", price: 14.99, image: worker, category: "Permit to Work" },
  { title: "Offshore Wind HSE Plan Template", desc: "Health, safety and environment plan for offshore wind projects.", price: 24.99, image: windFarm, category: "HSEQ Documents" },
  { title: "Toolbox Talk Pack (20+)", desc: "Collection of 20+ toolbox talks for offshore environments.", price: 14.99, image: catTrades, category: "HSEQ Documents" },
  { title: "Lifting Plan Template", desc: "Detailed lifting plan template with calculation sheet.", price: 19.99, image: catLifting, category: "Forms & Checklists" },
  { title: "Emergency Response Plan", desc: "Offshore emergency response plan template.", price: 19.99, image: vessel, category: "HSEQ Documents" },
  { title: "Marine Operations Checklists", desc: "Essential marine operation checklists and inspection forms.", price: 14.99, image: vessel, category: "Forms & Checklists" },
  { title: "COSHH Assessment Pack", desc: "Substance hazard assessments for offshore chemicals and fuels.", price: 17.99, image: catEntry, category: "Risk Assessments" },
  { title: "HSEQ Policy Manual", desc: "Editable health, safety, environment and quality policy manual.", price: 29.99, image: guideCover, category: "Guides & Policies" },
  { title: "Confined Space Entry Pack", desc: "Permits, checklists and rescue plan templates.", price: 22.99, image: catEntry, category: "Permit to Work" },
  { title: "Daily Inspection Forms", desc: "Pre-use equipment and worksite inspection forms.", price: 9.99, image: worker, category: "Forms & Checklists" },
];

const CATEGORIES: { name: Category; count: number }[] = [
  { name: "All Documents", count: 36 },
  { name: "Risk Assessments", count: 8 },
  { name: "Method Statements", count: 7 },
  { name: "HSEQ Documents", count: 6 },
  { name: "Permit to Work", count: 5 },
  { name: "Forms & Checklists", count: 6 },
  { name: "Guides & Policies", count: 4 },
];

const INDUSTRIES = ["Oil & Gas", "Offshore Wind", "Marine", "Subsea", "Construction", "Renewable Energy"];

const TRUST = [
  { icon: Download, title: "Instant Access", text: "Download your documents immediately after purchase." },
  { icon: Lock, title: "Secure Checkout", text: "Your payment information is 100% secure." },
  { icon: FileText, title: "Expertly Created", text: "All documents created by industry professionals." },
  { icon: CheckCircle2, title: "Compliant & Up to Date", text: "Documents are regularly reviewed and updated." },
  { icon: Users, title: "Trusted by Professionals", text: "Used by companies and professionals worldwide." },
];

const SIDE_INFO = [
  { icon: ShieldCheck, title: "Industry Specific & Compliant", text: "All documents are written by industry professionals and aligned with current industry standards and best practices." },
  { icon: Download, title: "Instant Download", text: "Once your payment is complete, you can instantly download your files and use them immediately." },
  { icon: ShieldCheck, title: "Money Back Guarantee", text: "We offer a 7 day money back guarantee. If you're not satisfied, we'll give you a full refund." },
];

function PdfDownloadsPage() {
  const [category, setCategory] = useState<Category>("All Documents");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("popular");
  const [industries, setIndustries] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let list = DOCS.slice();
    if (category !== "All Documents") list = list.filter((d) => d.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((d) => d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "title") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [category, query, sort]);

  return (
    <div className="bg-[#060f2a] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060f2a] via-[#0a1a3f] to-[#060f2a]" />
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
          <img src={heroRig} alt="Offshore rig at dusk" className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060f2a] via-[#060f2a]/60 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-16 lg:py-24">
          <Reveal>
            <div className="text-[#60a5fa] text-xs font-bold tracking-[0.25em] uppercase mb-4">PDF Downloads</div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight max-w-2xl">
              Professional Offshore<br />Documents & Templates
            </h1>
            <p className="mt-6 text-white/70 max-w-xl leading-relaxed">
              Download high quality, professionally created documents, templates and guides for the offshore, marine and renewable energy industries.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
              {[
                { icon: ShieldCheck, t: "Professionally Created", s: "Industry experts & compliant content" },
                { icon: Download, t: "Instant Download", s: "Get immediate access after purchase" },
                { icon: Lock, t: "Secure Payments", s: "100% secure checkout and data protection" },
              ].map((x) => (
                <div key={x.t} className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#2563eb]/15 border border-[#2563eb]/30 flex items-center justify-center shrink-0">
                    <x.icon className="w-5 h-5 text-[#60a5fa]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{x.t}</div>
                    <div className="text-xs text-white/60 leading-snug mt-0.5">{x.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MAIN */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-[240px_1fr_260px] gap-6">
          {/* SIDEBAR */}
          <aside className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-[#0a1a3f]/60 p-5">
              <div className="font-bold text-sm mb-4">Categories</div>
              <ul className="space-y-1">
                {CATEGORIES.map((c) => {
                  const active = c.name === category;
                  return (
                    <li key={c.name}>
                      <button
                        onClick={() => setCategory(c.name)}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm transition ${
                          active ? "bg-[#2563eb] text-white" : "text-white/75 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-left">{c.name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${active ? "bg-white/20" : "bg-white/10 text-white/70"}`}>{c.count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0a1a3f]/60 p-5">
              <div className="font-bold text-sm mb-4">Filter by Industry</div>
              <ul className="space-y-2.5">
                {INDUSTRIES.map((i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <input
                      id={i}
                      type="checkbox"
                      checked={industries.includes(i)}
                      onChange={(e) =>
                        setIndustries((prev) => (e.target.checked ? [...prev, i] : prev.filter((p) => p !== i)))
                      }
                      className="w-4 h-4 rounded border-white/20 bg-transparent accent-[#2563eb]"
                    />
                    <label htmlFor={i} className="text-sm text-white/75 cursor-pointer">{i}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0a1a3f]/60 p-5">
              <div className="font-bold text-sm mb-3">Sort By</div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-[#060f2a] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2563eb]"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title">Title A–Z</option>
              </select>
            </div>
          </aside>

          {/* RESULTS */}
          <div>
            <div className="relative mb-5">
              <Search className="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documents, templates and guides..."
                className="w-full bg-[#0a1a3f]/60 border border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#2563eb]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="text-sm text-white/60">
                Showing 1–{Math.min(12, filtered.length)} of {filtered.length} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("grid")}
                  className={`w-9 h-9 rounded-md flex items-center justify-center border ${
                    view === "grid" ? "bg-[#2563eb] border-[#2563eb] text-white" : "border-white/10 text-white/60 hover:text-white"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`w-9 h-9 rounded-md flex items-center justify-center border ${
                    view === "list" ? "bg-[#2563eb] border-[#2563eb] text-white" : "border-white/10 text-white/60 hover:text-white"
                  }`}
                  aria-label="List view"
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-5"
                  : "flex flex-col gap-4"
              }
            >
              {filtered.map((d) => (
                <DocCard key={d.title} doc={d} layout={view} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-center gap-2">
              <button className="w-9 h-9 rounded-md border border-white/10 text-white/60 hover:text-white flex items-center justify-center">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`w-9 h-9 rounded-md flex items-center justify-center text-sm ${
                    p === 1 ? "bg-[#2563eb] text-white" : "border border-white/10 text-white/70 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="w-9 h-9 rounded-md border border-white/10 text-white/60 hover:text-white flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT INFO */}
          <aside className="space-y-4">
            {SIDE_INFO.map((i) => (
              <div key={i.title} className="rounded-xl border border-white/10 bg-[#0a1a3f]/60 p-5">
                <div className="w-10 h-10 rounded-lg bg-[#2563eb]/15 border border-[#2563eb]/30 flex items-center justify-center mb-3">
                  <i.icon className="w-5 h-5 text-[#60a5fa]" />
                </div>
                <div className="font-bold text-sm mb-1.5">{i.title}</div>
                <p className="text-xs text-white/65 leading-relaxed">{i.text}</p>
              </div>
            ))}
            <div className="rounded-xl border border-white/10 bg-[#0a1a3f]/60 p-5">
              <div className="w-10 h-10 rounded-lg bg-[#2563eb]/15 border border-[#2563eb]/30 flex items-center justify-center mb-3">
                <Headphones className="w-5 h-5 text-[#60a5fa]" />
              </div>
              <div className="font-bold text-sm mb-1.5">Need a Custom Document?</div>
              <p className="text-xs text-white/65 leading-relaxed mb-4">
                We can create bespoke documents tailored to your requirements.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-md border border-white/15 text-xs font-bold uppercase tracking-wider hover:bg-[#2563eb] hover:border-[#2563eb] transition"
              >
                Get in Touch
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-t border-white/5 bg-[#0a1a3f]/40 py-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-lg bg-[#2563eb]/15 border border-[#2563eb]/30 flex items-center justify-center shrink-0">
                <t.icon className="w-5 h-5 text-[#60a5fa]" />
              </div>
              <div>
                <div className="font-bold text-sm">{t.title}</div>
                <div className="text-xs text-white/60 leading-snug mt-0.5">{t.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DocCard({ doc, layout }: { doc: Doc; layout: "grid" | "list" }) {
  if (layout === "list") {
    return (
      <div className="rounded-xl border border-white/10 bg-[#0a1a3f]/60 overflow-hidden flex flex-col sm:flex-row hover:border-[#2563eb]/50 transition">
        <div className="relative sm:w-56 shrink-0">
          <img src={doc.image} alt={doc.title} className="w-full h-40 sm:h-full object-cover" />
          <div className="absolute top-3 left-3 bg-[#dc2626] text-white text-[10px] font-extrabold px-2 py-1 rounded">PDF</div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="font-bold text-base mb-1">{doc.title}</div>
          <p className="text-xs text-white/65 leading-relaxed flex-1">{doc.desc}</p>
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="font-display text-xl font-extrabold">£{doc.price.toFixed(2)}</div>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#2563eb] hover:bg-[#1d4fd8] text-white text-xs font-bold uppercase tracking-wider transition">
              <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a1a3f]/60 overflow-hidden hover:border-[#2563eb]/50 transition group">
      <div className="relative">
        <img src={doc.image} alt={doc.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 bg-[#dc2626] text-white text-[10px] font-extrabold px-2 py-1 rounded">PDF</div>
      </div>
      <div className="p-5">
        <div className="font-bold text-sm leading-tight mb-1.5 min-h-[2.5rem]">{doc.title}</div>
        <p className="text-xs text-white/60 leading-relaxed line-clamp-2 mb-4">{doc.desc}</p>
        <div className="font-display text-xl font-extrabold mb-3">£{doc.price.toFixed(2)}</div>
        <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#2563eb] hover:bg-[#1d4fd8] text-white text-xs font-bold uppercase tracking-wider transition">
          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
