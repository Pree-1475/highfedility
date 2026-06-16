import TrainingHero from "../components/sections/training/TrainingHero";
import CoachingPrograms from "../components/sections/training/CoachingPrograms";
import FacilitiesAndBenefits from "../components/sections/training/FacilitiesAndBenefits";
import EnrollmentCTA from "../components/sections/training/EnrollmentCTA";

export default function Training() {
  return (
    <div className="min-h-screen">
      <TrainingHero />
      <CoachingPrograms />
      <FacilitiesAndBenefits />
      <EnrollmentCTA />
    </div>
  );
}
