import React, { useState } from 'react';
import {
  Platform,
  View,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  PressableProps,
  ViewStyle,
} from 'react-native';

import colors from '../utils/colors';

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
  borderless?: boolean;
  underlayColor?: string;
  foreground?: boolean;
}

const TouchableRipple = ({
  children,
  style,
  borderless = false,
  underlayColor = colors.underlayColor,
  foreground = true,
  onPressIn = () => {},
  onPressOut = () => {},
  ...rest
}: Props) => {
  const {
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    height,
    flexDirection,
    justifyContent,
    alignItems,
    ...restStyle
  } = StyleSheet.flatten(style || {});

  const [isPress, setIsPress] = useState(false);

  const onHandlePressIn =
    Platform.OS === 'ios'
      ? (event: GestureResponderEvent) => {
          setIsPress(true);
          onPressIn!(event);
        }
      : onPressIn;

  const onHandlePressOut =
    Platform.OS === 'ios'
      ? (event: GestureResponderEvent) => {
          setIsPress(false);
          onPressOut!(event);
        }
      : onPressOut;

  return (
    <View
      style={[
        restStyle,
        { overflow: 'hidden', height },
        isPress && { backgroundColor: underlayColor },
      ]}
    >
      <Pressable
        style={[
          styles.inner,
          {
            paddingBottom,
            paddingTop,
            paddingLeft,
            paddingRight,
            paddingHorizontal,
            paddingVertical,
            height,
            flexDirection,
            justifyContent,
            alignItems,
          },
        ]}
        android_ripple={{ color: underlayColor, borderless, foreground }}
        onPressIn={onHandlePressIn}
        onPressOut={onHandlePressOut}
        {...rest}
      >
        {children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inner: {
    width: '100%',
  },
});

export default TouchableRipple;
