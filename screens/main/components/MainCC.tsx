import React, { memo, useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useQuery } from 'react-query';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import Image from '../../../components/Image';
import TextRegular from '../../../components/TextRegular';
import MainColumnsItem from './MainColumnsItem';
import MainColumnsItemPlaceholder from './MainColumnsItemPlaceholder';

const { width: viewportWidth } = Dimensions.get('window');


const mockedColumns = [
  {
    id: 0,
    curi: require('../../../assets/images/column/0_sa_col.jpg'),
    uri: require('../../../assets/images/column/0_sa_tmb.jpg'),
  },
  {
    id: 1,
    curi: require('../../../assets/images/column/1_g_col.jpg'),
    uri: require('../../../assets/images/column/1_g_tmb.jpg'),
  },
  {
    id: 2,
    curi: require('../../../assets/images/column/2_da_col.jpg'),
    uri: require('../../../assets/images/column/2_da_tmb.jpg'),
  },
  {
    id: 3,
    curi: require('../../../assets/images/column/3_bg_col.jpg'),
    uri: require('../../../assets/images/column/3_bg_tmb.jpg'),
  },
  {
    id: 4,
    curi: require('../../../assets/images/column/4_sc_col.jpg'),
    uri: require('../../../assets/images/column/4_sc_tmb.jpg'),
  },
  {
    id: 5,
    curi: require('../../../assets/images/column/5_sa_col.jpg'),
    uri: require('../../../assets/images/column/5_sa_tmb.jpg'),
  },
  {
    id: 6,
    curi: require('../../../assets/images/column/6_sw_col.jpg'),
    uri: require('../../../assets/images/column/6_sw_tmb.jpg'),
  },
  {
    id: 7,
    curi: require('../../../assets/images/column/7_sb_col.jpg'),
    uri: require('../../../assets/images/column/7_sb_tmb.jpg'),
  },
  {
    id: 8,
    curi: require('../../../assets/images/column/8_st_col.jpg'),
    uri: require('../../../assets/images/column/8_st_tmb.jpg'),
  },
  {
    id: 9,
    curi: require('../../../assets/images/column/9_ss_col.jpg'),
    uri: require('../../../assets/images/column/9_ss_tmb.jpg'),
  },
  
];

const useMainColumns = () => {
  return useQuery(
    'mainCC',
    async () => {
      const { data } = await new Promise<{ data: { id: number; curi: any; uri: any; }[] }>((resolve) => {
        setTimeout(() => {
          resolve({ data: mockedColumns });
        }, 500);
      });
      return data;
    },
    { cacheTime: 60 * 60 * 1000 },
  );
};

const MainCC = () => {
  const [slideActive, setSlideActive] = useState(0);
  const { isLoading, data: columns } = useMainColumns();



const getColumns = (index: number) =>
    columns?.filter(i => i.id>=index*2 && i.id<=index*2+1).map(({ id, ...rest }) => <MainColumnsItem key={id} {...rest} /> );
    

  return (
    <View style={styles.container}>
            <Carousel
              data={[...new Array(5).keys()]}
              renderItem={({ index }) => (        
                <View style={styles.columnsList}>
                  {getColumns(index)}
                </View>
              )}
              autoPlayInterval={1500}

              mode="parallax"
              modeConfig={{
                  parallaxScrollingScale: 0.9,
                  parallaxScrollingOffset: 50,
              }}

              
              width={viewportWidth - paddingHorizontal * 2}
              vertical={false}
              loop
              autoPlay={true}
              onSnapToItem={(index: number) => setSlideActive(index)}
              />
      <View style={styles.paginationContainer}>
        <TextRegular style={styles.pagination} numeric>
          {slideActive + 1}
          <TextRegular style={styles.totalSlide} numeric>
            /{5}
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
  columnsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 0,
  },
});


export default memo(MainCC);
