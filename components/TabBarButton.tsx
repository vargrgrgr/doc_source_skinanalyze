import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import colors from '../utils/colors';

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
  flex?: boolean;
}

const TabBarButton = ({ style, flex, ...rest }: Props) => {
  return (
    <View style={[styles.container, flex && { flex: 1 }]}>
      <Pressable
        android_ripple={{
          color: colors.underlayColor,
          borderless: true,
          foreground: true,
        }}
        style={[style, styles.tabBarButtton]}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarButtton: {
    height: 100,
    width: 100,
  },
});

export default TabBarButton;
