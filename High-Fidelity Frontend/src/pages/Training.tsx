import CoachingPrograms from "../components/sections/training/CoachingPrograms";
import FacilitiesAndBenefits from "../components/sections/training/FacilitiesAndBenefits";
import EnrollmentCTA from "../components/sections/training/EnrollmentCTA";
import { DF, PH } from "../lib/constants";
import { SetNavTheme } from "../contexts/NavigationThemeContext";

export default function Training() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      <SetNavTheme theme="dark" />
      {/* The Simple Banner Header */}
      <div className="w-full h-[40vh] relative overflow-hidden rounded-b-[2rem] mb-12 lg:mb-20">
        <img src={PH.act2} alt="Training" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center pt-16 px-4">
          <h1 style={DF} className="text-[52px] md:text-[80px] font-black text-white uppercase tracking-tight text-center leading-[0.9]">
            Training & Play
          </h1>
        </div>
      </div>
      
      <CoachingPrograms />
      <FacilitiesAndBenefits />
      <EnrollmentCTA />
    </div>
  );
}
