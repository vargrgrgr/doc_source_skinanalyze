import React, { memo, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import colors from '../../../utils/colors';

interface Props {
  stepActive: number;
  numberOfSteps: number;
}

const StepBar = ({ stepActive, numberOfSteps }: Props) => {
  const progressAnim = useRef(new Animated.Value(1)).current;
  const width = progressAnim.interpolate({
    inputRange: [0, numberOfSteps],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: stepActive,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [stepActive]);

  return (
    <View style={styles.barWrapper}>
      <Animated.View style={[styles.barProgress, { width }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  barWrapper: {
    backgroundColor: colors.disabled,
    height: 2,
  },
  barProgress: {
    height: 2,
    backgroundColor: colors.green,
  },
});

export default memo(StepBar);
