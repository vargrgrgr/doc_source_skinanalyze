import React, { memo } from 'react';
import { StyleProp, StyleSheet, TextProps, TextStyle } from 'react-native';
import { useStyle } from 'react-native-style-utilities';

import AppText from './AppText';

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const TextLight: React.FC<Props> = ({ style, children }) => {
  const lightStyle = useStyle(() => [styles.light, style], [style]);

  return <AppText style={lightStyle}>{children}</AppText>;
};

const styles = StyleSheet.create({
  light: {
    fontFamily: 'NotoSansKR-Light',
  },
});

export default memo(TextLight);
