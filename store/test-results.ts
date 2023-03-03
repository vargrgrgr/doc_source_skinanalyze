import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './configureStore';
import { onLogout } from './user';

const initialState = {
  recent: null,
};

const testResults = createSlice({
  name: 'testResults',
  initialState: initialState as { recent: null | { [key: string]: number } },
  reducers: {
    onTestResultsDone(state, action: PayloadAction<{ [key: string]: number }>) {
      return { ...state, recent: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onLogout, (state) => {
      return { ...state, recent: null };
    });
  },
});

export const { onTestResultsDone } = testResults.actions;

export const selectHasTestResults = (state: RootState) =>
  !!state.testResults?.recent;
export const selectRecentTestResults = (state: RootState) =>
  state.testResults?.recent;
export const selectAverageRecentTestScore = createSelector(
  selectRecentTestResults,
  (test) => {
    if (!test) {
      return 0;
    } else {
      let totalScore = 0;
      const keys = Object.keys(test);
      for (let i = 0; i < keys.length - 1; i++) {
        totalScore += test[keys[i] as keyof typeof test];
      }
      return Math.round(totalScore / keys.length);
    }
  },
);
export default testResults.reducer;
