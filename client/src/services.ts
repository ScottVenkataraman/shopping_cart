import axios from "axios";
import { z } from "zod";
import type { ProductItem } from "./types";

// Product schema
const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  _v: z.number().optional(),
});

// Cart Item schema
const cartItemSchema = z.object({
  _id: z.string(),
  productId: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  _v: z.number().optional(),
});

const getProductsResponseSchema = z.array(productSchema);
const getCartItemsResponseSchema = z.array(cartItemSchema);
const updateProductResponseSchema = productSchema;
const addProductResponseSchema = productSchema;
const addToCartResponseSchema = z.object({
  product: productSchema,
  item: cartItemSchema,
});

// Async get request to get all products
export const getProducts = async () => {
  const { data } = await axios.get("/api/products");
  return getProductsResponseSchema.parse(data);
};

// Async call to get all cart items
export const getCartItems = async () => {
  const { data } = await axios.get("/api/cart");
  return getCartItemsResponseSchema.parse(data);
};

// Updating a product's details 
export const updateProduct = async (
  updatedProduct: ProductItem,
  productId: string 
) => {
  const { data } = await axios.put(`/api/products/${productId}`, {
    ...updatedProduct,
  });
  return updateProductResponseSchema.parse(data);
};

// Create a new product
export const addNewProduct = async (newProduct: ProductItem) => {
  const { data } = await axios.post("/api/products", { ...newProduct });
  return addProductResponseSchema.parse(data);
};

// Delete a product 
export const deleteProduct = async (productId: string) => {
  await axios.delete(`/api/products/${productId}`);
  return null;
};

// Add to cart 
export const addItemToCart = async (productId: string) => {
  const { data } = await axios.post("/api/add-to-cart", { productId });
  return addToCartResponseSchema.parse(data);
};

// Checkout
export const checkout = async () => {
  await axios.post("/api/checkout");
  return null;
};


