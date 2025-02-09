import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shopDetail: null,
};

const shopDetailSlice = createSlice({
  name: 'shopDetail',
  initialState,
  reducers: {
    setShopDetail(state, action) {
      state.shopDetail = action.payload;
    },
  },
});

export const { setShopDetail } = shopDetailSlice.actions;

export default shopDetailSlice.reducer;
