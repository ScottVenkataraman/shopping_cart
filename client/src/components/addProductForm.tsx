import type { NewProduct } from "../types";
import { useState } from "react";


interface AddProductFormProps {
  onToggleForm: () => void;
  onAddProduct: (product: NewProduct, onToggleForm: () => void) => void;
}

const AddProductForm = ({ onToggleForm, onAddProduct }: AddProductFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newProduct = {
      title,
      price,
      quantity,
    };
    onAddProduct(newProduct, onToggleForm);
  };

  return (
    <div className="add-form">
      <form>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input 
            type="text" 
            id="product-name" 
            name="product-name" 
            value={title} 
            onChange={(event) => setTitle(event.target.value)}
            required />
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
            onChange={(event) => setPrice(+event.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            value={quantity}
            onChange={(event) => setQuantity(+event.target.value)}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit" onClick={handleSubmit}>Add</button>
          <button type="button" onClick={onToggleForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;