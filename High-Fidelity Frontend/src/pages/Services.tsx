import { useState, useEffect } from "react";
import KnockingMachineUSP from "../components/sections/services/KnockingMachineUSP";
import ServicesGrid from "../components/sections/services/ServicesGrid";
import WorkshopGallery from "../components/sections/services/WorkshopGallery";
import FinalCTA from "../components/sections/services/FinalCTA";
import { getWorkshopData } from "../services/workshop";
import { WorkshopData } from "../types";
import { DF, PH } from "../lib/constants";
import { SetNavTheme } from "../contexts/NavigationThemeContext";

import imgServicesHero from "../assets/images/workshop services - hero.jpg";

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
    <div className="min-h-screen bg-card">
      <SetNavTheme theme="light" />
      {/* Minimalist Editorial Hero */}
      <div className="pt-[142px] md:pt-[152px] pb-12 lg:pb-20 px-6 lg:px-10 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-end">
          <div className="flex flex-col pb-4 lg:pb-8">
            <h1 style={DF} className="text-[52px] md:text-[80px] lg:text-[100px] xl:text-[120px] leading-[0.85] tracking-tight font-black text-[#11311e] uppercase mb-6">
              Workshop<br />Services
            </h1>
            <p className="text-[13px] md:text-[15px] leading-relaxed text-[#6b7462] max-w-md">
              Expert repairs, professional bat knocking, and premium craftsmanship designed to extend the lifespan and performance of your gear.
            </p>
          </div>
          <div className="h-[40vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden rounded-2xl relative">
            <img 
              src={imgServicesHero} 
              alt="Workshop Services" 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out hover:scale-105" 
            />
          </div>
        </div>
      </div>

      <KnockingMachineUSP />
      <ServicesGrid />
      <WorkshopGallery data={data} />
      <FinalCTA />
    </div>
  );
}

