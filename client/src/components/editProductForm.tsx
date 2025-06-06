import type { ProductItem } from "../types";
import { useState } from "react";

interface EditFormProps {
  product: ProductItem;
  onToggleEdit: () => void;
  onUpdateProduct: (updatedProduct: ProductItem, productId: string) => void;
}

const EditProductForm = ({onToggleEdit, product, onUpdateProduct}: EditFormProps) => { 
  const _id = product._id;
  const [title, setTitle] = useState<string>(product.title);
  const [price, setPrice] = useState<string | undefined>(String(product.price));
  const [quantity, setQuantity] = useState<string | undefined>(String(product.quantity));

  const handleUpdateProduct = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const updatedProduct = {
      _id,
      title,
      price: Number(price),
      quantity: Number(quantity),
    };
    onUpdateProduct(updatedProduct, _id);
    onToggleEdit();
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form aria-label="Edit product form">
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            id="product-quantity"
            name="product-quantity"
            min="0"
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit" onClick={handleUpdateProduct}>Submit</button>
          <button type="button" onClick={onToggleEdit}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditProductForm