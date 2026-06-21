import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { WorkshopData } from "../../../types";

interface KnockingMachineUSPProps {
  data?: WorkshopData;
}

export default function KnockingMachineUSP({ data }: KnockingMachineUSPProps) {
  const badge = data?.usp_badge || "Exclusive";
  const badgeText = data?.usp_badge_text || "The Only Knocking Machine in JB";
  const imageSrc = data?.usp_image || PH.storeB;

  const titleText = data?.usp_title || "Ready for\nMatch Play.";
  const renderedTitle = titleText.split("\n").map((line, idx) => {
    const parts = line.split(/(Match Play\.)/g);
    return (
      <span key={idx}>
        {parts.map((part, pIdx) => {
          if (part === "Match Play.") {
            return <span key={pIdx} className="text-foreground">Match Play.</span>;
          }
          return part;
        })}
        {idx < titleText.split("\n").length - 1 && <br />}
      </span>
    );
  });

  const desc1 = data?.usp_description_1 || "Properly knocking in a cricket bat is crucial for its performance and longevity. At MR.WILLOW, we operate Johor Bahru's only dedicated bat knocking machine.";
  const desc2 = data?.usp_description_2 || "Our automated process ensures consistent, even compression across the blade and edges, mimicking hours of manual knocking in a fraction of the time.";

  const bullets = data?.usp_bullets || [
    "Prevents early cracking and damage",
    "Expands the sweet spot",
    "Improves ping and rebound",
    "Saves you 6-8 hours of manual work"
  ];

  return (
    <section className="bg-card py-24 px-10">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img src={imageSrc} alt="Bat Knocking Machine" className="w-full h-full object-cover" />
          <div className="absolute bottom-6 left-6 right-6 bg-card p-6 shadow-lg">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-1">{badge}</p>
            <p style={DF} className="text-[24px] font-black uppercase text-foreground leading-none">{badgeText}</p>
          </div>
        </div>
        <div>
          <SectionLabel n="02" label="Our Speciality" />
          <h2 style={DF} className="text-[48px] font-black leading-[0.88] tracking-tight text-foreground uppercase mb-6">
            {renderedTitle}
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground mb-6">
            {desc1}
          </p>
          <p className="text-[15px] leading-relaxed text-muted-foreground mb-8">
            {desc2}
          </p>
          <ul className="flex flex-col gap-4">
            {bullets.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-foreground mt-1">✦</span>
                <span className="text-[14px] font-semibold text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

