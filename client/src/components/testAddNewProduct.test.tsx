import React from "react";
import { test, expect, vi, afterEach} from "vitest";
import { render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "../App";
import { deleteProduct, getProducts, updateProduct, getCartItems, addItemToCart, addNewProduct } from "../services";
import Product from "./product";


const products = [
    {
      _id: "1",
      title: "Super cool robot",
      quantity: 5,
      price: 79.99,
    },
    {
      _id: "2",
      title: "Apple 10.5-Inch iPad Pro",
      quantity: 0,
      price: 649.99,
    },
    {
      _id: "3",
      title: "Yamaha Portable Keyboard",
      quantity: 2,
      price: 155.99,
    },
  ];

  const cart = [
    {
      _id: "a1",
      productId: "1",
      title: "Baseball Bat",
      quantity: 1,
      price: 79.99,
    },
    {
      _id: "a2",
      productId: "2",
      title: "Apple 10.5-Inch iPad Pro",
      quantity: 3,
      price: 649.99,
    },
  ];

// Creates a function that returns a promise that resolves to undefined?
vi.mock("../services");
const mockGetProducts = vi.mocked(getProducts, true);
const mockGetCartItems = vi.mocked(getCartItems, true);
const mockDeleteProduct = vi.mocked(deleteProduct, true);
const mockUpdateProduct = vi.mocked(updateProduct, true);
const mockAddToCart = vi.mocked(addItemToCart, true);
const mockAddNewProduct = vi.mocked(addNewProduct, true);

// Cleans up your mocks so they don't propagate from one test to the next
  // Define before your tests ?
afterEach(() => {
  vi.resetAllMocks();
});

test("Form is not present before add button is clicked", async () => {
  // mockGetProducts.mockResolvedValue(products);
  // mockGetCartItems.mockResolvedValue(cart);
  mockGetProducts.mockImplementation(() => Promise.resolve(products));
  mockGetCartItems.mockImplementation(() => Promise.resolve(cart));
  render(<App />);

  const form = screen.queryByRole('form');
  expect(form).not.toBeInTheDocument();
});

test("Form displays when 'Add button' is clicked", async () => {
  // mockGetProducts.mockResolvedValue(products);
  // mockGetCartItems.mockResolvedValue(cart);
  mockGetProducts.mockImplementation(() => Promise.resolve(products));
  mockGetCartItems.mockImplementation(() => Promise.resolve(cart));
  render(<App />);

  const addButton = await screen.findByText("Add A Product");
  await userEvent.click(addButton);
  const form = await screen.findByRole('form');
  expect(form).toBeInTheDocument();
  expect(screen.getByRole('form')).toHaveTextContent('Product Name');
});

test("Cart items display correctly when app renders", async () => {
  // mockGetProducts.mockResolvedValue(products);
  // mockGetCartItems.mockResolvedValue(cart);
  mockGetProducts.mockImplementation(() => Promise.resolve(products));
  mockGetCartItems.mockImplementation(() => Promise.resolve(cart));
  render(<App />);

  const cartTable = await screen.findByRole('table');
  expect(cartTable).toBeInTheDocument(); 
  expect(cartTable).toHaveTextContent("Baseball Bat");
  expect(cartTable).toHaveTextContent("Apple 10.5-Inch iPad Pro");
});

test("Edit Form displays when edit is clicked", async () => {
  const product = products[0];
  render(<Product product={product} onDeleteProduct={vi.fn()} onAddToCart={vi.fn()} onUpdateProduct={vi.fn()}/>);
  const editProductButton = screen.getByRole('button', {name: 'Edit'});
  expect(editProductButton).toBeInTheDocument();
  
  await userEvent.click(editProductButton);
  // const heading = await screen.findByRole('heading', {level: 3});
  // expect(heading).toHaveTextContent('Edit Product');
  const form = await screen.findByRole('form');
  expect(form).toBeInTheDocument();
  expect(form).toHaveTextContent('Product Name:');
  expect(form).toHaveTextContent('Price:');
  expect(form).toHaveTextContent('Quantity:');
});


test("Nothing in cart before items added to cart", async () => {
  mockGetProducts.mockImplementation(() => Promise.resolve(products));
  mockGetCartItems.mockImplementation(() => Promise.resolve([]));
  render(<App />);

  const emptyCart = await screen.findByText("Your cart is empty");
  expect(emptyCart).toBeInTheDocument();
});


// test("Add to cart creates cart item", async () => {
//   mockGetProducts.mockImplementation(() => Promise.resolve([{
//       _id: "1",
//       title: "Super cool robot",
//       quantity: 5,
//       price: 79.99,
//     }]));
//   mockGetCartItems.mockImplementation(() => Promise.resolve([]));
//   render(<App />);

//   // mockAddToCart.mockImplementation(() => Promise.resolve();
//   const addToCartButton = await screen.findByText("Add to Cart");
//   await userEvent.click(addToCartButton);

//   const cartTable = await screen.findByRole('table');
//   expect(cartTable).toHaveTextContent("Super cool robot");
// });

// Not Done
test("Deleting a product removes it", async () => {
  mockGetProducts.mockImplementation(() => Promise.resolve([{_id: "1",
  title: "Super cool robot",
  quantity: 5,
  price: 79.99,
}]));
  mockGetCartItems.mockImplementation(() => Promise.resolve([]));
  mockDeleteProduct.mockImplementation(() => Promise.resolve(null));
  render(<App />);

  const robotProduct = await screen.findByText("Super cool robot");
  expect(robotProduct).toBeInTheDocument();
  const deleteButton = await screen.findByRole('button', {name: 'X'});
  expect(deleteButton).toBeInTheDocument();
  
  await userEvent.click(deleteButton);
  mockGetProducts.mockImplementation(() => Promise.resolve([]));
  expect(robotProduct).not.toBeInTheDocument();
});
