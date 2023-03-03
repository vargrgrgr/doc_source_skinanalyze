import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Source } from 'react-native-fast-image';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import AppText from '../../../components/AppText';
import Image from '../../../components/Image';
import PriceDiscount from '../../../components/PriceDiscount';
import TextDemiLight from '../../../components/TextDemiLight';

interface Props {
  picture: number | Source;
  name?: string;
  description?: string;
  price?: number;
  discount?: number;
  category?: string;
  subCategory?: string;
}

const ProductInfoHeader = ({
  picture,
  name,
  description,
  discount,
  price,
  category,
  subCategory,
}: Props) => {
  return (
    <View style={styles.section}>
      <Image source={picture} style={styles.image} resizeMode='contain'/>
      {!!category && (
        <View style={styles.typesContainer}>
          <TextDemiLight style={styles.type}>{category}</TextDemiLight>
          {!!subCategory && (
            <>
              <View style={styles.typeSeparator} />
              <TextDemiLight style={styles.type}>{subCategory}</TextDemiLight>
            </>
          )}
        </View>
      )}
      {!!name && <AppText style={styles.name}>{name}</AppText>}
      {!!description && (
        <TextDemiLight style={styles.description}>{description}</TextDemiLight>
      )}
      {!!price && (
        <PriceDiscount price={price} discount={discount} fontSize={18} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: paddingHorizontal,
  },
  image: {
    aspectRatio: 335 / 230,
    marginBottom: 20,
    width: '100%',
    resizeMode: 'contain',
  },
  typesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  type: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  typeSeparator: {
    height: 12,
    width: 1,
    backgroundColor: colors.disabled,
    marginHorizontal: 6,
  },
  name: {
    fontSize: 16,
  },
  description: {
    marginTop: 6,
    marginBottom: 10,
    color: colors.textSecondary,
  },
});

export default memo(ProductInfoHeader);
