"use client";

/**
 * Harinam Greens — Navbar
 * -----------------------------------------------------------------------
 * Design tokens (add to tailwind.config.ts if you want semantic names):
 *   forest  #1F3D2B   deep green   — logo text, nav text
 *   leaf    #4C8C4B   primary green— buttons, active states
 *   sprout  #8FBF6F   light green  — hover fills, chip bg
 *   mango   #E8A63B   accent       — badges, punch-hole tag dot
 *   cream   #FAF7F0   page bg
 *   soil    #5B4636   muted brown  — secondary text
 *
 * Fonts assumed (load via next/font, map in tailwind config):
 *   font-display -> "Sora"     (logo wordmark, headings)
 *   font-sans    -> "Inter"    (body/default)
 *   font-mono    -> "JetBrains Mono" (used for the phone number — reads
 *                    like a price/weight tag from a real vegetable market)
 *
 * Mix of shadcn/ui (Button, Sheet, DropdownMenu — interactive primitives)
 * and daisyUI (input, badge — quick styled elements) as requested.
 * Swap the icon-only cart button for your real cart route/state.
 */

import { useState } from "react";
import {
  Search,
  Phone,
  ChevronDown,
  Menu,
  ShoppingBasket,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CATEGORIES = ["Cabbage", "Potato", "Tomato", "Onion", "Leafy Greens"];
const LANGUAGES = ["English", "हिंदी", "ગુજરાતી"];
const PHONE_DISPLAY = "+91 95009 30590";
const PHONE_TEL = "+919500930590";

function Logo() {
  return (
    <a href="/" className="flex shrink-0 items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1F3D2B] text-[#E8A63B]">
        <Leaf className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-[#1F3D2B]">
          Harinam Greens
        </span>
        <span className="text-[11px] font-medium text-[#5B4636]">
          Fresh &amp; Healthy Vegetables
        </span>
      </span>
    </a>
  );
}

function SearchBar({
  className = "",
  showCategories = false,
}: {
  className?: string;
  showCategories?: boolean;
}) {
  return (
    <div className={className}>
      <label className="input input-bordered flex w-full items-center gap-2.5 rounded-full border-[#8FBF6F]/60 bg-white px-4 h-10 focus-within:border-[#4C8C4B]">
        <Search className="h-4 w-4 text-[#5B4636]/70 shrink-0" />
        <input
          type="text"
          placeholder="Search vegetables — tomato, aloo, palak…"
          className="grow bg-transparent text-sm outline-none placeholder:text-[#5B4636]/50 py-1"
        />
      </label>
      {showCategories && (
        <div className="mt-2 flex flex-wrap gap-2">
          {CATEGORIES.slice(0, 4).map((c) => (
            <button
              key={c}
              className="badge badge-outline rounded-full border-[#8FBF6F] px-3 py-1 text-xs font-medium text-[#1F3D2B] hover:bg-[#8FBF6F]/20 cursor-pointer"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [lang, setLang] = useState(LANGUAGES[0]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#8FBF6F]/30 bg-[#FAF7F0]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5 lg:px-8">
        <Logo />

        {/* Search — desktop only. mx-auto keeps it centered between Logo and Controls */}
        <SearchBar className="hidden min-w-0 flex-1 md:block md:max-w-md lg:max-w-lg mx-auto" />

        <div className="ml-auto flex shrink-0 items-center gap-3">
          {/* Language switch */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-[#1F3D2B] hover:bg-[#8FBF6F]/20 sm:flex cursor-pointer transition-colors">
                {lang}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LANGUAGES.map((l) => (
                <DropdownMenuItem key={l} onSelect={() => setLang(l)}>
                  {l}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Phone — click to call, hidden on small screens */}
          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-[#1F3D2B]/5 px-3.5 py-1.5 text-sm font-semibold text-[#1F3D2B] hover:bg-[#1F3D2B]/10 xl:flex transition-all"
          >
            <Phone className="h-3.5 w-3.5 text-[#4C8C4B]" />
            <span className="font-mono tracking-tight">{PHONE_DISPLAY}</span>
          </a>

          {/* Cart */}
          <button
            aria-label="Basket"
            className="relative flex h-9.5 w-9.5 items-center justify-center rounded-full text-[#1F3D2B] hover:bg-[#8FBF6F]/20 cursor-pointer transition-colors"
          >
            <ShoppingBasket className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E8A63B] text-[9px] font-bold text-[#1F3D2B]">
              0
            </span>
          </button>

          {/* Auth — desktop */}
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <Button
              variant="ghost"
              className="rounded-full text-[#1F3D2B] hover:bg-[#8FBF6F]/20 h-9 text-xs font-semibold px-4 cursor-pointer transition-colors"
            >
              Sign In
            </Button>
            <Button className="rounded-full bg-[#4C8C4B] hover:bg-[#1F3D2B] text-white h-9 text-xs font-semibold px-4 cursor-pointer transition-all">
              Sign Up
            </Button>
          </div>

          {/* Mobile menu menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="flex h-9.5 w-9.5 items-center justify-center rounded-full text-[#1F3D2B] hover:bg-[#8FBF6F]/20 md:hidden cursor-pointer transition-colors"
              >
                <Menu className="h-5.5 w-5.5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#FAF7F0]">
              <div className="mt-8 flex flex-col gap-6">
                <SearchBar />
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <span
                      key={c}
                      className="badge badge-outline rounded-full border-[#8FBF6F] px-3 py-1.5 text-xs text-[#1F3D2B]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center gap-2 text-sm font-semibold text-[#1F3D2B]"
                >
                  <Phone className="h-4 w-4" />
                  <span className="font-mono">{PHONE_DISPLAY}</span>
                </a>
                <div className="flex flex-col gap-2">
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-[#4C8C4B] text-[#1F3D2B] h-10 text-sm"
                    >
                      Sign In
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className="w-full rounded-full bg-[#4C8C4B] text-white hover:bg-[#1F3D2B] h-10 text-sm">
                      Sign Up
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}