import React, { useCallback, useReducer } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Source } from 'react-native-fast-image';
import { useQuery } from 'react-query';

import { paddingHorizontal } from '../../utils/utils';
import Container from '../../components/Container';
import ShoppingItem from './components/ShoppingItem';
import ShoppingCategories from './components/ShoppingCategories';
import ShoppingSubCategories from './components/ShoppingSubCategories';
import ShoppingPlaceHolder from './components/ShoppingPlaceHolder';

const mockedProducts = [
  {
    id: 1,
    picture: require('../../assets/images/productlarge1.png'),
    name: '닥터리진 A2 솔루션 토너',
    description: '수분감이 대박 많은 토너',
    discount: 10,
    price: 15000,
  },
  {
    id: 2,
    picture: require('../../assets/images/product2.png'),
    name: '닥터리진 A2 솔루션 토너',
    description: '수분감이 대박 많은 토너',
    discount: 10,
    price: 15000,
  },
  {
    id: 3,
    picture: require('../../assets/images/product3.png'),
    name: '닥터리진 A2 솔루션 토너',
    description: '수분감이 대박 많은 토너',
    discount: 10,
    price: 15000,
  },
  {
    id: 4,
    picture: require('../../assets/images/product2.png'),
    name: '닥터리진 A2 솔루션 토너',
    description: '수분감이 대박 많은 토너',
    discount: 10,
    price: 15000,
  },
  {
    id: 5,
    picture: require('../../assets/images/product3.png'),
    name: '닥터리진 A2 솔루션 토너',
    description: '수분감이 대박 많은 토너',
    discount: 10,
    price: 15000,
  },
];

type Product = {
  id: number;
  picture: number | Source;
  name: string;
  description: string;
  discount?: number;
  price: number;
};

type State = {
  categoryActive: number;
  subCategoryActive: number;
};

type Action = {
  type: 'categoryChange' | 'subCategoryChange';
  payload: number;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'categoryChange':
      return {
        ...state,
        categoryActive: action.payload,
        subCategoryActive: 0,
      };
    case 'subCategoryChange':
      return { ...state, subCategoryActive: action.payload };
    default:
      return state;
  }
};

const useShopping = ({
  categoryActive,
  subCategoryActive,
}: {
  categoryActive: number;
  subCategoryActive: number;
}) => {
  return useQuery(
    ['shopping', categoryActive, subCategoryActive],
    async () => {
      const { data } = await new Promise<{ data: Product[] }>((resolve) => {
        setTimeout(() => {
          resolve({ data: mockedProducts });
        }, 500);
      });
      return data;
    },
    { cacheTime: 0 },
    // { cacheTime: 60 * 1000 },
  );
};

const ShoppingScreen = () => {
  const [{ categoryActive, subCategoryActive }, dispatch] = useReducer(
    reducer,
    {
      categoryActive: 0,
      subCategoryActive: 0,
    },
  );
  const { isLoading, data: products } = useShopping({
    categoryActive,
    subCategoryActive,
  });

  const onCategoryChange = useCallback((tab: number) => {
    dispatch({ type: 'categoryChange', payload: tab });
  }, []);

  const onSubCategoryChange = useCallback((category: number) => {
    dispatch({ type: 'subCategoryChange', payload: category });
  }, []);

  const keyExtractor = useCallback((item: Product) => `${item.id}`, []);
  const renderItem = useCallback(
    ({ item, index }: { item: Product; index: number }) => (
      <ShoppingItem
        {...item}
        style={index % 2 === 0 ? styles.even : styles.odd}
      />
    ),
    [],
  );

  return (
    <Container contentContainerStyle={styles.contentContainer}>
      <ShoppingCategories
        categoryActive={categoryActive}
        onCategoryChange={onCategoryChange}
      />
      {isLoading ? (
        <ShoppingPlaceHolder
          styles={styles}
          subCategoryActive={subCategoryActive}
          onSubCategoryChange={onSubCategoryChange}
        />
      ) : (
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          ListHeaderComponent={
            <ShoppingSubCategories
              subCategoryActive={subCategoryActive}
              onSubCategoryChange={onSubCategoryChange}
            />
          }
          data={products}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal,
    paddingTop: 33,
    paddingBottom: 0,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  chipButton: {
    marginHorizontal: 5,
  },
  odd: {
    marginLeft: 5,
  },
  even: {
    marginRight: 5,
  },
});

export default ShoppingScreen;
