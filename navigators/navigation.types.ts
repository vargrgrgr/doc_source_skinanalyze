import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Source } from 'react-native-fast-image';
import { PhotoFile } from 'react-native-vision-camera';
import { Face } from '../custom_modules/vision-camera-face-detector-custom/src'; 
import {placeholderData} from '../screens/imageproc/ImageProcScreen'

export type BottomTabNavigatorParamList = {
  Main: undefined;
  CameraFake: undefined;
  MyPage: undefined;
};

export type AppStackParamList = {
  BottomTabNavigator: NavigatorScreenParams<BottomTabNavigatorParamList>;
  Column: {curi: number | Source};
  PopTestResult: undefined;
  Camera: undefined;
  Login: undefined;
  Questionnaire: undefined;
  Register: undefined;
  FindUserId: undefined;
  FindPassword: undefined;
  TestResults: { result: placeholderData, result2: placeholderData, photo: PhotoFile };
  TestResultsDetails: { carenum: number };
  TestResultsSummary: undefined;
  CustomizedSolution: { carenum: number };
  CurrentSolutionUsage: undefined;
  ImageProc:{ photo: PhotoFile, face: Face, width: Number, height: Number };
  Shopping: undefined;
  ProductInfo: {
    id: number;
    picture: number | Source;
    name?: string;
    description?: string;
    price?: number;
    discount?: number;
  };
  PaymentInfo: undefined;
  PaymentMethod: undefined;
};

export type ColumnScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Column'
>;
export type PopTestResultNavigationProp = StackNavigationProp<
  AppStackParamList,
  'PopTestResult'
>;
export type CameraScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Camera'
>;
export type LoginScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Login'
>;
export type RegisterScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Register'
>;
export type QuestionnaireScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Questionnaire'
>;
export type ImageProcScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'ImageProc'
>;
export type TestResultsScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'TestResults'
>;
export type TestResultsDetailsScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'TestResultsDetails'
>;
export type TestResultsSummaryScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'TestResultsSummary'
>;
export type CustomizedSolutionScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'CustomizedSolution'
>;
export type ShoppingScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Shopping'
>;
export type ProductInfoScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'ProductInfo'
>;
export type CurrentSolutionUsageScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'CurrentSolutionUsage'
>;
export type PaymentInfoScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'PaymentInfo'
>;
export type MainScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorParamList, 'Main'>,
  StackNavigationProp<AppStackParamList, 'BottomTabNavigator'>
>;
export type MyPageScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorParamList, 'MyPage'>,
  StackNavigationProp<AppStackParamList, 'BottomTabNavigator'>
>;

export type ProductInfoScreenProp = RouteProp<AppStackParamList, 'ProductInfo'>;
export type TestResultsDetailsScreenProp = RouteProp<AppStackParamList, 'TestResultsDetails'>;
export type CustomizedSolutionScreenProp = RouteProp<AppStackParamList, 'CustomizedSolution'>;
export type TestResultsScreenProp = RouteProp<AppStackParamList, 'TestResults'>;
export type ImageProcScreenProp = RouteProp<AppStackParamList, 'ImageProc'>;
export type ColumnScreenProp = RouteProp<AppStackParamList, 'Column'>;
