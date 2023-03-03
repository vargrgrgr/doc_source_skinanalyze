import React, { memo, useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useQuery } from 'react-query';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import Image from '../../../components/Image';
import TextRegular from '../../../components/TextRegular';

const { width: viewportWidth } = Dimensions.get('window');

const mockedBanners = [
  require('../../../assets/images/banner1.png'),
  require('../../../assets/images/banner1.png'),
  require('../../../assets/images/banner1.png'),
];

const useMainBanner = () => {
  return useQuery(
    'mainBanner',
    async () => {
      const { data } = await new Promise<{ data: number[] }>((resolve) => {
        setTimeout(() => {
          resolve({ data: mockedBanners });
        }, 500);
      });
      return data;
    },
    { cacheTime: 60 * 60 * 1000 },
  );
};

const MainBanner = () => {
  const [slideActive, setSlideActive] = useState(0);
  const { data: banners } = useMainBanner();

  const renderItem = useCallback(
    ({ item }: { item: any }) => <Image source={item} style={styles.image} />,
    [],
  );

  if (!banners) {
    return <View style={styles.container} />;
  }

  if (!banners.length) {
    return null;
  }

  return (
     <View style={styles.container}>
       <Carousel
         data={banners}
         renderItem={renderItem}
         sliderWidth={viewportWidth - paddingHorizontal * 2}
         itemWidth={viewportWidth - paddingHorizontal * 2}
         inactiveSlideOpacity={1}
         inactiveSlideScale={1}
         vertical={false}
         loop
         autoplay
         lockScrollWhileSnapping
         onSnapToItem={(index) => setSlideActive(index)}
         enableMomentum
         decelerationRate={0.9}
       />
      <View style={styles.paginationContainer}>
        <TextRegular style={styles.pagination} numeric>
          {slideActive + 1}
          <TextRegular style={styles.totalSlide} numeric>
            /{banners.length}
          </TextRegular>
        </TextRegular>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    width: '100%',
    aspectRatio: 335 / 180,
    borderRadius: 10,
    marginBottom: 40,
  },
  image: {
    aspectRatio: 335 / 180,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    borderRadius: 9,
    width: 42,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  pagination: {
    fontSize: 10,
    color: '#fff',
  },
  totalSlide: {
    fontSize: 10,
    color: colors.icon,
  },
});

export default memo(MainBanner);
