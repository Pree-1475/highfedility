import OurStoryAndMission from "../components/sections/about/OurStoryAndMission";
import WorkshopPhilosophy from "../components/sections/about/WorkshopPhilosophy";
import StoreExperience from "../components/sections/about/StoreExperience";
import { DF, PH } from "../lib/constants";
import { SetNavTheme } from "../contexts/NavigationThemeContext";

export default function About() {
  return (
    <div className="min-h-screen bg-card">
      <SetNavTheme theme="light" />
      {/* The Wide Editorial Header */}
      <div className="pt-[172px] md:pt-[192px] pb-8 px-6 lg:px-10 max-w-[1440px] mx-auto">
        <h1 style={DF} className="text-[52px] md:text-[80px] font-black text-[#11311e] uppercase tracking-tight mb-6 leading-[0.9]">
          Our Story
        </h1>
        <div className="w-full h-[40vh] lg:h-[50vh] rounded-2xl overflow-hidden relative mb-8">
          <img src={PH.storeB} alt="Our Story" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
      <OurStoryAndMission />
      <WorkshopPhilosophy />
      <StoreExperience />
    </div>
  );
}
