import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";

export default function FacilitiesAndBenefits() {
  return (
    <section className="bg-card pt-12 pb-24 px-6 lg:px-10 border-t border-[rgba(28,33,23,0.06)]">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
        <div className="relative overflow-hidden bg-secondary aspect-square">
          <img src={PH.act2} alt="Coaching Session" className="w-full h-full object-cover" />
        </div>
        <div>
          <SectionLabel n="03" label="Why Train With Us" />
          <h2 style={DF} className="text-[48px] font-black leading-[0.88] tracking-tight text-foreground uppercase mb-8">
            Expert Coaching, <br />Premium Facilities.
          </h2>
          <ul className="flex flex-col gap-6">
            {[
              { t: "Experienced Coaches", d: "Learn from players and coaches with competitive league experience." },
              { t: "Video Analysis", d: "We use modern recording tools to break down your batting stance and bowling action." },
              { t: "Small Group Sizes", d: "Ensuring maximum reps and personal feedback during every session." },
              { t: "Access to Gear", d: "Try out premium equipment from our showroom during your net sessions." },
            ].map((item, i) => (
              <li key={i}>
                <h4 className="text-[14px] font-bold tracking-[0.1em] uppercase text-foreground mb-1">{item.t}</h4>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{item.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
