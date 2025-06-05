import AddProductForm from "./addProductForm";
import { useState } from "react";
import type { NewProduct } from "../types";


interface FormProps {
  onAddProduct: (product: NewProduct, onToggleForm: () => void) => void;
}

const ToggleableAddProductForm = ({onAddProduct}: FormProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleToggleForm = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      {isVisible ? (
        <AddProductForm onToggleForm={handleToggleForm} onAddProduct={onAddProduct}/>
      ) : (
        <p>
          <button className="add-product-button" onClick={handleToggleForm}>
            Add A Product
          </button>
        </p>
      )}
    </>
  );
};

export default ToggleableAddProductForm;