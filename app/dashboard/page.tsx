"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();

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

  // Stock / metrics styled with the organic vegetable theme
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
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black shadow-md">
              <span className="text-lg font-black text-yellow">H</span>
            </div>
            <span className="text-lg font-black uppercase tracking-tight text-black">Harina Man Portal</span>
          </div>

          <div className="flex items-center gap-4">
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
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight text-black sm:text-4xl">
            Logistics & Stock Overview
          </h1>
          <p className="text-md font-bold text-olive mt-1.5">
            Fresh Vegetables Stock Count & Active System Credentials
          </p>
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

        {/* Active Session & Configuration Panel */}
        <div className="bg-white border-2 border-green-dark/10 rounded-[32px] p-8 shadow-2xl max-w-2xl">
          <h3 className="text-lg font-black text-black border-b border-zinc-100 pb-4">
            Security Context Details
          </h3>
          <dl className="mt-6 space-y-4 text-sm font-semibold">
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
            <div className="flex justify-between py-2">
              <dt className="text-zinc-500 font-bold">Connection State</dt>
              <dd className="flex items-center gap-1.5 text-green-dark">
                <span className="h-2 w-2 rounded-full bg-green-dark animate-ping"></span>
                Secure Cookie Authorized
              </dd>
            </div>
          </dl>
        </div>
      </main>

      {/* Bottom accent banner in Dark Green */}
      <footer className="bg-green-dark py-4 text-center text-xs font-bold text-white relative z-10 border-t border-black/10 mt-auto">
        &copy; 2026 Harina Man fresh delivery systems. All rights reserved.
      </footer>
    </div>
  );
}
