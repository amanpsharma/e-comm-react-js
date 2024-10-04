// src/features/product/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  brand: '',
  description: '',
  category: '',
  sub_category: '',
  gender: '',
  size_guide: {
    US: [],
    UK: [],
    EU: []
  },
  colors: [],
  price: {
    currency: '',
    original: 0,
    discounted: 0,
    discount_percentage: 0,
    price_history: []
  },
  inventory: {
    available: false,
    stock: 0,
    restock_date: null
  },
  shipping: {
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    shipping_cost: 0,
    free_shipping_over: 0,
    estimated_delivery_days: 0,
    regions_available: []
  },
  reviews: {
    average_rating: 0,
    total_reviews: 0,
    top_reviews: []
  },
  features: [],
  related_products: [],
  tags: [],
  release_date: '',
  warranty: {
    period: '',
    details: ''
  },
  social_media_sharing: {
    facebook: '',
    twitter: '',
    instagram: ''
  }
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;
