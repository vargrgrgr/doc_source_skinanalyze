import React from 'react';
import { PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import colors from '../utils/colors';
import AppText from './AppText';
import TouchableRipple from './TouchableRipple';

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
  children: string;
  active?: boolean;
}

const ChipButton = ({ style, children, active, ...rest }: Props) => {
  return (
    <TouchableRipple
      style={[styles.container, active && styles.containerActive, style]}
      {...rest}
    >
      <AppText style={[styles.text, active && styles.textActive]}>
        {children}
      </AppText>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.disabled,
  },
  containerActive: {
    borderColor: colors.green,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  textActive: {
    color: colors.green,
  },
});

export default ChipButton;
