import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";

export default function WorkshopPhilosophy() {
  return (
    <section className="bg-card py-24 px-10 border-t border-[rgba(28,33,23,0.06)]">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
        <div className="relative aspect-square overflow-hidden bg-secondary order-2 lg:order-1">
          <img src={PH.act1} alt="Crafting a bat" className="w-full h-full object-cover" />
        </div>
        <div className="order-1 lg:order-2">
          <SectionLabel n="02" label="Our Philosophy" />
          <h2 style={DF} className="text-[48px] font-black leading-[0.88] tracking-tight text-foreground uppercase mb-6">
            Respect <br />The Craft.
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground mb-6">
            A cricket bat is more than just a piece of wood. It's an instrument that requires care, respect, and understanding.
          </p>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Our workshop philosophy revolves around meticulous attention to detail. Whether we are replacing a grip, oiling a dry blade, or using our state-of-the-art knocking machine, we treat every piece of equipment as if it were our own.
          </p>
        </div>
      </div>
    </section>
  );
}
