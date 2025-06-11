import type { CartItem } from "../types";

export interface SetCart {
  type: "SetCart";
  cartItems: CartItem[];
}

export interface AddToCart {
  type: "AddToCart";
  item: CartItem;
  existingItem: CartItem;
}

export interface EmptyCart {
  type: "EmptyCart";
}

export function cartReducer(cart: CartItem[], action: SetCart | AddToCart | EmptyCart) {
  switch(action.type) {
    case 'SetCart': {
      return action.cartItems;
    }
    case 'AddToCart': {
      if (action.existingItem) {
        return cart.map((cartItem) => {
          if (cartItem.productId === action.item.productId) {
            return action.item;
          } else {
          return cartItem;
          }
        });
      } else {
        return cart.concat(action.item);
      }
    }
    case 'EmptyCart': {
      return [];
    }
  }
}
