import type { ProductItem } from "../types";

export interface ADD_ACTION {
  type: "AddProduct";
  product: ProductItem;
}

export interface DELETE_ACTION {
  type: "DeleteProduct";
  id: string;
}

export interface UPDATE_ACTION {
  type: "UpdateProduct";
  updatedProduct: ProductItem;
  productId: string;
}  

export interface SET_ACTION {
  type: "SetProducts";
  products: Array<ProductItem>;
}

export interface SORT_ACTION {
  type: "SortProducts";
  key: SortingKey;
  sortDirection: SortingDirection;
}

export type SortingKey = "title" | "price" | "quantity";
export type SortingDirection = "ascending" | "descending";

export const sortProducts = (products: ProductItem[], key: SortingKey, direction: SortingDirection): ProductItem[] => {
  return [...products].sort((a, b) => {
    let aVal = a[key];
    let bVal = b[key];

    if (key === "title") {
      aVal = aVal.toString().toLowerCase();
      bVal = bVal.toString().toLowerCase();
    }

    if (direction === "ascending") {
      if (aVal < bVal) {
        return -1;
      } else {
        if (aVal > bVal) {
          return 1;
        } else return 0;
      }
    } else { // sorting in descending order
      if (aVal > bVal) {
        return -1;
      } else {
        if (aVal < bVal) {
          return 1;
        } else return 0;
      }
    }
  });
}

export function productsReducer(products: ProductItem[], action: DELETE_ACTION | UPDATE_ACTION | SET_ACTION | ADD_ACTION | SORT_ACTION) {
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
    case 'SortProducts': {
      return sortProducts(
        products,
        action.key,
        action.sortDirection,
      );
    }
  }
}
