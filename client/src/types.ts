export interface ProductItem {
  _id: string,
  title: string,
  quantity: number,
  price: number,
  createdAt?: string;
  updatedAt?: string;
  _v?: number;
}

export interface ProductItemList {
  products: ProductItem[]
}

export type NewProduct = Omit<ProductItem, "_id">

export interface CartItem extends ProductItem {
  productId: string
}