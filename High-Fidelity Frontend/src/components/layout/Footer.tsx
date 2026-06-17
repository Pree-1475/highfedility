import { MessageCircle, Instagram, Youtube, MapPin } from "lucide-react";
import { Link } from "react-router";

import logo from "../../assets/MR. WILLOW LOGO.svg";
import { useBusinessSettings } from "../../contexts/BusinessSettingsContext";

// Note: TikTok icon is not in lucide-react by default, so we can just use a simple text link or custom SVG if needed. 
// For now, we'll just use text for TikTok or a generic play icon if we want.

export function Footer() {
  const settings = useBusinessSettings();

  const address = settings?.address || "No. 12, Jalan Perang\nTaman Perang, 80150\nJohor Bahru, Johor";
  const whatsapp = settings?.whatsapp_url || "https://wa.me/60123456789";
  const copyright = settings?.store_name
    ? `© 2024 ${settings.store_name}. All rights reserved.`
    : "© 2024 MR.WILLOW Cricket Store. All rights reserved.";

  return (
    <footer className="bg-[#1c2117] text-[#f5f3ec] pt-20 pb-10 px-10 border-t border-[#a37c56]/20">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-16 pb-16 border-b border-[#f5f3ec]/10">

          {/* Brand & Core Info */}
          <div className="flex flex-col gap-8 max-w-sm">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="MR.WILLOW" className="h-[52px] w-auto object-contain brightness-0 invert opacity-90" />
            </Link>

            <div className="flex flex-col gap-4">
              <a
                href={settings?.google_maps_link || "https://maps.google.com"}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-[13px] text-[#f5f3ec]/60 hover:text-[#f5f3ec] transition-colors"
              >
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#a37c56]" />
                <address className="not-italic leading-relaxed whitespace-pre-line">
                  {address}
                </address>
              </a>
            </div>

            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#a37c56] hover:bg-[#8a654b] text-[#f5f3ec] text-[10px] font-bold tracking-[0.15em] uppercase px-5 py-3.5 transition-colors w-fit"
            >
              <MessageCircle size={14} />
              WhatsApp Workshop
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#f5f3ec]/40 font-medium tracking-wide">
            {copyright}
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[11px] text-[#f5f3ec]/40 hover:text-[#f5f3ec] transition-colors tracking-wide">Privacy</a>
            <a href="#" className="text-[11px] text-[#f5f3ec]/40 hover:text-[#f5f3ec] transition-colors tracking-wide">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
