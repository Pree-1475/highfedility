import { useState, useEffect } from "react";
import Hero from "../components/sections/home/Hero";
import EverythingYouNeed from "../components/sections/home/EverythingYouNeed";
import BrandMarquee from "../components/sections/home/BrandMarquee";
import FeaturedProducts from "../components/sections/home/FeaturedProducts";
import ShopByCategory from "../components/sections/home/ShopByCategory";
import WhyMrWillow from "../components/sections/home/WhyMrWillow";
import CustomBatsSection from "../components/sections/home/CustomBats";
import Community from "../components/sections/home/Community";
import { getHomepageData } from "../services/homepage";
import { HomePageData } from "../types";

export default function Home() {
  const [data, setData] = useState<HomePageData | undefined>(undefined);

  useEffect(() => {
    getHomepageData()
      .then((res) => {
        if (res) setData(res);
      })
      .catch((err) => {
        console.warn("Failed to fetch homepage data from CMS API.", err);
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
    <>
      <Hero data={data} />
      <EverythingYouNeed data={data} />
      <BrandMarquee />
      <FeaturedProducts />
      <ShopByCategory />
      <WhyMrWillow data={data} />
      <CustomBatsSection data={data} />
      <Community />
    </>
  );
}

