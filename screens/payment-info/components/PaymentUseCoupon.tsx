import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import colors from '../../../utils/colors';
import Select from '../../../components/Select';
import TextBold from '../../../components/TextBold';
import TextDemiLight from '../../../components/TextDemiLight';

interface Props {
  globalStyles: {
    section: StyleProp<ViewStyle>;
    sectionHeading: StyleProp<ViewStyle>;
  };
}

const PaymentUseCoupon = ({ globalStyles }: Props) => {
  return (
    <View style={globalStyles.section}>
      <TextBold style={styles.sectionHeadingSmallMargin}>쿠폰 사용</TextBold>
      <TextDemiLight style={styles.couponText}>
        쿠폰이 없습니다{'   '}
        <TextBold style={styles.couponText}>0</TextBold>
      </TextDemiLight>
      <Select
        style={styles.selectCoupon}
        placeholder="쿠폰을 선택해주세요"
        options={[]}
        disabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeadingSmallMargin: {
    marginBottom: 10,
    fontSize: 16,
  },
  couponText: {
    color: colors.textSecondary,
  },
  selectCoupon: {
    marginTop: 10,
  },
});

export default memo(PaymentUseCoupon);
