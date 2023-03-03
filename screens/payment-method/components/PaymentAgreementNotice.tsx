import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import TextDemiLight from '../../../components/TextDemiLight';

const PaymentAgreementNotice = () => {
  return (
    <View style={styles.noticeContainer}>
      <TextDemiLight style={styles.notice}>
        {
          '개인정보 제 3자 제공 및 결제대행 서비스 표준 이용약관\n본인은 만 14세 이상이고, 위 내용을 확인하였습니다.'
        }
      </TextDemiLight>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeContainer: {
    paddingHorizontal: paddingHorizontal,
    paddingTop: 23,
    paddingBottom: 19,
    backgroundColor: colors.disabled,
    marginTop: 20,
  },
  notice: {
    fontSize: 12,
    lineHeight: 22,
  },
});

export default PaymentAgreementNotice;
