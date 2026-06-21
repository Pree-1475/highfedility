import ContactDetails from "../components/sections/contact/ContactDetails";
import ContactMap from "../components/sections/contact/ContactMap";
import { DF } from "../lib/constants";
import { SetNavTheme } from "../contexts/NavigationThemeContext";

export default function Contact() {
  return (
    <div className="bg-card min-h-screen pt-[142px] md:pt-[172px] pb-24">
      <SetNavTheme theme="light" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* Content goes directly into the grid since ContactDetails has its own H1 */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <ContactDetails />
          <ContactMap />
        </div>
      </div>
    </div>
  );
}
