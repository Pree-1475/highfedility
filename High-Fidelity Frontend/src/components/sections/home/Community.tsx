import { Instagram, Youtube } from "lucide-react";
import { useEffect, useRef } from "react";
import { DF, PH } from "../../../lib/constants";
import { useBusinessSettings } from "../../../contexts/BusinessSettingsContext";

const SOCIAL_MEDIA = [
  { id: "m1", type: "image", src: PH.act2, translateY: "translate-y-0 lg:translate-y-0" },
  { id: "m2", type: "video", src: "https://res.cloudinary.com/dazmuwwsq/video/upload/v1/samples/elephants.mp4", translateY: "translate-y-6 lg:translate-y-20" },
  { id: "m3", type: "video", src: "https://res.cloudinary.com/dazmuwwsq/video/upload/v1/samples/sea-turtle.mp4", translateY: "translate-y-12 lg:translate-y-40" },
  { id: "m4", type: "video", src: "https://res.cloudinary.com/dazmuwwsq/video/upload/v1/samples/cld-sample-video.mp4", translateY: "translate-y-6 lg:translate-y-20" },
  { id: "m5", type: "image", src: PH.storeB, translateY: "translate-y-0 lg:translate-y-0" },
];

export default function Community() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const settings = useBusinessSettings();

  useEffect(() => {
    // Attempt to center the scroll container on the 3rd card immediately upon mount
    if (scrollContainerRef.current && centerCardRef.current) {
      const container = scrollContainerRef.current;
      const centerCard = centerCardRef.current;
      const scrollPos = centerCard.offsetLeft - (container.clientWidth / 2) + (centerCard.clientWidth / 2);
      // Use direct assignment for instant scroll without smooth behavior on load
      container.scrollLeft = scrollPos;
    }
  }, []);

  return (
    <section className="bg-card pt-12 md:pt-16 lg:pt-24 pb-8 px-4 md:px-10 overflow-hidden border-t border-[rgba(28,33,23,0.06)]">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">

        {/* Centered Header & Text */}
        <div className="text-center max-w-2xl mx-auto mb-10 px-2">
          <h2
            style={DF}
            className="text-[44px] md:text-[56px] font-black leading-[0.9] tracking-tight text-black uppercase mb-6"
          >
            Life at MR.WILLOW
          </h2>
          <p className="text-black/80 font-medium text-[16px] md:text-[18px] leading-relaxed">
            MR.WILLOW wouldn't be what it is today without you all! Follow along on our socials to stay up to date with all the community events, workshop insights, and behind-the-scenes cricket moments.
          </p>
        </div>

        {/* Centered Social Links in rounded boxes */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <a
            href={settings?.instagram_url || "https://instagram.com"}
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-card text-primary shadow-sm hover:scale-105 hover:shadow-md hover:text-black transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram size={24} strokeWidth={2} />
          </a>
          <a
            href={settings?.tiktok_url || "https://tiktok.com"}
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-card text-primary shadow-sm hover:scale-105 hover:shadow-md hover:text-black transition-all duration-300"
            aria-label="TikTok"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
          <a
            href={settings?.youtube_url || "https://youtube.com"}
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-card text-primary shadow-sm hover:scale-105 hover:shadow-md hover:text-black transition-all duration-300"
            aria-label="YouTube"
          >
            <Youtube size={26} strokeWidth={2} />
          </a>
        </div>

        {/* Straight V-Formation & Mobile Horizontal Scroll */}
        <div ref={scrollContainerRef} className="w-full overflow-x-auto hide-scroll snap-x snap-mandatory px-4 md:px-0">
          {/* We ensure the container has enough padding bottom so the lowest cards aren't cut off */}
          <div className="flex flex-row items-start justify-start lg:grid lg:grid-cols-5 min-w-max lg:min-w-0 gap-4 md:gap-6 pb-16 lg:pb-48">
            {SOCIAL_MEDIA.map((media, idx) => (
              <div
                key={media.id}
                ref={idx === 2 ? centerCardRef : null}
                className={`relative w-[180px] lg:w-auto shrink-0 snap-center rounded-[1rem] lg:rounded-[1.5rem] overflow-hidden cursor-pointer bg-secondary shadow-sm
                  ${media.translateY}
                `}
              >
                <div className="aspect-[9/16] w-full">
                  {media.type === "video" ? (
                    <video
                      src={media.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={media.src}
                      alt="Life at MR.WILLOW"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Subtle MR WILLOW overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
