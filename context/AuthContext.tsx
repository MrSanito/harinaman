"use client";
 
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name?: string | null;
  role?: string;
  number?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const defaultMockUser: User = {
  id: "dummy-admin-id",
  email: "admin@example.com",
  name: "Admin User",
  role: "Admin",
  number: "9876543210",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Start with mock user directly so they are logged in by default
  const [user, setUser] = useState<User | null>(defaultMockUser);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate short loading to mimic API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: "dummy-admin-id",
      email: email || "admin@example.com",
      name: email.split("@")[0] || "Admin User",
      role: "Admin",
      number: "9876543210",
    };
    
    setUser(mockUser);
    setIsLoading(false);
    router.push("/dashboard");
    router.refresh();
    return { success: true };
  };

  const logout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setUser(null);
    setIsLoading(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
