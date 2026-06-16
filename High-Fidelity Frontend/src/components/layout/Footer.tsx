import { MessageCircle } from "lucide-react";
import { Link } from "react-router";

import logo from "../../assets/MR. WILLOW LOGO.svg";
import { useBusinessSettings } from "../../contexts/BusinessSettingsContext";

export function Footer() {
  const settings = useBusinessSettings();

  const collections = [
    "Cricket Bats",
    "Batting Gloves",
    "Protection Gear",
    "Cricket Shoes",
    "Accessories",
    "Junior Cricket",
  ];
  const services = [
    "Bat Knocking",
    "Bat Repair",
    "Grip Replacement",
    "Custom Bats",
    "Training Sessions",
    "Bulk Orders",
  ];

  const text = settings
    ? `${settings.store_name} - ${settings.announcement_text}`
    : "Johor Bahru's premier cricket destination. Equipment, training, and expertise for every player.";
  const address = settings?.address || "No. 12, Jalan Perang\nTaman Perang, 80150\nJohor Bahru, Johor";
  const phone = settings?.phone || "+60 7-334 5678";
  const email = settings?.email || "hello@mrwillow.my";
  const whatsapp = settings?.whatsapp_url || "https://wa.me/60123456789";
  const copyright = settings?.store_name
    ? `© 2024 ${settings.store_name}. All rights reserved.`
    : "© 2024 MR.WILLOW Cricket Store. All rights reserved.";

  return (
    <footer className="bg-[#1c2117] text-white pt-16 pb-8 px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center mb-5">
              <img src={logo} alt="MR.WILLOW" className="h-[68px] w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-[13px] text-white/48 leading-relaxed max-w-[200px]">
              {text}
            </p>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 bg-white/10 hover:bg-white/18 text-white text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-2.5 transition-colors"
            >
              <MessageCircle size={12} />
              WhatsApp
            </a>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/35 mb-5">
              Collections
            </h4>
            <ul className="flex flex-col gap-3">
              {collections.map((item) => (
                <li key={item}>
                  <Link
                    to="/collections"
                    className="text-[13px] text-white/55 hover:text-white transition-colors duration-150"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/35 mb-5">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Custom Bats" ? "/custom-bats" : item === "Training Sessions" ? "/training" : "/services"}
                    className="text-[13px] text-white/55 hover:text-white transition-colors duration-150"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/35 mb-5">
              Visit
            </h4>
            <address style={{ whiteSpace: 'pre-line' }} className="not-italic text-[13px] text-white/55 leading-relaxed mb-4">
              {address}
            </address>
            <p className="text-[13px] text-white/55">{phone}</p>
            <p className="text-[13px] text-white/55 mt-1">{email}</p>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/28">
            {copyright}
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[11px] text-white/28 hover:text-white/55 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

