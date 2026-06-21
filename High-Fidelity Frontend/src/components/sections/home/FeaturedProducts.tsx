import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { apiFetch } from "../../../services/api";
import { useCurrency } from "../../../contexts/CurrencyContext";

const DEFAULT_PRODUCTS = [
  {
    brand: "SS Ton",
    name: "Elite Cricket Bat",
    sub: "English Willow · Grade 1",
    photo: PH.hero,
    tag: "Best Seller",
    pos: "object-top",
  },
  {
    brand: "Kookaburra",
    name: "Pro 1.0 Batting Gloves",
    sub: "Premium Leather Construction",
    photo: PH.act2,
    tag: "New Arrival",
    pos: "object-center",
  },
  {
    brand: "Masuri",
    name: "Vision Series Helmet",
    sub: "Steel Grille · Pro Fit",
    photo: PH.act3,
    tag: "In Stock",
    pos: "object-center",
  },
  {
    brand: "New Balance",
    name: "CK4040 Cricket Shoes",
    sub: "Spike & Rubber Sole Options",
    photo: PH.shoes,
    tag: "Limited Stock",
    pos: "object-center",
  },
  {
    brand: "Gray-Nicolls",
    name: "Legend Batting Pads",
    sub: "Elite Protection · Traditional Design",
    photo: PH.act3,
    tag: "Premium",
    pos: "object-center",
  },
  {
    brand: "GM",
    name: "Diamond English Willow Bat",
    sub: "English Willow · DXM Profile",
    photo: PH.hero,
    tag: "New",
    pos: "object-top",
  },
  {
    brand: "Kookaburra",
    name: "Turf Cricket Balls",
    sub: "Alum Tanned Leather · Match Quality",
    photo: PH.act2,
    tag: "Match Ready",
    pos: "object-center",
    price: "95"
  },
];

export default function FeaturedProducts() {
  const { formatPrice } = useCurrency();
  const [currentIndex, setCurrentIndex] = useState(3); // Start at the first real product (offset by 3 clones)
  const [disableTransition, setDisableTransition] = useState(false);
  const [products, setProducts] = useState<any[]>(DEFAULT_PRODUCTS);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    apiFetch<any>('products/?is_featured=true')
      .then((data) => {
        if (data && data.length > 0) {
          const formatted = data.map((p: any, idx: number) => ({
            brand: p.brand,
            name: p.name,
            sub: p.sub,
            price: p.price,
            photo: p.photo || DEFAULT_PRODUCTS[idx % DEFAULT_PRODUCTS.length].photo,
            tag: DEFAULT_PRODUCTS[idx % DEFAULT_PRODUCTS.length].tag,
            pos: p.pos || "object-center"
          }));
          setProducts(formatted);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch featured products from CMS API. Falling back to local mock data.", err);
      });
  }, []);

  const clonedProducts = [
    ...products.slice(-3),
    ...products,
    ...products.slice(0, 3)
  ];

  const nextSlide = useCallback(() => {
    if (disableTransition) return;
    setCurrentIndex((prev) => prev + 1);
  }, [disableTransition]);

  const prevSlide = useCallback(() => {
    if (disableTransition) return;
    setCurrentIndex((prev) => prev - 1);
  }, [disableTransition]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex, nextSlide]);

  useEffect(() => {
    if (disableTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDisableTransition(false);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [disableTransition]);

  const handleTransitionEnd = () => {
    if (currentIndex >= products.length + 3) {
      setDisableTransition(true);
      setCurrentIndex(3);
    } else if (currentIndex < 3) {
      setDisableTransition(true);
      setCurrentIndex(products.length + 2);
    }
  };

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEndAction = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const realIndex = (currentIndex - 3 + products.length) % products.length;

  return (
    <section className="bg-background relative overflow-hidden pt-20 pb-6 lg:pt-28 lg:pb-12">
      <div className="relative z-10 w-full mb-6">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <SectionLabel n="02" label="Featured Products" />
            <h2
              style={DF}
              className="text-[44px] md:text-[52px] font-black leading-[0.88] tracking-tight text-foreground uppercase"
            >
              Premium
              <br />
              Equipment
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 md:gap-6 flex-wrap md:flex-nowrap">
            <span style={DF} className="text-[18px] font-bold text-foreground/40 tracking-wider">
              0{realIndex + 1} <span className="text-foreground/20">/</span> 0{products.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background hover:scale-105 transition-all duration-300"
                aria-label="Previous slide"
              >
                <ArrowLeft size={18} strokeWidth={2} />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background hover:scale-105 transition-all duration-300"
                aria-label="Next slide"
              >
                <ArrowRight size={18} strokeWidth={2} />
              </button>
            </div>
            <Link
              to="/collections"
              className="inline-flex items-center justify-center border border-foreground text-foreground hover:bg-foreground hover:text-background text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase px-5 py-3.5 transition-all duration-300 h-max w-max"
            >
              View Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Track Container */}
      <div className="relative z-10 w-full overflow-hidden">
        <div
          style={{ "--current-index": currentIndex } as React.CSSProperties}
          className={`flex gap-6 lg:gap-8 w-max fp-slider-track items-center py-6 ${disableTransition
            ? "transition-none"
            : "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            }`}
          onTransitionEnd={handleTransitionEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEndAction}
        >
          {clonedProducts.map(({ brand, name, sub, price, photo, tag, pos }, index) => {
            const isActive = index === currentIndex;
            const productSlug = `${brand}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

            return (
              <Link
                key={`${name}-${index}`}
                to={`/collections?product=${productSlug}`}
                className={`w-[280px] lg:w-[320px] shrink-0 transition-all duration-700 ease-out cursor-pointer block ${isActive
                  ? "opacity-100 scale-100 blur-none z-20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
                  : "opacity-35 scale-95 blur-[1px] z-10"
                  }`}
                onClick={(e) => {
                  if (!isActive) {
                    e.preventDefault();
                    if (!disableTransition) {
                      setCurrentIndex(index);
                    }
                  }
                }}
              >
                <div className="bg-card h-full flex flex-col border border-[rgba(28,33,23,0.06)] group text-left">
                  <div className="relative overflow-hidden bg-secondary aspect-[3/4]">
                    <img
                      src={photo}
                      alt={name}
                      className={`w-full h-full object-cover ${pos} transition-transform duration-700 ease-out ${isActive ? "group-hover:scale-105" : ""}`}
                    />
                    <span className="absolute top-4 left-4 bg-foreground text-background text-[9px] font-bold tracking-[0.16em] uppercase px-2.5 py-1.5 z-10">
                      {tag}
                    </span>
                  </div>

                  <div className="pt-5 pb-6 px-6 flex-grow bg-card">
                    <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-muted-foreground mb-1.5">
                      {brand}
                    </p>
                    <h3
                      style={DF}
                      className="text-[22px] font-bold text-foreground leading-tight tracking-wide uppercase mb-1.5"
                    >
                      {name}
                    </h3>
                    <p className="text-[13px] text-muted-foreground mb-5">{sub}</p>
                    
                    {price && (
                      <p style={DF} className="text-[18px] font-bold text-foreground mb-4 mt-auto">
                        {formatPrice(price)}
                      </p>
                    )}

                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase text-foreground/60 group-hover:text-foreground transition-colors duration-300"
                    >
                      Enquire In-Store
                      <ArrowRight
                        size={11}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
