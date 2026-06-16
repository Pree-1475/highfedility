import { useState, useEffect } from "react";
import ServicesHero from "../components/sections/services/ServicesHero";
import KnockingMachineUSP from "../components/sections/services/KnockingMachineUSP";
import ServicesGrid from "../components/sections/services/ServicesGrid";
import WorkshopGallery from "../components/sections/services/WorkshopGallery";
import FinalCTA from "../components/sections/services/FinalCTA";
import { getWorkshopData } from "../services/workshop";
import { WorkshopData } from "../types";

export default function Services() {
  const [data, setData] = useState<WorkshopData | undefined>(undefined);

  useEffect(() => {
    getWorkshopData()
      .then((res) => {
        if (res) setData(res);
      })
      .catch((err) => {
        console.warn("Failed to fetch workshop data from CMS API.", err);
      });
  }, []);

  useEffect(() => {
    if (data) {
      if (data.seo_title) {
        document.title = data.seo_title;
      }
      if (data.search_description) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute("content", data.search_description);
        }
      }
      if (data.og_image) {
        let metaOgImg = document.querySelector('meta[property="og:image"]');
        if (!metaOgImg) {
          metaOgImg = document.createElement("meta");
          metaOgImg.setAttribute("property", "og:image");
          document.head.appendChild(metaOgImg);
        }
        metaOgImg.setAttribute("content", data.og_image);
      }
    }
  }, [data]);

  return (
    <div className="min-h-screen">
      <ServicesHero data={data} />
      <KnockingMachineUSP data={data} />
      <ServicesGrid data={data} />
      <WorkshopGallery data={data} />
      <FinalCTA data={data} />
    </div>
  );
}

