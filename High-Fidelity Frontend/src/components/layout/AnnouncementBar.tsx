import { useBusinessSettings } from "../../contexts/BusinessSettingsContext";

export function AnnouncementBar() {
  const settings = useBusinessSettings();
  const text = settings?.announcement_text || "✦  Free Bat Knocking With Every Bat Purchase  ·  Visit Us In Johor Bahru  ✦";
  const enabled = settings?.announcement_enabled ?? true;

  if (!enabled) return null;

  return (
    <div className="bg-[#1c2117] text-white text-center py-2.5">
      <p className="text-[11px] font-semibold tracking-[0.2em] uppercase">
        {text}
      </p>
    </div>
  );
}
