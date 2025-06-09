import React from "react";
import { test, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "../../App";
import { deleteProduct, getProducts, updateProduct, getCartItems, addItemToCart, checkout, addNewProduct } from "../../services";
import Product from "../product";
import AddProductForm from "../addProductForm";
import Cart from "../cart";


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
vi.mock("../../services");
const mockGetProducts = vi.mocked(getProducts, true);
const mockGetCartItems = vi.mocked(getCartItems, true);
const mockDeleteProduct = vi.mocked(deleteProduct, true);
const mockUpdateProduct = vi.mocked(updateProduct, true);
const mockAddToCart = vi.mocked(addItemToCart, true);
const mockAddNewProduct = vi.mocked(addNewProduct, true);
const mockCheckout = vi.mocked(checkout, true);

// Cleans up your mocks so they don't propagate from one test to the next
  // Define before your tests ?
// afterEach(() => {
//   vi.resetAllMocks();
// });


test("Form is not present before add button is clicked", async () => {
  mockGetProducts.mockResolvedValue(products);
  mockGetCartItems.mockResolvedValue(cart);

  render(<App />);

  await waitFor(() => {
    const form = screen.queryByRole("form");
    expect(form).not.toBeInTheDocument();
  });
});

test("Form displays when 'Add product button' is clicked", async () => {
  mockGetProducts.mockResolvedValue(products);
  mockGetCartItems.mockResolvedValue(cart);
  render(<App />);

  const addButton = await screen.findByText("Add A Product");
  await userEvent.click(addButton);
  const form = await screen.findByRole('form');
  expect(form).toBeInTheDocument();
  expect(screen.getByRole('form')).toHaveTextContent('Product Name');
});

test ("form disappears when add product cancel button is clicked", async () => {
  mockGetProducts.mockResolvedValue(products);
  mockGetCartItems.mockResolvedValue(cart);
  render(<App />);

  const addButton = await screen.findByText("Add A Product");
  await userEvent.click(addButton);
  const form = await screen.findByRole('form');
  const cancelAddButton = await screen.findByText("Cancel");
  await userEvent.click(cancelAddButton);
  
  expect(form).not.toBeInTheDocument(); 
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
  const product = products[0];
  render(<Product product={product} onDeleteProduct={vi.fn()} onAddToCart={vi.fn()} onUpdateProduct={vi.fn()}/>);
  const editProductButton = screen.getByRole('button', {name: 'Edit'});
  expect(editProductButton).toBeInTheDocument();
  
  await userEvent.click(editProductButton);

  const form = await screen.findByRole('form');
  expect(form).toBeInTheDocument();
  expect(form).toHaveTextContent('Product Name:');
  expect(form).toHaveTextContent('Price:');
  expect(form).toHaveTextContent('Quantity:');
});


test("Nothing in cart before items added to cart", async () => {
  mockGetProducts.mockResolvedValue(products);
  mockGetCartItems.mockResolvedValue([]);
  render(<App />);

  const emptyCart = await screen.findByText("Your cart is empty");
  expect(emptyCart).toBeInTheDocument();
  expect(emptyCart).toBeVisible();
});

test("Add to cart creates cart item", async () => {
  const product = {
      _id: "1",
      title: "Super cool robot",
      quantity: 5,
      price: 79.99,
    }

    const item = {
      _id: "1",
      productId: "a1",
      title: "Super cool robot",
      quantity: 5,
      price: 79.99,
    }

  mockGetProducts.mockResolvedValue([product]);
  mockGetCartItems.mockResolvedValue([]);
  render(<App />);

  mockAddToCart.mockResolvedValue({product: product, item: item});
  const addToCartButton = await screen.findByRole('button', {name: "Add to Cart"});
  await userEvent.click(addToCartButton);
  expect(addToCartButton).toBeInTheDocument();
  
  const cartTable = await screen.findByRole('table');
  expect(cartTable).toHaveTextContent("Super cool robot");
});


test("Deleting a product removes it", async () => {
  mockGetProducts.mockResolvedValue([{_id: "1",
  title: "Super cool robot",
  quantity: 5,
  price: 79.99,
}]);
  mockGetCartItems.mockResolvedValue([]);
  mockDeleteProduct.mockImplementation(() => Promise.resolve(null));
  render(<App />);

  const robotProduct = await screen.findByText("Super cool robot");
  expect(robotProduct).toBeInTheDocument();
  const deleteButton = await screen.findByRole('button', {name: 'X'});
  expect(deleteButton).toBeInTheDocument();
  
  await userEvent.click(deleteButton);
  // mockGetProducts.mockResolvedValue([]);
  expect(robotProduct).not.toBeInTheDocument();
});

// Not done 
// test("Adding product closes form, and displays product", async () => {
//   const product = {title: "Super cool robot",
//   quantity: 5,
//   price: 79.99
//   }

//   mockGetCartItems.mockResolvedValue([]);
//   mockGetProducts.mockResolvedValue([]);
//   mockAddNewProduct.mockResolvedValue({_id: "2", title: "Super cool robot",
//   quantity: 5,
//   price: 79.99});
  
//   render(<App/>);

//   const addProductButton = await screen.findByRole('button', {name: "Add A Product"});
//   expect(addProductButton).toBeInTheDocument();

//   await userEvent.click(addProductButton);

//   const addProductForm = await screen.findByRole('form');
//   expect(addProductForm).not.toBeInTheDocument();
//   const title = 

// });


// Not done 
test("Clicking checkout clears the cart.", async () => {
  mockGetCartItems.mockResolvedValue(cart);
  mockGetProducts.mockResolvedValue([]);
  mockCheckout.mockResolvedValue(null);

  render(<App/>);

  const checkoutButton = screen.getByRole('button', {name: 'Checkout'});
  expect(checkoutButton).toBeInTheDocument();
  const cartItem = await screen.findByText("Baseball Bat");
  expect(cartItem).toBeInTheDocument();
  // expect(cartItem).toBeVisible();

  await userEvent.click(checkoutButton);
  mockGetCartItems.mockResolvedValue([]);

  // const newCartItem = screen.queryByText("Baseball Bat");
  expect(cartItem).not.toBeInTheDocument();
  
  // expect(cartItem).not.toBeVisible();
});