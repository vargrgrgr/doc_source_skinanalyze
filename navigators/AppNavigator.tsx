import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import colors from '../utils/colors';
import { selectIsLoggedIn, selectUser } from '../store/user';
import BottomTabNavigator from './BottomTabNavigator';
import ColumnScreen from '../screens/column/ColumnScreen';
import PopTestResultScreen from '../screens/poptestresult/PopTestResultScreen';
import CameraScreen from '../screens/camera/CameraScreen';
import CurrentSolutionUsageScreen from '../screens/current-solution-usage/CurrentSolutionUsage';
import CustomizedSolutionScreen from '../screens/customized-solution/CustomizedSolutionScreen';
import FindPasswordScreen from '../screens/find-password/FindPasswordScreen';
import FindUserIdScreen from '../screens/find-userid/FindUserIdScreen';
import Header from '../components/Header';
import Loading from '../components/Loading';
import LoginScreen from '../screens/login/LoginScreen';
import PaymentInfoScreen from '../screens/payment-info/PaymentInfoScreen';
import PaymentMethodScreen from '../screens/payment-method/PaymentMethodScreen';
import ProductInfoScreen from '../screens/product-info/ProductInfoScreen';
import QuestionnaireScreen from '../screens/questionnaire/QuestionnaireScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import ShoppingScreen from '../screens/shopping/ShoppingScreen';
import TestResultsScreen from '../screens/test-results/TestResultsScreen';
import TestResultsSummaryScreen from '../screens/test-results-summary/TestResultsSummaryScreen';
import TestResultsDetailsScreen from '../screens/test-results-details/TestResultsDetailsScreen';
import ImageProcScreen from '../screens/imageproc/ImageProcScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC<{}> = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const getHeader = (props: StackHeaderProps) => <Header {...props} />;

  const getStacks = () => {
    if (
      isLoggedIn &&
      (!user?.userName ||
        !user?.phoneNumber ||
        !user?.phoneNumber ||
        !user?.email)
    ) {
      return (
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: '회원가입',
          }}
        />
      );
    }

    if (isLoggedIn && !user?.questionnaire) {
      return (
        <Stack.Screen
          name="Questionnaire"
          component={QuestionnaireScreen}
          options={{
            title: '회원가입',
          }}
        />
      );
    }

    const core = (
      <>
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            title: '피부 측정',
          }}
        />
        <Stack.Screen
          name="Column"
          component={ColumnScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PopTestResult"
          component={PopTestResultScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TestResults"
          component={TestResultsScreen}
          options={{
            title: '세부 진단내용',
          }}
        />
         <Stack.Screen
          name="ImageProc"
          component={ImageProcScreen}
          options={{
            title: '피부를 분석하고 있습니다.',
          }}
        />
        <Stack.Screen
          name="Shopping"
          component={ShoppingScreen}
          options={{
            title: '쇼핑',
          }}
        />
        <Stack.Screen
          name="ProductInfo"
          component={ProductInfoScreen}
          options={{
            title: '상품정보',
          }}
        />
        <Stack.Screen
          name="PaymentInfo"
          component={PaymentInfoScreen}
          options={{
            title: '결제',
          }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethodScreen}
          options={{
            title: '결제',
          }}
        />                     
      </>
    );

    if (isLoggedIn) {
      return (
        <>
          {core}
          <Stack.Screen
          name="TestResultsDetails"
          component={TestResultsDetailsScreen}
          options={{
            title: '피부 진단 결과',
          }}
        />    
          <Stack.Screen
            name="TestResultsSummary"
            component={TestResultsSummaryScreen}
            options={{
              title: '진단 결과',
            }}
          />
          <Stack.Screen
            name="CurrentSolutionUsage"
            component={CurrentSolutionUsageScreen}
            options={{
              title: '현재의 솔루션과 사용량',
            }}
          />

          <Stack.Screen
            name="CustomizedSolution"
            component={CustomizedSolutionScreen}
            options={{
              title: '추천 상품',
            }}
          />           
        </>
      );
    }

    return (
      <>
        {core}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '로그인',
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: '회원가입',
          }}
        />
        <Stack.Screen
          name="FindUserId"
          component={FindUserIdScreen}
          options={{
            title: '아이디 찾기',
          }}
        />
        <Stack.Screen
          name="FindPassword"
          component={FindPasswordScreen}
          options={{
            title: '비밀번호 찾기',
          }}
        />
      </>
    );
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          header: getHeader,
          cardStyle: styles.cardStyle,
          cardStyleInterpolator:
            Platform.OS === 'ios'
              ? undefined
              : CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      >
        {getStacks()}
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: colors.background,
  },
});

export default AppNavigator;
