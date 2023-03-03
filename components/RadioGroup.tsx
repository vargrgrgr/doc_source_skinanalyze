import React, { memo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useController } from 'react-hook-form';

import RadioButton from './RadioButton';

interface Props {
  style?: StyleProp<ViewStyle>;
  name: string;
  required?: boolean;
  options: {
    label: string;
    value: number | string;
  }[];
  defaultValue?: number | string;
}

const RadioGroup = ({
  style,
  name,
  required,
  options,
  defaultValue,
}: Props) => {
  const { field } = useController({
    name,
    rules: { required },
    defaultValue,
  });

  return (
    <View style={[styles.radioGroup, style]}>
      {options.map(({ label, value }, i) => {
        return (
          <RadioButton
            key={value}
            label={label}
            style={[
              styles.radioButton,
              i !== options.length - 1 && { marginRight: 20 },
            ]}
            active={value === field.value}
            onPress={() => field.onChange(value)}
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

export default memo(RadioGroup);
