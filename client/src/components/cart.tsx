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
  function renderCart() {
    return (
      cartItems.map(item => (
        <tr key={item._id}>
          <td>{item.title}</td>
          <td>{item.quantity}</td>
          <td>{item.price}</td>
        </tr>
      ))
    );
  }

  function cartTotal(): number | undefined {
    if (cartItems.length <= 0) return 0;
    const total = cartItems.reduce((acc: number, curr: CartItem) => acc + curr.price, 0);
    return total;
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
        <p>Total: ${cartTotal()}</p>
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
          <p>Total: $0</p>
          <div className="checkout-button">
            <button className="checkout" data-testid="checkout-without-items">Checkout</button>
          </div>
        </header>
        </>
    );
  } 
}
export default Cart