import { useEffect, useState, useReducer } from 'react'
import './index.css'
import Cart from "./components/cart";
import ProductsList from "./components/productList";
import ToggleableAddProductForm from './components/toggleableAddProductForm';
import type { ProductItem, CartItem } from './types';
import { getProducts, getCartItems, updateProduct, addItemToCart, addNewProduct, deleteProduct, checkout } from './services';
import { check } from 'zod/v4';
  
interface AddAction {
  type: "AddProduct";
  product: ProductItem;
}

interface DeleteAction {
  type: "DeleteProduct";
  id: string;
}

interface UpdateAction {
  type: "UpdateProduct";
  updatedProduct: ProductItem;
  productId: string;
}  

interface SetAction {
  type: "SetProducts";
  products: Array<ProductItem>;
}

// function cartReducer() {
  

// }

function productsReducer(products: ProductItem[], action: DeleteAction | UpdateAction | SetAction | AddAction) {
  switch (action.type) {
    case 'DeleteProduct': {
      return products.filter((product: ProductItem) => product._id !== action.id);
    }
    case 'AddProduct': {
      return products.concat(action.product);
    }
    case 'UpdateProduct': {
      return products.map(product => {
        if (product._id === action.updatedProduct._id) {
          return action.updatedProduct;
        } else {
          return product;
        }
      });
    }
    case 'SetProducts': {
      return action.products;
    }
  }
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [products, setProducts] = useState<ProductItem[]>([]);
  const [products, productDispatch] = useReducer(productsReducer, []);
  // const [cartItems, cartDispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      productDispatch({
        type: 'SetProducts',
        products: data,
      });
    // setProducts(data);
    };
  
    const fetchCartItems = async () => {
      const data = await getCartItems();
        setCartItems(data);
      }
      
    try {
      fetchProducts();
      fetchCartItems();
    } catch (e) {
      console.error(e);
    }
  }, []);

 /*
  function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}
  */

  const handleAddProduct = async (
    newProduct: ProductItem,
    callback?: () => void
  ) => {
    try {
      const data = await addNewProduct(newProduct);
      productDispatch({
        type: 'AddProduct',
        product: data,
      });
    // setProducts((prev) => prev.concat(data));
      if (callback){
        callback();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      productDispatch({
        type: 'DeleteProduct',
        id: productId,
      });
  // setProducts((prev) => prev.filter((product) => product._id !== productId));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateProduct = async (updatedProduct: ProductItem, productId: string) => {
    try {
      const data = await updateProduct(updatedProduct, productId);
      productDispatch({
        type: 'UpdateProduct',
        updatedProduct: data,
        productId: productId,
      });
    // setProducts((prev) => {
    //   return prev.map(product => {
    //     if (product._id === data._id) {
    //  return data;
    //     } else {
    //  return product;
    //     }
    //   })
    // })
    } catch (error) {
      console.error(error);
    }
  } 
  
  const handleAddToCart = async (productId: string) => {
    const product = products.filter((product) => product._id === productId)[0];
    const existingItem = cartItems.filter((cartItem) => cartItem.productId === productId)[0];
    if (!product || product.quantity === 0) return;
    try {
      const { product: updatedProduct, item } = await addItemToCart(productId);
      productDispatch({
        type: "UpdateProduct",
        updatedProduct: updatedProduct,
        productId: productId,
      });
      // setProducts((prev) => {
      //   return prev.map((product) => {
      //     if (product._id === updatedProduct._id) {
      //       return updatedProduct;
      //     } else {
      //       return product;
      //     }
      //   });
      // });
      setCartItems((prev) => {
        if (existingItem) {
          return prev.map((cartItem) => {
            if (cartItem.productId === productId) {
              return item;
            } else {
              return cartItem;
            }
          });
        } else {
          return prev.concat(item);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckout = async () => {
    await checkout();
    setCartItems([]);
  }

  

  return (
    <div id="app">
      <Cart onCheckout={handleCheckout} cartItems={cartItems} />
      <ProductsList
        products={products}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddToCart={handleAddToCart}
      />
      <ToggleableAddProductForm onAddProduct={handleAddProduct}/>
    </div>
  );
}
export default App