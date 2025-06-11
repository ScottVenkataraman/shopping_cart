import { useContext } from "react";
import { CurrencyContext } from "../providers/currencyProvider";

export const ToggleableCurrencyButton = () => {
  const currencyContext = useContext(CurrencyContext);
  const { currency, handleToggleCurrency } = currencyContext;

  return (
    <>
      <button onClick={handleToggleCurrency}>{currency === "USD" ? "Switch to EUR" : "Switch to USD"}</button>
    </>
  )
}