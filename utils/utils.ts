import ToastMessage from 'react-native-toast-message';

export const paddingHorizontal = 20;

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const Toast = {
  ...ToastMessage,
  show: ({
    text1,
    bottomOffset = 40,
    visibilityTime = 3000,
  }: {
    text1: string;
    bottomOffset?: number;
    visibilityTime?: number;
  }) =>
    ToastMessage.show({
      type: 'toast',
      text1: text1,
      position: 'bottom',
      bottomOffset,
      visibilityTime,
    }),
};
