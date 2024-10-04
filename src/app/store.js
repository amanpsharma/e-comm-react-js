// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/product/cartSlice';
import authReducer from '../features/product/authSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer
  }
});
