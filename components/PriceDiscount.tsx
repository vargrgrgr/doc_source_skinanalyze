import React, { memo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useStyle } from 'react-native-style-utilities';

import colors from '../utils/colors';
import TextBold from './TextBold';

interface Props {
  style?: StyleProp<ViewStyle>;
  price: number;
  discount?: number;
  fontSize?: number;
}

const PriceDiscount = ({ style, price, discount, fontSize }: Props) => {
  const discountStyle = useStyle(
    () => [styles.discount, { fontSize }],
    [fontSize],
  );
  const priceStyle = useStyle(() => [{ fontSize }], [fontSize]);

  return (
    <View style={[styles.priceContainer, style]}>
      {discount && (
        <TextBold style={discountStyle} numeric>
          {discount}%
        </TextBold>
      )}
      <TextBold style={priceStyle} numeric>
        {price?.toLocaleString()}원
      </TextBold>
    </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: 'row',
  },
  discount: {
    color: colors.green,
    marginRight: 6,
  },
});

export default memo(PriceDiscount);
