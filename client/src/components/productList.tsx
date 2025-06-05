import type { ProductItem } from "../types";
import Form from "./addProductForm";
import EditForm from "./editProductForm";
import Product from "./product";

interface ListProps {
  products: ProductItem[];
  onDeleteProduct: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onUpdateProduct: (updatedProduct: ProductItem, productId: string) => void;
}

const ProductsList = ({ products, onDeleteProduct, onAddToCart, onUpdateProduct }: ListProps) => {  
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product) => (
          <Product key={product._id} product={product} onUpdateProduct={onUpdateProduct} onAddToCart={onAddToCart} onDeleteProduct={onDeleteProduct}/>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList