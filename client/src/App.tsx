import { useEffect, useReducer, useContext } from 'react'
import './index.css'
import Cart from "./components/cart";
import ProductsList from "./components/productList";
import ToggleableAddProductForm from './components/toggleableAddProductForm';
import { ToggleableThemeButton } from './components/ToggleableThemeButton';
import { ToggleableCurrencyButton } from './components/toggleableCurrencyButton';
import type { ProductItem } from './types';
import { getProducts, getCartItems, updateProduct, addItemToCart, addNewProduct, deleteProduct, checkout } from './services';
import { productsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import type { SortingKey, SortingDirection } from './reducers/productReducer';
import { ThemeContext } from './providers/themeProvider';
import { CurrencyProvider } from './providers/currencyProvider';

// The app component makes use of useReducer to make a reducer for the products and cart functionalities 
// It also makes use of useContext to manage the light/dark themes

function App() {
  const [products, productDispatch] = useReducer(productsReducer, []);
  const [cartItems, cartDispatch] = useReducer(cartReducer, []);
  
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      productDispatch({
        type: 'SetProducts',
        products: data,
      });
    };
  
    const fetchCartItems = async () => {
      const data = await getCartItems();
      cartDispatch({
        type: 'SetCart',
        cartItems: data,
      });
      }

    try {
      fetchProducts();
      fetchCartItems();
    } catch (e) {
      console.error(e);
    }
  }, []);

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
      cartDispatch({
        type: "AddToCart",
        item: item,
        existingItem: existingItem,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckout = async () => {
    await checkout();
    cartDispatch({
      type: "EmptyCart",
    });
  }

  const handleSortProducts = (key: SortingKey, direction: SortingDirection) => {
    productDispatch({
      type: "SortProducts",
      key: key,
      sortDirection: direction,
    });
  }

  return (
    <div id="app" className={theme}>
      <ToggleableThemeButton />
      <CurrencyProvider>
        <ToggleableCurrencyButton />
        <Cart onCheckout={handleCheckout} cartItems={cartItems} />
        <ProductsList
          products={products}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddToCart={handleAddToCart}
          onSort={handleSortProducts}
        />
      </CurrencyProvider>
      <ToggleableAddProductForm onAddProduct={handleAddProduct}/>
    </div>
  );
}
export default App