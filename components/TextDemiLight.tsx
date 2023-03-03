import React, { memo } from 'react';
import { StyleProp, StyleSheet, TextProps, TextStyle } from 'react-native';
import { useStyle } from 'react-native-style-utilities';

import AppText from './AppText';

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const TextDemiLight: React.FC<Props> = ({ style, children }) => {
  const demiLightStyle = useStyle(() => [styles.demiLight, style], [style]);

  return <AppText style={demiLightStyle}>{children}</AppText>;
};

const styles = StyleSheet.create({
  demiLight: {
    fontFamily: 'NotoSansKR-DemiLight',
  },
});

export default memo(TextDemiLight);
