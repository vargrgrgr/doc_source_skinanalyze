import React from 'react';
import {
  Pressable,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useStyle } from 'react-native-style-utilities';
import { SvgProps } from 'react-native-svg';

import colors from '../../../utils/colors';
import AppText from '../../../components/AppText';

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
  active?: boolean;
  icon?: (props?: SvgProps) => JSX.Element;
  label: string;
  direction?: 'column' | 'row';
}

const QuestionnaireRadioButton = ({
  style,
  active,
  label,
  icon,
  direction = 'row',
  ...rest
}: Props) => {
  const radioLabelStyle = useStyle(
    () => [[styles.radioLabel, active && styles.radioLabelActive]],
    [style],
  );
  const iconStyle = useStyle(
    () => (direction === 'row' ? styles.iconRow : styles.iconColumn),
    [direction],
  );

  return (
    <Pressable
      style={[
        styles.radioButton,
        active && styles.radioButtonActive,
        { flexDirection: direction },
        style,
      ]}
      {...rest}
    >
      {icon &&
        icon({ style: iconStyle, ...(active ? { color: colors.green } : {}) })}
      <AppText style={radioLabelStyle}>{label}</AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.disabled,
  },
  radioButtonActive: {
    borderColor: colors.green,
  },
  radioLabel: {
    color: colors.textSecondary,
  },
  radioLabelActive: {
    color: colors.green,
  },
  iconRow: {
    marginRight: 10,
  },
  iconColumn: {
    marginBottom: 10,
  },
});

export default QuestionnaireRadioButton;
