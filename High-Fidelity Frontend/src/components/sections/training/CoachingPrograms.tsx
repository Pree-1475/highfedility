import { DF } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";

export default function CoachingPrograms() {
  const programs = [
    { title: "Junior Academy", age: "Under 12s", desc: "Focusing on fundamental skills, hand-eye coordination, and fostering a love for the game in a safe, fun environment." },
    { title: "Youth Development", age: "13 - 17 Years", desc: "Advanced technical coaching, tactical awareness, and physical conditioning for competitive youth cricket." },
    { title: "Senior Masterclass", age: "18+ / Adults", desc: "Specialised sessions targeting specific weaknesses, match scenarios, and fine-tuning techniques." },
    { title: "1-on-1 Coaching", age: "All Ages", desc: "Personalised attention with tailored drills, video analysis, and intensive feedback." },
  ];

  return (
    <section className="bg-[#f5f3ec] py-24 px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <SectionLabel n="02" label="Our Programs" />
          <h2 style={DF} className="text-[48px] font-black leading-[0.88] tracking-tight text-[#1c2117] uppercase">
            Structured For <br />Success.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-[rgba(28,33,23,0.1)]">
          {programs.map((p, i) => (
            <div key={i} className="bg-white p-10 hover:bg-[#f5f3ec] transition-colors">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7462] mb-3">{p.age}</p>
              <h3 style={DF} className="text-[28px] font-bold text-[#1c2117] uppercase mb-4 leading-tight">{p.title}</h3>
              <p className="text-[13px] leading-relaxed text-[#6b7462] max-w-[340px]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
