import React, { FC, memo, useCallback } from 'react';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useController } from 'react-hook-form';
import { SvgProps } from 'react-native-svg';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import BankTransferIcon from '../../../assets/icons/bank-transfer.svg';
import CardIcon from '../../../assets/icons/card.svg';
import KakaoPayIcon from '../../../assets/icons/kakao-pay.svg';
import NaverPayIcon from '../../../assets/icons/naver-pay.svg';
import PaymentMethodRadioButton from './PaymentMethodRadioButton';
import TextBold from '../../../components/TextBold';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const options = [
  {
    label: '카드',
    value: 1,
    icon: CardIcon,
  },
  {
    label: '무통장입금',
    value: 2,
    icon: BankTransferIcon,
  },
  {
    label: '카카오페이',
    value: 3,
    icon: KakaoPayIcon,
  },
  {
    label: '네이버페이',
    value: 4,
    icon: NaverPayIcon,
  },
];

interface RadioProp {
  label: string;
  value: number;
  icon: FC<SvgProps>;
}

const PaymentMethodRadioGroup = ({ style }: Props) => {
  const { field } = useController({
    name: 'paymentMethod',
    rules: { required: '걸제 수단을 선택해 주세요.' },
  });

  const keyExtractor = useCallback((item: RadioProp) => `${item.value}`, []);
  const renderItem = useCallback(
    ({ item }: { item: RadioProp }) => (
      <PaymentMethodRadioButton
        onPress={() => field.onChange(item.value)}
        active={field.value === item.value}
        {...item}
      />
    ),
    [field],
  );

  return (
    <View style={style}>
      <TextBold style={styles.title}>결제 수단</TextBold>
      <FlatList
        data={options}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={({
          leadingItem: { value },
        }: {
          leadingItem: RadioProp;
        }) => {
          return (
            <View
              style={[
                styles.separator,
                (value === field.value || value + 1 === field.value) &&
                  styles.separatorActive,
              ]}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: paddingHorizontal,
    marginBottom: 20,
  },
  separator: {
    height: '100%',
    width: 1,
    backgroundColor: colors.disabled,
  },
  separatorActive: {
    backgroundColor: '#000',
  },
});

export default memo(PaymentMethodRadioGroup);
