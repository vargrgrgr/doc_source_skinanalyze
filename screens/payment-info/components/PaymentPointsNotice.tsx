import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../../utils/colors';
import AppText from '../../../components/AppText';
import TextBold from '../../../components/TextBold';
import TextDemiLight from '../../../components/TextDemiLight';

const PaymentPointsNotice = () => {
  return (
    <View style={styles.container}>
      <View style={styles.pointNoticeInner}>
        <AppText style={styles.pointEarned}>
          <TextBold style={styles.pointEarned}>2116포인트</TextBold>가
          적립됩니다.
        </AppText>
        <TextDemiLight style={styles.pointNotice}>
          1,000원 이상 구매 시 포인트 사용이 가능합니다.
        </TextDemiLight>
      </View>
      <TextDemiLight style={styles.pointTip}>
        ※ 포인트 사용 결제 시 적립 불가합니다
      </TextDemiLight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.disabled,
    marginVertical: 20,
    padding: 20,
  },
  pointNoticeInner: {
    backgroundColor: colors.background,
    borderRadius: 5,
    padding: 16,
    alignItems: 'center',
  },
  pointEarned: {
    marginBottom: 6,
  },
  pointNotice: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  pointTip: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default memo(PaymentPointsNotice);
