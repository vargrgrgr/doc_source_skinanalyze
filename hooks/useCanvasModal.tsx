import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { createUseModal } from 'react-native-use-modal';

import colors from '../utils/colors';
import { paddingHorizontal } from '../utils/utils';
import AppText from '../components/AppText';
import Button from '../components/Button';

const useCanvasModal = (
  {
    cancelOnBackButtonPress = true,
    cancelOnBackdropPress = true,
  }: {
    cancelOnBackButtonPress?: boolean;
    cancelOnBackdropPress?: boolean;
  } = {
    cancelOnBackButtonPress: true,
    cancelOnBackdropPress: true,
  },
) =>
  createUseModal<
    void,
    {
      message: string;
      confirmText: string;
      cancelText?: string;
      overrideConfirm?: () => void;
      textStyle?: StyleProp<TextStyle>;
    }
  >(
    ({
      confirm,
      cancel,
      param: {
        message,
        confirmText,
        cancelText = '취소',
        overrideConfirm,
        textStyle,
      },
    }) => {
      return (
        <View style={styles.container}>
          <AppText style={[styles.textStyle, textStyle]}>{message}</AppText>
          <View style={styles.buttonsContainer}>
            <Button color="disabled" onPress={cancel} style={styles.button}>
              {cancelText}
            </Button>
            <Button onPress={overrideConfirm || confirm} style={styles.button}>
              {confirmText}
            </Button>
          </View>
        </View>
      );
    },
    { cancelOnBackButtonPress, cancelOnBackdropPress },
  )();

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: paddingHorizontal,
    marginHorizontal: paddingHorizontal * 2,
    backgroundColor: colors.background,
  },
  textStyle: {
    paddingVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginHorizontal: -5,
    marginTop: 20,
  },
  button: {
    marginHorizontal: 5,
    flex: 1,
  },
});

export default useCanvasModal;
