import React from 'react';
import {
  Pressable,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';
import { useStyle } from 'react-native-style-utilities';
import { SvgProps } from 'react-native-svg';
import colors from '../utils/colors';
import TextRegular from './TextRegular';
interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
  active?: boolean;
  label: string;
  direction?: 'column' | 'row';
}

const RadioButton = ({ style, active, label, ...rest }: Props) => {
  const radioLabelStyle = useStyle(
    () => [[styles.radioLabel, active && styles.radioLabelActive]],
    [style],
  );

  return (
    <Pressable style={[styles.radioButton, style]} {...rest}>
      <View
        style={[styles.radioContainer, active && styles.radioContainerActive]}
      >
        <View style={[styles.radio, active && styles.radioActive]} />
      </View>
      <TextRegular style={radioLabelStyle}>{label}</TextRegular>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioContainer: {
    height: 16,
    width: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.disabled,
    borderWidth: 1,
    marginRight: 4,
  },
  radioContainerActive: {
    borderColor: colors.green,
  },
  radio: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  radioActive: {
    backgroundColor: colors.green,
  },
  radioLabel: {
    color: colors.textSecondary,
  },
  radioLabelActive: {
    color: colors.green,
  },
});

export default RadioButton;
