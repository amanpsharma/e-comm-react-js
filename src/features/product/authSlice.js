import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // Logic to authenticate user
      const { email, password } = action.payload;
      // In a real app, you'd verify from backend here.
      if (email && password) {
        localStorage.setItem('email',email);
        localStorage.setItem('isAuthenticated',true);
        state.user = { email };
        state.isAuthenticated = true;
      }
    },
    register: (state, action) => {
      // Save user details for registration
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('email');
      state.isAuthenticated = false;
    },
  },
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;
