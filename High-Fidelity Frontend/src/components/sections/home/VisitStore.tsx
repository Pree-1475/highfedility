import { ArrowRight, MessageCircle, MapPin, Clock, Phone as PhoneIcon } from "lucide-react";
import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { HomePageData } from "../../../types";
import { useBusinessSettings } from "../../../contexts/BusinessSettingsContext";

interface VisitStoreProps {
  data?: HomePageData;
}

export default function VisitStore({ data }: VisitStoreProps) {
  const settings = useBusinessSettings();

  const DEFAULT_HOURS: Array<{ day: string; time: string }> = [
    { day: "Monday – Friday", time: "10:00 AM – 9:00 PM" },
    { day: "Saturday", time: "9:00 AM – 9:00 PM" },
    { day: "Sunday", time: "11:00 AM – 6:00 PM" },
  ];

  const address = settings?.address || "No. 12, Jalan Perang,\nTaman Perang,\n80150 Johor Bahru, Johor.";
  const phone = settings?.phone || "+60 7-334 5678";
  const hours = settings?.operating_hours && settings.operating_hours.length > 0
    ? settings.operating_hours
    : DEFAULT_HOURS;

  const titleText = data?.visit_title || "Come See Us In Johor Bahru.";
  const renderedTitle = titleText.split("\n").map((line: string, idx: number) => {
    const isHighlight = line.trim().toUpperCase() === "JOHOR BAHRU." || line.trim().toUpperCase() === "JOHOR BAHRU";
    if (isHighlight) {
      return <span key={idx} className="text-[#1c2117]">{line}<br /></span>;
    }
    return <span key={idx}>{line}<br /></span>;
  });

  const whatsappLink = settings?.whatsapp_url || "https://wa.me/60123456789";
  const directionsLink = settings?.google_maps_link || "https://maps.google.com";
  const imageSrc = data?.visit_image || PH.store;

  return (
    <section id="visit" className="bg-[#f5f3ec] py-20 px-10">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel n="07" label="Visit Us" />
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <div>
            <h2
              style={DF}
              className="text-[52px] font-black leading-[0.88] tracking-tight text-[#1c2117] uppercase mb-10"
            >
              {renderedTitle}
            </h2>

            <div className="flex gap-4 mb-8">
              <MapPin size={18} className="text-[#1c2117] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7462] mb-1.5">
                  Address
                </p>
                <p style={{ whiteSpace: 'pre-line' }} className="text-[15px] text-[#1c2117] leading-relaxed font-medium">
                  {address}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <Clock size={18} className="text-[#1c2117] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7462] mb-3">
                  Operating Hours
                </p>
                <div className="flex flex-col gap-2.5">
                  {hours.map(({ day, time }) => (
                    <div
                      key={day}
                      className="flex justify-between gap-8 border-b border-[rgba(28,33,23,0.08)] pb-2.5"
                    >
                      <span className="text-[13px] text-[#1c2117]">{day}</span>
                      <span className="text-[13px] font-semibold text-[#1c2117]">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-10">
              <PhoneIcon size={18} className="text-[#1c2117] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7462] mb-1.5">
                  Phone
                </p>
                <p className="text-[15px] text-[#1c2117] font-medium">{phone}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#1c2117] text-white text-[11px] font-bold tracking-[0.13em] uppercase px-7 py-4 hover:bg-[#2a3023] transition-colors duration-200"
              >
                <MessageCircle size={14} />
                WhatsApp Us
              </a>
              <a
                href={directionsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 border border-[rgba(28,33,23,0.2)] text-[#1c2117] text-[11px] font-bold tracking-[0.13em] uppercase px-7 py-4 hover:border-[#1c2117] transition-colors duration-200"
              >
                <MapPin size={14} />
                Get Directions
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden bg-[#ddd9cf] aspect-[4/3]">
              <img
                src={imageSrc}
                alt="MR.WILLOW Cricket Store interior"
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="relative h-44 bg-[#ddd9cf] flex items-center justify-center overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(28,33,23,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(28,33,23,0.06) 1px,transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            >
              <div className="absolute w-3 h-3 bg-[#1c2117] rounded-full shadow-[0_0_0_6px_rgba(28,33,23,0.2)]" />
              <div className="relative text-center mt-10">
                <p
                  style={DF}
                  className="text-[18px] font-bold text-[#1c2117] uppercase tracking-wide"
                >
                  MR.WILLOW Cricket Store
                </p>
                <p className="text-[12px] text-[#6b7462] mt-0.5">Johor Bahru, Malaysia</p>
                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-bold tracking-[0.16em] uppercase text-[#1c2117] border-b border-[#1c2117] pb-px"
                >
                  Open in Google Maps <ArrowRight size={11} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

