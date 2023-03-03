import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Source } from 'react-native-fast-image';

import { RootState } from './configureStore';
import { onLogout } from './user';

type Product = {
  id: number;
  picture: number | Source;
  name: string;
  price: number;
  discount?: number;
};

const cart = createSlice({
  name: 'cart',
  initialState: [] as {
    product: Product;
    quantity: number;
  }[],
  reducers: {
    onPurchase(
      _,
      action: PayloadAction<{ product: Product; quantity: number }[]>,
    ) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onLogout, () => {
      return [];
    });
  },
});

export const { onPurchase } = cart.actions;

export const selectCart = (state: RootState) => state.cart;

export default cart.reducer;
