import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import PriceDiscount from '../../../components/PriceDiscount';

import { paddingHorizontal } from '../../../utils/utils';
import Select from '../../../components/Select';
import TextDemiLight from '../../../components/TextDemiLight';

interface Props {
  options: { id: number; name: string; discount?: number; price: number }[];
  onExpand: (isExpand: boolean) => void;
  onSelect: (item: {
    id: number;
    name: string;
    discount?: number;
    price: number;
  }) => void;
}

const CustomizedSolutionBottomSheetSelect = ({
  options,
  onExpand,
  onSelect,
}: Props) => {
  const keyExtractor = useCallback(
    (item: { id: number; name: string; price: number; discount?: number }) =>
      `${item.id}`,
    [],
  );
  const renderOption = useCallback(
    ({
      item: { name, price, discount },
    }: {
      item: { id: number; name: string; discount?: number; price: number };
    }) => (
      <View style={styles.optionContainer}>
        <TextDemiLight style={styles.name}>{name}</TextDemiLight>
        <PriceDiscount price={price} discount={discount} />
      </View>
    ),
    [],
  );

  return (
    <Select
      placeholder="옵션을 선택해주세요"
      options={options}
      keyExtractor={keyExtractor}
      renderOption={renderOption}
      onExpand={onExpand}
      onSelect={onSelect}
      bottomSheet
    />
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    width: '100%',
    paddingTop: 23,
    paddingBottom: 20,
    paddingHorizontal: paddingHorizontal,
  },
  name: {
    marginBottom: 7,
  },
});

export default CustomizedSolutionBottomSheetSelect;
