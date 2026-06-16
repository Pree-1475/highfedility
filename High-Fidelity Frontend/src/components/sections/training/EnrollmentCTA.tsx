import { MessageCircle } from "lucide-react";
import { DF } from "../../../lib/constants";
import { useBusinessSettings } from "../../../contexts/BusinessSettingsContext";

export default function EnrollmentCTA() {
  const settings = useBusinessSettings();
  const link = settings?.whatsapp_url || "https://wa.me/60123456789";

  return (
    <section id="enroll" className="bg-[#1c2117] text-white py-24 px-10 text-center">
      <div className="max-w-[600px] mx-auto">
        <h2 style={DF} className="text-[48px] font-black leading-[0.88] tracking-tight uppercase mb-6">
          Take Your Game <br /><span className="text-[#7ec89a]">To The Next Level.</span>
        </h2>
        <p className="text-[15px] leading-relaxed text-white/60 mb-10">
          Ready to join? Message us on WhatsApp to inquire about schedules, pricing, and availability for our coaching programs.
        </p>
        <a
          href={link}
          className="inline-flex items-center gap-2.5 bg-[#1a3b28] text-white text-[11px] font-bold tracking-[0.13em] uppercase px-8 py-4 hover:bg-[#2d5c3f] transition-colors duration-200"
        >
          <MessageCircle size={14} /> WhatsApp Us Now
        </a>
      </div>
    </section>
  );
}
