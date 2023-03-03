import React from 'react';
import { PressableProps, StyleProp, StyleSheet, TextStyle } from 'react-native';
import { useStyle } from 'react-native-style-utilities';

import colors from '../utils/colors';
import AppText from './AppText';
import TouchableRipple from './TouchableRipple';

interface Props extends PressableProps {
  children: string;
  style?: StyleProp<TextStyle>;
  color?: 'disabled';
  fontSize?: number;
}

const ButtonSmall = ({
  children,
  style,
  disabled,
  color,
  fontSize = 12,
  ...rest
}: Props) => {
  const textStyle = useStyle(
    () => [styles.text, (color || disabled) && styles.textDisabled],
    [disabled],
  );

  return (
    <TouchableRipple
      style={[
        styles.button,
        { fontSize },
        (disabled || color) && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...rest}
    >
      <AppText style={textStyle}>{children}</AppText>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.button,
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderWidth: 0,
  },
  text: {
    color: colors.text,
    fontSize: 12,
  },
  textDisabled: {
    color: colors.textSecondary,
  },
});

export default ButtonSmall;
