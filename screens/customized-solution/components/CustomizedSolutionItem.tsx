import React, { memo } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp  } from 'react-native';
import { Source } from 'react-native-fast-image';

import { CustomizedSolutionScreenNavigationProp } from '../../../navigators/navigation.types';
import { paddingHorizontal } from '../../../utils/utils';
import useNavigation from '../../../hooks/useNavigation';
import AppText from '../../../components/AppText';
import Image from '../../../components/Image';
import PriceDiscount from '../../../components/PriceDiscount';
import TextDemiLight from '../../../components/TextDemiLight';
import TouchableRipple from '../../../components/TouchableRipple';

interface Props {
  id: number;
  pid?: string;
  picture: number | Source;
  name: string;
  description: string;
  discount?: number;
  price: number;
}

const CustomizedSolutionItem = ({
  id,
  pid,
  picture,
  name,
  description,
  discount,
  price,
}: Props) => {
  const navigation = useNavigation<CustomizedSolutionScreenNavigationProp>({
    lock: true,
  });

  const goToProductInfo = () =>
    navigation.push('ProductInfo', {
      id,
      picture,
      name,
      description,
      price,
    });

  return (
    <TouchableRipple style={styles.container} onPress={goToProductInfo}>
      <View style={styles.inner}>
        <Image source={picture} style={styles.image} resizeMode='contain'/>
        <View>
          <AppText numberOfLines={1}>{name}</AppText>
          <TextDemiLight style={styles.description} numberOfLines={1}>
            {description}
          </TextDemiLight>
          <PriceDiscount price={price} />
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  inner: {
    paddingHorizontal,
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    width: 65,
    height: 65,
    marginRight: 20,
  },
  description: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 5,
  },
});

export default memo(CustomizedSolutionItem);
