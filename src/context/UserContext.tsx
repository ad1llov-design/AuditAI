"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "user" | "pro" | "business" | "enterprise" | "admin";

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  hasAccess: (feature: "ai" | "save" | "analytics" | "team" | "api") => boolean;
}

const rolePermissions: Record<UserRole, string[]> = {
  user: [],
  pro: ["ai"],
  business: ["ai", "save", "analytics", "team"],
  enterprise: ["ai", "save", "analytics", "team", "api"],
  admin: ["ai", "save", "analytics", "team", "api"],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("user");

  const hasAccess = (feature: "ai" | "save" | "analytics" | "team" | "api") => {
    return rolePermissions[role].includes(feature);
  };

  return (
    <UserContext.Provider value={{ role, setRole, hasAccess }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
