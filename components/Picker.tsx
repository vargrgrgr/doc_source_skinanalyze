import React from 'react';
import { RegisterOptions, useController } from 'react-hook-form';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
  View,
} from 'react-native';
import { createUseModal, ModalResultType } from 'react-native-use-modal';

import colors from '../utils/colors';
import KeyboardArrowDown from '../assets/icons/keyboard-arrow-down.svg';
import AppText from './AppText';
import TouchableRipple from './TouchableRipple';
import { paddingHorizontal } from '../utils/utils';

interface Props {
  style?: StyleProp<ViewStyle>;
  name: string;
  required?: boolean | string;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  options: { label: string; value: string | number }[];
  defaultValue?: string | number;
}

const usePicker = createUseModal<
  void,
  {
    options: { label: string; value: string | number }[];
  }
>(
  ({ confirm, param: { options } }) => {
    return (
      <View style={styles.options}>
        {options.map(({ label, value }) => (
          <TouchableRipple
            key={value}
            onPress={() => (confirm as (value: string | number) => void)(value)}
            style={styles.option}
          >
            <AppText style={styles.optionText}>{label}</AppText>
          </TouchableRipple>
        ))}
      </View>
    );
  },
  {
    cancelOnBackButtonPress: true,
    cancelOnBackdropPress: true,
    modalProps: {
      animationIn: 'fadeIn',
      animationOut: 'fadeOut',
    },
  },
);

const Picker = ({
  style,
  name,
  required,
  rules,
  options,
  defaultValue = '',
}: Props) => {
  const { field } = useController({
    name,
    rules: { required, ...rules },
    defaultValue,
  });
  const picker = usePicker();

  const showPicker = async () => {
    const res = await picker.show({ options });
    if (res.type === ModalResultType.CONFIRM) {
      console.log(res.data);
      field.onChange(res.data);
    }
  };

  return (
    <Pressable style={[styles.container, style]} onPress={showPicker}>
      <AppText style={styles.text}>{field.value}</AppText>
      <KeyboardArrowDown />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.disabled,
    borderRadius: 5,
    height: 42,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  text: {
    fontSize: 12,
    color: colors.text,
    flex: 1,
  },
  options: {
    backgroundColor: colors.background,
    width: 300,
    alignSelf: 'center',
  },
  option: {
    paddingHorizontal: paddingHorizontal,
    paddingVertical: 10,
  },
  optionText: {},
});

export default Picker;
