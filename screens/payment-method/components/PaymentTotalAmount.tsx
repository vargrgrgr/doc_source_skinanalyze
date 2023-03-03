import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import TextBold from '../../../components/TextBold';
import TextDemiLight from '../../../components/TextDemiLight';

const PaymentTotalAmount = () => {
  return (
    <View style={styles.section}>
      <View style={styles.totalAmountRow}>
        <TextBold style={styles.sectionHeading}>총 결제 금액</TextBold>
        <TextBold style={styles.totalAmount}>42,320원</TextBold>
      </View>
      <TextDemiLight style={styles.vatNotice}>( VAT 포함 )</TextDemiLight>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: paddingHorizontal,
  },
  sectionHeading: {
    fontSize: 16,
  },
  totalAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 18,
    color: colors.green,
  },
  vatNotice: {
    color: colors.textSecondary,
  },
});

export default PaymentTotalAmount;
