import CustomBatsHero from "../components/sections/custom-bats/CustomBatsHero";
import CustomBatBuilder from "../components/sections/custom-bats/CustomBatBuilder";
import CraftsmanshipProcess from "../components/sections/custom-bats/CraftsmanshipProcess";

export default function CustomBats() {
  return (
    <div className="min-h-screen">
      <CustomBatsHero />
      <CustomBatBuilder />
      <CraftsmanshipProcess />
    </div>
  );
}
