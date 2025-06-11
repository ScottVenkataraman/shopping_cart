import type { ReactNode } from "react";
import { useState, createContext, useEffect } from "react";

type Currency = "USD" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  handleToggleCurrency: () => void;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  handleToggleCurrency: () => {
    throw new Error("toggleCurrency is not implemented");
  },
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>("USD");

  // useEffect(() => {
    
  // })

  const handleToggleCurrency = () => {
    console.log("clicked");
    setCurrency((currentCurrency) => (currentCurrency === "USD" ? "EUR" : "USD"));
  };

  return (
    <CurrencyContext.Provider value={{ currency, handleToggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}