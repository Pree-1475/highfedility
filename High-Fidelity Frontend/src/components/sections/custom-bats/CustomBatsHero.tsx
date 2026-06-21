import { ArrowRight } from "lucide-react";
import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import imgCustomBat from "../../../assets/images/CUSTOM BATS - CRAFTED TO YOUR GAME.jpg";

export default function CustomBatsHero() {
  return (
    <section className="bg-foreground text-background pt-20 pb-16 px-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.018) 40px,rgba(255,255,255,0.018) 41px)" }} />
      <div className="max-w-[1440px] mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionLabel n="01" label="Bespoke Service" />
          <h1 style={DF} className="text-[64px] md:text-[80px] font-black leading-[0.88] tracking-tight uppercase mb-6">
            Crafted <span className="text-primary/80">To</span>
            <br />Your <span className="text-background">Game.</span>
          </h1>
          <p className="text-[15px] leading-relaxed text-background/60 max-w-[400px] mb-8">
            Every MR.WILLOW custom bat begins with a conversation. Hand-selected willow, tailored to your exact specifications.
          </p>
          <a
            href="#consult"
            className="inline-flex items-center gap-2.5 bg-card text-foreground text-[11px] font-bold tracking-[0.13em] uppercase px-7 py-4 hover:bg-card transition-colors duration-200"
          >
            Start Your Order <ArrowRight size={14} />
          </a>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-foreground">
          <img src={imgCustomBat} alt="Custom Bat Crafting" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}
