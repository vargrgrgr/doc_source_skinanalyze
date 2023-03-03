import React, { memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useQuery } from 'react-query';
import { Source } from 'react-native-fast-image';
import colors from '../../../utils/colors';
import MainColumnsItem from './MainColumnsItem';
import MainColumnsItemPlaceholder from './MainColumnsItemPlaceholder';
import TextBold from '../../../components/TextBold';

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

type Column = {
  id: number;
  curi: number | Source;
  uri: number | Source;
};

const useMainColumns = () => {
  return useQuery('mainColumns', async () => {
    const { data } = await new Promise<{ data: Column[] }>((resolve) => {
      setTimeout(() => {
        resolve({ data: mockedColumns });
      }, 500);
    });
    return data;
  });
};

const MainColumns = () => {
  const { isLoading, data: columns } = useMainColumns();
  
  const getPlaceHolder = () =>
    [...Array(3).keys()].map((i) => <MainColumnsItemPlaceholder key={i} />);

  const getColumns = () =>
    columns?.map(({ id, ...rest }) => <MainColumnsItem key={id} {...rest} />);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextBold>뷰티 칼럼</TextBold>

      </View>
      <View style={styles.columnsList}>
        {isLoading ? getPlaceHolder() : getColumns()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moreLink: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  columnsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  separator: {
    width: 10,
  },
});

export default memo(MainColumns);
