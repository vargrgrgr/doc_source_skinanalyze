import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Source } from 'react-native-fast-image';

import colors from '../../../utils/colors';
import AppText from '../../../components/AppText';
import Image from '../../../components/Image';
import PriceDiscount from '../../../components/PriceDiscount';
import TextDemiLight from '../../../components/TextDemiLight';

interface Props {
  picture: number | Source;
  name: string;
  price: number;
  discount?: number;
  quantity: number;
}

const PaymentProductItem = ({
  picture,
  name,
  price,
  discount,
  quantity,
}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={picture} style={styles.image} />
      <View>
        <AppText>{name}</AppText>
        <PriceDiscount
          style={styles.priceContainer}
          discount={discount}
          price={price}
        />
        <TextDemiLight style={styles.quantity}>수량{quantity}개 </TextDemiLight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 67,
    height: 67,
    marginRight: 16,
  },
  priceContainer: {
    marginVertical: 3,
  },
  quantity: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default memo(PaymentProductItem);
