import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authSlice';
import cartReducer from '../cartSlice';
import shopReducer from '../shopDetailSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    shopDetail: shopReducer,
  },
});

export default store;
