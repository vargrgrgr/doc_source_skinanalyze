import React, { memo } from 'react';
import { StyleProp, StyleSheet, TextProps, TextStyle } from 'react-native';
import { useStyle } from 'react-native-style-utilities';

import AppText from './AppText';

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numeric?: boolean;
}

const TextBold: React.FC<Props> = ({ style, children, numeric }) => {
  const boldStyle = useStyle(
    () => [styles.bold, numeric && styles.numeric, style],
    [style, numeric],
  );

  return <AppText style={boldStyle}>{children}</AppText>;
};

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'NotoSansKR-Bold',
  },
  numeric: {
    fontFamily: 'Montserrat-Bold',
  },
});

export default memo(TextBold);
