import React, { memo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import colors from '../utils/colors';

interface Props {
  style?: StyleProp<ViewStyle>;
  big?: boolean;
}

const Hr = ({ style, big = false }: Props) => (
  <View style={[styles.hr, big && styles.big, style]} />
);

const styles = StyleSheet.create({
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: colors.hr,
  },
  big: {
    height: 6,
  },
});

export default memo(Hr);
