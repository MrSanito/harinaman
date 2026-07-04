"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

// Vegetable Data definition
interface Product {
  id: string;
  nameEn: string;
  nameGu: string;
  category: "Vegetable" | "Leafy" | "Fruit/Veg" | "Sprouts" | "Dairy";
  prices: { [weight: string]: number };
  svgType: string;
  imageUrl?: string;
}

interface CartItem {
  productId: string;
  nameEn: string;
  nameGu: string;
  weight: string;
  price: number;
  quantity: number;
  svgType: string;
}

export default function Home() {
  const { user, logout, isLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWhatsAppPickerOpen, setIsWhatsAppPickerOpen] = useState(false);
  const [selectedWeights, setSelectedWeights] = useState<{ [productId: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Auto-hide toast after 2 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const products: Product[] = [
    {
      id: "veg_potato",
      nameEn: "Potato",
      nameGu: "બટાકા",
      category: "Vegetable",
      prices: { "250g": 10, "500g": 20, "1kg": 30 },
      svgType: "potato",
      imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80",
    },
    {
      id: "veg_onion",
      nameEn: "Onion",
      nameGu: "ડુંગળી",
      category: "Vegetable",
      prices: { "250g": 15, "500g": 25, "1kg": 40 },
      svgType: "onion",
      imageUrl: "https://images.unsplash.com/photo-1508747703725-719777637510?w=300&q=80",
    },
    {
      id: "veg_locker_potato",
      nameEn: "Locker Potato",
      nameGu: "લોકર બટાકા",
      category: "Vegetable",
      prices: { "250g": 15, "500g": 25, "1kg": 45 },
      svgType: "potato",
      imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80",
    },
    {
      id: "veg_brinjal",
      nameEn: "Brinjal",
      nameGu: "રીંગણ",
      category: "Vegetable",
      prices: { "250g": 20, "500g": 30, "1kg": 50 },
      svgType: "brinjal",
      imageUrl: "https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?w=300&q=80",
    },
    {
      id: "veg_tomatoes",
      nameEn: "Tomatoes",
      nameGu: "ટામેટા",
      category: "Vegetable",
      prices: { "250g": 25, "500g": 40, "1kg": 80 },
      svgType: "tomato",
      imageUrl: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300&q=80",
    },
    {
      id: "veg_cabbage",
      nameEn: "Cabbage",
      nameGu: "કોબીજ",
      category: "Vegetable",
      prices: { "250g": 25, "500g": 40, "1kg": 80 },
      svgType: "cabbage",
      imageUrl: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=300&q=80",
    },
    {
      id: "veg_cauliflower",
      nameEn: "Cauliflower",
      nameGu: "ફુલાવર",
      category: "Vegetable",
      prices: { "250g": 40, "500g": 75, "1kg": 130 },
      svgType: "cauliflower",
      imageUrl: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=300&q=80",
    },
    {
      id: "veg_bottle_gourd",
      nameEn: "Bottle Gourd",
      nameGu: "દૂધી",
      category: "Vegetable",
      prices: { "250g": 20, "500g": 30, "1kg": 50 },
      svgType: "gourd",
      imageUrl: "https://images.unsplash.com/photo-1596887235673-50baf80e6b2b?w=300&q=80",
    },
    {
      id: "veg_luffa_gourd",
      nameEn: "Luffa Gourd",
      nameGu: "ગલકા",
      category: "Vegetable",
      prices: { "250g": 20, "500g": 30, "1kg": 55 },
      svgType: "gourd",
    },
    {
      id: "veg_bitter_gourd",
      nameEn: "Bitter Gourd",
      nameGu: "કારેલા",
      category: "Vegetable",
      prices: { "250g": 35, "500g": 65, "1kg": 110 },
      svgType: "bittergourd",
    },
    {
      id: "veg_lady_finger",
      nameEn: "Lady Finger",
      nameGu: "ભીંડા",
      category: "Vegetable",
      prices: { "250g": 25, "500g": 40, "1kg": 75 },
      svgType: "bean",
      imageUrl: "https://images.unsplash.com/photo-1521115713617-3e6bf0f2ff19?w=300&q=80",
    },
    {
      id: "veg_pointed_gourd",
      nameEn: "Pointed Gourd",
      nameGu: "પરવર",
      category: "Vegetable",
      prices: { "250g": 30, "500g": 60, "1kg": 100 },
      svgType: "gourd",
    },
    {
      id: "veg_peas",
      nameEn: "Peas",
      nameGu: "વટાણા",
      category: "Vegetable",
      prices: { "250g": 50, "500g": 90, "1kg": 160 },
      svgType: "peas",
      imageUrl: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=300&q=80",
    },
    {
      id: "veg_ivy_gourd",
      nameEn: "Ivy Gourd",
      nameGu: "ટીંડોળા",
      category: "Vegetable",
      prices: { "250g": 30, "500g": 55, "1kg": 100 },
      svgType: "gourd",
    },
    {
      id: "veg_pigeon_peas",
      nameEn: "Pigeon Peas",
      nameGu: "તુવેર",
      category: "Vegetable",
      prices: { "250g": 50, "500g": 90, "1kg": 150 },
      svgType: "peas",
    },
    {
      id: "veg_cluster_beans",
      nameEn: "Cluster Beans",
      nameGu: "ગુવાર",
      category: "Vegetable",
      prices: { "250g": 25, "500g": 45, "1kg": 85 },
      svgType: "bean",
    },
    {
      id: "veg_flat_beans",
      nameEn: "Flat Beans",
      nameGu: "વાલોર પાપડી",
      category: "Vegetable",
      prices: { "250g": 45, "500g": 80, "1kg": 150 },
      svgType: "bean",
    },
    {
      id: "veg_green_bean",
      nameEn: "Green Bean",
      nameGu: "ચોળી",
      category: "Vegetable",
      prices: { "250g": 45, "500g": 80, "1kg": 150 },
      svgType: "bean",
    },
    {
      id: "veg_carrot",
      nameEn: "Carrot",
      nameGu: "ગાજર",
      category: "Vegetable",
      prices: { "250g": 20, "500g": 35, "1kg": 55 },
      svgType: "carrot",
      imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&q=80",
    },
    {
      id: "veg_cucumber",
      nameEn: "Cucumber",
      nameGu: "કાકડી",
      category: "Vegetable",
      prices: { "250g": 25, "500g": 50, "1kg": 80 },
      svgType: "cucumber",
      imageUrl: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=300&q=80",
    },
    {
      id: "veg_beetroot",
      nameEn: "Beetroot",
      nameGu: "બીટ",
      category: "Vegetable",
      prices: { "250g": 20, "500g": 35, "1kg": 55 },
      svgType: "beetroot",
    },
    {
      id: "veg_capsicum",
      nameEn: "Capsicum",
      nameGu: "શિમલા",
      category: "Vegetable",
      prices: { "250g": 35, "500g": 70, "1kg": 140 },
      svgType: "pepper",
    },
    {
      id: "veg_chili",
      nameEn: "Chili",
      nameGu: "મરચાં",
      category: "Vegetable",
      prices: { "250g": 25, "500g": 45, "1kg": 85 },
      svgType: "chili",
    },
    {
      id: "veg_hot_chili",
      nameEn: "Hot Chili",
      nameGu: "તીખા મરચાં",
      category: "Vegetable",
      prices: { "250g": 35, "500g": 65, "1kg": 120 },
      svgType: "chili",
    },
    {
      id: "veg_ginger",
      nameEn: "Ginger",
      nameGu: "આદુ",
      category: "Vegetable",
      prices: { "250g": 50, "500g": 90, "1kg": 170 },
      svgType: "ginger",
      imageUrl: "https://images.unsplash.com/photo-1615485500704-8e990f9900f6?w=300&q=80",
    },
    {
      id: "veg_lemon",
      nameEn: "Lemon",
      nameGu: "લીંબુ",
      category: "Vegetable",
      prices: { "250g": 40, "500g": 85, "1kg": 150 },
      svgType: "lemon",
    },
    {
      id: "leaf_coriander",
      nameEn: "Coriander",
      nameGu: "ધાણા",
      category: "Leafy",
      prices: { "250g": 30, "500g": 55, "1kg": 100 },
      svgType: "leafy",
      imageUrl: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=300&q=80",
    },
    {
      id: "leaf_fenugreek",
      nameEn: "Fenugreek",
      nameGu: "મેથી",
      category: "Leafy",
      prices: { "250g": 35, "500g": 65, "1kg": 120 },
      svgType: "leafy",
      imageUrl: "https://images.unsplash.com/photo-1603048297172-7c72a7c76f1a?w=300&q=80",
    },
    {
      id: "leaf_spinach",
      nameEn: "Spinach",
      nameGu: "પાલક",
      category: "Leafy",
      prices: { "250g": 20, "500g": 35, "1kg": 60 },
      svgType: "spinach",
      imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&q=80",
    },
    {
      id: "leaf_amaranth",
      nameEn: "Amaranth Leaves",
      nameGu: "તાંદળજાની ભાજી",
      category: "Leafy",
      prices: { "250g": 25, "500g": 45, "1kg": 70 },
      svgType: "leafy",
    },
    {
      id: "leaf_peppermint",
      nameEn: "Peppermint",
      nameGu: "ફુદીનો",
      category: "Leafy",
      prices: { "250g": 35, "500g": 60, "1kg": 110 },
      svgType: "leafy",
    },
    {
      id: "fv_raw_mango",
      nameEn: "Raw Mango",
      nameGu: "કાચી કેરી",
      category: "Fruit/Veg",
      prices: { "250g": 25, "500g": 45, "1kg": 80 },
      svgType: "mango",
      imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&q=80",
    },
    {
      id: "veg_corn",
      nameEn: "Corn",
      nameGu: "મકાઈ",
      category: "Vegetable",
      prices: { "250g": 20, "500g": 35, "1kg": 60 },
      svgType: "corn",
      imageUrl: "https://images.unsplash.com/photo-1601593768793-bb1c8f0c8e46?w=300&q=80",
    },
    {
      id: "veg_drumstick",
      nameEn: "Drumstick",
      nameGu: "સરગવો",
      category: "Vegetable",
      prices: { "250g": 35, "500g": 60, "1kg": 110 },
      svgType: "bean",
    },
    {
      id: "leaf_spring_onion",
      nameEn: "Spring Onion",
      nameGu: "લીલી ડુંગળી",
      category: "Leafy",
      prices: { "250g": 30, "500g": 50, "1kg": 90 },
      svgType: "onion",
    },
    {
      id: "veg_elephant_yam",
      nameEn: "Elephant Yam",
      nameGu: "સૂરણ",
      category: "Vegetable",
      prices: { "250g": 30, "500g": 55, "1kg": 90 },
      svgType: "potato",
    },
    {
      id: "leaf_dill",
      nameEn: "Dill Leaves",
      nameGu: "સુવાની ભાજી",
      category: "Leafy",
      prices: { "250g": 35, "500g": 70, "1kg": 140 },
      svgType: "leafy",
    },
    {
      id: "veg_green_brinjal",
      nameEn: "Green Brinjal",
      nameGu: "લીલા રીંગણ",
      category: "Vegetable",
      prices: { "250g": 20, "500g": 30, "1kg": 55 },
      svgType: "brinjal",
    },
    {
      id: "veg_french_beans",
      nameEn: "French Beans",
      nameGu: "ફણસી",
      category: "Vegetable",
      prices: { "250g": 40, "500g": 90, "1kg": 140 },
      svgType: "bean",
    },
    {
      id: "veg_ridge_gourd",
      nameEn: "Ridge Gourd",
      nameGu: "તુરીયા",
      category: "Vegetable",
      prices: { "250g": 40, "500g": 75, "1kg": 130 },
      svgType: "gourd",
    },
    {
      id: "veg_raw_banana",
      nameEn: "Raw Banana",
      nameGu: "કાચા કેળા",
      category: "Vegetable",
      prices: { "250g": 10, "500g": 25, "1kg": 40 },
      svgType: "banana",
    },
    {
      id: "veg_pumpkin",
      nameEn: "Pumpkin",
      nameGu: "કોળું",
      category: "Vegetable",
      prices: { "250g": 30, "500g": 55, "1kg": 90 },
      svgType: "pumpkin",
    },
    {
      id: "veg_garlic",
      nameEn: "Garlic",
      nameGu: "લસણ",
      category: "Vegetable",
      prices: { "250g": 60, "500g": 120, "1kg": 200 },
      svgType: "garlic",
    },
    {
      id: "leaf_lemongrass",
      nameEn: "Lemongrass",
      nameGu: "લીલી ચા",
      category: "Leafy",
      prices: { "250g": 25, "500g": 45, "1kg": 80 },
      svgType: "leafy",
    },
    {
      id: "leaf_colocasia",
      nameEn: "Colocasia Leaves",
      nameGu: "પતરવેલિ પાન",
      category: "Leafy",
      prices: { "250g": 35, "500g": 70, "1kg": 130 },
      svgType: "leafy",
    },
    {
      id: "spr_moth",
      nameEn: "Sprouted Moth Beans",
      nameGu: "ફણગાવેલા મઠ",
      category: "Sprouts",
      prices: { "250g": 30, "500g": 60, "1kg": 90 },
      svgType: "sprouts",
      imageUrl: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=300&q=80",
    },
    {
      id: "spr_mung",
      nameEn: "Sprouted Mung Beans",
      nameGu: "ફણગાવેલા મગ",
      category: "Sprouts",
      prices: { "250g": 30, "500g": 60, "1kg": 90 },
      svgType: "sprouts",
      imageUrl: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=300&q=80",
    },
    {
      id: "spr_chickpeas",
      nameEn: "Sprouted Chickpeas",
      nameGu: "ફણગાવેલા ચણા",
      category: "Sprouts",
      prices: { "250g": 30, "500g": 60, "1kg": 90 },
      svgType: "sprouts",
      imageUrl: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=300&q=80",
    },
    {
      id: "veg_taro_root",
      nameEn: "Taro Root",
      nameGu: "અળવી",
      category: "Vegetable",
      prices: { "250g": 25, "500g": 45, "1kg": 80 },
      svgType: "potato",
    },
    {
      id: "veg_green_garlic",
      nameEn: "Green Garlic",
      nameGu: "લીલું લસણ",
      category: "Vegetable",
      prices: { "250g": 20, "500g": 35, "1kg": 60 },
      svgType: "garlic",
    },
    {
      id: "veg_mushroom",
      nameEn: "Mushroom",
      nameGu: "મશરૂમ",
      category: "Vegetable",
      prices: { "200g_packet": 65 },
      svgType: "mushroom",
      imageUrl: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=300&q=80",
    },
    {
      id: "dairy_cow_ghee",
      nameEn: "Pure Cow Ghee",
      nameGu: "શુદ્ધ ગાયનું ઘી",
      category: "Dairy",
      prices: { "1kg": 1200 },
      svgType: "ghee",
      imageUrl: "https://images.unsplash.com/photo-1631897642040-db065be6bf7d?w=300&q=80",
    },
    {
      id: "dairy_buffalo_ghee",
      nameEn: "Pure Buffalo Ghee",
      nameGu: "શુદ્ધ ભેંસનું ઘી",
      category: "Dairy",
      prices: { "1kg": 1000 },
      svgType: "ghee",
      imageUrl: "https://images.unsplash.com/photo-1631897642040-db065be6bf7d?w=300&q=80",
    },
  ];

  // SVG Renderers for Products
  const renderVegSVG = (type: string, name?: string) => {
    const isGreenBrinjal = name?.toLowerCase().includes("green brinjal");
    switch (type) {
      case "tomato":
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <defs>
              <radialGradient id="tomatoGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ff4d4d" />
                <stop offset="60%" stopColor="#e60000" />
                <stop offset="100%" stopColor="#990000" />
              </radialGradient>
              <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7cd93d" />
                <stop offset="100%" stopColor="#088D36" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="56" r="34" fill="url(#tomatoGrad)" />
            <ellipse cx="38" cy="40" rx="8" ry="4" transform="rotate(-30 38 40)" fill="#ffffff" fillOpacity="0.6" />
            <path d="M50 25 C50 25, 45 15, 38 18 C45 20, 48 24, 50 25" fill="url(#stemGrad)" />
            <path d="M50 25 C50 25, 55 15, 62 18 C55 20, 52 24, 50 25" fill="url(#stemGrad)" />
            <path d="M50 25 C50 25, 40 25, 34 29 C40 28, 46 27, 50 25" fill="url(#stemGrad)" />
            <path d="M50 25 C50 25, 60 25, 66 29 C60 28, 54 27, 50 25" fill="url(#stemGrad)" />
            <circle cx="50" cy="24" r="3" fill="#5F802C" />
          </svg>
        );
      case "spinach":
      case "leafy":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
            </defs>
            <path d="M25 65 C10 45, 20 20, 45 42 C45 42, 35 60, 25 65" fill="url(#leafGrad1)" opacity="0.8" />
            <path d="M75 65 C90 45, 80 20, 55 42 C55 42, 65 60, 75 65" fill="url(#leafGrad1)" opacity="0.9" />
            <path d="M50 80 C32 55, 35 25, 50 20 C65 25, 68 55, 50 80Z" fill="url(#leafGrad1)" />
            <path d="M50 75 L50 24" stroke="#e2f8d8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 60 L38 50" stroke="#e2f8d8" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M50 60 L62 50" stroke="#e2f8d8" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M50 48 L40 40" stroke="#e2f8d8" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M50 48 L60 40" stroke="#e2f8d8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case "potato":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d5a96c" />
                <stop offset="100%" stopColor="#805b2a" />
              </linearGradient>
            </defs>
            <path d="M22 45 C15 30, 45 15, 75 22 C90 30, 85 65, 70 78 C50 88, 25 80, 20 68 C15 58, 28 52, 22 45Z" fill="url(#potGrad)" />
            <circle cx="35" cy="35" r="2" fill="#5c3f1a" opacity="0.6" />
            <circle cx="68" cy="40" r="1.5" fill="#5c3f1a" opacity="0.6" />
            <circle cx="55" cy="65" r="2" fill="#5c3f1a" opacity="0.6" />
            <circle cx="32" cy="60" r="1.5" fill="#5c3f1a" opacity="0.6" />
          </svg>
        );
      case "carrot":
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" transform="rotate(15)">
            <defs>
              <linearGradient id="carrotGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff9f43" />
                <stop offset="100%" stopColor="#d35400" />
              </linearGradient>
            </defs>
            <path d="M42 28 C42 28, 38 12, 45 4 C48 10, 46 22, 46 28" fill="#22c55e" />
            <path d="M50 28 C50 28, 50 8, 54 2 C56 8, 54 20, 52 28" fill="#16a34a" />
            <path d="M42 30 C45 28, 55 28, 58 30 C62 45, 54 82, 50 94 C46 82, 38 45, 42 30Z" fill="url(#carrotGrad)" />
            <path d="M42 42 Q48 40 55 43" stroke="#e67e22" strokeWidth="2" strokeLinecap="round" />
            <path d="M41 55 Q47 53 54 57" stroke="#e67e22" strokeWidth="2" strokeLinecap="round" />
            <path d="M43 68 Q49 67 53 71" stroke="#e67e22" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "onion":
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="onionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="70%" stopColor="#db2777" />
                <stop offset="100%" stopColor="#831843" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="55" r="32" fill="url(#onionGrad)" />
            <path d="M50 23 L50 14 M44 23 L38 15 M56 23 L62 15" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 87 L50 92 M46 87 L43 91 M54 87 L57 91" stroke="#ddb892" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M30 55 Q50 35 70 55" stroke="#fbcfe8" strokeWidth="1.2" fill="none" opacity="0.3" />
            <path d="M35 65 Q50 45 65 65" stroke="#fbcfe8" strokeWidth="1.2" fill="none" opacity="0.3" />
          </svg>
        );
      case "brinjal":
        const startColor = isGreenBrinjal ? "#86efac" : "#c084fc";
        const stopColor = isGreenBrinjal ? "#15803d" : "#581c87";
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="brinjalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={startColor} />
                <stop offset="100%" stopColor={stopColor} />
              </linearGradient>
            </defs>
            <path d="M50 20 C52 24, 58 26, 58 35 C58 60, 78 78, 50 86 C22 78, 42 60, 42 35 C42 26, 48 24, 50 20Z" fill="url(#brinjalGrad)" />
            <path d="M50 10 Q52 16 50 22" stroke="#15803d" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M40 23 C45 22, 50 26, 50 26 C50 26, 55 22, 60 23 C55 27, 50 28, 50 28 C50 28, 45 27, 40 23Z" fill="#166534" />
            <ellipse cx="46" cy="45" rx="4" ry="10" transform="rotate(-15 46 45)" fill="#ffffff" fillOpacity="0.25" />
          </svg>
        );
      case "cabbage":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="cabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a3e635" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
            </defs>
            <path d="M15 50 C12 30, 35 15, 50 30 C30 35, 25 65, 30 80 C20 75, 18 65, 15 50Z" fill="url(#cabGrad)" />
            <path d="M85 50 C88 30, 65 15, 50 30 C70 35, 75 65, 70 80 C80 75, 82 65, 85 50Z" fill="url(#cabGrad)" />
            <circle cx="50" cy="54" r="26" fill="url(#cabGrad)" />
            <path d="M50 28 C42 38, 44 64, 50 80" stroke="#f7fee7" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M50 48 Q38 42 30 45" stroke="#f7fee7" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M50 48 Q62 42 70 45" stroke="#f7fee7" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          </svg>
        );
      case "cauliflower":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="caulLeaves" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
            </defs>
            <path d="M18 52 C15 32, 40 22, 50 35 C28 40, 24 68, 30 82" fill="url(#caulLeaves)" />
            <path d="M82 52 C85 32, 60 22, 50 35 C72 40, 76 68, 70 82" fill="url(#caulLeaves)" />
            <path d="M30 75 C40 85, 60 85, 70 75" fill="url(#caulLeaves)" />
            {/* Florets head */}
            <circle cx="50" cy="48" r="20" fill="#fef08a" opacity="0.95" />
            <circle cx="38" cy="54" r="14" fill="#fef08a" opacity="0.95" />
            <circle cx="62" cy="54" r="14" fill="#fef08a" opacity="0.95" />
            <circle cx="44" cy="38" r="12" fill="#fef08a" opacity="0.95" />
            <circle cx="56" cy="38" r="12" fill="#fef08a" opacity="0.95" />
          </svg>
        );
      case "gourd":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none" transform="rotate(-15)">
            <defs>
              <linearGradient id="gourdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="50%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
            </defs>
            <path d="M25 42 C20 30, 80 18, 85 30 C90 42, 30 55, 25 42Z" fill="url(#gourdGrad)" />
            <path d="M18 42 L25 41" stroke="#14532d" strokeWidth="3" strokeLinecap="round" />
            <path d="M28 35 Q50 25 72 30" stroke="#f0fdf4" strokeWidth="1.5" fill="none" opacity="0.4" />
            <path d="M30 43 Q55 35 78 38" stroke="#f0fdf4" strokeWidth="1.5" fill="none" opacity="0.4" />
          </svg>
        );
      case "bittergourd":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none" transform="rotate(-15)">
            <defs>
              <linearGradient id="bitterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#14532d" />
              </linearGradient>
            </defs>
            {/* Main Bumpy gourd outline */}
            <path d="M20 45 C15 35, 78 20, 84 30 C90 40, 25 55, 20 45Z" fill="url(#bitterGrad)" />
            {/* Spikes */}
            <path d="M30 31 L32 27 L35 31 M42 27 L44 23 L47 27 M55 26 L57 22 L60 26 M68 28 L70 24 L73 28 M35 44 L37 48 L40 44 M48 43 L50 47 L53 43 M60 41 L62 45 L65 41" stroke="#15803d" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M14 45 L20 44" stroke="#14532d" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case "bean":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none">
            <path d="M35 25 C32 45, 45 75, 45 75 C45 75, 48 45, 40 25" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M45 23 C42 43, 55 77, 55 77 C55 77, 58 43, 50 23" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M55 27 C52 47, 62 73, 62 73 C62 73, 66 47, 60 27" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </svg>
        );
      case "peas":
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="peasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
            </defs>
            <path d="M15 48 C20 38, 75 32, 85 45 C75 58, 20 58, 15 48Z" fill="url(#peasGrad)" />
            {/* Pea seeds */}
            <circle cx="32" cy="45" r="5" fill="#a3e635" />
            <circle cx="45" cy="45" r="5.5" fill="#a3e635" />
            <circle cx="58" cy="45" r="5.5" fill="#a3e635" />
            <circle cx="70" cy="45" r="5" fill="#a3e635" />
            {/* Pod opening */}
            <path d="M15 48 Q50 38 85 45" stroke="#14532d" strokeWidth="1.5" fill="none" />
            <path d="M15 48 Q50 58 85 45" stroke="#14532d" strokeWidth="1.5" fill="none" />
          </svg>
        );
      case "cucumber":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none" transform="rotate(-10)">
            <defs>
              <linearGradient id="cucGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
            </defs>
            <path d="M20 40 C20 30, 80 25, 80 35 C80 45, 20 50, 20 40Z" fill="url(#cucGrad)" />
            {/* Stripes */}
            <path d="M26 36 Q50 32 74 33" stroke="#86efac" strokeWidth="1.5" fill="none" opacity="0.3" />
            <path d="M26 44 Q50 41 74 39" stroke="#86efac" strokeWidth="1.5" fill="none" opacity="0.3" />
            <circle cx="83" cy="33" r="2" fill="#d9f99d" />
          </svg>
        );
      case "beetroot":
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="beetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a21caf" />
                <stop offset="60%" stopColor="#701a75" />
                <stop offset="100%" stopColor="#4a044e" />
              </linearGradient>
            </defs>
            {/* Stems */}
            <path d="M50 40 Q40 22 36 10 M50 40 Q50 20 52 8 M50 40 Q60 22 64 12" stroke="#be123c" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Leaves */}
            <path d="M36 10 C32 15, 25 10, 36 2" fill="#15803d" opacity="0.8" />
            <path d="M52 8 C55 12, 60 5, 52 0" fill="#16a34a" />
            <path d="M64 12 C68 17, 72 12, 64 4" fill="#15803d" opacity="0.8" />
            {/* Root body */}
            <path d="M50 32 C68 32, 75 48, 65 72 C58 84, 52 92, 50 95 C48 92, 42 84, 35 72 C25 48, 32 32, 50 32Z" fill="url(#beetGrad)" />
            {/* Root ring lines */}
            <path d="M38 52 Q50 58 62 52" stroke="#f472b6" strokeWidth="1.5" fill="none" opacity="0.25" />
            <path d="M42 66 Q50 71 58 66" stroke="#f472b6" strokeWidth="1.5" fill="none" opacity="0.25" />
          </svg>
        );
      case "pepper":
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="pepperGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
            </defs>
            <path d="M35 35 C20 35, 20 65, 35 75 C45 75, 48 65, 48 55 C48 45, 45 35, 35 35Z" fill="url(#pepperGreen)" />
            <path d="M45 35 C38 35, 38 65, 45 75 C52 75, 55 65, 55 55 C55 45, 52 35, 45 35Z" fill="url(#pepperGreen)" opacity="0.9" />
            <path d="M43 32 C41 28, 44 22, 43 18" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="28" cy="45" rx="3" ry="7" transform="rotate(-15 28 45)" fill="#ffffff" fillOpacity="0.3" />
          </svg>
        );
      case "chili":
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="chiliRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>
            <path d="M35 25 Q32 60 62 82 Q65 84 62 84 Q22 65 35 25" fill="url(#chiliRed)" />
            <path d="M35 25 Q38 18 36 12" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="35" cy="25" r="3" fill="#166534" />
          </svg>
        );
      case "ginger":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="gingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e7c8a0" />
                <stop offset="100%" stopColor="#bfa07a" />
              </linearGradient>
            </defs>
            {/* Gnarly bulbous lobes */}
            <path d="M25 45 C20 38, 38 28, 45 35 C52 28, 62 30, 58 42 C64 36, 75 42, 70 52 C76 56, 74 68, 65 65 C60 72, 45 74, 38 65 C30 68, 22 58, 25 45Z" fill="url(#gingGrad)" />
            <path d="M30 48 C35 48, 38 52, 38 52" stroke="#a38562" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M48 42 C52 46, 50 52, 50 52" stroke="#a38562" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M58 50 C62 53, 60 60, 60 60" stroke="#a38562" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case "lemon":
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" transform="rotate(30)">
            <defs>
              <linearGradient id="lemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#a16207" />
              </linearGradient>
            </defs>
            <path d="M15 50 C15 30, 35 18, 50 18 C65 18, 85 30, 85 50 C85 70, 65 82, 50 82 C35 82, 15 70, 15 50Z" fill="url(#lemGrad)" />
            {/* Nipple points */}
            <path d="M13 50 C11 50, 11 48, 15 48" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M87 50 C89 50, 89 52, 85 52" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case "mango":
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="mangoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="50%" stopColor="#a3e635" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
            </defs>
            <path d="M48 24 C64 24, 75 35, 75 52 C75 75, 52 86, 38 80 C26 74, 25 58, 30 45 C35 32, 42 24, 48 24Z" fill="url(#mangoGrad)" />
            <path d="M48 24 Q48 18 45 14" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case "corn":
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="cornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
            {/* Cob shape */}
            <path d="M38 34 C38 24, 62 24, 62 34 L56 80 C56 84, 44 84, 44 80 Z" fill="url(#cornGrad)" />
            {/* Kernels pattern lines */}
            <path d="M44 32 L44 78 M50 30 L50 80 M56 32 L56 78" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" />
            {/* Husks */}
            <path d="M32 40 C32 40, 26 70, 46 86 C40 76, 38 52, 38 40" fill="#a3e635" />
            <path d="M68 40 C68 40, 74 70, 54 86 C60 76, 62 52, 62 40" fill="#84cc16" />
          </svg>
        );
      case "garlic":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="garlicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e4e4d4" />
              </linearGradient>
            </defs>
            <path d="M42 82 L40 88 M46 83 L46 89 M50 83 L51 90 M54 83 L57 89" stroke="#b0a28f" strokeWidth="1.5" />
            <path d="M50 26 C46 38, 25 45, 25 64 C25 80, 38 82, 50 82 C62 82, 75 80, 75 64 C75 45, 54 38, 50 26Z" fill="url(#garlicGrad)" />
            <path d="M50 26 C46 40, 36 50, 36 78" stroke="#eaeaea" strokeWidth="1.8" />
            <path d="M50 26 C54 40, 64 50, 64 78" stroke="#eaeaea" strokeWidth="1.8" />
            <path d="M47 27 L53 27 L50 22 Z" fill="#8d9472" />
          </svg>
        );
      case "sprouts":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none">
            {/* Sprouts seeds with little tails */}
            <circle cx="34" cy="40" r="5" fill="#a16207" />
            <path d="M34 40 Q26 40 28 32" stroke="#f7fee7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            
            <circle cx="58" cy="44" r="5.5" fill="#15803d" />
            <path d="M58 44 Q56 36 48 38" stroke="#f7fee7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            
            <circle cx="44" cy="62" r="5" fill="#ca8a04" />
            <path d="M44 62 Q36 66 38 72" stroke="#f7fee7" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            <circle cx="66" cy="60" r="5" fill="#a16207" />
            <path d="M66 60 Q72 56 68 48" stroke="#f7fee7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        );
      case "mushroom":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none">
            <path d="M42 56 L42 82 C42 84, 58 84, 58 82 L58 56 Z" fill="#e5e5e0" />
            {/* Cap */}
            <path d="M22 56 C22 36, 78 36, 78 56 Z" fill="#d4d4cb" />
            <circle cx="38" cy="46" r="3.5" fill="#f5f5f4" />
            <circle cx="60" cy="46" r="3.5" fill="#f5f5f4" />
            <circle cx="48" cy="50" r="2.5" fill="#f5f5f4" />
          </svg>
        );
      case "ghee":
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="70%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#854d0e" />
              </linearGradient>
            </defs>
            {/* Traditional Golden pot */}
            <path d="M30 40 C30 36, 70 36, 70 40 L66 80 C66 84, 34 84, 34 80 Z" fill="url(#potGrad)" />
            {/* Lid */}
            <ellipse cx="50" cy="38" rx="22" ry="5" fill="#a16207" />
            <circle cx="50" cy="33" r="4.5" fill="#facc15" />
            {/* Label */}
            <rect x="36" y="52" width="28" height="18" fill="#fcfcf7" rx="2" />
            <text x="50" y="63" fill="#ca8a04" fontSize="6" fontWeight="bold" textAnchor="middle">GHEE</text>
          </svg>
        );
      case "banana":
        return (
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100" fill="none" transform="rotate(-15)">
            <path d="M20 30 Q50 40 70 70 Q55 65 35 45 Q22 34 20 30" fill="#fbbf24" />
            <path d="M16 28 L21 31" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            <path d="M69 68 L72 72" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case "pumpkin":
        return (
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="pumpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="58" r="30" fill="url(#pumpGrad)" />
            {/* Rib lines */}
            <path d="M50 28 C38 38, 38 78, 50 88" stroke="#9a3412" strokeWidth="2" fill="none" opacity="0.3" />
            <path d="M50 28 C62 38, 62 78, 50 88" stroke="#9a3412" strokeWidth="2" fill="none" opacity="0.3" />
            {/* Stem */}
            <path d="M50 28 Q54 18 50 14" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );
      default:
        return (
          <svg className="w-full h-full drop-shadow-sm text-green-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3c4.5 0 9 4 9 9s-4.5 9-9 9-9-4-9-9 4.5-9 9-9z" />
          </svg>
        );
    }
  };

  // Cart operations
  const addToCart = (product: Product, weight: string) => {
    const price = product.prices[weight];
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.productId === product.id && item.weight === weight
      );
      if (existingIdx > -1) {
        return prevCart.map((item, idx) =>
          idx === existingIdx ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prevCart,
          {
            productId: product.id,
            nameEn: product.nameEn,
            nameGu: product.nameGu,
            weight: weight,
            price: price,
            quantity: 1,
            svgType: product.svgType,
          },
        ];
      }
    });

    setToastMessage(`${product.nameGu} (${weight}) ટોપલામાં ઉમેર્યું! 🥕`);
  };

  const updateQuantity = (productId: string, weight: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.productId === productId && item.weight === weight) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (productId: string, weight: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.productId === productId && item.weight === weight))
    );
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Construct WhatsApp checkout message
  const buildOrderMessage = () => {
    let message = `🌿 *Hari Naman Greens - નવો ઓર્ડર*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.nameGu}* (${item.nameEn})\n`;
      message += `   📦 ${item.weight} × ${item.quantity} નંગ\n`;
      message += `   💰 ₹${item.price} × ${item.quantity} = *₹${item.price * item.quantity}*\n`;
    });
    message += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🧾 *કુલ રકમ: ₹${getCartTotal()}*\n\n`;
    message += `🚚 *ડિલિવરી:* ઘરે ફ્રી ડિલિવરી — એક દિવસ પહેલાં ઓર્ડર આપો.\n`;
    message += `⏰ *Delivery:* Order 1 day in advance for free home delivery.\n`;
    if (user) {
      message += `\n👤 *ગ્રાહક વિગત:*\n`;
      message += `   નામ: ${user.name || "ગ્રાહક"}\n`;
      message += `   Email: ${user.email}\n`;
      message += `   ફોન: ${user.number || "જણાવ્યું નથી"}\n`;
    } else {
      message += `\n📍 _WhatsApp પર ડિલિવરી સરનામું અને નામ જણાવો!_\n`;
    }
    message += `\n_Thank you for ordering from Hari Naman Greens! 🙏_`;
    return encodeURIComponent(message);
  };

  const handleCheckoutWhatsApp = (number: string) => {
    const encodedMessage = buildOrderMessage();
    const whatsappUrl = `https://wa.me/91${number}?text=${encodedMessage}`;
    setIsWhatsAppPickerOpen(false);
    window.open(whatsappUrl, "_blank");
  };

  // Filter products by category and search query
  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === "all" || prod.category === selectedCategory;
    const matchesSearch =
      prod.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.nameGu.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans relative overflow-x-hidden bg-grid-pattern selection:bg-green-dark selection:text-white">
      
      {/* Dynamic Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-bounce border border-stone-800">
          <span className="h-2 w-2 rounded-full bg-lime-400 animate-ping"></span>
          <span className="text-xs font-bold uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Notice: Orange Strip */}
      <div className="bg-orange text-white px-6 py-2.5 text-center text-xs font-black uppercase tracking-wider shadow-sm flex items-center justify-center gap-3 relative z-40 border-b border-black/5">
        <svg className="h-4.5 w-4.5 text-white shrink-0 animate-pulse" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <span>🚚 ડિલિવરી: ઘરે ફ્રી ડિલિવરી માટે એક દિવસ પહેલાં ઓર્ડર આપો! સંપર્ક: +91 95500 90590</span>
      </div>

      {/* 2. Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-stone-200/65 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-dark shadow-md shadow-green-dark/25 transition-transform group-hover:scale-105 duration-300">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3c4.5 0 9 4 9 9s-4.5 9-9 9-9-4-9-9 4.5-9 9-9z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-md font-black uppercase tracking-tight text-stone-900 group-hover:text-green-dark transition-colors duration-200">
                Hari Naman Greens
              </span>
              <span className="text-[10px] font-bold text-olive -mt-1 tracking-widest uppercase">
                તાજી & ઓર્ગેનિક શાકભાજી
              </span>
            </div>
          </Link>

          {/* Search bar inside header */}
          <div className="hidden lg:flex max-w-xs w-full relative">
            <input
              type="text"
              placeholder="શાક શોધો... (બટાકા)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:border-green-dark focus:bg-white transition-all text-stone-900 placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-stone-600">
            <a href="#shop" className="hover:text-green-dark transition-colors">કેટેલોગ</a>
            <a href="#why-us" className="hover:text-green-dark transition-colors">અમારા વિશે</a>
            <span className="h-4 w-[1px] bg-stone-200"></span>
            <a
              href="tel:9550090590"
              className="flex items-center gap-1.5 text-green-dark hover:underline transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              95500 90590
            </a>
          </nav>

          {/* User & Cart Controls */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-stone-200 hover:border-green-dark/45 hover:bg-stone-50 text-stone-700 transition-all cursor-pointer group"
            >
              <svg className="h-5 w-5 group-hover:text-green-dark transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-dark text-[10px] font-black text-white ring-2 ring-white animate-pulse">
                  {getCartItemsCount()}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {isLoading ? (
              <div className="h-9 w-24 bg-stone-100 animate-pulse rounded-xl"></div>
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-stone-200 bg-white hover:bg-stone-50 px-4 py-2.5 text-xs font-black tracking-tight text-stone-900 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  પોર્ટલ
                </Link>
                <button
                  onClick={() => logout()}
                  className="hidden sm:inline-flex rounded-xl bg-stone-900 hover:bg-stone-850 text-white px-4 py-2.5 text-xs font-black tracking-tight transition-all cursor-pointer"
                >
                  લૉગ આઉટ
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-green-dark hover:bg-emerald-700 px-4.5 py-2.5 text-xs font-black text-white tracking-tight shadow-md shadow-green-dark/15 transition-all flex items-center gap-1.5"
              >
                સાઇન ઇન
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search bar */}
      <div className="block lg:hidden px-6 pt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="શાક શોધો... (ડુંગળી)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-green-dark transition-all text-stone-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 3. Hero Section */}
      <section className="relative overflow-hidden py-14 lg:py-20 bg-gradient-to-b from-emerald-50/40 via-white to-stone-50 border-b border-stone-200/50">
        <div className="absolute top-10 left-[-5%] w-80 h-80 bg-lime-200/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-5 right-[-5%] w-96 h-96 bg-amber-200/20 rounded-full filter blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex self-center lg:self-start items-center gap-1.5 px-3 py-1 rounded-full bg-lime-100 border border-lime-200 text-green-dark text-[10px] font-black tracking-widest uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-green-dark animate-ping"></span>
              આજે તાજું કાપ્યું
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.08]">
              તમારી નજીક <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-dark to-olive">
                Hari Naman Greens
              </span> ની દુકાન.
            </h1>

            <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed text-stone-600 font-medium">
              અમે સ્થાનિક ખેડૂતોને સીધા તમારી રસોઈ સાથે જોડીએ છીએ. વજન પ્રમાણે પસંદ કરો, ટોપલો ભરો, અને WhatsApp થી ઓર્ડર આપો. ઘર સુધી ફ્રી ડિલિવરી.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mt-3">
              <a
                href="#shop"
                className="w-full sm:w-auto text-center rounded-2xl bg-green-dark hover:bg-emerald-700 px-8 py-4 text-sm font-black text-white tracking-wide shadow-xl shadow-green-dark/20 transition-all hover:scale-[1.02]"
              >
                તાજું શાક ઓર્ડર કરો
              </a>
              <a
                href="https://wa.me/919550090590"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center rounded-2xl border border-stone-200 bg-white hover:border-green-dark/30 hover:bg-stone-50 px-8 py-4 text-sm font-black text-stone-700 transition-all flex items-center justify-center gap-2"
              >
                WhatsApp પર ઓર્ડર કરો
              </a>
            </div>

            {/* Delivery Warning Box */}
            <div className="mt-4 p-4.5 rounded-2xl bg-yellow/10 border border-yellow/20 max-w-xl mx-auto lg:mx-0 text-left flex items-start gap-3 shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow shadow-sm">
                <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-stone-900 tracking-wider">🏠 ફ્રી હોમ ડિલિવરી</h4>
                <p className="text-xs text-stone-600 font-bold mt-0.5 leading-relaxed">
                  ફ્રી ઘરે ડિલિવરી માટે એક દિવસ પહેલાં ઓર્ડર આપો. દરરોજ સવારે તાજું પહોંચાડવામાં આવે છે.
                </p>
              </div>
            </div>
          </div>

          {/* Farm Stand Graphic */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="w-full max-w-[380px] aspect-square rounded-[40px] bg-gradient-to-tr from-amber-50 to-lime-50 border-2 border-stone-200/60 shadow-2xl p-8 relative flex items-center justify-center overflow-hidden group">
              <div className="absolute top-4 right-4 bg-green-dark text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                100% તાજું
              </div>

              <svg className="w-[85%] h-[85%] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" viewBox="0 0 100 100" fill="none">
                <defs>
                  <linearGradient id="crateWood" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d5a96c" />
                    <stop offset="100%" stopColor="#805b2a" />
                  </linearGradient>
                  <radialGradient id="artTomato" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ff5252" />
                    <stop offset="100%" stopColor="#b71c1c" />
                  </radialGradient>
                  <linearGradient id="artCarrot" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff9800" />
                    <stop offset="100%" stopColor="#e65100" />
                  </linearGradient>
                </defs>

                <path d="M15 45 C15 35, 30 30, 35 45 C28 48, 20 52, 15 45Z" fill="#84cc16" opacity="0.6" transform="rotate(-20 30 40)" />
                <path d="M85 45 C85 35, 70 30, 65 45 C72 48, 80 52, 85 45Z" fill="#22c55e" opacity="0.5" transform="rotate(20 70 40)" />

                <circle cx="36" cy="46" r="14" fill="#15803d" />
                <circle cx="50" cy="40" r="16" fill="#166534" />
                <circle cx="64" cy="46" r="14" fill="#15803d" />

                <circle cx="34" cy="56" r="11" fill="url(#artTomato)" />
                <path d="M34 45 L34 48 M32 46 L36 46" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />

                <path d="M45 48 C38 48, 38 64, 45 68 C52 68, 55 64, 55 56 C55 48, 52 48, 45 48Z" fill="#fbbf24" />

                <path d="M68 45 C70 44, 75 44, 76 45 C78 52, 74 72, 72 78 C70 72, 66 52, 68 45Z" fill="url(#artCarrot)" transform="rotate(15 72 60)" />

                <path d="M15 54 L85 54 L80 88 L20 88 Z" fill="url(#crateWood)" />
                <rect x="18" y="62" width="64" height="4" fill="#5c3f1a" opacity="0.75" rx="1" />
                <rect x="20" y="74" width="60" height="4" fill="#5c3f1a" opacity="0.75" rx="1" />
                
                <text x="50" y="72" fill="#ffedd5" fontSize="4.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.8" opacity="0.9">
                  HARI NAMAN
                </text>
              </svg>
              <div className="absolute bottom-6 w-[80%] h-4 bg-stone-900/10 rounded-full filter blur-md"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Catalog Section */}
      <section id="shop" className="py-16 max-w-7xl mx-auto px-6 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col gap-3">
          <span className="text-green-dark text-xs font-black uppercase tracking-widest">
            તાજા શાકભાજીનો કેટેલોગ
          </span>
          <h2 className="text-3xl font-black text-stone-900 sm:text-4xl">
            ખેતરથી ઘર સુધી ડિલિવરી
          </h2>
          <div className="h-1 w-16 bg-green-dark mx-auto rounded-full mt-1"></div>
          <p className="text-stone-600 text-sm font-semibold mt-2.5">
            નીચેથી ઉત્પાદન પ્રમાણે વજન/માપ પસંદ કરો. ટોપલામાં ઉમેરો, અને WhatsApp દ્વારા ઓર્ડર આપો.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center gap-2 md:gap-3 overflow-x-auto pb-4 hide-scrollbar mb-10">
          {[
            { id: "all", label: "બધું" },
            { id: "Vegetable", label: "શાકભાજી" },
            { id: "Leafy", label: "લીલી ભાજી" },
            { id: "Fruit/Veg", label: "ફળ-શાક" },
            { id: "Sprouts", label: "ફણગો" },
            { id: "Dairy", label: "દૂધ ઉત્પાદન" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-green-dark border-green-dark text-white shadow-md"
                  : "bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200 rounded-[32px]">
            <svg className="h-12 w-12 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-sm font-black text-stone-900">કોઈ ઉત્પાદન મળ્યું નહીં</h3>
            <p className="text-xs text-stone-500 font-semibold mt-1">તમારી ખોજ ફિલ્ટર બદલો.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((prod) => {
              const weightOptions = Object.keys(prod.prices);
              const activeWeight = selectedWeights[prod.id] || weightOptions[0];
              const price = prod.prices[activeWeight];

              return (
                <div
                  key={prod.id}
                  className="bg-white border border-stone-200/85 hover:border-green-dark/30 rounded-[30px] p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group"
                >
                  {/* Visual container */}
                  <div className="relative aspect-square w-full rounded-2xl bg-stone-50/50 flex items-center justify-center overflow-hidden mb-4">
                    {prod.imageUrl ? (
                      <img
                        src={prod.imageUrl}
                        alt={prod.nameGu}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-radial-gradient from-stone-100/50 to-stone-50/10 opacity-70"></div>
                        <div className="absolute w-[60%] h-[60%] rounded-full bg-stone-100 opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="w-[60%] h-[60%] z-10 transition-transform duration-300 group-hover:scale-105">
                          {renderVegSVG(prod.svgType, prod.nameEn)}
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
                    <span className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm text-stone-700 border border-stone-200 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      {prod.category === 'Vegetable' ? 'શાક' : prod.category === 'Leafy' ? 'ભાજી' : prod.category === 'Fruit/Veg' ? 'ફળ-શાક' : prod.category === 'Sprouts' ? 'ફણગો' : 'ડેરી'}
                    </span>
                  </div>

                  {/* Title & Languages */}
                  <div>
                    <h3 className="text-base font-black text-stone-900 leading-tight">
                      {prod.nameGu}
                    </h3>
                    <p className="text-[11px] font-semibold text-stone-400 tracking-wide mt-0.5">
                      {prod.nameEn}
                    </p>
                  </div>

                  {/* Weight Option Pills */}
                  <div className="mt-4">
                    <span className="text-[9px] font-black text-stone-400 uppercase tracking-wider block mb-1.5">
                      પ્રમાણ પસંદ કરો
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {weightOptions.map((weight) => (
                        <button
                          key={weight}
                          onClick={() => setSelectedWeights(prev => ({ ...prev, [prod.id]: weight }))}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                            activeWeight === weight
                              ? "bg-green-dark/10 border-green-dark/30 text-green-dark"
                              : "bg-white border-stone-200 text-stone-500 hover:border-stone-300"
                          }`}
                        >
                          {weight}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and cart add */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-5">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">ભાવ ({activeWeight})</span>
                      <span className="text-md font-black text-stone-900 mt-0.5">
                        ₹{price}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(prod, activeWeight)}
                      className="flex h-10 items-center justify-center rounded-xl bg-green-dark hover:bg-emerald-700 text-white shadow-md transition-all active:scale-95 cursor-pointer px-3 gap-1.5 text-[10px] font-black"
                      title="ટોપલામાં ઉમેરો"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      ઉમેરો
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Farming Philosophy */}
      <section id="why-us" className="bg-stone-900 text-stone-100 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-dark/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange/5 rounded-full filter blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-lime-400 text-xs font-black uppercase tracking-widest">
                અમારી ખેતીની પ્રામાણિકતા
              </span>
              <h2 className="text-3xl font-black text-white sm:text-4xl leading-tight">
                તાજો ઉત્પાદ. <br />
                સીધી ખરીદી. <br />
                સ્વચ્છ ઓર્ગેનિક ગુણવત્તા.
              </h2>
              <div className="h-1 w-16 bg-lime-400 rounded-full"></div>
              <p className="text-stone-400 text-sm font-semibold leading-relaxed">
                Hari Naman Greens ઉચ્ચ-ગ્રેડ ખેત ઉત્પાદ આપવા માટે પ્રતિબદ્ધ છે. અમે ખેતઉત્પાદ પર કોઈ રાસાયણિક ઉપચાર ટાળીએ છીએ — ફક્ત પ્રકૃતિ જ્યાં ઉગાડ્યું, ત્યાંથી સીધું.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-4">
                <div className="h-10 w-10 bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center rounded-2xl">
                  🌱
                </div>
                <h3 className="text-md font-black text-white">🌅 દરરોજ સવારે લણણી</h3>
                <p className="text-stone-400 text-xs font-semibold leading-relaxed">
                  અમારા શાકભાજી સવારે તાજા કાપવામાં આવે છે અને ઓર્ડર પ્રમાણે ભેગા કરવામાં આવે છે — મહત્તમ તાજગી સુનિશ્ચિત.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-4">
                <div className="h-10 w-10 bg-orange/10 border border-orange/20 text-orange flex items-center justify-center rounded-2xl">
                  🚚
                </div>
                <h3 className="text-md font-black text-white">ઘરે ફ્રી ડિલિવરી</h3>
                <p className="text-stone-400 text-xs font-semibold leading-relaxed">
                  ઘરે ડિલિવરી ઉપભોગ કરો. ૨૪ કલાક પહેલાં ઓર્ડર આપો — ડિસ્પેચ સહેલું બને.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            <div
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            ></div>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md transform bg-white shadow-2xl transition-all duration-300">
                <div className="flex h-full flex-col justify-between border-l border-stone-200">
                  
                  {/* Drawer Header */}
                  <div className="bg-stone-50 px-6 py-5 border-b border-stone-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-green-dark" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <h3 className="text-md font-black text-stone-900 uppercase tracking-tight">🧺 તમારો ટોપલો</h3>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="rounded-lg p-1.5 hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Drawer Content */}
                  <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-stone-100">
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                        <div className="h-16 w-16 bg-stone-50 border-2 border-dashed border-stone-200 flex items-center justify-center rounded-3xl text-stone-400">
                          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-stone-900">ટોપલો ખાલી છે</h4>
                          <p className="text-xs text-stone-500 font-semibold mt-1">અમારા કેટેલોગ માંથી તાજા ઓર્ગેનિક શાક ઉમેરો!</p>
                        </div>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={`${item.productId}-${item.weight}`} className="py-4 flex gap-4 items-center">
                          <div className="h-14 w-14 rounded-xl bg-stone-50 border border-stone-150 p-2 shrink-0 flex items-center justify-center">
                            {renderVegSVG(item.svgType, item.nameEn)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="text-xs font-black text-stone-900 truncate">{item.nameGu}</h4>
                              <span className="text-xs font-black text-stone-900">₹{item.price * item.quantity}</span>
                            </div>
                            <p className="text-[10px] text-stone-400 font-semibold mt-0.5">{item.nameEn}</p>
                            <p className="text-[9px] text-stone-400 font-bold uppercase mt-0.5">{item.weight} · ₹{item.price}/નંગ</p>

                            <div className="flex items-center justify-between mt-2.5">
                              <div className="flex items-center gap-2.5 border border-stone-200 rounded-lg px-2 py-1 bg-stone-50">
                                <button
                                  onClick={() => updateQuantity(item.productId, item.weight, -1)}
                                  className="text-stone-500 hover:text-stone-800 font-bold text-xs px-1 cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="text-xs font-black text-stone-900 min-w-3 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.productId, item.weight, 1)}
                                  className="text-stone-500 hover:text-stone-800 font-bold text-xs px-1 cursor-pointer"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.productId, item.weight)}
                                className="text-[10px] font-black text-rose-600 hover:underline tracking-wider uppercase cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Drawer Footer summary */}
                  {cart.length > 0 && (
                    <div className="bg-stone-50 px-6 py-6 border-t border-stone-200 flex flex-col gap-4">
                      <div className="flex justify-between text-sm font-semibold border-b border-stone-200/50 pb-3">
                        <span className="text-stone-500">કુલ રકમ ({getCartItemsCount()} વસ્તુ)</span>
                        <span className="text-stone-900 font-black">₹{getCartTotal()}</span>
                      </div>

                      <div className="p-3 bg-yellow/5 border border-yellow/20 rounded-xl text-[10px] text-stone-600 font-bold leading-relaxed">
                        ⚠️ ફ્રી ઘર ડિલિવરી માટે એક દિવસ પહેલાં ઓર્ડર આપો. સવારે ડિલિવરી થાય છે.
                      </div>

                      {/* Single WhatsApp Checkout Button */}
                      {!isWhatsAppPickerOpen ? (
                        <button
                          onClick={() => setIsWhatsAppPickerOpen(true)}
                          className="w-full text-center rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] px-4 py-3.5 text-sm font-black text-white shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2.5 active:scale-[0.98]"
                        >
                          <svg className="h-5 w-5 fill-white shrink-0" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.637-1.03-5.115-2.905-6.99-1.874-1.876-4.355-2.909-6.99-2.91-5.443 0-9.876 4.42-9.88 9.86-.001 1.666.437 3.29 1.269 4.722l-.995 3.636 3.731-.978zm11.587-6.85c-.29-.144-1.716-.847-1.978-.942-.262-.096-.453-.144-.644.144-.191.288-.74.942-.907 1.135-.167.19-.334.215-.624.071-.29-.144-1.226-.452-2.335-1.44-1.002-.892-1.637-1.92-1.834-2.257-.197-.336-.02-.518.147-.685.15-.15.334-.384.501-.576.167-.192.222-.32.333-.53.111-.21.055-.395-.027-.54-.083-.144-.644-1.554-.882-2.127-.23-.556-.465-.48-.644-.48h-.551c-.191 0-.501.071-.762.355-.262.287-.998.974-.998 2.37 0 1.396 1.018 2.744 1.161 2.935.143.192 2.003 3.056 4.85 4.283.678.29 1.207.464 1.62.595.682.217 1.3.187 1.79.113.546-.082 1.716-.701 1.956-1.378.24-.678.24-1.258.167-1.378-.072-.12-.262-.19-.551-.336z"/>
                          </svg>
                          WhatsApp પર ઓર્ડર આપો
                        </button>
                      ) : (
                        /* Number picker sheet */
                        <div className="rounded-2xl border border-stone-200 overflow-hidden">
                          <div className="bg-stone-100 px-4 py-2.5 flex items-center justify-between">
                            <span className="text-[10px] font-black text-stone-700 uppercase tracking-wider">📱 કયા નંબર પર ઓર્ડર આપવો છે?</span>
                            <button
                              onClick={() => setIsWhatsAppPickerOpen(false)}
                              className="text-stone-400 hover:text-stone-700 cursor-pointer p-1"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div className="flex flex-col divide-y divide-stone-100">
                            <button
                              onClick={() => handleCheckoutWhatsApp("9550090590")}
                              className="flex items-center gap-3 px-4 py-3.5 bg-white hover:bg-[#25D366]/5 transition-colors cursor-pointer text-left group"
                            >
                              <div className="h-9 w-9 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                                <svg className="h-4 w-4 fill-[#25D366]" viewBox="0 0 24 24">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.637-1.03-5.115-2.905-6.99-1.874-1.876-4.355-2.909-6.99-2.91-5.443 0-9.876 4.42-9.88 9.86-.001 1.666.437 3.29 1.269 4.722l-.995 3.636 3.731-.978zm11.587-6.85c-.29-.144-1.716-.847-1.978-.942-.262-.096-.453-.144-.644.144-.191.288-.74.942-.907 1.135-.167.19-.334.215-.624.071-.29-.144-1.226-.452-2.335-1.44-1.002-.892-1.637-1.92-1.834-2.257-.197-.336-.02-.518.147-.685.15-.15.334-.384.501-.576.167-.192.222-.32.333-.53.111-.21.055-.395-.027-.54-.083-.144-.644-1.554-.882-2.127-.23-.556-.465-.48-.644-.48h-.551c-.191 0-.501.071-.762.355-.262.287-.998.974-.998 2.37 0 1.396 1.018 2.744 1.161 2.935.143.192 2.003 3.056 4.85 4.283.678.29 1.207.464 1.62.595.682.217 1.3.187 1.79.113.546-.082 1.716-.701 1.956-1.378.24-.678.24-1.258.167-1.378-.072-.12-.262-.19-.551-.336z"/>
                                </svg>
                              </div>
                              <div>
                                <div className="text-sm font-black text-stone-900">95500 90590</div>
                                <div className="text-[10px] text-stone-400 font-semibold">ટેપ કરી WhatsApp ખોલો</div>
                              </div>
                              <svg className="h-4 w-4 text-stone-300 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleCheckoutWhatsApp("9725277872")}
                              className="flex items-center gap-3 px-4 py-3.5 bg-white hover:bg-[#128C7E]/5 transition-colors cursor-pointer text-left group"
                            >
                              <div className="h-9 w-9 rounded-xl bg-[#128C7E]/10 flex items-center justify-center shrink-0 group-hover:bg-[#128C7E]/20 transition-colors">
                                <svg className="h-4 w-4 fill-[#128C7E]" viewBox="0 0 24 24">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.637-1.03-5.115-2.905-6.99-1.874-1.876-4.355-2.909-6.99-2.91-5.443 0-9.876 4.42-9.88 9.86-.001 1.666.437 3.29 1.269 4.722l-.995 3.636 3.731-.978zm11.587-6.85c-.29-.144-1.716-.847-1.978-.942-.262-.096-.453-.144-.644.144-.191.288-.74.942-.907 1.135-.167.19-.334.215-.624.071-.29-.144-1.226-.452-2.335-1.44-1.002-.892-1.637-1.92-1.834-2.257-.197-.336-.02-.518.147-.685.15-.15.334-.384.501-.576.167-.192.222-.32.333-.53.111-.21.055-.395-.027-.54-.083-.144-.644-1.554-.882-2.127-.23-.556-.465-.48-.644-.48h-.551c-.191 0-.501.071-.762.355-.262.287-.998.974-.998 2.37 0 1.396 1.018 2.744 1.161 2.935.143.192 2.003 3.056 4.85 4.283.678.29 1.207.464 1.62.595.682.217 1.3.187 1.79.113.546-.082 1.716-.701 1.956-1.378.24-.678.24-1.258.167-1.378-.072-.12-.262-.19-.551-.336z"/>
                                </svg>
                              </div>
                              <div>
                                <div className="text-sm font-black text-stone-900">97252 77872</div>
                                <div className="text-[10px] text-stone-400 font-semibold">ટેપ કરી WhatsApp ખોલો</div>
                              </div>
                              <svg className="h-4 w-4 text-stone-300 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Footer */}
      <footer className="bg-stone-900 border-t border-stone-850 py-16 text-stone-400 text-xs font-semibold">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-dark shadow-md">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3c4.5 0 9 4 9 9s-4.5 9-9 9-9-4-9-9 4.5-9 9-9z" />
                </svg>
              </div>
              <span className="text-md font-black uppercase tracking-tight text-white">Hari Naman Greens</span>
            </div>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              ઉચ્ચ-ગ્રેડ ખેત ઉત્પાદ સીધું ઘરે. વેબ ચેકઆઉટ કે WhatsApp દ્વારા ઓર્ડર આપો.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-black uppercase tracking-wider text-[10px]">શ્રેણીઓ</h4>
            <a href="#shop" onClick={() => setSelectedCategory("Vegetable")} className="hover:text-white transition-colors">શાકભાજી</a>
            <a href="#shop" onClick={() => setSelectedCategory("Leafy")} className="hover:text-white transition-colors">લીલી ભાજી</a>
            <a href="#shop" onClick={() => setSelectedCategory("Sprouts")} className="hover:text-white transition-colors">ફણગો</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-black uppercase tracking-wider text-[10px]">સંપર્ક</h4>
            <a href="tel:9550090590" className="hover:text-white transition-colors">ફોન: 95500 90590</a>
            <a href="https://wa.me/919550090590" className="hover:text-white transition-colors">WhatsApp ઓર્ડર</a>
            <span className="text-stone-500">સ્થાનિક ખેત નેટવર્ક</span>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-black uppercase tracking-wider text-[10px]">પોર્ટલ</h4>
            <Link href="/login" className="hover:text-white transition-colors">ગ્રાહક લૉગિન</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">ડૅશબોર્ડ</Link>
            <span className="text-stone-650 text-[10px] mt-2">© 2026 Hari Naman Greens. સર્વ હક્કો સુરક્ષિત.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
