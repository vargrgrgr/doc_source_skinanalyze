import React, { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import ChipButton from '../../../components/ChipButtton';

const categories = ['커스텀 솔루션', '클렌징', '토너/에멀전', '앰플/크림'];

interface Props {
  subCategoryActive: number;
  onSubCategoryChange: (category: number) => void;
}

const ShoppingSubCategories = ({
  subCategoryActive,
  onSubCategoryChange,
}: Props) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.filterList}
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category, index) => (
        <ChipButton
          key={category}
          style={index !== categories.length - 1 && styles.margin}
          onPress={() => onSubCategoryChange(index)}
          active={subCategoryActive === index}
        >
          {category}
        </ChipButton>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterList: {
    paddingVertical: 20,
  },
  margin: {
    marginRight: 10,
  },
});

export default memo(ShoppingSubCategories);
