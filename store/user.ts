import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { RootState } from './configureStore';

export interface User {
  uid: string;
  userId?: string | null;
  userName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  refereeId?: string;
  authProvider: string;
  age?: string | null;
  questionnaire?: {
    gender?: 1 | 2;
    age?: number;
    skinAfterSkincare?: number;
    tZoneOil?: number;
    pimple?: number;
    dermatitis?: number;
    acne?: number;
    skinReaction?: number;
    concern?: number[];
  } | null;
  skinAge?: number | null;
  testData?: {
    oil: number;
    wrinkle: number;
    pigment: number;
    trouble: number;
    pore: number;
    flush: number;
  } | null;
}

const user = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    onLogin() {
      return {
        uid: '0',
        userId: '',
        userName: '',
        phoneNumber: '',
        email: '',
        age:'',
        authProvider: 'local',
        questionnaire: null,
        skinAge: 25,
        testData: null,
      };
    },
    onFetchUser(_, action: PayloadAction<User>) {
      return action.payload;
    },
    onRegisterDone(
      _,
      action: PayloadAction<{
        uid: string;
        userId: string;
        userName: string;
        authProvider: string;
        phoneNumber: string;
        email: string;
        refereeId?: string;
        age: string;
      }>,
    ) {
      return {
        ...action.payload,
        skinAge: 25,
        questionnaire: null,
        testData: null,
      };
    },
    onQuestionnaireDone(
      state,
      action: PayloadAction<{
        gender?: 1 | 2;
        age?: number;
        skinAfterSkincare?: number;
        tZoneOil?: number;
        pimple?: number;
        dermatitis?: number;
        acne?: number;
        skinReaction?: number;
        concern?: number[];
      }>,
    ) {
      return { ...state!, questionnaire: action.payload };
    },
    onLogout() {
      GoogleSignin.signOut().catch(() => {});
      return null;
    },

  },
});

export const {
  onLogin,
  onFetchUser,
  onRegisterDone,
  onQuestionnaireDone,
  onLogout,
} = user.actions;

export const selectIsLoggedIn = (state: RootState) => !!state.user;
export const selectUser = (state: RootState) => state.user;
export const selectTestData = (state: RootState) => state.user?.testData;
export const selectAverageScore = createSelector(selectTestData, (testData) => {
  if (!testData) {
    return 0;
  } else {
    let totalScore = 0;
    const keys = Object.keys(testData);
    for (let i = 0; i < keys.length - 1; i++) {
      totalScore += testData[keys[i] as keyof typeof testData];
    }
    return Math.round(totalScore / keys.length);
  }
});
export default user.reducer;
