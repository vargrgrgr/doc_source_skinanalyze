import React, { useMemo } from 'react';
import {
  Platform,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
} from 'react-native';
import { useStyle } from 'react-native-style-utilities';

import colors from '../utils/colors';
import TextBold from './TextBold';
import TouchableRipple from './TouchableRipple';

interface Props extends PressableProps {
  children: string;
  style?: StyleProp<TextStyle>;
  color?: 'disabled';
  loading?: boolean;
}

const Button = ({
  children,
  style,
  disabled,
  loading,
  color,
  ...rest
}: Props) => {
  const textStyle = useStyle(
    () => [styles.text, (color || disabled) && styles.textDisabled],
    [disabled],
  );

  const underlayColor = useMemo(() => {
    if (Platform.OS !== 'ios') {
      return undefined;
    }
    return color ? '#bfb692' : '#1c2000';
  }, [color]);

  return (
    <TouchableRipple
      style={[styles.button, (disabled || color) && styles.disabled, style]}
      disabled={disabled || loading}
      underlayColor={underlayColor}
      {...rest}
    >
      <TextBold style={textStyle}>{children}</TextBold>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.button,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  textDisabled: {
    color: colors.textSecondary,
  },
});

export default Button;
