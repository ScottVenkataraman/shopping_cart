import type { ProductItem } from "../types";
import { useState } from "react";

interface ProductDetailsProps extends ProductItem {
  // onToggleEdit: () => void;
  // onAddToCart: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
}

const ProductDetails = ({
  _id,
  title,
  price,
  quantity,
  // onToggleEdit, 
  onDeleteProduct,
  // onAddToCart,
}: ProductDetailsProps) => {

  return (
    <div className="product-details">
      <h3>{title}</h3>
      <p className="price">${price}</p>
      <p className="quantity">{quantity} left in stock</p>
      <div className="actions product-actions">
        {/* <button className="add-to-cart" disabled={quantity === 0} onClick={() => onAddToCart(_id)}>Add to Cart</button>
        <button className="edit" onClick={(onToggleEdit)}>Edit</button> */}
      </div>
      <button className="delete-button" onClick={() => onDeleteProduct(_id)}><span>X</span></button>
    </div>
  );
};

export default ProductDetails