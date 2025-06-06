import { useState } from 'react';
import type { ProductItem } from "../types";
import EditProductForm from "./editProductForm";
import ProductDetails from "./productDetails";

interface ProductProps {
  product: ProductItem;
  onDeleteProduct: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onUpdateProduct: (updatedProduct: ProductItem, productId: string) => void;
}

const Product = ({product, onDeleteProduct, onAddToCart, onUpdateProduct }: ProductProps) => {
    const [isEditing, setIsEditing] = useState(false);

    function handleToggleEditProduct() {
      setIsEditing(!isEditing);
    }

  return (
    <li className="product">
      <ProductDetails {...product} onToggleEdit={handleToggleEditProduct} onAddToCart={onAddToCart} onDeleteProduct={onDeleteProduct}/>
      <button className="add-to-cart" disabled={product.quantity === 0} onClick={() => onAddToCart(product._id)}>Add to Cart</button>
      <button className="edit" onClick={(handleToggleEditProduct)}>Edit</button>
      {isEditing && (<EditProductForm product={product} onUpdateProduct={onUpdateProduct} onToggleEdit={handleToggleEditProduct}/>)}
    </li>
  )

}

export default Product