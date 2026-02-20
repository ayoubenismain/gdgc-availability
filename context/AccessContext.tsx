"use client";

import { createContext, useContext, useState } from "react";

const AccessContext = createContext<any>(null);

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <AccessContext.Provider value={{ unlocked, setUnlocked }}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  return useContext(AccessContext);
}