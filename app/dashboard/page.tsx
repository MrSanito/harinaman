"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
  const { user, logout, isLoading, updateProfile } = useAuth();
  
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Admin product editor states
  const [adminProducts, setAdminProducts] = useState<any[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [adminMessage, setAdminMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  // Selected product edit fields
  const [editNameEn, setEditNameEn] = useState("");
  const [editNameGu, setEditNameGu] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editSvgType, setEditSvgType] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editPrices, setEditPrices] = useState<{ [weight: string]: number }>({});

  // Adding new weight options
  const [newPriceKey, setNewPriceKey] = useState("");
  const [newPriceValue, setNewPriceValue] = useState("");

  const fetchAdminProducts = async () => {
    try {
      setIsProductsLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.products) {
        setAdminProducts(data.products);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setIsProductsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setNumber(user.number || "");
      setAddress(user.address || "");
      
      if (user.role === "Admin") {
        fetchAdminProducts();
      }
    }
  }, [user]);

  useEffect(() => {
    if (selectedProductId) {
      const prod = adminProducts.find(p => p.id === selectedProductId);
      if (prod) {
        setSelectedProduct(prod);
        setEditNameEn(prod.nameEn);
        setEditNameGu(prod.nameGu);
        setEditCategoryId(prod.category);
        setEditSvgType(prod.svgType);
        setEditImageUrl(prod.imageUrl || "");
        setEditPrices(JSON.parse(JSON.stringify(prod.prices || {})));
      }
    } else {
      setSelectedProduct(null);
    }
  }, [selectedProductId, adminProducts]);

  const handlePriceValueChange = (key: string, val: string) => {
    const num = parseFloat(val);
    setEditPrices(prev => ({
      ...prev,
      [key]: isNaN(num) ? 0 : num
    }));
  };

  const handleAddPriceOption = () => {
    if (!newPriceKey.trim() || !newPriceValue) return;
    const num = parseFloat(newPriceValue);
    if (isNaN(num)) return;
    setEditPrices(prev => ({
      ...prev,
      [newPriceKey.trim()]: num
    }));
    setNewPriceKey("");
    setNewPriceValue("");
  };

  const handleRemovePriceOption = (key: string) => {
    setEditPrices(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setIsSavingProduct(true);
    setAdminMessage(null);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: selectedProductId,
          nameEn: editNameEn,
          nameGu: editNameGu,
          categoryId: editCategoryId,
          svgType: editSvgType,
          imageUrl: editImageUrl,
          prices: editPrices
        })
      });
      const data = await res.json();
      if (data.success) {
        setAdminMessage({ type: "success", text: "ઉત્પાદનની વિગતો સફળતાપૂર્વક સાચવવામાં આવી! (Product specs updated)" });
        await fetchAdminProducts();
      } else {
        setAdminMessage({ type: "error", text: data.error || "ઉત્પાદન સાચવવામાં નિષ્ફળતા." });
      }
    } catch (err) {
      setAdminMessage({ type: "error", text: "કનેક્શન ભૂલ. ફરી પ્રયાસ કરો." });
    } finally {
      setIsSavingProduct(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-custom text-black">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-xl border border-green-dark/20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-green-dark"></div>
          <p className="text-sm text-olive font-semibold tracking-wide">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await updateProfile(name, number, address);
      if (res.success) {
        setMessage({ type: "success", text: "પ્રોફાઇલ સફળતાપૂર્વક અપડેટ થઈ ગઈ! 🌿" });
      } else {
        setMessage({ type: "error", text: res.error || "પ્રોફાઇલ અપડેટ કરવામાં ભૂલ થઈ." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "કનેક્શન ભૂલ. ફરી પ્રયાસ કરો." });
    } finally {
      setIsSaving(false);
    }
  };

  const vegetables = [
    { name: "Organic Tomatoes", weight: "500g", status: "In Stock", price: "₹45" },
    { name: "Fresh Spinach", weight: "250g", status: "Limited", price: "₹30" },
    { name: "Premium Potatoes", weight: "1kg", status: "In Stock", price: "₹40" },
  ];

  return (
    <div className="min-h-screen bg-gradient-custom text-black flex flex-col font-sans relative overflow-hidden">
      
      {/* 1. Header Banner - Yellow */}
      <header className="relative z-10 bg-yellow border-b-2 border-black/10 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black shadow-md transition-transform group-hover:scale-105">
                <span className="text-lg font-black text-yellow">H</span>
              </div>
              <span className="text-lg font-black uppercase tracking-tight text-black group-hover:text-stone-850 transition-colors">Harina Man Portal</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1 bg-white hover:bg-stone-50 text-black border-2 border-black/10 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm"
            >
              🏪 શાકભાજી કેટેલોગ (Store)
            </Link>

            <div className="hidden sm:flex flex-col text-right font-semibold">
              <span className="text-sm text-black">{user.name || "User"}</span>
              <span className="text-[10px] text-black/60">{user.email}</span>
            </div>
            <button
              onClick={() => logout()}
              className="flex items-center gap-1.5 rounded-xl border-2 border-black bg-black px-4 py-2.5 text-xs font-black text-white hover:bg-zinc-900 transition-all duration-200 shadow-sm"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* 2. Orange Banner: "Order One Day Ago" notice */}
      <div className="bg-orange px-6 py-3 text-center text-xs font-black uppercase tracking-wider text-white relative z-10 border-b border-black/5 shadow-md flex items-center justify-center gap-2">
        <svg className="h-5 w-5 text-white shrink-0 animate-bounce" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <span>Delivery Alert: Orders must be placed one day ago for guaranteed morning dispatch!</span>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 py-10 sm:px-8">
        
        {/* Title & Secondary Title (Olive Green) */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-black sm:text-4xl">
              Logistics & Stock Overview
            </h1>
            <p className="text-md font-bold text-olive mt-1.5">
              Fresh Vegetables Stock Count & Active System Credentials
            </p>
          </div>
          <Link
            href="/"
            className="sm:hidden w-full text-center bg-white hover:bg-stone-50 text-black border-2 border-black/10 px-4 py-3 rounded-xl text-xs font-black transition-all shadow-sm"
          >
            🏪 શાકભાજી કેટેલોગ (Store)
          </Link>
        </div>

        {/* Veggies Grid - Green border accents & Yellow/Green badges */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-10">
          {vegetables.map((item) => (
            <div
              key={item.name}
              className="bg-white border-2 border-green-dark/15 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-lg font-black text-black">{item.name}</span>
                  {/* Weight badges styled in Yellow */}
                  <span className="bg-yellow text-black font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {item.weight}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-olive">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-dark"></span>
                  {item.status}
                </div>
              </div>
              
              {/* Price boxes styled in Dark Green */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-500 uppercase">Unit Price</span>
                <span className="bg-green-dark text-white font-black text-sm px-3.5 py-1.5 rounded-xl">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Active Session & Configuration Panel */}
          <div className="bg-white border-2 border-green-dark/10 rounded-[32px] p-8 shadow-2xl">
            <h3 className="text-lg font-black text-black border-b border-zinc-100 pb-4">
              Security Context Details
            </h3>
            <dl className="mt-6 space-y-4 text-sm font-semibold text-stone-900">
              <div className="flex justify-between py-2 border-b border-zinc-100">
                <dt className="text-zinc-500 font-bold">User Database ID</dt>
                <dd className="font-mono text-black bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded text-xs select-all">
                  {user.id}
                </dd>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-100">
                <dt className="text-zinc-500 font-bold">Registered Email</dt>
                <dd className="text-black">{user.email}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-100">
                <dt className="text-zinc-500 font-bold">Phone Number</dt>
                <dd className="text-black">{user.number || "Not provided"}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-100">
                <dt className="text-zinc-500 font-bold">Assigned Role</dt>
                <dd className="text-black">
                  <span className="inline-flex items-center rounded-md bg-green-dark/10 px-2.5 py-1 text-xs font-bold text-green-dark ring-1 ring-inset ring-green-dark/20 uppercase tracking-wider">
                    {user.role || "Customer"}
                  </span>
                </dd>
              </div>
              <div className="flex flex-col py-2 border-b border-zinc-100 gap-1.5">
                <dt className="text-zinc-500 font-bold">Saved Delivery Address</dt>
                <dd className="text-black whitespace-pre-wrap leading-relaxed bg-stone-50 border border-stone-200/60 p-3.5 rounded-2xl text-xs font-bold font-sans">
                  {user.address || "No address saved. Please update below."}
                </dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-zinc-500 font-bold">Connection State</dt>
                <dd className="flex items-center gap-1.5 text-green-dark">
                  <span className="h-2 w-2 rounded-full bg-green-dark animate-ping"></span>
                  Secure Database Session
                </dd>
              </div>
            </dl>
          </div>

          {/* Profile / Address Edit Panel */}
          <div className="bg-white border-2 border-green-dark/10 rounded-[32px] p-8 shadow-2xl">
            <h3 className="text-lg font-black text-black border-b border-zinc-100 pb-4">
              ✏️ ડિલિવરી પ્રોફાઇલ અપડેટ (Edit Profile & Address)
            </h3>
            
            {message && (
              <div className={`mt-4 p-4 rounded-2xl text-xs font-bold border ${
                message.type === "success" 
                  ? "bg-green-50 border-green-200 text-green-800" 
                  : "bg-red-50 border-red-200 text-red-800"
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="mt-6 space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black">
                  ગ્રાહકનું નામ (Full Name)
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ગ્રાહકનું નામ લખો"
                  className="mt-2 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-black placeholder:text-zinc-400 focus:border-green-dark focus:outline-none transition-all duration-200 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black">
                  મોબાઇલ નંબર (Phone Number)
                </label>
                <input
                  type="text"
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="૯૧XXXXXXXXXX"
                  className="mt-2 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-black placeholder:text-zinc-400 focus:border-green-dark focus:outline-none transition-all duration-200 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black">
                  ડિલિવરી સરનામું (Delivery Address)
                </label>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="ઘર નંબર, સોસાયટી, લેન્ડમાર્ક, શહેર વગેરે..."
                  rows={4}
                  className="mt-2 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-black placeholder:text-zinc-400 focus:border-green-dark focus:outline-none transition-all duration-200 font-semibold leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full text-center rounded-xl bg-green-dark hover:bg-emerald-700 px-4 py-3.5 text-sm font-black text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSaving ? "સાચવી રહ્યું છે..." : "વિગતો સાચવો (Save Details)"}
              </button>
            </form>
          </div>
        </div>

        {/* 3. Admin Pricing Controls Section */}
        {user.role === "Admin" && (
          <div className="mt-10 bg-white border-2 border-green-dark/15 rounded-[32px] p-8 shadow-2xl">
            <div className="border-b border-zinc-100 pb-4 mb-6">
              <h3 className="text-xl font-black text-black">
                🛠️ એડમિન કેટલોગ અને કિંમત નિયંત્રણ (Admin Catalog & Pricing)
              </h3>
              <p className="text-xs text-olive font-bold mt-1">
                ઉત્પાદનની વિગતો અને વજન પ્રમાણે કિંમતો (રૂપિયામાં) બદલો
              </p>
            </div>

            {adminMessage && (
              <div className={`p-4 mb-6 rounded-2xl text-xs font-bold border ${
                adminMessage.type === "success" 
                  ? "bg-green-50 border-green-200 text-green-800" 
                  : "bg-red-50 border-red-200 text-red-800"
              }`}>
                {adminMessage.text}
              </div>
            )}

            {isProductsLoading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-100 border-t-green-dark"></div>
                <span className="text-xs text-stone-500 font-bold">ઉત્પાદનો લોડ થઈ રહ્યા છે...</span>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                    ઉત્પાદન પસંદ કરો (Select Product)
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-black focus:border-green-dark focus:outline-none font-bold"
                  >
                    <option value="">-- પસંદ કરો (Select a product to edit) --</option>
                    {adminProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nameEn} ({p.nameGu}) - {p.category}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedProduct && (
                  <form onSubmit={handleSaveProduct} className="border-t border-zinc-100 pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-black">
                          ઉત્પાદનનું નામ - English (Name EN)
                        </label>
                        <input
                          type="text"
                          required
                          value={editNameEn}
                          onChange={(e) => setEditNameEn(e.target.value)}
                          className="mt-2 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-black focus:border-green-dark focus:outline-none font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-black">
                          ઉત્પાદનનું નામ - ગુજરાતી (Name GU)
                        </label>
                        <input
                          type="text"
                          required
                          value={editNameGu}
                          onChange={(e) => setEditNameGu(e.target.value)}
                          className="mt-2 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-black focus:border-green-dark focus:outline-none font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-black">
                          કેટેગરી (Category)
                        </label>
                        <select
                          value={editCategoryId}
                          onChange={(e) => setEditCategoryId(e.target.value)}
                          className="mt-2 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-black focus:border-green-dark focus:outline-none font-bold"
                        >
                          <option value="Vegetable">Vegetable (શાકભાજી)</option>
                          <option value="Leafy">Leafy (લીલી ભાજી)</option>
                          <option value="Fruit/Veg">Fruit/Veg (ફળ/શાક)</option>
                          <option value="Sprouts">Sprouts (ફણગો)</option>
                          <option value="Dairy">Dairy (ડેરી)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-black">
                          આઇકોન પ્રકાર (SVG Icon Type)
                        </label>
                        <input
                          type="text"
                          required
                          value={editSvgType}
                          onChange={(e) => setEditSvgType(e.target.value)}
                          className="mt-2 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-black focus:border-green-dark focus:outline-none font-semibold"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-black uppercase tracking-wider text-black">
                          છબી URL (Image URL - Optional)
                        </label>
                        <input
                          type="text"
                          value={editImageUrl}
                          onChange={(e) => setEditImageUrl(e.target.value)}
                          placeholder="https://..."
                          className="mt-2 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-black focus:border-green-dark focus:outline-none font-semibold"
                        />
                      </div>
                    </div>

                    {/* Weight & Prices Configuration (in Rupees) */}
                    <div className="bg-stone-50/50 border border-zinc-200 rounded-3xl p-6">
                      <h4 className="text-sm font-black text-black mb-4">
                        💰 વજન અને કિંમતો (Weights & Prices in Rs)
                      </h4>

                      <div className="space-y-4">
                        {Object.entries(editPrices).map(([weight, price]) => (
                          <div key={weight} className="flex items-center gap-4">
                            <span className="w-24 text-xs font-black text-olive text-right">{weight}:</span>
                            <div className="relative flex-1 max-w-[200px]">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-stone-500 font-bold">₹</span>
                              <input
                                type="number"
                                required
                                min="0"
                                value={price}
                                onChange={(e) => handlePriceValueChange(weight, e.target.value)}
                                className="pl-7 block w-full rounded-xl border border-stone-200 bg-white px-4 py-2 text-xs text-black focus:border-green-dark focus:outline-none font-bold"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemovePriceOption(weight)}
                              className="text-xs font-bold text-red-600 hover:text-red-800 transition-colors"
                            >
                              હટાવો (Delete)
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add New Option row */}
                      <div className="mt-6 pt-6 border-t border-zinc-200/60 flex flex-wrap items-center gap-4">
                        <input
                          type="text"
                          placeholder="દા.ત. 250g અથવા 1kg"
                          value={newPriceKey}
                          onChange={(e) => setNewPriceKey(e.target.value)}
                          className="block rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-black focus:border-green-dark focus:outline-none font-semibold"
                        />
                        <div className="relative max-w-[120px]">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-stone-500 font-bold">₹</span>
                          <input
                            type="number"
                            placeholder="કિંમત (Price)"
                            value={newPriceValue}
                            onChange={(e) => setNewPriceValue(e.target.value)}
                            className="pl-7 block w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-black focus:border-green-dark focus:outline-none font-bold"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleAddPriceOption}
                          className="bg-zinc-800 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-black transition-colors"
                        >
                          + વિકલ્પ ઉમેરો (Add Option)
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSavingProduct}
                      className="w-full text-center rounded-xl bg-green-dark hover:bg-emerald-700 px-4 py-3.5 text-sm font-black text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSavingProduct ? "સાચવી રહ્યું છે..." : "ઉત્પાદન વિગતો સાચવો (Save Changes)"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Bottom accent banner in Dark Green */}
      <footer className="bg-green-dark py-4 text-center text-xs font-bold text-white relative z-10 border-t border-black/10 mt-auto">
        &copy; 2026 Harina Man fresh delivery systems. All rights reserved.
      </footer>
    </div>
  );
}
