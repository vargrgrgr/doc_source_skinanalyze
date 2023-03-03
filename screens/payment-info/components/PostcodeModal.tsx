import Postcode from '@actbase/react-daum-postcode';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createUseModal } from 'react-native-use-modal';
import { OnCompleteParams } from '@actbase/react-daum-postcode/lib/types';

import { paddingHorizontal } from '../../../utils/utils';
import BackButton from '../../../components/BackButton';

const PostcodeModalHeader = ({ cancel }: { cancel: () => void }) => {
  return (
    <View style={styles.header}>
      <BackButton onPress={cancel} />
    </View>
  );
};

const usePostcodeModal = createUseModal<OnCompleteParams, void>(
  ({ confirm, cancel }) => {
    return (
      <>
        <StatusBar animated backgroundColor="#fff" barStyle="dark-content" />
        <SafeAreaProvider>
          <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <PostcodeModalHeader cancel={cancel} />
            <Postcode
              style={styles.postCode}
              jsOptions={{}}
              onSelected={(data) => confirm(data)}
              onError={(err) => console.log(err)}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </>
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

const styles = StyleSheet.create({
  header: {
    marginHorizontal: paddingHorizontal,
    width: '100%',
    height: 64,
  },
  postCode: {
    width: '100%',
    height: '100%',
  },
});

export default usePostcodeModal;
