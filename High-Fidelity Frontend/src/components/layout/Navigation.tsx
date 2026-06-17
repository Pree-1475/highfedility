import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { X, MessageCircle } from "lucide-react";

import logo from "../../assets/MR. WILLOW LOGO.svg";
import { useBusinessSettings } from "../../contexts/BusinessSettingsContext";

// Two bails resting on a stump line (Cricket-inspired hamburger menu)
const BailsMenuIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" y1="10" x2="11" y2="10" />
    <circle cx="11" cy="10" r="1" fill="currentColor" stroke="none" />
    <line x1="13" y1="10" x2="20" y2="10" />
    <circle cx="13" cy="10" r="1" fill="currentColor" stroke="none" />
    <line x1="4" y1="16" x2="20" y2="16" />
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
      className={`sticky top-0 z-50 bg-white transition-all duration-200 ${
        scrolled
          ? "shadow-[0_2px_24px_rgba(0,0,0,0.07)]"
          : "border-b border-black/[0.07]"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0 h-full py-1">
          <img src={logo} alt="MR.WILLOW" className="h-full w-auto object-contain scale-[1.2] origin-left" />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7 ml-auto mr-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors duration-150 ${
                location.pathname === link.path
                  ? "text-[#a37c56]"
                  : "text-[#1c2117] hover:text-[#a37c56]"
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
          className="hidden lg:flex items-center gap-2 bg-[#a37c56] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-3 hover:bg-[#8a654b] transition-colors duration-200 shrink-0"
        >
          <MessageCircle size={13} />
          WhatsApp Us
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden ml-auto text-[#1c2117]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <BailsMenuIcon />}
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
                  ? "text-[#a37c56]"
                  : "text-[#1c2117]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#a37c56] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-3 w-fit mt-2"
          >
            <MessageCircle size={13} />
            WhatsApp Us
          </a>
        </div>
      )}
    </nav>
  );
}

