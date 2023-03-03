import React, { memo } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';

import colors from '../../../utils/colors';
import { ShoppingScreenNavigationProp } from '../../../navigators/navigation.types';
import useNavigation from '../../../hooks/useNavigation';
import AppText from '../../../components/AppText';
import Image from '../../../components/Image';
import PriceDiscount from '../../../components/PriceDiscount';
import TextDemiLight from '../../../components/TextDemiLight';
import TouchableRipple from '../../../components/TouchableRipple';

interface Props {
  style?: StyleProp<ViewStyle>;
  id: number;
  picture: number | Source;
  name: string;
  description: string;
  discount?: number;
  price: number;
}

const ShoppingItem = ({
  id,
  picture,
  name,
  description,
  discount,
  price,
  style,
}: Props) => {
  const navigation = useNavigation<ShoppingScreenNavigationProp>({
    lock: true,
  });

  const goToProductInfo = () =>
    navigation.push('ProductInfo', {
      id,
      picture,
      name,
      description,
      discount,
      price,
    });

  return (
    <TouchableRipple
      style={[styles.container, style]}
      onPress={goToProductInfo}
    >
      <Image
        source={picture}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.image}
      />
      <AppText numberOfLines={1}>{name}</AppText>
      <TextDemiLight style={styles.description} numberOfLines={1}>
        {description}
      </TextDemiLight>
      <PriceDiscount discount={discount} price={price} />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    marginBottom: 30,
  },
  image: {
    aspectRatio: 1,
    width: '100%',
    marginBottom: 16,
  },
  description: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 5,
    color: colors.textSecondary,
  },
});

export default memo(ShoppingItem);
