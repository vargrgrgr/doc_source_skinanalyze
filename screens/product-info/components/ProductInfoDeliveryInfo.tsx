import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import TextBold from '../../../components/TextBold';
import TextDemiLight from '../../../components/TextDemiLight';

const ProductInfoDeliveryInfo = () => {
  return (
    <View style={styles.section}>
      <TextBold style={styles.sectionHeading}>배송정보</TextBold>
      <View style={styles.deliveryContainer}>
        <View style={styles.deliveryFee}>
          <TextDemiLight style={[styles.sectionText]}>배송비</TextDemiLight>
        </View>
        <TextDemiLight style={styles.sectionText}>
          50,000원 이상 구매시 무료배송
        </TextDemiLight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: paddingHorizontal,
  },
  sectionHeading: {
    marginBottom: 10,
  },
  sectionText: {
    color: colors.textSecondary,
  },
  deliveryContainer: {
    flexDirection: 'row',
  },
  deliveryFee: {
    marginRight: 20,
  },
});

export default memo(ProductInfoDeliveryInfo);
