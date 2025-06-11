import type { ProductItem } from "../types";
import { useContext } from "react";
import { CurrencyContext } from "../providers/currencyProvider";

const ProductDetails = ({
  title,
  price,
  quantity,
}: ProductItem) => {

  const { currency } = useContext(CurrencyContext);
  const finalPrice = currency === "USD" ? `$${price}` : `€${price * 2.2}`;

  return (
    <div className="product-details">
      <h3>{title}</h3>
      <p className="price">{finalPrice}</p>
      <p className="quantity">{quantity} left in stock</p>
      <div className="actions product-actions">
      </div>
    </div>
  );
};

export default ProductDetails