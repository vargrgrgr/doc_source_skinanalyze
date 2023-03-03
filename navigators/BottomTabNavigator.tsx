import React from 'react';
import {
  BottomTabBarButtonProps,
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { GestureResponderEvent, Platform, StyleSheet } from 'react-native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import {
  AppStackParamList,
  BottomTabNavigatorParamList,
} from './navigation.types';
import { selectIsLoggedIn } from '../store/user';
import colors from '../utils/colors';
import CameraScreen from '../screens/camera/CameraScreen';
import Header from '../components/Header';
import HomeIcon from '../assets/icons/home.svg';
import MainHeader from '../screens/main/components/MainHeader';
import MainScreen from '../screens/main/MainScreen';
import MyPageScreen from '../screens/my-page/MyPageScreen';
import ProfileIcon from '../assets/icons/profile.svg';
import ScanIcon from '../assets/icons/scan.svg';
import TabBarButton from '../components/TabBarButton';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabNavigator = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const getHeader = (props: BottomTabHeaderProps) => <Header {...props} />;

  const getTabBarButton = ({
    style,
    children,
    onPress,
    route,
    navigation,
  }: {
    route: RouteProp<ParamListBase, string>;
    navigation: StackNavigationProp<AppStackParamList>;
  } & BottomTabBarButtonProps) => {
    const onTabPress = (
      e:
        | GestureResponderEvent
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
      switch (route.name) {
        case 'CameraFake':
          navigation.navigate('Camera');
          break;
        case 'MyPage':
          if (isLoggedIn) {
            if (onPress) {
              onPress(e);
            }
          } else {
            navigation.navigate('Login');
          }
          break;
        default:
          if (onPress) {
            onPress(e);
          }
          break;
      }
    };

    return (
      <TabBarButton
        flex={route.name === 'CameraFake'}
        style={style}
        onPress={onTabPress}
      >
        {children}
      </TabBarButton>
    );
  };

  const getTabBarIcon = ({
    focused,
    route,
  }: {
    focused: boolean;
    route: RouteProp<ParamListBase, keyof BottomTabNavigatorParamList>;
  }) => {
    const color = focused ? colors.text : colors.tabBarIcon;

    switch (route.name) {
      case 'Main':
        return <HomeIcon color={color} />;
      case 'CameraFake':
        return <ScanIcon color={color} />;
      case 'MyPage':
        return <ProfileIcon color={color} />;
      default:
        return null;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        header: getHeader,
        tabBarIcon: ({ focused }) => getTabBarIcon({ focused, route }),
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        tabBarButton: (props) =>
          getTabBarButton({ ...props, route, navigation }),
      })}
    >
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          header: (props: BottomTabHeaderProps) => <MainHeader {...props} />,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="CameraFake"
        component={CameraScreen}
        options={{ title: '피부 진단 결과', unmountOnBlur: true }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.background,
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 24,
  },
  tabBarButtton: {
    height: 100,
    width: 100,
  },
  tabIconActive: {
    color: '#FF385C',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;
