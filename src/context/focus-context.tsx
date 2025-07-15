// context/FocusContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type FocusContextType = {
  isFocusMode: boolean;
  setFocusMode: (value: boolean) => void;
};

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider = ({ children }: { children: ReactNode }) => {
  const [isFocusMode, setFocusMode] = useState(false);

  return (
    <FocusContext.Provider value={{ isFocusMode, setFocusMode }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocusMode = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error("useFocusMode must be used within a FocusProvider");
  }
  return context;
};
