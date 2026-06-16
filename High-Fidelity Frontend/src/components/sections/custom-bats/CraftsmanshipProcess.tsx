import { DF } from "../../../lib/constants";

export default function CraftsmanshipProcess() {
  const steps = [
    { n: "01", title: "Consultation", desc: "We discuss your playing style, typical pitch conditions, and preferences." },
    { n: "02", title: "Selection", desc: "We handpick the perfect cleft of willow matching your criteria." },
    { n: "03", title: "Shaping", desc: "The bat is carved, pressed, and balanced by expert bat makers." },
    { n: "04", title: "Finishing", desc: "Sanded, oiled, gripped, and machine-knocked—ready for the crease." },
  ];

  return (
    <section className="bg-[#f5f3ec] py-24 px-10">
      <div className="max-w-[1440px] mx-auto text-center mb-16">
        <h2 style={DF} className="text-[48px] font-black tracking-tight text-[#1c2117] uppercase">The Process</h2>
      </div>
      <div className="max-w-[1440px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s) => (
          <div key={s.n} className="bg-white p-8">
            <span style={DF} className="text-[40px] font-black text-[#c8c4b8] leading-none block mb-4">{s.n}</span>
            <h3 style={DF} className="text-[24px] font-bold text-[#1c2117] uppercase mb-3 leading-tight">{s.title}</h3>
            <p className="text-[13px] leading-relaxed text-[#6b7462]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
