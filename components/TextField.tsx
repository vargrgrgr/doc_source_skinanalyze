import React, { forwardRef, memo, ReactNode } from 'react';
import { RegisterOptions, useController } from 'react-hook-form';
import mergeRefs from 'react-merge-refs';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import colors from '../utils/colors';

interface Props extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  name: string;
  required?: boolean | string;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  onChangeText?: (text: string) => void;
  suffixComponent?: JSX.Element;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const TextField = forwardRef<TextInput, Props>(
  (
    {
      style,
      placeholder,
      name,
      required,
      rules,
      onChangeText = () => {},
      suffixComponent,
      autoCapitalize = 'none',
      ...rest
    },
    ref,
  ) => {
    const { field } = useController({
      name,
      rules: { required, ...rules },
      defaultValue: '',
    });

    const onChange = (text: string) => {
      field.onChange(text);
      onChangeText(text);
    };

    return (
      <View style={[styles.inputContainer, style]}>
        <TextInput
          ref={mergeRefs([field.ref, ref])}
          value={field.value}
          onBlur={field.onBlur}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          onChangeText={onChange}
          autoCapitalize={autoCapitalize}
          {...rest}
        />
        {!!suffixComponent && suffixComponent}
      </View>
    );
  },
);

TextField.displayName = 'TextField';

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.disabled,
    borderRadius: 5,
    height: 42,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  input: {
    fontSize: 12,
    color: colors.text,
    flex: 1,
  },
});

export default memo(TextField);
