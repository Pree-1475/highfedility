import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";

export default function StoreExperience() {
  return (
    <section className="bg-foreground py-24 px-10 text-center text-background">
      <div className="max-w-[800px] mx-auto">
        <SectionLabel n="03" label="The Experience" />
        <h2 style={DF} className="text-[48px] font-black leading-[0.88] tracking-tight uppercase mb-6">
          More Than <br />A Store.
        </h2>
        <p className="text-[15px] leading-relaxed text-background/60 mb-10">
          When you walk into MR.WILLOW, you're not just a customer; you're part of the local cricket fraternity. We've built our space to be welcoming, encouraging conversations about the weekend's matches, the latest gear tech, and the nuances of the game.
        </p>
        <div className="relative aspect-[21/9] overflow-hidden bg-card/10 mt-12">
          <img src={PH.store} alt="Store overview" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}
