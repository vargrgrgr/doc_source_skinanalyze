import React, { memo, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';

import colors from '../utils/colors';

interface Props {
  value?: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const ResultBar = ({ value = 0, style, color = '#EEEEEE' }: Props) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const width = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: value,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={[styles.barWrapper, { backgroundColor: color }, style]}>
      <Animated.View style={[styles.barProgress, { width }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  barWrapper: {
    height: 5,
    borderRadius: 3,
    marginBottom: 6,
  },
  barProgress: {
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.green,
  },
});

export default memo(ResultBar);
