import { Link } from "@tanstack/react-router";
import { ArrowUp, Facebook, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#0c1f4a] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-8">
        <div className="grid lg:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                <svg viewBox="0 0 32 32" className="w-7 h-7">
                  <path d="M8 26 V10 L12 8 V26 Z M20 26 V8 L24 10 V26 Z M14 26 V12 H18 V26 Z" fill="#0c1f4a" />
                  <path d="M6 26 H26" stroke="#0c1f4a" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-display text-xl font-extrabold">
                  OFFSHORE<span className="text-[#60a5fa]">CV</span>
                </div>
                <div className="text-[8px] font-bold tracking-[0.18em] text-[#60a5fa]">
                  YOUR CAREER. OUR PRIORITY.
                </div>
                <div className="text-[8px] font-semibold tracking-wider text-white/70 uppercase">
                  Professional CV Writing Specialists
                </div>
                <div className="text-[7.5px] font-bold tracking-wider text-[#60a5fa] uppercase">
                  Offshore | Maritime | Renewable Energy
                </div>
              </div>
            </div>
            <p className="text-sm text-white/70 max-w-xs leading-relaxed">
              Helping professionals worldwide secure offshore careers and achieve their goals.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">Quick Links</h4>
              <ul className="space-y-3 text-sm text-white/75">
                <li><Link to="/" className="hover:text-[#60a5fa]">Home</Link></li>
                <li><Link to="/services" className="hover:text-[#60a5fa]">Services</Link></li>
                <li><Link to="/guide" className="hover:text-[#60a5fa]">Packages & Pricing</Link></li>
                <li><Link to="/shop" className="hover:text-[#60a5fa]">PDF Downloads</Link></li>
                <li><Link to="/about" className="hover:text-[#60a5fa]">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-[#60a5fa]">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">Our Services</h4>
              <ul className="space-y-3 text-sm text-white/75">
                <li><Link to="/services" className="hover:text-[#60a5fa]">Offshore Oil & Gas CVs</Link></li>
                <li><Link to="/services" className="hover:text-[#60a5fa]">Offshore Wind CVs</Link></li>
                <li><Link to="/services" className="hover:text-[#60a5fa]">Maritime & Marine CVs</Link></li>
                <li><Link to="/services" className="hover:text-[#60a5fa]">Rope Access & NDT CVs</Link></li>
                <li><Link to="/services" className="hover:text-[#60a5fa]">Offshore Construction CVs</Link></li>
                <li><Link to="/services" className="hover:text-[#60a5fa]">ATS CV Checker</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">Follow Us</h4>
              <div className="space-y-3">
                <a href="https://www.facebook.com/offshorecv/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/75 hover:text-[#60a5fa] group">
                  <span className="w-8 h-8 rounded bg-[#2563eb] flex items-center justify-center group-hover:bg-[#60a5fa] transition-colors">
                    <Facebook className="w-4 h-4 text-white" />
                  </span>
                  Facebook
                </a>
                <a href="https://www.linkedin.com/in/offshorecv/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/75 hover:text-[#60a5fa] group">
                  <span className="w-8 h-8 rounded bg-[#2563eb] flex items-center justify-center group-hover:bg-[#60a5fa] transition-colors">
                    <Linkedin className="w-4 h-4 text-white" />
                  </span>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <div>© {new Date().getFullYear()} OffshoreCV. All Rights Reserved.</div>
          <div className="flex items-center gap-6">
            <Link to="/delivery" className="hover:text-[#60a5fa]">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link to="/delivery" className="hover:text-[#60a5fa]">Terms & Conditions</Link>
          </div>
          <div className="flex items-center gap-3">
            <span>Follow us on:</span>
            <a href="https://www.facebook.com/offshorecv/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-7 h-7 rounded bg-[#2563eb] flex items-center justify-center hover:bg-[#60a5fa]">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.linkedin.com/in/offshorecv/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-7 h-7 rounded bg-[#2563eb] flex items-center justify-center hover:bg-[#60a5fa]">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-8 right-8 z-50 w-11 h-11 rounded-md bg-[#2563eb] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-[#60a5fa] ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
      </button>
    </footer>
  );
}
