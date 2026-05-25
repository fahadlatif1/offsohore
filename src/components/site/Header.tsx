import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/services" as const, label: "Services" },
  { to: "/guide" as const, label: "Packages & Pricing" },
  { to: "/about" as const, label: "About Us" },
  { to: "/contact" as const, label: "Contact" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 group shrink-0">
      <div className="w-12 h-12 rounded-full bg-white border-2 border-primary flex items-center justify-center shrink-0">
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
          <path d="M8 26 V10 L12 8 V26 Z M20 26 V8 L24 10 V26 Z M14 26 V12 H18 V26 Z" fill="#1e3a8a" />
          <path d="M6 26 H26" stroke="#1e3a8a" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="font-display text-xl font-extrabold tracking-tight text-primary">
          OFFSHORE<span className="text-[#2563eb]">CV</span>
        </div>
        <div className="text-[8px] font-bold tracking-[0.18em] text-[#2563eb] border-y border-[#2563eb]/40 py-[1px] my-[1px]">
          YOUR CAREER. OUR PRIORITY.
        </div>
        <div className="text-[8px] font-semibold tracking-wider text-primary/70 uppercase">
          Professional CV Writing Specialists
        </div>
        <div className="text-[7.5px] font-bold tracking-wider text-[#2563eb] uppercase">
          Offshore | Maritime | Renewable Energy
        </div>
      </div>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-md" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <nav className="flex items-center justify-between h-20 gap-6">
          <Logo />

          <div className="hidden lg:flex items-center gap-1 text-xs font-bold">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="px-3 py-2 text-primary/80 hover:text-[#2563eb] transition-colors uppercase tracking-wider relative"
                activeProps={{ className: "text-[#2563eb] [&>span]:scale-x-100" }}
              >
                {l.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-[#2563eb] scale-x-0 transition-transform origin-left" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#1e3a8a] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2563eb] transition-all shadow-md"
            >
              Order Your CV <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-secondary transition-colors text-primary"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white h-full overflow-y-auto border-t border-border">
          <div className="flex flex-col p-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-bold text-sm py-3 px-4 rounded-md hover:bg-secondary text-primary uppercase tracking-wider"
                activeProps={{ className: "bg-secondary text-[#2563eb]" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/services"
              onClick={() => setOpen(false)}
              className="mt-4 w-full text-center py-3.5 bg-[#1e3a8a] text-white text-xs font-bold tracking-wider uppercase rounded-md"
            >
              Order Your CV
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
