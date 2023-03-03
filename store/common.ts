import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './configureStore';

const initialState: {
  isTop: {
    [key: string]: boolean;
  };
  isLoading: boolean;
} = {
  isTop: {
    Main: true,
    Login: true,
    TestResults: true,
    TestResultsDetails: true,
    TestResultsSummary: true,
    MyPage: true,
    PaymentInfo: true,
    ProductInfo: true,
    Register: true,
    FindUserId: true,
  },
  isLoading: false,
};

const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updateIsTop(
      state,
      action: PayloadAction<{
        screen: string;
        value: boolean;
      }>,
    ) {
      state.isTop[action.payload.screen] = action.payload.value;
    },
    onLoading(state) {
      state.isLoading = true;
    },
    onLoadingEnd(state) {
      state.isLoading = false;
    },
  },
});

export const { updateIsTop, onLoading, onLoadingEnd } = common.actions;

export const selectIsTop = (state: RootState) => state.common.isTop;
export const selectIsLoading = (state: RootState) => state.common.isLoading;

export default common.reducer;
