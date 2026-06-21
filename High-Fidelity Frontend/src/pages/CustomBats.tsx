import CustomBatBuilder from "../components/sections/custom-bats/CustomBatBuilder";
import CraftsmanshipProcess from "../components/sections/custom-bats/CraftsmanshipProcess";
import { SetNavTheme } from "../contexts/NavigationThemeContext";

export default function CustomBats() {
  return (
    <div className="min-h-screen bg-card">
      <SetNavTheme theme="light" />
      <CustomBatBuilder />
      <CraftsmanshipProcess />
    </div>
  );
}
