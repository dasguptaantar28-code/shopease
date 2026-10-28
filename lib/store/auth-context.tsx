"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { UserProfile, UserRole } from "../types";
import { isSupabaseConfigured } from "../supabase/env";
import { createClient } from "../supabase/client";
import { useToast } from "./toast-context";

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAdmin: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password?: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchDemoRole?: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_STORAGE_KEY = "shopease_auth_user_v2";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function initAuth() {
      if (isSupabaseConfigured) {
        try {
          const supabase = createClient();
          const { data: { user: authUser } } = await supabase.auth.getUser();

          if (authUser) {
            // Fetch profile for role
            const { data: profile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", authUser.id)
              .single();

            setUser({
              id: authUser.id,
              email: authUser.email || "",
              full_name: profile?.full_name || authUser.user_metadata?.full_name || "Customer",
              avatar_url: profile?.avatar_url || null,
              phone: profile?.phone || null,
              role: profile?.role || "customer",
              created_at: authUser.created_at,
            });
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Fallback local demo session
        try {
          const stored = localStorage.getItem(DEMO_USER_STORAGE_KEY);
          if (stored) {
            setUser(JSON.parse(stored));
          } else {
            // Default demo customer user
            const defaultUser: UserProfile = {
              id: "usr-demo-customer",
              email: "shopper@shopease.store",
              full_name: "Alex Taylor",
              phone: "+1 (555) 234-5678",
              role: "customer",
              created_at: new Date().toISOString(),
            };
            setUser(defaultUser);
            localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(defaultUser));
          }
        } catch {
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    }

    initAuth();
  }, []);

  const login = useCallback(
    async (email: string, password?: string) => {
      setIsLoading(true);
      if (isSupabaseConfigured) {
        try {
          const supabase = createClient();
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: password || "",
          });

          if (error) {
            toast({ title: "Sign in failed", description: error.message, type: "error" });
            setIsLoading(false);
            return { success: false, error: error.message };
          }

          if (data.user) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", data.user.id)
              .single();

            const loggedInUser: UserProfile = {
              id: data.user.id,
              email: data.user.email || "",
              full_name: profile?.full_name || data.user.user_metadata?.full_name || "User",
              role: profile?.role || "customer",
              created_at: data.user.created_at,
            };
            setUser(loggedInUser);
            toast({ title: "Welcome back!", description: `Logged in as ${loggedInUser.email}`, type: "success" });
            setIsLoading(false);
            return { success: true };
          }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "Authentication error";
          toast({ title: "Sign in failed", description: msg, type: "error" });
          setIsLoading(false);
          return { success: false, error: msg };
        }
      }

      // Demo login
      const isAdminLogin = email.toLowerCase().includes("admin");
      const demoUser: UserProfile = {
        id: isAdminLogin ? "usr-admin-demo" : `usr-${Date.now()}`,
        email: email.trim().toLowerCase(),
        full_name: isAdminLogin ? "Admin Manager" : "Demo Shopper",
        role: isAdminLogin ? "admin" : "customer",
        created_at: new Date().toISOString(),
      };

      setUser(demoUser);
      localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoUser));
      toast({
        title: "Signed in (Demo Mode)",
        description: `Signed in as ${demoUser.role.toUpperCase()}: ${demoUser.email}`,
        type: "success",
      });
      setIsLoading(false);
      return { success: true };
    },
    [toast]
  );

  const signup = useCallback(
    async (email: string, password?: string, fullName?: string) => {
      setIsLoading(true);
      if (isSupabaseConfigured) {
        try {
          const supabase = createClient();
          const { data, error } = await supabase.auth.signUp({
            email,
            password: password || "",
            options: {
              data: {
                full_name: fullName,
              },
            },
          });

          if (error) {
            toast({ title: "Registration failed", description: error.message, type: "error" });
            setIsLoading(false);
            return { success: false, error: error.message };
          }

          toast({
            title: "Account created!",
            description: "Please check your email to verify your account.",
            type: "success",
          });
          setIsLoading(false);
          return { success: true };
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "Registration error";
          toast({ title: "Registration failed", description: msg, type: "error" });
          setIsLoading(false);
          return { success: false, error: msg };
        }
      }

      // Demo signup: NEVER grants admin
      const demoUser: UserProfile = {
        id: `usr-${Date.now()}`,
        email: email.trim().toLowerCase(),
        full_name: fullName || "New Shopper",
        role: "customer", // Strict customer default
        created_at: new Date().toISOString(),
      };
      setUser(demoUser);
      localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoUser));
      toast({
        title: "Account created successfully",
        description: `Welcome to ShopEase, ${demoUser.full_name}!`,
        type: "success",
      });
      setIsLoading(false);
      return { success: true };
    },
    [toast]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    if (isSupabaseConfigured) {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch {
        // Ignore
      }
    }
    setUser(null);
    localStorage.removeItem(DEMO_USER_STORAGE_KEY);
    toast({ title: "Signed out", description: "You have been logged out.", type: "info" });
    setIsLoading(false);
  }, [toast]);

  const switchDemoRole = useCallback(
    (newRole: UserRole) => {
      if (!user) return;
      const updated = { ...user, role: newRole };
      setUser(updated);
      localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(updated));
      toast({
        title: `Switched to ${newRole.toUpperCase()} mode`,
        description: `You are now browsing as ${newRole}.`,
        type: "info",
      });
    },
    [user, toast]
  );

  const role = user?.role || "customer";
  const isAdmin = role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAdmin,
        isLoading,
        isConfigured: isSupabaseConfigured,
        login,
        signup,
        logout,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
