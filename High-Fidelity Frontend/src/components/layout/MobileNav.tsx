import { Link, useLocation } from "react-router";
import { Home, Package, Hammer, MapPin } from "lucide-react";

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} strokeWidth={1.5} /> },
    { name: "Showroom", path: "/collections", icon: <Package size={20} strokeWidth={1.5} /> },
    { name: "Services", path: "/services", icon: <Hammer size={20} strokeWidth={1.5} /> },
    { name: "Visit Us", path: "/contact", icon: <MapPin size={20} strokeWidth={1.5} /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#f5f3ec] rounded-t-[24px] shadow-[0_-8px_30px_rgba(26,59,40,0.06)] z-50 pb-[env(safe-area-inset-bottom)] border-t border-[rgba(26,59,40,0.04)]">
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
                  ? "text-[#1a3b28]"
                  : "text-[#1c2117]/40 hover:text-[#1c2117]/70"
              }`}
            >
              {/* Cricket seam subtle active indicator */}
              {isActive && (
                <div className="absolute top-0 w-8 h-[3px] rounded-b-md bg-[#1a3b28] flex items-center justify-center overflow-hidden">
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
