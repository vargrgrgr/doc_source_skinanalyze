import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import Picker from './Picker';
import TextField from './TextField';

const phoneCodes = [
  { label: '010', value: '010' },
  { label: '011', value: '011' },
  { label: '016', value: '016' },
  { label: '017', value: '017' },
  { label: '018', value: '018' },
  { label: '019', value: '019' },
];

interface Props {
  style?: StyleProp<ViewStyle>;
}

const PhoneForm = ({ style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Picker
        style={styles.textField}
        name="phoneCode"
        options={phoneCodes}
        defaultValue="010"
        required="휴대폰 값이 빈값입니다."
      />
      <TextField
        name="phonePrefix"
        style={[styles.textField, styles.textFieldMiddle]}
        keyboardType="phone-pad"
        required="휴대폰 값이 빈값입니다."
        rules={{ minLength: { value: 4, message: '휴대폰 값이 빈값입니다.' } }}
        maxLength={4}
      />
      <TextField
        name="phoneSuffix"
        style={styles.textField}
        keyboardType="phone-pad"
        required="휴대폰 값이 빈값입니다."
        rules={{ minLength: { value: 4, message: '휴대폰 값이 빈값입니다.' } }}
        maxLength={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textField: {
    flex: 1,
  },
  textFieldMiddle: {
    marginHorizontal: 10,
  },
});

export default PhoneForm;
