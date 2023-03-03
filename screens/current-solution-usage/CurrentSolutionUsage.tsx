import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Source } from 'react-native-fast-image';
import { useQuery } from 'react-query';

import colors from '../../utils/colors';
import { paddingHorizontal } from '../../utils/utils';
import Container from '../../components/Container';
import CurrentSolutionUsageItem from './components/CurrentSolutionUsageItem';
import CurrentSolutionUsagePlaceholder from './components/CurrentSolutionUsagePlaceholder';

const mockedProducts = [
  {
    id: 1,
    name: '닥터리진 A2 솔루션 토너',
    picture: require('../../assets/images/productlarge1.png'),
    value: 5,
  },
  {
    id: 2,
    name: '닥터리진 A2 솔루션 토너',
    picture: require('../../assets/images/product2.png'),
    value: 100,
  },
  {
    id: 3,
    name: '닥터리진 A2 솔루션 토너',
    picture: require('../../assets/images/product3.png'),
    value: 5,
  },
  {
    id: 4,
    name: '닥터리진 A2 솔루션 토너',
    picture: require('../../assets/images/product3.png'),
    value: 50,
  },
];

type Product = {
  id: number;
  name: string;
  picture: number | Source;
  value: number;
};

const useCurrentSolutionUsage = () => {
  return useQuery('customizedSolution', async () => {
    const { data } = await new Promise<{ data: Product[] }>((resolve) => {
      setTimeout(() => {
        resolve({ data: mockedProducts });
      }, 500);
    });
    return data;
  });
};

const CurrentSolutionUsageScreen = () => {
  const { isLoading, data: products } = useCurrentSolutionUsage();

  const keyExtractor = useCallback((item: Product) => `${item.id}`, []);
  const renderItem = useCallback(
    ({ item }: { item: Product }) => <CurrentSolutionUsageItem {...item} />,
    [],
  );

  if (isLoading) {
    return <CurrentSolutionUsagePlaceholder />;
  }

  return (
    <Container
      contentContainerStyle={styles.contentContainer}
      flatList
      data={products}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 15,
  },
  separator: {
    marginVertical: 5,
    marginHorizontal: paddingHorizontal,
    backgroundColor: colors.disabled,
    height: 1,
    width: '100%',
  },
});

export default CurrentSolutionUsageScreen;
