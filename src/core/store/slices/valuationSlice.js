import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onlinePrice: 0,
};

const valuationSlice = createSlice({
  name: 'valuation',
  initialState,
  reducers: {
    setOnlinePrice: (state, action) => {
      state.onlinePrice = action.payload;
    },
  },
});

export const { setOnlinePrice } = valuationSlice.actions;
export default valuationSlice.reducer