import React, { memo } from 'react';
import { StyleProp, StyleSheet, TextProps, TextStyle } from 'react-native';
import { useStyle } from 'react-native-style-utilities';

import AppText from './AppText';

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numeric?: boolean;
}

const TextRegular: React.FC<Props> = ({ style, children, numeric }) => {
  const regularStyle = useStyle(
    () => [styles.regular, numeric && styles.numeric, style],
    [style, numeric],
  );

  return <AppText style={regularStyle}>{children}</AppText>;
};

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'NotoSansKR-Regular',
  },
  numeric: {
    fontFamily: 'Montserrat-Regular',
  },
});

export default memo(TextRegular);
