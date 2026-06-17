import { DF } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { WorkshopData } from "../../../types";

interface ServicesGridProps {
  data?: WorkshopData;
}

export default function ServicesGrid({ data }: ServicesGridProps) {
  const services = data?.services || [
    { title: "Professional Bat Knocking", desc: "Machine-assisted knocking for perfect compression and readiness." },
    { title: "Bat Repair & Restoration", desc: "Fixing toe damage, edge cracks, and handle replacements." },
    { title: "Grip Replacement", desc: "Premium octopus and spiral grips applied professionally." },
    { title: "Bat Oiling & Sanding", desc: "Raw linseed oil application and fine sanding to retain moisture." },
    { title: "Weight Reduction", desc: "Careful shaving of the profile to reduce pickup weight." },
    { title: "Toe Guard Application", desc: "Protective toe guard fitting to prevent water damage and splitting." },
  ];


  return (
    <section className="bg-white py-24 px-10 border-t border-[rgba(28,33,23,0.06)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <SectionLabel n="03" label="Workshop Services" />
          <h2 style={DF} className="text-[48px] font-black leading-[0.88] tracking-tight text-[#1c2117] uppercase">
            Repair, Restore & <br />Extend Lifespan
          </h2>
        </div>
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-px overflow-x-auto snap-x snap-mandatory hide-scroll pb-6 sm:pb-0 sm:bg-[rgba(28,33,23,0.1)] -mx-10 px-10 sm:mx-0 sm:px-0">
          {services.map((s, i) => (
            <div key={i} className="shrink-0 w-[85vw] sm:w-auto snap-center bg-white p-10 hover:bg-[#f5f3ec] transition-colors rounded-xl sm:rounded-none border border-[rgba(28,33,23,0.06)] sm:border-0">
              <span style={DF} className="text-[32px] font-black text-[#c8c4b8] leading-none block mb-4">0{i + 1}</span>
              <h3 style={DF} className="text-[24px] font-bold text-[#1c2117] uppercase mb-3 leading-tight">{s.title}</h3>
              <p className="text-[13px] leading-relaxed text-[#6b7462]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
