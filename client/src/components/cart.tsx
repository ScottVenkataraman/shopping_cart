import { CurrencyContext } from "../providers/currencyProvider";
import { useContext } from "react";

// The cart makes use of useContext and the CurrencyContext to manage the currency of the cart items and total

interface CartItem {
    _id: string,
    productId: string,
    title: string,
    quantity: number,
    price: number
}

interface CartProps {
  cartItems: CartItem[];
  onCheckout: () => void;
}

const Cart = ({cartItems, onCheckout}: CartProps) => {
  const { currency } = useContext(CurrencyContext);
  function renderCart() {
    return (
      cartItems.map(item => (
        <tr key={item._id}>
          <td>{item.title}</td>
          <td>{item.quantity}</td>
          <td>{currency === "USD" ? item.price : (item.price * 2.2).toFixed(2)}</td>
        </tr>
      ))
    );
  }

  function cartTotal(): number {
    if (cartItems.length <= 0) return 0;
    const total = cartItems.reduce((acc: number, curr: CartItem) => acc + (curr.price * curr.quantity), 0);
    return currency === "USD" ? total : total * 2.2;
  }

  function cartWithItems() {
    return (
      <>
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
            {renderCart()}
          </tbody>
      </table>
        <p>Total: {currency === "USD" ? `$${cartTotal()}` : `€${cartTotal()}`}</p>
      </>
    )
  }

  if (cartItems.length > 0) {
    // Cart has items 
    return (
      <>
        <header>
          <h1>The Shop!</h1>
          <h2>Your Cart</h2>
          {cartWithItems()}
          <div className="checkout-button">
            <button className="checkout" data-testid="checkout-with-items" onClick={onCheckout}>Checkout</button>
          </div>
        </header>
      </>
    );
  } else {
    return (
      <>
        <header>
          <h1>The Shop!</h1>
          <h2>Your Cart</h2>
          <p>Your cart is empty</p>
          <p>Total: {currency === "USD" ? "$0.00" : "€0.00"}</p>
          <div className="checkout-button">
            <button className="checkout" data-testid="checkout-without-items">Checkout</button>
          </div>
        </header>
        </>
    );
  } 
}
export default Cart