import type { ProductItem } from "../types";
import { useState } from "react";
import Form from "./addProductForm";
import EditForm from "./editProductForm";
import Product from "./product";
import type { SortingKey, SortingDirection } from "../reducers/productReducer";

interface ListProps {
  products: ProductItem[];
  onDeleteProduct: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onUpdateProduct: (updatedProduct: ProductItem, productId: string) => void;
  onSort: (key: SortingKey, direction: SortingDirection) => void;
}

const ProductsList = ({ products, onDeleteProduct, onAddToCart, onUpdateProduct, onSort}: ListProps) => {  
  const [titleSort, setTitleSort] = useState<SortingDirection>("ascending");
  const [priceSort, setPriceSort] = useState<SortingDirection>("ascending");
  const [quantitySort, setQuantitySort] = useState<SortingDirection>("ascending");
  
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <div>
        <h3>Sort By</h3>
        <button onClick={() => {
          setTitleSort(titleSort === "ascending" ? "descending" : "ascending");
          onSort("title", titleSort);
          }}>Title</button>
        <button onClick={() => {
          setPriceSort(priceSort === "ascending" ? "descending" : "ascending");
          onSort("price", priceSort);
          }}>Price</button>
        <button onClick={() => {
          setQuantitySort(quantitySort === "ascending" ? "descending" : "ascending");
          onSort("quantity", quantitySort);
          }}>Quantity</button>
      </div>
      <ul className="product-list">
        {products.map((product) => (
          <Product key={product._id} product={product} onUpdateProduct={onUpdateProduct} onAddToCart={onAddToCart} onDeleteProduct={onDeleteProduct}/>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList