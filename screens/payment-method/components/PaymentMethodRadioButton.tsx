import React, { FC } from 'react';
import {
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { SvgProps } from 'react-native-svg';

import colors from '../../../utils/colors';
import AppText from '../../../components/AppText';
import TouchableRipple from '../../../components/TouchableRipple';

const { width: windowWidth } = Dimensions.get('window');

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
  active?: boolean;
  icon: FC<SvgProps>;
  label: string;
}

const PaymentMethodRadioButton = ({
  style,
  active,
  label,
  icon,
  children,
  ...rest
}: Props) => {
  const Icon = icon;

  return (
    <TouchableRipple
      style={[styles.radioButton, active && styles.radioButtonActive, style]}
      {...rest}
    >
      <Icon />
      <AppText style={styles.radioLabel}>{label}</AppText>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    width: windowWidth / 4,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.disabled,
  },
  radioButtonActive: {
    borderColor: '#000',
    backgroundColor: colors.disabled,
  },
  radioLabel: {
    fontSize: 14,
    color: colors.text,
    marginTop: 13,
  },
});

export default PaymentMethodRadioButton;
