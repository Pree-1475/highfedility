import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import { PH } from "../lib/constants";
import { useInquiry } from "../contexts/InquiryContext";
import { getProducts } from "../services/products";
import { useBusinessSettings } from "../contexts/BusinessSettingsContext";

// Modularized section components
import CollectionsHero from "../components/sections/collections/CollectionsHero";
import ProductFilters from "../components/sections/collections/ProductFilters";
import ProductGrid from "../components/sections/collections/ProductGrid";
import FloatingInquiryCTA from "../components/sections/collections/FloatingInquiryCTA";

const PRODUCTS = [
  { id: "p1", brand: "SS Ton", name: "Elite Cricket Bat", sub: "English Willow • Grade 1", category: "Cricket Bats", type: "English Willow", price: "RM 2,400", photo: PH.hero, pos: "object-top" },
  { id: "p2", brand: "SS Ton", name: "Gladiator Bat", sub: "English Willow • Grade 2", category: "Cricket Bats", type: "English Willow", price: "RM 1,800", photo: PH.hero, pos: "object-center" },
  { id: "p3", brand: "Kookaburra", name: "Kahuna Pro Bat", sub: "Kashmir Willow", category: "Cricket Bats", type: "Kashmir Willow", price: "RM 450", photo: PH.hero, pos: "object-bottom" },
  { id: "p4", brand: "Kookaburra", name: "Pro 1.0 Batting Gloves", sub: "Premium Adult Gloves", category: "Batting Gloves", type: "Adult Gloves", price: "RM 320", photo: PH.act2, pos: "object-center" },
  { id: "p5", brand: "Gray-Nicolls", name: "Legend Batting Gloves", sub: "Match Playing Gloves", category: "Batting Gloves", type: "Match Gloves", price: "RM 410", photo: PH.act2, pos: "object-top" },
  { id: "p6", brand: "Masuri", name: "Vision Series Abdominal Guard", sub: "Maximum Protection Guard", category: "Protection Gear", type: "Abdominal Guards", price: "RM 80", photo: PH.act3, pos: "object-center" },
  { id: "p7", brand: "SS Ton", name: "Custom Thigh Pad", sub: "Double Thigh Guard Protection", category: "Protection Gear", type: "Thigh Guards", price: "RM 480", photo: PH.act3, pos: "object-top" },
  { id: "p8", brand: "New Balance", name: "CK4040 Cricket Shoes", sub: "All-Round spikes and rubber shoes", category: "Cricket Shoes", type: "All-Round Shoes", price: "RM 550", photo: PH.shoes, pos: "object-center" },
  { id: "p9", brand: "Kookaburra", name: "Turf Leather Ball", sub: "Match Quality Leather Ball", category: "Cricket Balls", type: "Leather Balls", price: "RM 95", photo: PH.act2, pos: "object-center" },
  { id: "p10", brand: "MR.WILLOW", name: "Pro Bat Grip", sub: "Octopus Pattern Grip", category: "Accessories", type: "Bat Grips", price: "RM 25", photo: PH.storeC, pos: "object-top" },
  { id: "p11", brand: "Gray-Nicolls", name: "Legend Batting Pads", sub: "Traditional Design Pads", category: "Protection Gear", type: "Batting Pads", price: "RM 520", photo: PH.act3, pos: "object-center" },
  { id: "p12", brand: "GM", name: "Diamond English Willow Bat", sub: "English Willow • Grade 1+", category: "Cricket Bats", type: "English Willow", price: "RM 2,100", photo: PH.hero, pos: "object-top" },
  { id: "p13", brand: "Kookaburra", name: "Pro Training ball", sub: "High Quality Training ball", category: "Cricket Balls", type: "Training Balls", price: "RM 65", photo: PH.act2, pos: "object-center" },
  { id: "p14", brand: "MR.WILLOW", name: "Match Wooden Stumps Set", sub: "Match Grade Wooden Stumps", category: "Wickets & Stumps", type: "Match Stumps", price: "RM 180", photo: PH.storeC, pos: "object-center" },
  { id: "p15", brand: "Kookaburra", name: "Pro Wicket Keeping Gloves", sub: "Elite Keeping Gloves", category: "Wicket Keeping Gear", type: "Keeping Gloves", price: "RM 390", photo: PH.act2, pos: "object-center" },
  { id: "p16", brand: "Gray-Nicolls", name: "Pro Wheelie Kit Bag", sub: "Wheelie Kit Bag with multi-compartments", category: "Kit Bags", type: "Wheel Bags", price: "RM 340", photo: PH.store, pos: "object-center" },
  { id: "p17", brand: "MR.WILLOW", name: "Elite Thrower throw-arm", sub: "Sidearm Thrower Elite", category: "Coaching Gear", type: "Sidearm Throwers", price: "RM 150", photo: PH.storeB, pos: "object-center" },
  { id: "p18", brand: "MR.WILLOW", name: "Marker Discs Set", sub: "Multi-color field marker discs", category: "Coaching Gear", type: "Marker Discs", price: "RM 40", photo: PH.storeB, pos: "object-center" },
  { id: "p19", brand: "Gray-Nicolls", name: "Kashmir Willow Practice Bat", sub: "Kashmir Willow practice bat", category: "Cricket Bats", type: "Kashmir Willow", price: "RM 320", photo: PH.hero, pos: "object-center" },
  { id: "p20", brand: "MR.WILLOW", name: "Spring Back Wooden Stumps", sub: "Spring back stumps set", category: "Wickets & Stumps", type: "Spring Back Stumps", price: "RM 220", photo: PH.storeC, pos: "object-center" }
];

const CATEGORIES = [
  "All",
  "Cricket Bats",
  "Batting Gloves",
  "Protection Gear",
  "Cricket Shoes",
  "Wicket Keeping Gear",
  "Kit Bags",
  "Cricket Balls",
  "Coaching Gear",
  "Wickets & Stumps",
  "Accessories"
];

const TYPES_MAP: Record<string, string[]> = {
  "Cricket Bats": [
    "English Willow",
    "Kashmir Willow",
    "Practice Bats",
    "Catching Bats",
    "Junior Bats"
  ],
  "Batting Gloves": [
    "Adult Gloves",
    "Junior Gloves",
    "Match Gloves",
    "Training Gloves"
  ],
  "Protection Gear": [
    "Batting Pads",
    "Thigh Guards",
    "Inner Thigh Guards",
    "Abdominal Guards",
    "Arm Guards",
    "Chest Guards",
    "Shoulder Guards",
    "Elbow Guards"
  ],
  "Cricket Shoes": [
    "Batting Spikes",
    "Bowling Spikes",
    "All-Round Shoes",
    "Junior Shoes",
    "Training Shoes"
  ],
  "Wicket Keeping Gear": [
    "Keeping Gloves",
    "Keeping Pads",
    "Inner Gloves"
  ],
  "Kit Bags": [
    "Wheel Bags",
    "Duffle Bags",
    "Junior Bags",
    "Match Bags"
  ],
  "Cricket Balls": [
    "Leather Balls",
    "Training Balls",
    "Wind Balls",
    "Tennis Balls"
  ],
  "Coaching Gear": [
    "Sidearm Throwers",
    "Marker Discs",
    "Cones",
    "Reaction Balls",
    "Training Equipment"
  ],
  "Wickets & Stumps": [
    "Match Stumps",
    "Spring Back Stumps",
    "Plastic Stumps",
    "Training Stumps"
  ],
  "Accessories": [
    "Bat Grips",
    "Grip Cones",
    "Bat Covers",
    "Batting Inners",
    "Miscellaneous Accessories"
  ]
};

const HOMEPAGE_CATEGORY_MAP: Record<string, string> = {
  "Bats": "Cricket Bats",
  "Protection": "Protection Gear",
  "Footwear": "Cricket Shoes",
  "Training": "Coaching Gear",
  "Accessories": "Accessories",
  "Gloves": "Batting Gloves",
};

export default function Collections() {
  const settings = useBusinessSettings();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>(PRODUCTS);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data && data.length > 0) {
          const formatted = data.map((p) => ({
            ...p,
            photo: p.photo || PRODUCTS.find((mp) => mp.name === p.name)?.photo || PH.hero
          }));
          setProducts(formatted);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch products from CMS API, falling back to local mock data.", err);
      });
  }, []);

  // Resolve category, mapping homepage aliases if present
  const activeCategory = useMemo(() => {
    const rawCat = searchParams.get("category") || "All";
    return HOMEPAGE_CATEGORY_MAP[rawCat] || rawCat;
  }, [searchParams]);

  const [activeType, setActiveType] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortByPrice, setSortByPrice] = useState<"none" | "asc" | "desc">("none");

  // Redirect homepage aliases to canonical categories in URL for compatibility and consistency
  useEffect(() => {
    const rawCat = searchParams.get("category");
    if (rawCat && HOMEPAGE_CATEGORY_MAP[rawCat]) {
      const canonical = HOMEPAGE_CATEGORY_MAP[rawCat];
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("category", canonical);
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const { items, addItem, removeItem } = useInquiry();

  // Scroll to and highlight targeted product
  useEffect(() => {
    const targetSlug = searchParams.get("product");
    if (targetSlug) {
      const element = document.getElementById(`product-${targetSlug}`);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("highlight-pulse");
          const removeTimer = setTimeout(() => {
            element.classList.remove("highlight-pulse");
          }, 2500);
          return () => clearTimeout(removeTimer);
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams]);

  // Dynamic types based on category
  const types = useMemo(() => {
    if (activeCategory === "All" || !TYPES_MAP[activeCategory]) return ["All"];
    return ["All", ...TYPES_MAP[activeCategory]];
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchType = activeType === "All" || p.type === activeType;
      return matchCat && matchType;
    });

    if (sortByPrice !== "none") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return sortByPrice === "asc" ? priceA - priceB : priceB - priceA;
      });
    }

    return result;
  }, [products, activeCategory, activeType, sortByPrice]);

  const handleCategoryChange = (cat: string) => {
    setSearchParams(cat === "All" ? {} : { category: cat });
    setActiveType("All");
    setFilterOpen(false);
  };

  const handleCategoryChangeMobile = (cat: string) => {
    setSearchParams(cat === "All" ? {} : { category: cat });
    setActiveType("All");
  };

  const handleWhatsAppInquiry = () => {
    if (items.length === 0) return;
    const text = `Hi MR.WILLOW! I'm interested in the following equipment:\n\n${items.map((i) => `- ${i.brand} ${i.name}`).join("\n")}\n\nPlease let me know about availability.`;
    const baseUrl = settings?.whatsapp_url || "https://wa.me/60123456789";
    const separator = baseUrl.includes("?") ? "&" : "?";
    window.open(`${baseUrl}${separator}text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-[#f5f3ec] min-h-screen pb-20">
      <CollectionsHero />

      <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-6 mt-12 grid lg:grid-cols-[180px_1fr] gap-6 items-start">
        <ProductFilters
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          onCategoryChangeMobile={handleCategoryChangeMobile}
          types={types}
          activeType={activeType}
          onTypeChange={setActiveType}
          filterOpen={filterOpen}
          onFilterOpenChange={setFilterOpen}
          resultsCount={filteredProducts.length}
          sortByPrice={sortByPrice}
          onSortChange={setSortByPrice}
        />

        <ProductGrid
          filteredProducts={filteredProducts}
          inquiryItems={items}
          onAddItem={addItem}
          onRemoveItem={removeItem}
        />
      </div>

      <FloatingInquiryCTA
        itemCount={items.length}
        onSendInquiry={handleWhatsAppInquiry}
      />
    </div>
  );
}
