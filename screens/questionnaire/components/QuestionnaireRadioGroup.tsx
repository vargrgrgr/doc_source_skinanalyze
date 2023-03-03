import React, { memo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useController } from 'react-hook-form';
import { SvgProps } from 'react-native-svg';

import QuestionnaireRadioButton from './QuestionnaireRadioButton';

interface Props {
  style?: StyleProp<ViewStyle>;
  name: string;
  required?: boolean;
  options: {
    label: string;
    value: number | string;
    icon?: (props?: SvgProps) => JSX.Element;
  }[];
  column?: number;
  direction?: 'column' | 'row';
}

const QuestionnaireRadioGroup = ({
  style,
  name,
  required,
  options,
  column = 1,
  direction,
}: Props) => {
  const { field } = useController({
    name,
    rules: { required },
  });

  return (
    <View style={[styles.radioGroup, style]}>
      {options.map(({ label, value, icon }, i) => {
        return (
          <QuestionnaireRadioButton
            key={value}
            label={label}
            icon={icon}
            style={[
              styles.radioButton,
              {
                minWidth: `${101 / (column + 1)}%`,
                flex: 1,
              },
              (i + 1) % column !== 0 &&
                i !== options.length - 1 && { marginRight: 10 },
            ]}
            active={value === field.value}
            onPress={() => field.onChange(value)}
            direction={direction}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioButton: {
    marginBottom: 10,
  },
});

export default memo(QuestionnaireRadioGroup);
