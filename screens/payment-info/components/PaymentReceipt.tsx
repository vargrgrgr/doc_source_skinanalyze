import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import { selectCart } from '../../../store/cart';
import AppText from '../../../components/AppText';
import Hr from '../../../components/Hr';
import TextBold from '../../../components/TextBold';
import TextDemiLight from '../../../components/TextDemiLight';

interface Props {
  globalStyles: {
    section: StyleProp<ViewStyle>;
    sectionHeading: StyleProp<ViewStyle>;
  };
}

const PaymentReceipt = ({ globalStyles }: Props) => {
  const cart = useSelector(selectCart);

  const getOrderAmount = () => {
    let orderAmount = 0;
    for (let i = 0; i < cart.length; i++) {
      orderAmount += cart[i].product.price * cart[i].quantity;
    }
    return orderAmount;
  };

  const getDeliveryFee = () => {
    return getOrderAmount() < 50000 ? 3000 : 0;
  };

  const getTotalAmount = () => {
    return getOrderAmount() + getDeliveryFee();
  };

  return (
    <>
      <View style={globalStyles.section}>
        <TextBold style={globalStyles.sectionHeading}>결제 정보</TextBold>
        <View style={styles.usePointFieldContainer}>
          <TextDemiLight style={styles.paymentInfoLabel}>
            주문금액
          </TextDemiLight>
          <AppText style={styles.paymentInfoAmount} numeric>
            {getOrderAmount().toLocaleString()}원
          </AppText>
        </View>
        <View style={styles.rowMargin}>
          <TextDemiLight style={styles.paymentInfoLabel}>배송비</TextDemiLight>
          <AppText style={styles.paymentInfoAmount} numeric>
            {getDeliveryFee().toLocaleString()}원
          </AppText>
        </View>
        <View style={styles.rowMargin}>
          <TextDemiLight style={styles.paymentInfoLabel}>
            할인금액
          </TextDemiLight>
          <AppText style={styles.paymentInfoAmount} numeric>
            0원
          </AppText>
        </View>
        <View style={styles.rowMargin}>
          <TextDemiLight style={styles.paymentInfoLabelSmall}>
            쿠폰 사용
          </TextDemiLight>
          <AppText style={styles.paymentInfoAmountSmall} numeric>
            0원
          </AppText>
        </View>
        <View style={styles.rowMargin}>
          <TextDemiLight style={styles.paymentInfoLabelSmall}>
            포인트 사용
          </TextDemiLight>
          <AppText style={styles.paymentInfoAmountSmall} numeric>
            0원
          </AppText>
        </View>
      </View>
      <Hr style={styles.smallHr} />
      <View style={[styles.section, styles.row]}>
        <TextBold>총 결제금액</TextBold>
        <TextBold style={styles.totalAmount} numeric>
          {getTotalAmount().toLocaleString()}원
        </TextBold>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: paddingHorizontal,
  },
  sectionHeading: {
    marginBottom: 20,
    fontSize: 16,
  },
  usePointFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowMargin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentInfoLabel: {
    color: colors.textSecondary,
  },
  paymentInfoLabelSmall: {
    fontSize: 12,
    color: colors.textLight,
  },
  paymentInfoAmount: {
    color: colors.textSecondary,
  },
  paymentInfoAmountSmall: {
    fontSize: 12,
    color: colors.textLight,
  },
  totalAmount: {
    fontSize: 18,
  },
  smallHr: {
    marginTop: 10,
    marginBottom: 20,
  },
});

export default memo(PaymentReceipt);
