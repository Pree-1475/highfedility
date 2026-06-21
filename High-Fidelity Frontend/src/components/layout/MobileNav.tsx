import { Link, useLocation } from "react-router";
import { Home, Package, Hammer, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export function MobileNav() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isHomePage = location.pathname === "/";
  const hidden = isHomePage && !scrolled;

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} strokeWidth={1.5} /> },
    { name: "Collections", path: "/collections", icon: <Package size={20} strokeWidth={1.5} /> },
    { name: "Services", path: "/services", icon: <Hammer size={20} strokeWidth={1.5} /> },
    { name: "Visit Us", path: "/contact", icon: <MapPin size={20} strokeWidth={1.5} /> },
  ];

  return (
    <nav className={`lg:hidden fixed bottom-0 left-0 right-0 bg-secondary rounded-t-[24px] shadow-[0_-8px_30px_rgba(163,124,86,0.06)] z-50 pb-[env(safe-area-inset-bottom)] border-t border-[rgba(163,124,86,0.04)] transition-transform duration-500 ${hidden ? "translate-y-full" : "translate-y-0"}`}>
      <div className="flex justify-around items-center h-[76px] px-2 relative">
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full relative transition-all duration-300 ${
                isActive
                  ? "text-primary"
                  : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              {/* Cricket seam subtle active indicator */}
              {isActive && (
                <div className="absolute top-0 w-8 h-[3px] rounded-b-md bg-primary flex items-center justify-center overflow-hidden">
                  <div className="w-full h-[1px] border-b border-dashed border-white/60"></div>
                </div>
              )}

              <div
                className={`mb-1.5 transition-transform duration-300 ${
                  isActive ? "-translate-y-0.5" : ""
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[9px] tracking-[0.05em] uppercase transition-all duration-300 ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
