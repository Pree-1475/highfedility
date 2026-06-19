import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { X, MessageCircle } from "lucide-react";

import logo from "../../assets/MR. WILLOW LOGO.svg";
import { useBusinessSettings } from "../../contexts/BusinessSettingsContext";

// Two bails resting on a stump line (Cricket-inspired hamburger menu)
const BailsMenuIcon = ({ className }: { className?: string }) => (
  <svg
    width="28"
    height="24"
    viewBox="0 0 26 24"
    fill="currentColor"
    className={className}
  >
    {/* Top Row Bails */}
    <rect x="1" y="6.5" width="3" height="2" rx="0.5" />
    <rect x="4" y="5" width="7" height="5" rx="1.5" />
    <rect x="11" y="6.5" width="2" height="2" rx="0.5" />
    
    <rect x="13" y="6.5" width="2" height="2" rx="0.5" />
    <rect x="15" y="5" width="7" height="5" rx="1.5" />
    <rect x="22" y="6.5" width="3" height="2" rx="0.5" />

    {/* Bottom Row Bails */}
    <rect x="1" y="15.5" width="3" height="2" rx="0.5" />
    <rect x="4" y="14" width="7" height="5" rx="1.5" />
    <rect x="11" y="15.5" width="2" height="2" rx="0.5" />

    <rect x="13" y="15.5" width="2" height="2" rx="0.5" />
    <rect x="15" y="14" width="7" height="5" rx="1.5" />
    <rect x="22" y="15.5" width="3" height="2" rx="0.5" />
  </svg>
);

export function Navigation() {
  const settings = useBusinessSettings();
  const whatsapp = settings?.whatsapp_url || "https://wa.me/60123456789";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const links = [
    { name: "Collections", path: "/collections" },
    { name: "Services", path: "/services" },
    { name: "Custom Bats", path: "/custom-bats" },
    { name: "Training", path: "/training" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-[0_2px_24px_rgba(0,0,0,0.07)] border-b border-black/[0.07]"
          : "bg-transparent border-transparent shadow-none"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0 h-full py-1">
          <img 
            src={logo} 
            alt="MR.WILLOW" 
            className="h-full w-auto object-contain scale-[1.2] origin-left transition-all duration-300"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7 ml-auto mr-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-[#22c55e]"
                  : "text-[#11311e] hover:text-[#22c55e]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="hidden lg:flex items-center gap-2 bg-[#22c55e] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-3 hover:bg-[#16a34a] transition-colors duration-200 shrink-0"
        >
          <MessageCircle size={13} />
          WhatsApp Us
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden ml-auto text-[#11311e] transition-colors duration-300 flex items-center gap-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} strokeWidth={2.5} /> : <BailsMenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-black/[0.07] px-6 py-8 flex flex-col gap-5">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[12px] font-semibold tracking-[0.14em] uppercase ${
                location.pathname === link.path
                  ? "text-[#22c55e]"
                  : "text-[#11311e]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#22c55e] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-3 w-fit mt-2"
          >
            <MessageCircle size={13} />
            WhatsApp Us
          </a>
        </div>
      )}
    </nav>
  );
}

