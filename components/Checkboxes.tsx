import React, { memo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useController } from 'react-hook-form';

import NativeCheckbox from './NativeCheckbox';

interface Props {
  style?: StyleProp<ViewStyle>;
  name: string;
  required?: boolean;
  options: {
    label: string;
    value: number | string;
  }[];
  round?: boolean;
  bold?: boolean;
}

const Checkboxes = ({ style, name, required, options, round, bold }: Props) => {
  const { field } = useController({
    name,
    rules: { required },
    defaultValue: [],
  });

  const onCheckboxPressed = (value: number | string) => {
    const currentValues: (number | string)[] = field.value || [];

    if (!currentValues.includes(value)) {
      field.onChange([...currentValues, value]);
    } else {
      field.onChange(currentValues.filter((v) => v !== value));
    }
  };

  return (
    <View style={style}>
      {options.map(({ label, value }) => {
        return (
          <NativeCheckbox
            key={value}
            label={label}
            style={styles.checkbox}
            active={((field.value || []) as (number | string)[]).includes(
              value,
            )}
            onPress={() => onCheckboxPressed(value)}
            round={round}
            bold={bold}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    marginBottom: 10,
  },
});

export default memo(Checkboxes);
