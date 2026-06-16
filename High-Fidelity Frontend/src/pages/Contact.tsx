import { SectionLabel } from "../components/ui/SectionLabel";
import ContactDetails from "../components/sections/contact/ContactDetails";
import ContactMap from "../components/sections/contact/ContactMap";

export default function Contact() {
  return (
    <div className="bg-[#f5f3ec] min-h-screen pt-20 pb-24">
      <div className="max-w-[1440px] mx-auto px-10">
        <SectionLabel n="01" label="Get In Touch" />
        
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start mt-6">
          <ContactDetails />
          <ContactMap />
        </div>
      </div>
    </div>
  );
}
