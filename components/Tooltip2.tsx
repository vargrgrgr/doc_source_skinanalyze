import React, { memo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextProps,
  View,
  ViewStyle,
} from 'react-native';

import colors from '../utils/colors';
import AppText from './AppText';

interface Props extends TextProps {
  style?: StyleProp<ViewStyle>;
  children: string;
}

const Tooltip2 = ({ style, children }: Props) => (
  <View style={[styles.tooltip2, style]}>
    <View style={styles.arrow2} />
    <AppText style={styles.textTooltip2}>{children}</AppText>
  </View>
);

const styles = StyleSheet.create({
  tooltip2: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.84,
    elevation: 6,
  },
  textTooltip2: {
    color: colors.tooltipText,
  },
  arrow2: {
    position: 'absolute',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    width: 20,
    height: 20,
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 6,
    borderBottomColor: '#fff',
    transform: [{ rotate: '0deg' }],
  },
});

export default memo(Tooltip2);
