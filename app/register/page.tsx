"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
  const { register, isLoading: authLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (password.length < 6) {
      setError("પાસવર્ડ ઓછામાં ઓછો ૬ અક્ષરનો હોવો જોઈએ (Password must be at least 6 characters)");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await register(email, password, name, number, address);
      if (!result.success) {
        setError(result.error || "નોંધણી કરવામાં ભૂલ આવી");
      }
    } catch (err) {
      setError("કનેક્શન ભૂલ. ફરી પ્રયાસ કરો.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-custom text-black">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-xl border border-green-dark/20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-green-dark"></div>
          <p className="text-sm text-olive font-semibold tracking-wide">ખાતું ખોલી રહ્યું છે (Creating your account)...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-y-auto bg-gradient-custom px-6 py-12 lg:px-8">
      {/* Decorative Floating Background Elements */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-yellow/20 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-green-dark/15 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto w-full max-w-md my-auto">
        {/* Main Registration Card */}
        <div className="bg-white border-2 border-green-dark/10 rounded-[32px] overflow-hidden shadow-2xl">
          
          {/* Header Strip - Yellow */}
          <div className="bg-yellow px-6 py-4 flex items-center justify-center gap-2 border-b border-green-dark/10">
            <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-9-4.5h.008v.008H6V6.75zM6 8.25h.008v.008H6V8.25zm0 1.5h.008v.008H6V9.75zM6 11.25h.008v.008H6v-.008zm0 1.5h.008v.008H6v-.008zm0 1.5h.008v.008H6v-.008zm0 1.5h.008v.008H6v-.008zm0 1.5h.008v.008H6v-.008z" />
            </svg>
            <span className="text-xs font-black uppercase tracking-wider text-black">હરિ નામ ગ્રીન્સ નોંધણી (Sign Up)</span>
          </div>

          <div className="p-8">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-dark shadow-md shadow-green-dark/30">
                <span className="text-xl font-bold text-white">H</span>
              </div>
              <h2 className="mt-5 text-center text-2xl font-black tracking-tight text-black">
                નવું ખાતું ખોલો (Register)
              </h2>
              <p className="mt-1 text-center text-xs font-bold text-olive">
                આજે જ નોંધણી કરાવીને ઓર્ગેનિક શાકભાજી ઓર્ડર કરો!
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-700 flex items-start gap-2 animate-shake">
                <svg className="h-4.5 w-4.5 text-red-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                <span className="font-bold">{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black">
                  પૂરું નામ (Full Name)
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="નામ લખો (e.g. Ramesh Patel)"
                  className="mt-1.5 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-green-dark focus:outline-none transition-colors duration-200 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black">
                  ઈમેલ સરનામું (Email Address)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="mt-1.5 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-green-dark focus:outline-none transition-colors duration-200 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black">
                  મોબાઇલ નંબર (Mobile Number)
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
                  placeholder="૧૦ આંકડાનો નંબર (e.g. 9876543210)"
                  className="mt-1.5 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-green-dark focus:outline-none transition-colors duration-200 font-semibold"
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
                  placeholder="સોસાયટી, ઘર નંબર, શહેર અને પિનકોડ..."
                  rows={2}
                  className="mt-1.5 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-green-dark focus:outline-none transition-colors duration-200 font-semibold leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black">
                  પાસવર્ડ (Password)
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ઓછામાં ઓછા ૬ અક્ષર"
                  className="mt-1.5 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-green-dark focus:outline-none transition-colors duration-200 font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-center rounded-xl bg-green-dark hover:bg-emerald-700 px-4 py-3 text-xs font-black text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "નોંધણી થઈ રહી છે..." : "ખાતું બનાવો (Create Account)"}
              </button>
            </form>

            <div className="mt-6 text-center text-xs font-bold text-stone-500">
              પહેલેથી ખાતું છે?{" "}
              <Link href="/login" className="text-green-dark hover:underline font-black">
                સાઇન ઇન કરો (Sign In)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
