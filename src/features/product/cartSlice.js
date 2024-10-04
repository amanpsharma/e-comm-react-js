// src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
  navigation: [
    { name: "Home", href: "/home", current: true },
    { name: "Product", href: "/products", current: false },
    { name: "About", href: "/about", current: false },
    { name: "Contact Us", href: "/contact", current: false },
    { name: "Cart", href: "/cart", current: false },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalAmount += product.price.discounted;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.id === productId
      );

      if (existingProduct) {
        state.totalQuantity -= existingProduct.quantity;
        state.totalAmount -=
          existingProduct.price.discounted * existingProduct.quantity;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== productId
        );
      }
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.id === productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount += existingProduct.price.discounted;
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.id === productId
      );

      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= existingProduct.price.discounted;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
    },
    navigationClick: (state, action) => {
      const updatedNavigation = state.navigation.map((item) =>
        item.name === action.payload.name
          ? { ...item, current: true }
          : { ...item, current: false }
      );
      state.navigation = updatedNavigation;
    },
    removeCartLink: (state, action) => {
      if (state.navigation[state.navigation.length - 1]["name"] !== "Cart") {
        const removeCart = [...state.navigation, action.payload];
        state.navigation = removeCart;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, navigationClick, removeCartLink } =
  cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectedNavigation = (state) => state.cart.navigation;
export const selectNavigation = (state) => state.cart.navigation;
export default cartSlice.reducer;
