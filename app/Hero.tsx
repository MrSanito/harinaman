/**
 * Harinam Greens — Hero
 * -----------------------------------------------------------------------
 * Signature element: the "market tag" — a rotated chip with a punched
 * circle on its left edge, like a real price/weight tag clipped to a
 * vegetable crate. Reused for the eyebrow, the quick-benefit chips, the
 * floating badges on the illustration, and the feature strip below —
 * one motif, used consistently instead of four different card styles.
 *
 * Same color/font tokens as Navbar.tsx (see comment there).
 * Uses shadcn/ui Button for the two CTAs, daisyUI's `badge` base class
 * for the tag chips.
 */

import { ShoppingBasket, MessageCircle, ShieldCheck, Truck, Leaf, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHONE_TEL = "+919500930590";

function Tag({
  icon: Icon,
  children,
  className = "",
}: {
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`badge relative gap-1.5 rounded-full border border-[#8FBF6F]/70 bg-white px-4 py-3 text-xs font-semibold text-[#1F3D2B] ${className}`}
    >
      <span className="absolute -left-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-[#8FBF6F]/70 bg-[#FAF7F0]" />
      {Icon && <Icon className="h-3.5 w-3.5 text-[#4C8C4B]" />}
      {children}
    </span>
  );
}

function CrateIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <svg viewBox="0 0 400 360" className="w-full drop-shadow-xl">
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8FBF6F" />
            <stop offset="100%" stopColor="#4C8C4B" />
          </linearGradient>
        </defs>

        {/* backdrop blob */}
        <rect x="0" y="0" width="400" height="360" rx="32" fill="url(#bgGrad)" />

        {/* crate */}
        <g>
          <rect x="55" y="190" width="290" height="120" rx="10" fill="#5B4636" />
          {[210, 230, 250, 270, 290].map((y) => (
            <rect key={y} x="65" y={y} width="270" height="8" rx="4" fill="#7A5A45" />
          ))}
          <rect x="55" y="190" width="290" height="18" rx="9" fill="#6B4B37" />
        </g>

        {/* leafy greens */}
        <g>
          <path d="M110 195 C90 150, 120 110, 150 130 C165 100, 195 110, 190 145 C215 140, 220 175, 195 190 Z" fill="#1F3D2B" />
          <path d="M120 190 C110 165, 130 145, 145 155" stroke="#8FBF6F" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>

        {/* tomato */}
        <circle cx="210" cy="165" r="34" fill="#E8543B" />
        <path d="M198 138 Q210 122 222 138" stroke="#1F3D2B" strokeWidth="5" fill="none" strokeLinecap="round" />

        {/* carrot */}
        <g transform="rotate(18 290 175)">
          <path d="M275 150 L305 150 L290 210 Z" fill="#E8A63B" />
          <path d="M285 150 L280 128 M290 150 L290 122 M295 150 L300 128" stroke="#4C8C4B" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>

      {/* floating tags */}
      <Tag icon={ShieldCheck} className="absolute -left-3 top-6 rotate-[-6deg] shadow-md">
        100% Quality
      </Tag>
      <Tag icon={Heart} className="absolute -right-3 bottom-10 rotate-[5deg] shadow-md">
        Trusted
      </Tag>
    </div>
  );
}

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "100% Quality Guarantee",
    body: "Every batch checked before it leaves the farm.",
  },
  {
    icon: Truck,
    title: "Order a Day Ahead",
    body: "Get free home delivery, fresh at your door.",
  },
  {
    icon: Leaf,
    title: "Fresh & Healthy",
    body: "Picked fresh, never stored, never stale.",
  },
  {
    icon: Heart,
    title: "Trusted",
    body: "Loved by families across the neighbourhood.",
  },
];

export default function Hero() {
  return (
    <section className="bg-[#FAF7F0]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* Left — copy */}
        <div>
          <Tag icon={Leaf} className="mb-5">
            Farm to Doorstep
          </Tag>

          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#1F3D2B] sm:text-5xl lg:text-6xl">
            Fresh vegetables,
            <br />
            delivered to your door.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-[#5B4636]">
            Straight from local farms to your kitchen. Choose your vegetables
            by weight, fill your basket, and order in minutes — online or on
            WhatsApp.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Tag>🌿 Eat Fresh</Tag>
            <Tag>💚 Live Healthy</Tag>
            <Tag>⏱️ Save Time</Tag>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="rounded-full bg-[#4C8C4B] px-7 text-white hover:bg-[#1F3D2B]"
            >
              <ShoppingBasket className="mr-2 h-4 w-4" />
              Order Now
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-[#4C8C4B] px-7 text-[#1F3D2B] hover:bg-[#8FBF6F]/20"
            >
              <a href={`https://wa.me/${PHONE_TEL.replace("+", "")}`}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Order on WhatsApp
              </a>
            </Button>
          </div>
        </div>

        {/* Right — illustration */}
        <CrateIllustration />
      </div>

      {/* Feature strip */}
      <div className="border-t border-[#8FBF6F]/30 bg-white/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 lg:px-8">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#8FBF6F]/25 text-[#1F3D2B]">
                <Icon className="h-5 w-5" />
              </span>
              <p className="font-display text-sm font-bold text-[#1F3D2B]">
                {title}
              </p>
              <p className="text-xs leading-relaxed text-[#5B4636]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}