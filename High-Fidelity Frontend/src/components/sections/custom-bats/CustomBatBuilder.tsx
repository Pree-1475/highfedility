import { useState } from "react";
import { useBusinessSettings } from "../../../contexts/BusinessSettingsContext";
import { DF } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { MessageCircle, Check, ArrowRight, RotateCcw, AlertTriangle } from "lucide-react";

type ShapeOption = "Full Profile" | "Semi Concaved" | "Concaved";
type SweetSpotOption = "High" | "Mid High" | "Mid" | "Mid Low" | "Low";
type HandleShapeOption = "Oval" | "Semi Oval" | "Round";
type HandleThicknessOption = "Thin" | "Standard" | "Thick";

const SHAPES: { name: ShapeOption; desc: string }[] = [
  {
    name: "Full Profile",
    desc: "Maximum wood behind the sweet spot, very thick edges, and a full back profile. Best for power hitters who don't mind a slightly heavier pickup.",
  },
  {
    name: "Semi Concaved",
    desc: "Slightly scalloped/scooped out on the sides of the spine to optimize pickup while keeping substantial thickness at the edges. The perfect compromise.",
  },
  {
    name: "Concaved",
    desc: "Pronounced scalloping on the back to remove non-essential weight. Offers a light, feathersome pickup and maximum spine height for classic play.",
  },
];

const ADULT_SIZES = ["Short Blade", "Short Handle", "Long Blade", "Long Handle", "Long Blade + Long Handle", "Small Adult"];
const JUNIOR_SIZES = ["Harrow", "Size 6", "Size 5", "Size 4", "Size 3", "Size 2"];

const SWEET_SPOTS: { name: SweetSpotOption; desc: string; label: string; offsetPercent: number }[] = [
  { name: "High", desc: "Positioned towards the hands. Best for bouncy pitches and players who play off the back foot.", label: "High (Bouncy Tracks / Back-foot Play)", offsetPercent: 20 },
  { name: "Mid High", desc: "Slightly elevated sweet spot. Balanced pickup, ideal for all-round stroke makers.", label: "Mid-High (All-round Versatility)", offsetPercent: 35 },
  { name: "Mid", desc: "Centered sweet spot. Standard positioning providing the best overall power distribution.", label: "Mid (Traditional Center / Standard)", offsetPercent: 50 },
  { name: "Mid Low", desc: "Lowered sweet spot. Promotes powerful driving and front-foot stroke play.", label: "Mid-Low (Aggressive Driving / Subcontinent Tracks)", offsetPercent: 65 },
  { name: "Low", desc: "Located near the toe of the bat. Designed for front-foot dominant players who love to drive.", label: "Low (Subcontinent / Low Bounces / Driving)", offsetPercent: 80 },
];

const WEIGHTS_1LB = [
  { label: "1lb (454g)", val: "1lb" },
  { label: "1lb 1oz (482g)", val: "1lb 1oz" },
  { label: "1lb 2oz (510g)", val: "1lb 2oz" },
  { label: "1lb 3oz (539g)", val: "1lb 3oz" },
  { label: "1lb 4oz (567g)", val: "1lb 4oz" },
  { label: "1lb 5oz (595g)", val: "1lb 5oz" },
  { label: "1lb 6oz (624g)", val: "1lb 6oz" },
  { label: "1lb 7oz (652g)", val: "1lb 7oz" },
  { label: "1lb 8oz (680g)", val: "1lb 8oz" },
  { label: "1lb 9oz (709g)", val: "1lb 9oz" },
  { label: "1lb 10oz (737g)", val: "1lb 10oz" },
  { label: "1lb 11oz (765g)", val: "1lb 11oz" },
  { label: "1lb 12oz (794g)", val: "1lb 12oz" },
  { label: "1lb 13oz (822g)", val: "1lb 13oz" },
  { label: "1lb 14oz (850g)", val: "1lb 14oz" },
  { label: "1lb 15oz (879g)", val: "1lb 15oz" },
];

const WEIGHTS_2LB = [
  { label: "2lb (907g)", val: "2lb" },
  { label: "2lb 1oz (936g)", val: "2lb 1oz" },
  { label: "2lb 2oz (964g)", val: "2lb 2oz" },
  { label: "2lb 3oz (992g)", val: "2lb 3oz" },
  { label: "2lb 4oz (1021g)", val: "2lb 4oz" },
  { label: "2lb 5oz (1049g)", val: "2lb 5oz" },
  { label: "2lb 6oz (1077g)", val: "2lb 6oz" },
  { label: "2lb 7oz (1106g)", val: "2lb 7oz" },
  { label: "2lb 8oz (1134g)", val: "2lb 8oz" },
  { label: "2lb 9oz (1162g)", val: "2lb 9oz" },
  { label: "2lb 10oz (1191g)", val: "2lb 10oz" },
  { label: "2lb 11oz (1219g)", val: "2lb 11oz" },
  { label: "2lb 12oz (1247g)", val: "2lb 12oz" },
  { label: "2lb 13oz (1276g)", val: "2lb 13oz" },
  { label: "2lb 14oz (1304g)", val: "2lb 14oz" },
  { label: "2lb 15oz (1332g)", val: "2lb 15oz" },
];

const WEIGHTS_3LB = [
  { label: "3lb (1361g)", val: "3lb" },
  { label: "3lb 1oz (1389g)", val: "3lb 1oz" },
  { label: "3lb 2oz (1417g)", val: "3lb 2oz" },
  { label: "3lb 3oz (1446g)", val: "3lb 3oz" },
  { label: "3lb 4oz (1474g)", val: "3lb 4oz" },
  { label: "3lb 5oz (1503g)", val: "3lb 5oz" },
  { label: "3lb 6oz (1531g)", val: "3lb 6oz" },
  { label: "3lb 7oz (1559g)", val: "3lb 7oz" },
  { label: "3lb 8oz (1588g)", val: "3lb 8oz" },
];

export default function CustomBatBuilder() {
  const settings = useBusinessSettings();
  const ordersEnabled = settings?.custom_bat_orders_enabled !== false; // defaults to true if settings fail or are loading

  // Configurator state
  const [willowType, setWillowType] = useState<string>("English Willow");
  const [shape, setShape] = useState<ShapeOption>("Semi Concaved");
  const [size, setSize] = useState<string>("Short Handle");
  const [sizeGroup, setSizeGroup] = useState<"adult" | "junior">("adult");
  const [sweetSpot, setSweetSpot] = useState<SweetSpotOption>("Mid");
  const [weight, setWeight] = useState<string>("2lb 8oz");
  const [handleShape, setHandleShape] = useState<HandleShapeOption>("Semi Oval");
  const [handleThickness, setHandleThickness] = useState<HandleThicknessOption>("Standard");
  const [playerLevel, setPlayerLevel] = useState<string>("Club");
  const [notes, setNotes] = useState<string>("");

  const [activeStep, setActiveStep] = useState<number>(1);
  const totalSteps = 7;

  // Reset form to defaults
  const handleReset = () => {
    setWillowType("English Willow");
    setShape("Semi Concaved");
    setSize("Short Handle");
    setSizeGroup("adult");
    setSweetSpot("Mid");
    setWeight("2lb 8oz");
    setHandleShape("Semi Oval");
    setHandleThickness("Standard");
    setPlayerLevel("Club");
    setNotes("");
    setActiveStep(1);
  };

  // Compile WhatsApp link
  const handleSubmitEnquiry = () => {
    const whatsappBase = settings?.whatsapp_url || "https://wa.me/60123456789";
    const message = `Hello MR.WILLOW! I am interested in building a custom cricket bat. Here is my ideal configuration:

✦ CONFIGURATION DETAILS ✦
• Willow Type: ${willowType}
• Shape: ${shape}
• Size: ${size}
• Sweet Spot: ${sweetSpot}
• Weight: ${weight}
• Handle Shape: ${handleShape}
• Handle Thickness: ${handleThickness}
• Player Level: ${playerLevel}

✦ ADDITIONAL NOTES ✦
${notes ? notes.trim() : "No additional notes."}

Looking forward to hearing back!`;

    const encodedText = encodeURIComponent(message);
    const finalUrl = whatsappBase.includes("?") 
      ? `${whatsappBase}&text=${encodedText}` 
      : `${whatsappBase}?text=${encodedText}`;

    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="consult" className="bg-card pt-[80px] pb-16 md:pt-[140px] lg:pb-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-12 max-w-[800px] mx-auto">
          <h1 style={DF} className="text-[52px] md:text-[80px] font-black leading-[0.9] tracking-tight text-foreground uppercase mb-6">
            Bat Builder
          </h1>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-muted-foreground">
            Tailor every dimension of your willow to match your unique playing technique. 
            Once you have built your setup, send a direct enquiry to our workshop team.
          </p>

          {!ordersEnabled && (
            <div className="mt-8 inline-flex items-center gap-3 bg-[#e8a356]/12 border border-[#e8a356]/40 text-primary px-6 py-3 text-[12px] font-bold tracking-[0.05em] uppercase rounded-sm">
              <AlertTriangle size={16} />
              Custom bats are currently not available to the general public
            </div>
          )}
        </div>

        <div className={`grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start ${!ordersEnabled ? "opacity-50 pointer-events-none" : ""}`}>
          {/* LEFT: STEP CONFIGURATOR */}
          <div className="bg-card border border-[rgba(28,33,23,0.08)] shadow-sm p-5 sm:p-10 rounded-sm w-full max-w-full overflow-hidden">
            {/* Steps Progress bar */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black tracking-[0.2em] text-foreground uppercase">
                  Step {activeStep} of {totalSteps}
                </span>
                <span className="text-[12px] font-bold text-foreground">
                  {activeStep === 1 && "Select Willow Type"}
                  {activeStep === 2 && "Select Bat Shape Profile"}
                  {activeStep === 3 && "Choose Size & Dimensions"}
                  {activeStep === 4 && "Specify Sweet Spot Position"}
                  {activeStep === 5 && "Select Bat Weight"}
                  {activeStep === 6 && "Configure Handle Details"}
                  {activeStep === 7 && "Add Player Level & Notes"}
                </span>
              </div>
              <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-foreground h-full transition-all duration-300 ease-out" 
                  style={{ width: `${(activeStep / totalSteps) * 100}%` }}
                />
              </div>
              
              {/* Horizontal steps navigation tabs */}
              <div className="flex justify-between mt-6 border-b border-muted pb-2 overflow-x-auto gap-2 hide-scroll snap-x w-full">
                {[1, 2, 3, 4, 5, 6, 7].map((stepNum) => (
                  <button
                    key={stepNum}
                    onClick={() => setActiveStep(stepNum)}
                    className={`text-[11px] font-bold tracking-[0.1em] uppercase py-2 px-3 border-b-2 transition-all shrink-0 snap-center ${
                      activeStep === stepNum 
                        ? "border-foreground text-foreground" 
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Step {stepNum}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 1: WILLOW TYPE */}
            {activeStep === 1 && (
              <div className="animate-fadeIn">
                <h3 style={DF} className="text-[20px] font-bold text-foreground uppercase mb-2">Willow Type</h3>
                <p className="text-[13px] text-muted-foreground mb-8">
                  Choose between the premium punch of English Willow or the durable value of Kashmir Willow.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {["English Willow", "Kashmir Willow"].map((wType) => {
                    const isSelected = willowType === wType;
                    return (
                      <div
                        key={wType}
                        onClick={() => setWillowType(wType)}
                        className={`border cursor-pointer p-6 rounded-sm transition-all flex flex-col justify-center items-center gap-3 text-center ${
                          isSelected 
                            ? "border-primary bg-card shadow-sm" 
                            : "border-[rgba(28,33,23,0.08)] bg-card hover:border-primary/35"
                        }`}
                      >
                        <div className={`w-4 h-4 border rounded-full flex items-center justify-center transition-colors ${
                          isSelected ? "border-primary bg-primary" : "border-border"
                        }`}>
                          {isSelected && <Check size={10} className="text-primary-foreground" />}
                        </div>
                        <span className="text-[14px] font-bold uppercase tracking-[0.05em] text-foreground">{wType}</span>
                        <p className="text-[11px] leading-relaxed text-muted-foreground">
                          {wType === "English Willow" ? "Premium performance, lighter pickup, larger sweet spot." : "Durable, heavier pickup, excellent value for regular practice."}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: BAT SHAPE */}
            {activeStep === 2 && (
              <div className="animate-fadeIn">
                <h3 style={DF} className="text-[20px] font-bold text-foreground uppercase mb-2">Bat Shape Profile</h3>
                <p className="text-[13px] text-muted-foreground mb-8">
                  The back profile controls the weight distribution, pick up feel, and thickness of the edges.
                </p>

                {/* SVG Visual comparison */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {SHAPES.map((opt) => {
                    const isSelected = shape === opt.name;
                    return (
                      <div
                        key={opt.name}
                        onClick={() => setShape(opt.name)}
                        className={`border cursor-pointer p-6 rounded-sm transition-all text-center flex flex-col justify-between items-center ${
                          isSelected 
                            ? "border-primary bg-card shadow-sm" 
                            : "border-[rgba(28,33,23,0.08)] bg-card hover:border-primary/35"
                        }`}
                      >
                        {/* Shape cross-section illustration */}
                        <div className="w-full h-28 flex items-center justify-center mb-4 bg-background">
                          {opt.name === "Full Profile" && (
                            <svg width="110" height="90" viewBox="0 0 110 90">
                              {/* Bat Face (flattish base) */}
                              <path d="M 15,75 Q 55,80 95,75" stroke="#11311e" strokeWidth="2.5" fill="none" />
                              {/* Curved profile contours */}
                              <path d="M 15,75 Q 2,40 35,22 Q 55,20 75,22 Q 108,40 95,75" stroke="#11311e" strokeWidth="2.5" fill="#ffffff" />
                              {/* Spine line */}
                              <line x1="55" y1="20" x2="55" y2="79" stroke="#11311e" strokeWidth="1" strokeDasharray="3 3" />
                              <text x="55" y="55" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#11311e" className="tracking-widest uppercase">FULL</text>
                            </svg>
                          )}
                          {opt.name === "Semi Concaved" && (
                            <svg width="110" height="90" viewBox="0 0 110 90">
                              {/* Bat Face */}
                              <path d="M 15,75 Q 55,80 95,75" stroke="#11311e" strokeWidth="2.5" fill="none" />
                              {/* Contours showing light concaving */}
                              <path d="M 15,75 Q 3,42 32,24 Q 45,35 55,20 Q 65,35 78,24 Q 107,42 95,75" stroke="#11311e" strokeWidth="2.5" fill="#ffffff" />
                              {/* Spine line */}
                              <line x1="55" y1="20" x2="55" y2="79" stroke="#11311e" strokeWidth="1" strokeDasharray="3 3" />
                              <text x="55" y="55" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#11311e" className="tracking-widest uppercase">SEMI</text>
                            </svg>
                          )}
                          {opt.name === "Concaved" && (
                            <svg width="110" height="90" viewBox="0 0 110 90">
                              {/* Bat Face */}
                              <path d="M 15,75 Q 55,80 95,75" stroke="#11311e" strokeWidth="2.5" fill="none" />
                              {/* Contours showing deep concaving */}
                              <path d="M 15,75 Q 5,45 28,26 Q 44,45 55,18 Q 66,45 82,26 Q 105,45 95,75" stroke="#11311e" strokeWidth="2.5" fill="#ffffff" />
                              {/* Spine line */}
                              <line x1="55" y1="18" x2="55" y2="79" stroke="#11311e" strokeWidth="1" strokeDasharray="3 3" />
                              <text x="55" y="57" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#11311e" className="tracking-widest uppercase">CONCAVED</text>
                            </svg>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-3.5 h-3.5 border rounded-full flex items-center justify-center transition-colors ${
                            isSelected ? "border-primary bg-primary" : "border-border"
                          }`}>
                            {isSelected && <Check size={8} className="text-primary-foreground" />}
                          </div>
                          <span className="text-[12px] font-bold uppercase tracking-[0.05em] text-foreground">{opt.name}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-muted-foreground mt-2">{opt.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: SIZE */}
            {activeStep === 3 && (
              <div className="animate-fadeIn">
                <h3 style={DF} className="text-[20px] font-bold text-foreground uppercase mb-2">Bat Size Selection</h3>
                <p className="text-[13px] text-muted-foreground mb-6">
                  Select your height and blade length configuration. Grouped into Adult and Junior measurements.
                </p>

                {/* Subcategory selectors */}
                <div className="flex gap-4 mb-6 border-b border-muted">
                  <button
                    onClick={() => setSizeGroup("adult")}
                    className={`py-3 px-6 text-[11px] font-black tracking-[0.15em] uppercase border-b-2 transition-all ${
                      sizeGroup === "adult" 
                        ? "border-foreground text-foreground" 
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Adult Sizes
                  </button>
                  <button
                    onClick={() => setSizeGroup("junior")}
                    className={`py-3 px-6 text-[11px] font-black tracking-[0.15em] uppercase border-b-2 transition-all ${
                      sizeGroup === "junior" 
                        ? "border-foreground text-foreground" 
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Junior Sizes
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {(sizeGroup === "adult" ? ADULT_SIZES : JUNIOR_SIZES).map((sz) => {
                    const isSelected = size === sz;
                    return (
                      <div
                        key={sz}
                        onClick={() => setSize(sz)}
                        className={`border cursor-pointer p-4 transition-all flex justify-between items-center rounded-sm ${
                          isSelected 
                            ? "border-primary bg-card font-bold text-foreground" 
                            : "border-[rgba(28,33,23,0.08)] bg-card text-foreground hover:border-primary/35"
                        }`}
                      >
                        <span className="text-[12px] uppercase tracking-[0.05em]">{sz}</span>
                        {isSelected && <Check size={14} className="text-foreground" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: SWEET SPOT */}
            {activeStep === 4 && (
              <div className="animate-fadeIn">
                <h3 style={DF} className="text-[20px] font-bold text-foreground uppercase mb-2">Sweet Spot Placement</h3>
                <p className="text-[13px] text-muted-foreground mb-8">
                  Click on the sections of the bat below or select from the list to define where you want the maximum wood thickness.
                </p>

                <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                  {/* Interactive Bat SVG Illustration */}
                  <div className="flex justify-center bg-background py-8 border border-[rgba(28,33,23,0.06)] rounded-sm">
                    <svg width="220" height="340" viewBox="0 0 220 340" className="select-none">
                      {/* Handle */}
                      <rect x="104" y="20" width="12" height="110" rx="4" fill="#cfc8bc" stroke="#11311e" strokeWidth="2.5" />
                      <line x1="104" y1="45" x2="116" y2="45" stroke="#11311e" strokeWidth="1.5" />
                      <line x1="104" y1="70" x2="116" y2="70" stroke="#11311e" strokeWidth="1.5" />
                      <line x1="104" y1="95" x2="116" y2="95" stroke="#11311e" strokeWidth="1.5" />
                      
                      {/* Handle Wrap detail */}
                      <path d="M 104,130 L 116,130" stroke="#11311e" strokeWidth="3" />

                      {/* Bat Blade Outline */}
                      <path d="M 104,130 Q 94,142 92,160 L 92,305 Q 92,320 110,320 Q 128,320 128,305 L 128,160 Q 126,142 116,130 Z" fill="#eae6db" stroke="#11311e" strokeWidth="2.5" />
                      
                      {/* Interactive Zones over the Blade */}
                      {/* Zone High */}
                      <path 
                        d="M 92,160 L 92,190 L 128,190 L 128,160 Q 126,145 116,132 L 104,132 Q 94,145 92,160"
                        className={`cursor-pointer transition-all duration-200 ${
                          sweetSpot === "High" 
                            ? "fill-[#11311e]/25 stroke-[#11311e] stroke-2" 
                            : "fill-transparent hover:fill-[#11311e]/5"
                        }`}
                        onClick={() => setSweetSpot("High")}
                      />
                      
                      {/* Zone Mid High */}
                      <rect 
                        x="92" y="190" width="36" height="30"
                        className={`cursor-pointer transition-all duration-200 ${
                          sweetSpot === "Mid High" 
                            ? "fill-[#11311e]/25 stroke-[#11311e] stroke-2" 
                            : "fill-transparent hover:fill-[#11311e]/5"
                        }`}
                        onClick={() => setSweetSpot("Mid High")}
                      />

                      {/* Zone Mid */}
                      <rect 
                        x="92" y="220" width="36" height="30"
                        className={`cursor-pointer transition-all duration-200 ${
                          sweetSpot === "Mid" 
                            ? "fill-[#11311e]/25 stroke-[#11311e] stroke-2" 
                            : "fill-transparent hover:fill-[#11311e]/5"
                        }`}
                        onClick={() => setSweetSpot("Mid")}
                      />

                      {/* Zone Mid Low */}
                      <rect 
                        x="92" y="250" width="36" height="30"
                        className={`cursor-pointer transition-all duration-200 ${
                          sweetSpot === "Mid Low" 
                            ? "fill-[#11311e]/25 stroke-[#11311e] stroke-2" 
                            : "fill-transparent hover:fill-[#11311e]/5"
                        }`}
                        onClick={() => setSweetSpot("Mid Low")}
                      />

                      {/* Zone Low */}
                      <path 
                        d="M 92,280 L 92,305 Q 92,320 110,320 Q 128,320 128,305 L 128,280 Z"
                        className={`cursor-pointer transition-all duration-200 ${
                          sweetSpot === "Low" 
                            ? "fill-[#11311e]/25 stroke-[#11311e] stroke-2" 
                            : "fill-transparent hover:fill-[#11311e]/5"
                        }`}
                        onClick={() => setSweetSpot("Low")}
                      />

                      {/* Floating Text indicating selected spot */}
                      {SWEET_SPOTS.map((s) => {
                        if (s.name !== sweetSpot) return null;
                        return (
                          <g key={s.name}>
                            <rect x="5" y={s.offsetPercent + 90} width="78" height="24" rx="3" fill="#11311e" />
                            <text x="44" y={s.offsetPercent + 105} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff" className="tracking-wider uppercase">{s.name}</text>
                            <line x1="83" y1={s.offsetPercent + 102} x2="92" y2={s.offsetPercent + 102} stroke="#11311e" strokeWidth="1.5" />
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Descriptions */}
                  <div className="flex flex-col gap-4">
                    {SWEET_SPOTS.map((s) => {
                      const isSelected = sweetSpot === s.name;
                      return (
                        <div
                          key={s.name}
                          onClick={() => setSweetSpot(s.name)}
                          className={`border cursor-pointer p-4 rounded-sm transition-all flex flex-col ${
                            isSelected 
                              ? "border-primary bg-card shadow-sm" 
                              : "border-[rgba(28,33,23,0.06)] bg-card hover:border-foreground/25"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] font-bold uppercase tracking-[0.05em] text-foreground">{s.label}</span>
                            {isSelected && <Check size={14} className="text-foreground" />}
                          </div>
                          <p className="text-[11px] leading-relaxed text-muted-foreground">{s.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: WEIGHT */}
            {activeStep === 5 && (
              <div className="animate-fadeIn">
                <h3 style={DF} className="text-[20px] font-bold text-foreground uppercase mb-2">Bat Weight Selection</h3>
                <p className="text-[13px] text-muted-foreground mb-6">
                  Select your exact target weight. Lighter weights offer maximum hand speed; heavier bats give additional drive power.
                </p>

                <div className="max-w-[400px] mb-8">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-foreground mb-2">
                    Weight Option
                  </label>
                  <select
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-background border border-[rgba(28,33,23,0.15)] rounded-sm py-3 px-4 text-[13px] text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-[#11311e] transition-colors"
                  >
                    <optgroup label="2 Pound Range (Most Common)">
                      {WEIGHTS_2LB.map((w) => (
                        <option key={w.val} value={w.val}>{w.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="1 Pound Range (Light / Juniors)">
                      {WEIGHTS_1LB.map((w) => (
                        <option key={w.val} value={w.val}>{w.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="3 Pound Range (Heavy / Training)">
                      {WEIGHTS_3LB.map((w) => (
                        <option key={w.val} value={w.val}>{w.label}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 6: HANDLE OPTIONS */}
            {activeStep === 6 && (
              <div className="animate-fadeIn">
                <h3 style={DF} className="text-[20px] font-bold text-foreground uppercase mb-2">Handle Customization</h3>
                <p className="text-[13px] text-muted-foreground mb-8">
                  Configure the grip shape and diameter. The handle is critical in defining how the bat picks up and reacts to your shots.
                </p>

                {/* Handle Shape */}
                <div className="mb-8">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-foreground mb-3">
                    Handle Shape
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(["Oval", "Semi Oval", "Round"] as HandleShapeOption[]).map((hShape) => {
                      const isSelected = handleShape === hShape;
                      return (
                        <div
                          key={hShape}
                          onClick={() => setHandleShape(hShape)}
                          className={`border cursor-pointer p-4 text-center rounded-sm transition-all ${
                            isSelected 
                              ? "border-primary bg-card font-bold text-foreground" 
                              : "border-[rgba(28,33,23,0.08)] bg-card text-foreground hover:border-primary/35"
                          }`}
                        >
                          <span className="text-[12px] uppercase tracking-[0.05em] block mb-1">{hShape}</span>
                          <span className="text-[9px] text-muted-foreground block normal-case font-normal">
                            {hShape === "Oval" && "Bottom-hand control"}
                            {hShape === "Semi Oval" && "Perfect all-rounder"}
                            {hShape === "Round" && "Top-hand dominant"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Handle Thickness */}
                <div className="mb-8">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-foreground mb-3">
                    Handle Thickness
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(["Thin", "Standard", "Thick"] as HandleThicknessOption[]).map((hThick) => {
                      const isSelected = handleThickness === hThick;
                      return (
                        <div
                          key={hThick}
                          onClick={() => setHandleThickness(hThick)}
                          className={`border cursor-pointer p-4 text-center rounded-sm transition-all ${
                            isSelected 
                              ? "border-primary bg-card font-bold text-foreground" 
                              : "border-[rgba(28,33,23,0.08)] bg-card text-foreground hover:border-primary/35"
                          }`}
                        >
                          <span className="text-[12px] uppercase tracking-[0.05em] block mb-1">{hThick}</span>
                          <span className="text-[9px] text-muted-foreground block normal-case font-normal">
                            {hThick === "Thin" && "For smaller hands"}
                            {hThick === "Standard" && "Industry standard"}
                            {hThick === "Thick" && "For large hands / shock absorption"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: PLAYER LEVEL & NOTES */}
            {activeStep === 7 && (
              <div className="animate-fadeIn">
                <h3 style={DF} className="text-[20px] font-bold text-foreground uppercase mb-2">Player Details & Notes</h3>
                <p className="text-[13px] text-muted-foreground mb-6">
                  Provide your playing level and any additional notes (e.g. style of play, specific edge dimensions or willow grades) so we can review your build.
                </p>

                {/* Player Level */}
                <div className="mb-6">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-foreground mb-3">
                    Your Playing Level
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["Beginner", "Recreational", "Club", "Professional"].map((lvl) => {
                      const isSelected = playerLevel === lvl;
                      return (
                        <div
                          key={lvl}
                          onClick={() => setPlayerLevel(lvl)}
                          className={`border cursor-pointer p-3 text-center rounded-sm transition-all ${
                            isSelected 
                              ? "border-primary bg-card font-bold text-foreground" 
                              : "border-[rgba(28,33,23,0.08)] bg-card text-foreground hover:border-primary/35"
                          }`}
                        >
                          <span className="text-[11px] uppercase tracking-[0.05em]">{lvl}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-8">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-foreground mb-2">
                    Additional Instructions / Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g. I prefer heavy back-foot driving, looking for a Grade 1+ English Willow with an orange grip if possible."
                    className="w-full bg-background border border-[rgba(28,33,23,0.15)] rounded-sm p-4 text-[13px] text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-[#11311e] transition-colors h-32 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Stepper controls */}
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 sm:gap-0 pt-6 border-t border-muted mt-8 w-full">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw size={12} /> Reset Form
              </button>
              
              <div className="flex gap-3 w-full sm:w-auto justify-between sm:justify-start">
                {activeStep > 1 && (
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="border border-[rgba(28,33,23,0.15)] text-foreground text-[10px] font-black tracking-[0.15em] uppercase px-5 py-3.5 hover:border-foreground/40 transition-colors"
                  >
                    Back
                  </button>
                )}
                {activeStep < totalSteps ? (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-[10px] font-black tracking-[0.15em] uppercase px-6 py-3.5 hover:bg-[#343b2d] transition-colors"
                  >
                    Next Step <ArrowRight size={12} />
                  </button>
                ) : (
                  <button
                    disabled={!ordersEnabled}
                    onClick={handleSubmitEnquiry}
                    className={`inline-flex items-center gap-2.5 text-primary-foreground text-[11px] font-black tracking-[0.15em] uppercase px-7 py-4 transition-colors ${
                      ordersEnabled 
                        ? "bg-foreground hover:bg-[#275c3f] cursor-pointer" 
                        : "bg-border cursor-not-allowed opacity-50"
                    }`}
                  >
                    <MessageCircle size={15} />
                    Submit Enquiry via WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: CONFIGURATION PREVIEW CARD */}
          <div className="sticky top-8 bg-primary text-primary-foreground border border-[rgba(163,124,86,0.3)] p-8 rounded-sm shadow-md">
            <h3 style={DF} className="text-[22px] font-black tracking-wide uppercase mb-6 text-primary-foreground border-b border-white/10 pb-4">
              Your Custom Bat Spec
            </h3>

            {/* Spec Details Grid */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between items-center text-[13px] border-b border-white/5 pb-2">
                <span className="text-primary-foreground/55 tracking-wider uppercase text-[10px] font-semibold">Willow</span>
                <span className="font-bold text-primary-foreground uppercase">{willowType}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] border-b border-white/5 pb-2">
                <span className="text-primary-foreground/55 tracking-wider uppercase text-[10px] font-semibold">Shape Profile</span>
                <span className="font-bold text-primary-foreground uppercase">{shape}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] border-b border-white/5 pb-2">
                <span className="text-primary-foreground/55 tracking-wider uppercase text-[10px] font-semibold">Size Length</span>
                <span className="font-bold text-primary-foreground uppercase">{size}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] border-b border-white/5 pb-2">
                <span className="text-primary-foreground/55 tracking-wider uppercase text-[10px] font-semibold">Sweet Spot</span>
                <span className="font-bold text-primary-foreground uppercase">{sweetSpot}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] border-b border-white/5 pb-2">
                <span className="text-primary-foreground/55 tracking-wider uppercase text-[10px] font-semibold">Target Weight</span>
                <span className="font-bold text-primary-foreground uppercase">{weight}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] border-b border-white/5 pb-2">
                <span className="text-primary-foreground/55 tracking-wider uppercase text-[10px] font-semibold">Handle Shape</span>
                <span className="font-bold text-primary-foreground uppercase">{handleShape}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] border-b border-white/5 pb-2">
                <span className="text-primary-foreground/55 tracking-wider uppercase text-[10px] font-semibold">Handle Thickness</span>
                <span className="font-bold text-primary-foreground uppercase">{handleThickness}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] border-b border-white/5 pb-2">
                <span className="text-primary-foreground/55 tracking-wider uppercase text-[10px] font-semibold">Player Level</span>
                <span className="font-bold text-primary-foreground uppercase">{playerLevel}</span>
              </div>
              <div className="text-[13px]">
                <span className="text-primary-foreground/55 tracking-wider uppercase text-[10px] font-semibold block mb-2">Instructions Summary</span>
                <p className="text-[11px] leading-relaxed text-primary-foreground/70 bg-primary p-3 rounded-sm italic border border-white/5 max-h-24 overflow-y-auto">
                  {notes.trim() || "No additional custom instructions specified."}
                </p>
              </div>
            </div>

            {/* Dynamic visual preview panel (3D / vector bat contour) */}
            <div className="bg-primary border border-white/10 rounded-sm p-6 text-center">
              <span className="text-[9px] tracking-[0.2em] text-primary/80 font-bold uppercase block mb-4">
                Dynamic Spec Rendering
              </span>
              
              <div className="flex justify-center items-center h-48 relative">
                {/* SVG profile rendering based on selections */}
                <svg width="120" height="180" viewBox="0 0 120 180">
                  {/* Grip */}
                  <rect 
                    x="56" y="10" width="8" height="60" 
                    fill={handleThickness === "Thin" ? "#ffffff" : handleThickness === "Thick" ? "#d29242" : "#9ca3af"} 
                    stroke="#ffffff" strokeWidth="0.5" 
                  />
                  {/* Handle Rings to indicate shape */}
                  {handleShape === "Oval" ? (
                    <ellipse cx="60" cy="40" rx="4" ry="2" fill="none" stroke="#a7e5b9" strokeWidth="1" />
                  ) : handleShape === "Semi Oval" ? (
                    <path d="M 57,40 Q 60,37 63,40" fill="none" stroke="#a7e5b9" strokeWidth="1" />
                  ) : (
                    <circle cx="60" cy="40" r="3" fill="none" stroke="#a7e5b9" strokeWidth="1" />
                  )}

                  {/* Shoulder */}
                  <path d="M 56,70 Q 30,75 30,90 L 30,170 Q 30,175 60,175 Q 90,175 90,170 L 90,90 Q 90,75 64,70 Z" fill="#cfc8bc" />

                  {/* Spine contour lines indicating concave depth */}
                  {shape === "Full Profile" && (
                    <path d="M 60,70 L 60,175 M 45,95 L 45,170 M 75,95 L 75,170" stroke="#ffffff" strokeWidth="0.75" opacity="0.3" fill="none" />
                  )}
                  {shape === "Semi Concaved" && (
                    <path d="M 60,70 L 60,175 M 48,95 Q 52,130 48,170 M 72,95 Q 68,130 72,170" stroke="#11311e" strokeWidth="0.75" opacity="0.4" fill="none" />
                  )}
                  {shape === "Concaved" && (
                    <path d="M 60,70 L 60,175 M 50,95 Q 56,130 50,170 M 70,95 Q 64,130 70,170" stroke="#11311e" strokeWidth="1.25" opacity="0.65" fill="none" />
                  )}

                  {/* Sweet spot highlight circle */}
                  <g>
                    {sweetSpot === "High" && <circle cx="60" cy="95" r="14" fill="#a7e5b9" fillOpacity="0.45" className="animate-pulse" />}
                    {sweetSpot === "Mid High" && <circle cx="60" cy="115" r="14" fill="#a7e5b9" fillOpacity="0.45" className="animate-pulse" />}
                    {sweetSpot === "Mid" && <circle cx="60" cy="130" r="14" fill="#a7e5b9" fillOpacity="0.45" className="animate-pulse" />}
                    {sweetSpot === "Mid Low" && <circle cx="60" cy="145" r="14" fill="#a7e5b9" fillOpacity="0.45" className="animate-pulse" />}
                    {sweetSpot === "Low" && <circle cx="60" cy="160" r="14" fill="#a7e5b9" fillOpacity="0.45" className="animate-pulse" />}
                  </g>
                </svg>
              </div>

              <span className="text-[10px] text-primary-foreground/50 block mt-2">
                * Illustrative mockup based on selected values
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

