import React, { useCallback } from 'react';
import { FlatList, StyleProp, ViewStyle } from 'react-native';

import ShoppingSubCategories from './ShoppingSubCategories';
import ShoppingItemPlaceholder from './ShoppingItemPlaceholder';

interface Props {
  styles: {
    listContentContainer: StyleProp<ViewStyle>;
    even: StyleProp<ViewStyle>;
    odd: StyleProp<ViewStyle>;
  };
  subCategoryActive: number;
  onSubCategoryChange: (category: number) => void;
}

const ShoppingPlaceHolder = ({
  styles,
  subCategoryActive,
  onSubCategoryChange,
}: Props) => {
  const keyExtractorPlaceHolder = useCallback((item: number) => `${item}`, []);
  const renderItemPlaceholder = useCallback(
    ({ item, index }: { item: number; index: number }) => (
      <ShoppingItemPlaceholder
        {...item}
        style={index % 2 === 0 ? styles.even : styles.odd}
      />
    ),
    [],
  );

  return (
    <FlatList
      contentContainerStyle={styles.listContentContainer}
      ListHeaderComponent={
        <ShoppingSubCategories
          subCategoryActive={subCategoryActive}
          onSubCategoryChange={onSubCategoryChange}
        />
      }
      data={[...Array(4).keys()]}
      keyExtractor={keyExtractorPlaceHolder}
      renderItem={renderItemPlaceholder}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ShoppingPlaceHolder;
