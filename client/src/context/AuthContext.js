"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const t = localStorage.getItem("pu_token");
      const u = localStorage.getItem("pu_user");
      if (t && u) {
        setToken(t);
        setUser(JSON.parse(u));
      }
    } catch {
      // corrupted storage — ignore
    }
    setLoading(false);
  }, []);

  const persist = useCallback((tkn, usr) => {
    setToken(tkn);
    setUser(usr);
    localStorage.setItem("pu_token", tkn);
    localStorage.setItem("pu_user", JSON.stringify(usr));
  }, []);

  const login = useCallback(async (email, password) => {
    const res  = await fetch(`${API}/api/auth/login`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    persist(data.token, data.user);
    return data.user;
  }, [persist]);

  const register = useCallback(async (name, email, password) => {
    const res  = await fetch(`${API}/api/auth/register`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    persist(data.token, data.user);
    return data.user;
  }, [persist]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("pu_token");
    localStorage.removeItem("pu_user");
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
