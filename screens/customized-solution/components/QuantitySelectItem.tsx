import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import colors from '../../../utils/colors';
import DeleteIcon from '../../../assets/icons/delete.svg';
import MinusIcon from '../../../assets/icons/minus-circle.svg';
import PlusIcon from '../../../assets/icons/plus-circle.svg';
import PriceDiscount from '../../../components/PriceDiscount';
import TextBold from '../../../components/TextBold';
import TextDemiLight from '../../../components/TextDemiLight';
import TouchableRipple from '../../../components/TouchableRipple';

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
  name: string;
  productName: string;
  discount?: number;
  price: number;
  remove?: (index: number) => void;
}

const QuantitySelectItem = ({
  style,
  index,
  name,
  productName,
  discount,
  price,
  remove,
}: Props) => {
  const { field } = useController({
    name,
    rules: { required: true },
    defaultValue: 1,
  });

  const onIncrease = () => {
    field.onChange(+field.value + 1);
  };

  const onDecrease = () => {
    field.onChange(+field.value - 1);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.section, styles.section1]}>
        <TextDemiLight style={styles.name}>{productName}</TextDemiLight>
        {remove && (
          <TouchableRipple
            style={styles.deleteButton}
            onPress={() => {
              remove(index!);
            }}
          >
            <DeleteIcon />
          </TouchableRipple>
        )}
      </View>
      <View style={styles.section}>
        <View style={styles.selectQuantityContainer}>
          <Pressable onPress={onDecrease} disabled={field.value === 1}>
            <MinusIcon
              color={field.value === 1 ? colors.textLight : colors.text}
            />
          </Pressable>
          <TextBold style={styles.quantity}>{field.value}</TextBold>
          <Pressable onPress={onIncrease} disabled={field.value >= 10}>
            <PlusIcon
              color={field.value >= 10 ? colors.textLight : colors.text}
            />
          </Pressable>
        </View>
        <PriceDiscount price={price} discount={discount} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderColor: colors.disabled,
    borderBottomWidth: 1,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section1: {
    marginBottom: 6,
  },
  name: {
    color: colors.textSecondary,
  },
  selectQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    width: 38,
    textAlign: 'center',
  },
  deleteButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(QuantitySelectItem);
