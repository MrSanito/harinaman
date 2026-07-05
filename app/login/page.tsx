"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const { login, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || "Authentication failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-custom text-black">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-xl border border-green-dark/20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-green-dark"></div>
          <p className="text-sm text-olive font-semibold tracking-wide">Securing session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-custom px-6 py-12 lg:px-8">
      {/* Decorative Floating Vegetable Badges / Blobs */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-yellow/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-green-dark/15 rounded-full filter blur-3xl"></div>

      <div className="relative mx-auto w-full max-w-md">
        {/* Main Form Card */}
        <div className="bg-white border-2 border-green-dark/10 rounded-[32px] overflow-hidden shadow-2xl">
          
          {/* Header Banner - Yellow */}
          <div className="bg-yellow px-6 py-4 flex items-center justify-center gap-2 border-b border-green-dark/10">
            <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <span className="text-xs font-black uppercase tracking-wider text-black">Fresh Organic Produce</span>
          </div>

          <div className="p-8">
            {/* Logo / Title */}
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-dark shadow-md shadow-green-dark/30">
                <span className="text-xl font-bold text-white">H</span>
              </div>
              <h2 className="mt-5 text-center text-2xl font-black tracking-tight text-black sm:text-3xl">
                Harina Man Portal
              </h2>
              <p className="mt-1.5 text-center text-sm font-bold text-olive">
                Fresh Vegetables & Daily Logistics
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-700 flex items-start gap-2">
                <svg className="h-4.5 w-4.5 text-red-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Form */}
            <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-xs font-black uppercase tracking-wider text-black">
                  Email Address
                </label>
                <div className="mt-1.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-black placeholder:text-zinc-400 focus:border-green-dark focus:outline-none transition-colors duration-200 font-semibold"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-xs font-black uppercase tracking-wider text-black">
                    Password
                  </label>
                </div>
                <div className="mt-1.5">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm text-black placeholder:text-zinc-400 focus:border-green-dark focus:outline-none transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-xl bg-green-dark px-4 py-3.5 text-sm font-black text-white hover:bg-[#07722c] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-green-dark/10"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-xs font-bold text-stone-500">
              નવા ગ્રાહક છો?{" "}
              <Link href="/register" className="text-green-dark hover:underline font-black">
                નોંધણી કરો (Sign Up)
              </Link>
            </div>

            {/* Quick Test Credentials - Styled in Orange Accent */}
            <div className="mt-6 pt-5 border-t border-zinc-100">
              <div className="bg-orange/10 border border-orange/20 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="h-2 w-2 rounded-full bg-orange animate-ping"></span>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-orange">Quick Test Access</h4>
                </div>
                <div className="flex items-center justify-between text-xs text-black font-semibold">
                  <div>
                    <span className="text-zinc-500">Email:</span> <code className="text-black font-mono">admin@example.com</code>
                  </div>
                  <div>
                    <span className="text-zinc-500">Pass:</span> <code className="text-black font-mono">password</code>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("admin@example.com");
                      setPassword("password");
                    }}
                    className="text-xs font-black text-green-dark hover:underline transition-colors"
                  >
                    Fill
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
