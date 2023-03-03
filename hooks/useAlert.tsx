import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { createUseModal } from 'react-native-use-modal';

import colors from '../utils/colors';
import { paddingHorizontal } from '../utils/utils';
import AppText from '../components/AppText';
import TouchableRipple from '../components/TouchableRipple';

const useAlert = () =>
  createUseModal<
    void,
    {
      message: string;
      confirmText?: string;
      overrideConfirm?: () => void;
      textStyle?: StyleProp<TextStyle>;
    }
  >(
    ({
      confirm,
      param: { message, confirmText = '확인', overrideConfirm, textStyle },
    }) => {
      return (
        <View style={styles.container}>
          <AppText style={[styles.textStyle, textStyle]}>{message}</AppText>
          <TouchableRipple
            onPress={overrideConfirm || confirm}
            style={styles.button}
          >
            <AppText style={styles.confirmText}>{confirmText}</AppText>
          </TouchableRipple>
        </View>
      );
    },
    { cancelOnBackButtonPress: true, cancelOnBackdropPress: true },
  )();

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: paddingHorizontal,
    marginHorizontal: paddingHorizontal * 2,
    backgroundColor: colors.background,
  },
  textStyle: {
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  confirmText: {
    color: colors.green,
  },
});

export default useAlert;
