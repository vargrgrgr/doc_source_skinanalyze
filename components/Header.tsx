import React, { ReactNode, useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import { useSelector } from 'react-redux';
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { RouteProp, ParamListBase, Route } from '@react-navigation/native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';

import colors from '../utils/colors';
import { paddingHorizontal } from '../utils/utils';
import { selectIsTop } from '../store/common';
import AppText from './AppText';
import BackButton from './BackButton';

const useIOSShadowEffect = (routeName: string) => {
  const isTop = useSelector(selectIsTop);
  const shadowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }

    Animated.timing(shadowAnim, {
      toValue:
        typeof isTop[routeName] === 'undefined' || isTop[routeName] ? 0 : 0.15,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isTop, routeName]);

  return shadowAnim;
};

interface Props {
  customGoBack?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  options: BottomTabNavigationOptions | StackNavigationOptions;
  route: RouteProp<ParamListBase> | Route<string>;
  navigation:
    | BottomTabNavigationProp<ParamListBase>
    | StackNavigationProp<ParamListBase>;
}

const Header = ({
  options,
  route,
  navigation,
  customGoBack,
  style,
  children,
}: Props) => {
  const title = getHeaderTitle(options, route.name);
  const isTop = useSelector(selectIsTop);
  const shadowAnim = useIOSShadowEffect(route.name);

  const goBack = () => {
    if (customGoBack) {
      customGoBack();
    } else {
      navigation.goBack();
    }
  };

  const getContent = () => {
    if (children) {
      return children;
    }

    return (
      <>
        <BackButton onPress={goBack} />
        <AppText style={styles.title}>{title}</AppText>
      </>
    );
  };

  return (
    <Animated.View
      style={[
        styles.header,
        {
          elevation:
            typeof isTop[route.name] === 'undefined' || isTop[route.name]
              ? 0
              : 5,
          shadowOpacity: shadowAnim,
        },
      ]}
    >
      <SafeAreaView>
        <View style={[styles.inner, style]}>{getContent()}</View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    // shadowOpacity: 0.25,
    shadowRadius: 15,
    paddingHorizontal,
  },
  inner: {
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
});

export default Header;
