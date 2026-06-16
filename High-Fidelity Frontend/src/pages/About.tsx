import AboutHero from "../components/sections/about/AboutHero";
import OurStoryAndMission from "../components/sections/about/OurStoryAndMission";
import WorkshopPhilosophy from "../components/sections/about/WorkshopPhilosophy";
import StoreExperience from "../components/sections/about/StoreExperience";

export default function About() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <OurStoryAndMission />
      <WorkshopPhilosophy />
      <StoreExperience />
    </div>
  );
}
