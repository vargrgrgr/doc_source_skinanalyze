import React, { memo } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  PressableProps,
} from 'react-native';
import { useStyle } from 'react-native-style-utilities';

import colors from '../utils/colors';
import TickIcon from '../assets/icons/tick.svg';
import TextBold from './TextBold';
import TextRegular from './TextRegular';

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
  label: string;
  active?: boolean;
  round?: boolean;
  bold?: boolean;
}

// Dumb checkbox without a form

const NativeCheckbox = ({
  label,
  style,
  active,
  round,
  bold,
  ...rest
}: Props) => {
  const labelStyle = useStyle(
    () => [
      styles.label,
      active && styles.labelActive,
      bold && styles.labelBold,
    ],
    [active, bold],
  );

  const Label = bold ? TextBold : TextRegular;

  return (
    <Pressable style={[styles.checkboxContainer, style]} {...rest}>
      <View style={styles.checkbox}>
        <View
          style={[
            styles.tickContainer,
            active && styles.tickContainerActive,
            round && styles.round,
          ]}
        >
          <TickIcon width={10} height={10} color={colors.background} />
        </View>
      </View>
      <Label style={labelStyle}>{label}</Label>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  tickContainer: {
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: colors.disabled,
  },
  tickContainerActive: {
    borderColor: colors.green,
    backgroundColor: colors.green,
  },
  round: {
    height: 16,
    width: 16,
    borderRadius: 8,
  },
  label: {
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.green,
  },
  labelBold: {
    color: colors.text,
  },
});

export default memo(NativeCheckbox);
