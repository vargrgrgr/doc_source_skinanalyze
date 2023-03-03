import React from 'react';
import { useController } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';

import NativeCheckbox from './NativeCheckbox';

interface Props {
  style?: StyleProp<ViewStyle>;
  name: string;
  required?: boolean | string;
  label: string;
  round?: boolean;
  bold?: boolean;
}

// Smart checkbox with a form

const Checkbox = ({ style, name, required, label, round, bold }: Props) => {
  const { field } = useController({
    name,
    rules: {
      min: {
        value: required ? 1 : 0,
        message: typeof required === 'string' ? required : '',
      },
    },
    defaultValue: 0,
  });

  const onPress = () => field.onChange(field.value ? 0 : 1);

  return (
    <NativeCheckbox
      style={style}
      label={label}
      active={!!field.value}
      onPress={onPress}
      round={round}
      bold={bold}
    />
  );
};

export default Checkbox;
