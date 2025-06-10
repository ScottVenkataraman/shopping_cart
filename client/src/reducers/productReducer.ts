import type { ProductItem } from "../../types";

export interface AddAction {
  type: "AddProduct";
  product: ProductItem;
}

export interface DeleteAction {
  type: "DeleteProduct";
  id: string;
}

export interface UpdateAction {
  type: "UpdateProduct";
  updatedProduct: ProductItem;
  productId: string;
}  

export interface SetAction {
  type: "SetProducts";
  products: Array<ProductItem>;
}

export interface SortAction {
  type: "SortProducts";
  products: ProductItem[];
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
  })
}

export function productsReducer(products: ProductItem[], action: DeleteAction | UpdateAction | SetAction | AddAction | SortAction) {
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
      return {
        items: sortProducts(
          products,
          action.key,
          action.sortDirection,
        ), 
      }
    }
  }
}
