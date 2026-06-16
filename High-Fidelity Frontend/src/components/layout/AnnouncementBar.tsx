import { useBusinessSettings } from "../../contexts/BusinessSettingsContext";

export function AnnouncementBar() {
  const settings = useBusinessSettings();
  const text = settings?.announcement_text || "✦  Free Bat Knocking With Every Bat Purchase  ·  Visit Us In Johor Bahru  ✦";

  return (
    <div className="bg-[#1a3b28] text-white text-center py-2.5">
      <p className="text-[11px] font-semibold tracking-[0.2em] uppercase">
        {text}
      </p>
    </div>
  );
}
