import { MessageCircle, MapPin, Clock, Phone } from "lucide-react";
import { DF } from "../../../lib/constants";
import { useBusinessSettings } from "../../../contexts/BusinessSettingsContext";

export default function ContactDetails() {
  const settings = useBusinessSettings();

  const defaultHours: Array<{ day: string; time: string }> = [
    { day: "Monday – Friday", time: "10:00 AM – 9:00 PM" },
    { day: "Saturday", time: "9:00 AM – 9:00 PM" },
    { day: "Sunday", time: "11:00 AM – 6:00 PM" },
  ];

  const hours = settings?.operating_hours && settings.operating_hours.length > 0
    ? settings.operating_hours
    : defaultHours;

  const address = settings?.address || "No. 12, Jalan Perang,\nTaman Perang,\n80150 Johor Bahru, Johor.";
  const phone = settings?.phone || "+60 7-334 5678";
  const email = settings?.email || "hello@mrwillow.my";
  const whatsapp = settings?.whatsapp_url || "https://wa.me/60123456789";

  return (
    <div>
      <h1
        style={DF}
        className="text-[64px] font-black leading-[0.88] tracking-tight text-[#11311e] uppercase mb-6"
      >
        Reach
        <br />
        Out To
        <br />
        <span className="text-[#11311e]">Us.</span>
      </h1>

      <p className="text-[14px] md:text-[15px] text-[#6b7462] leading-relaxed max-w-sm mb-10">
        Visit our workshop in Johor Bahru for an immersive experience, or send us an enquiry directly.
      </p>

      {/* Address */}
      <div className="flex gap-4 mb-8">
        <MapPin size={18} className="text-[#11311e] shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7462] mb-1.5">
            Address
          </p>
          <p style={{ whiteSpace: 'pre-line' }} className="text-[15px] text-[#11311e] leading-relaxed font-medium">
            {address}
          </p>
        </div>
      </div>

      {/* Hours */}
      <div className="flex gap-4 mb-8">
        <Clock size={18} className="text-[#11311e] shrink-0 mt-0.5" />
        <div className="flex-1 max-w-[320px]">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7462] mb-3">
            Operating Hours
          </p>
          <div className="flex flex-col gap-2.5">
            {hours.map(({ day, time }) => (
              <div
                key={day}
                className="flex justify-between gap-8 border-b border-[rgba(28,33,23,0.08)] pb-2.5"
              >
                <span className="text-[13px] text-[#11311e]">{day}</span>
                <span className="text-[13px] font-semibold text-[#11311e]">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phone & Email */}
      <div className="flex gap-4 mb-12">
        <Phone size={18} className="text-[#11311e] shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7462] mb-1.5">
            Contact Details
          </p>
          <p className="text-[15px] text-[#11311e] font-medium">{phone}</p>
          <p className="text-[15px] text-[#11311e] font-medium mt-1">{email}</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3">
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#11311e] text-white text-[11px] font-bold tracking-[0.13em] uppercase px-7 py-4 hover:bg-[#2a3023] transition-colors duration-200"
        >
          <MessageCircle size={14} />
          WhatsApp Us
        </a>
      </div>
    </div>
  );
}
