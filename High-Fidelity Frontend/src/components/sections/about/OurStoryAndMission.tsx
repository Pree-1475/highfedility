import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";

export default function OurStoryAndMission() {
  return (
    <section className="bg-card py-24 px-10">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
        <div>
          <SectionLabel n="01" label="Our Roots" />
          <h2 style={DF} className="text-[48px] font-black leading-[0.88] tracking-tight text-foreground uppercase mb-6">
            Why We <br />Started.
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground mb-6">
            MR.WILLOW was established in 2018 with a simple goal: to provide the local cricket community with access to world-class equipment and professional services that were previously hard to find in Johor Bahru.
          </p>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            We grew tired of players having to compromise on their gear or travel far for basic bat maintenance. We wanted to build a hub where passion meets expertise.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <img src={PH.storeB} alt="MR.WILLOW Store Interior" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}
