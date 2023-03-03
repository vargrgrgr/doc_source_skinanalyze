import React, { memo, useMemo } from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextProps,
} from 'react-native';
import { useFlatStyle } from 'react-native-style-utilities';

import colors from '../utils/colors';

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numeric?: boolean;
}

const AppText: React.FC<Props> = ({ style, children, numeric, ...rest }) => {
  const flattenStyle = useFlatStyle<TextStyle, StyleProp<TextStyle>>(
    () => [styles.text, style],
    [style],
  );

  const lineHeight = useMemo(() => {
    return flattenStyle.lineHeight || (flattenStyle.fontSize || 16) * 1.5;
  }, [flattenStyle]);

  return (
    <Text
      style={[styles.text, { lineHeight }, numeric && styles.numeric, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'NotoSansKR-Medium',
    lineHeight: 0,
  },
  numeric: {
    fontFamily: 'Montserrat-Medium',
  },
});

export default memo(AppText);
