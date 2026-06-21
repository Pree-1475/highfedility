import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";

import imgBats from "../../../assets/images/shop by category - cricket bats.jpg";
import imgProtection from "../../../assets/images/shop by category - cricket protection and gears.webp";
import imgFootwear from "../../../assets/images/shop by category - footwear and apparel.jpg";
import imgTraining from "../../../assets/images/shop by category - training and equipments.png";

export default function ShopByCategory() {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-20 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-10">
          <SectionLabel n="03" label="Shop By Category" />
          <h2
            style={DF}
            className="text-[44px] md:text-[52px] font-black leading-[0.88] tracking-tight text-foreground uppercase"
          >
            Explore Our
            <br />
            Collection
          </h2>
        </div>

        {/* Desktop: 2-column split grid | Mobile: vertical stack */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">

          {/* Left Column — Cricket Bats (full height on desktop) */}
          <Link
            to="/collections?category=Bats"
            className="group relative block overflow-hidden rounded-2xl h-[340px] lg:h-auto lg:row-span-full"
          >
            <img
              src={imgBats}
              alt="Cricket Bats"
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <h3
                style={DF}
                className="text-[36px] md:text-[48px] font-black text-background uppercase tracking-wide leading-none mb-2"
              >
                Cricket Bats
              </h3>
              <p className="text-[13px] text-background/60 mb-4 max-w-md">
                English and Kashmir willow from trusted brands.
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.16em] uppercase text-background/70 group-hover:text-background transition-colors duration-300">
                Browse
                <ChevronRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>

          {/* Right Column — stacked categories */}
          <div className="flex flex-col gap-3">
            {/* Top Row: Protection & Footwear (50/50) */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/collections?category=Protection"
                className="group relative block overflow-hidden rounded-2xl h-[220px] md:h-[280px]"
              >
                <img
                  src={imgProtection}
                  alt="Protection"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <h3
                    style={DF}
                    className="text-[24px] md:text-[36px] font-black text-background uppercase tracking-wide leading-none mb-3"
                  >
                    Protection
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.16em] uppercase text-background/70 group-hover:text-background transition-colors duration-300">
                    Browse
                    <ChevronRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>

              <Link
                to="/collections?category=Footwear"
                className="group relative block overflow-hidden rounded-2xl h-[220px] md:h-[280px]"
              >
                <img
                  src={imgFootwear}
                  alt="Footwear & Apparel"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <h3
                    style={DF}
                    className="text-[24px] md:text-[36px] font-black text-background uppercase tracking-wide leading-none mb-3"
                  >
                    Footwear & Apparel
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.16em] uppercase text-background/70 group-hover:text-background transition-colors duration-300">
                    Browse
                    <ChevronRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </div>

            {/* Bottom Row: Training & Accessories */}
            <Link
              to="/collections?category=Accessories"
              className="group relative block overflow-hidden rounded-2xl h-[240px] md:h-[280px]"
            >
              <img
                src={imgTraining}
                alt="Training & Accessories"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                <h3
                  style={DF}
                  className="text-[32px] md:text-[44px] font-black text-background uppercase tracking-wide leading-none mb-2"
                >
                  Training & Accessories
                </h3>
                <p className="text-[13px] text-background/60 mb-4 max-w-md">
                  Balls, bags, cones and training gear.
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.16em] uppercase text-background/70 group-hover:text-background transition-colors duration-300">
                  Browse
                  <ChevronRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
