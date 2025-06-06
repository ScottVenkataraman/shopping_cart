import React from "react";
import { describe, test, it, expect, vi } from "vitest";
import { render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "../App";
import ProductDetails from "./productDetails";
// Imports the functions from the services file 
import { deleteProduct, getProducts, updateProduct, getCartItems, addItemToCart, addNewProduct } from "../services";
import ProductDetails from "./productDetails";


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
  mockGetProducts.mockResolvedValue(products);
  mockGetCartItems.mockResolvedValue(cart);
  render(<App />);

  const form = await screen.queryByRole('form');
  expect(form).not.toBeInTheDocument();
});

test("Form displays when 'Add button' is clicked", async () => {
  mockGetProducts.mockResolvedValue(products);
  mockGetCartItems.mockResolvedValue(cart);
  render(<App />);

  const addButton = screen.getByText("Add A Product");
  await userEvent.click(addButton);
  const form = await screen.findByRole('form');
  expect(form).toBeInTheDocument();
  expect(screen.getByRole('form')).toHaveTextContent('Product Name');
});

test("Cart items display correctly when app renders", async () => {
  mockGetProducts.mockResolvedValue(products);
  mockGetCartItems.mockResolvedValue(cart);
  render(<App />);

  const cartTable = await screen.findByRole('table');
  expect(cartTable).toBeInTheDocument(); 
  expect(cartTable).toHaveTextContent("Baseball Bat");
  expect(cartTable).toHaveTextContent("Apple 10.5-Inch iPad Pro");
});

test("Edit Form displays when edit is clicked", async () => {
  mockGetProducts.mockResolvedValue(products);
  mockGetCartItems.mockResolvedValue(cart);
  const product = products[0];
  render(<ProductDetails {...product} onDeleteProduct={vi.fn()} onAddToCart={vi.fn()} onToggleEdit={vi.fn()} />);
  const editProductButton = await screen.findByRole('button', {name: 'Edit'});
  expect(editProductButton).toBeInTheDocument();
  
  await userEvent.click(editProductButton);
  const heading = await screen.findByRole('heading', {level: 3});
  expect(heading).toHaveTextContent('Edit Product');
  // const form = await screen.findByRole('form');
  // expect(form).toBeInTheDocument();
  // expect(screen.getByRole('form')).toHaveTextContent('Edit Product');
});




