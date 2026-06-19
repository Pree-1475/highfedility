import useEmblaCarousel from "embla-carousel-react";
import { PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { WorkshopData, WorkshopGalleryItemData } from "../../../types";


interface WorkshopGalleryProps {
  data?: WorkshopData;
}

export default function WorkshopGallery({ data }: WorkshopGalleryProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });
  
  const defaultItems: WorkshopGalleryItemData[] = [
    { type: "image", url: PH.act1 },
    { type: "image", url: PH.storeB },
    { type: "image", url: PH.act2 },
    { type: "image", url: PH.act3 }
  ];

  const items = data?.gallery_items && data.gallery_items.length > 0
    ? data.gallery_items
    : defaultItems;

  return (
    <section className="bg-[#11311e] py-24 px-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto mb-12">
        <SectionLabel n="04" label="Inside the Workshop" />
      </div>
      <div className="max-w-[1440px] mx-auto cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex-[0_0_80%] md:flex-[0_0_40%] lg:flex-[0_0_30%] min-w-0">
              <div className="aspect-[4/5] bg-white/10 relative overflow-hidden">
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={item.url} alt="Workshop detail" className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

