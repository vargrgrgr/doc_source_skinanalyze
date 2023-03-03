import React, { forwardRef, RefObject, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useNavigation } from '@react-navigation/native';
import { FormProvider, useForm } from 'react-hook-form';
import { ModalResultType } from 'react-native-use-modal';
import { useDispatch, useSelector } from 'react-redux';
import mergeRefs from 'react-merge-refs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Source } from 'react-native-fast-image';

import colors from '../../../utils/colors';
import { onPurchase } from '../../../store/cart';
import { paddingHorizontal } from '../../../utils/utils';
import { ProductInfoScreenNavigationProp } from '../../../navigators/navigation.types';
import { selectIsLoggedIn } from '../../../store/user';
import useSimpleModal from '../../../hooks/useSimpleModal';
import Button from '../../../components/Button';
import BottomSheet from '../../../components/BottomSheet';
import QuantitySelectItem from '../../customized-solution/components/QuantitySelectItem';
import TextDemiLight from '../../../components/TextDemiLight';
import TextBold from '../../../components/TextBold';

type FormValues = {
  quantity: number;
};

interface Props {
  id: number;
  picture: number | Source;
  name: string;
  discount?: number;
  price: number;
}

const usePurchase = (ref: RefObject<BottomSheetModalMethods>, props: Props) => {
  const navigation = useNavigation<ProductInfoScreenNavigationProp>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const simpleModal = useSimpleModal();
  const dispatch = useDispatch();

  const purchase = async ({ quantity }: FormValues) => {
    if (!isLoggedIn) {
      const result = await simpleModal.show({
        message:
          '비회원님도 상품구매가 가능하나 다양한\n회원혜택에서 제외됩니다.',
        cancelText: '비회원구매',
        confirmText: '로그인',
      });
      if (result.type === ModalResultType.CONFIRM) {
        ref.current?.dismiss();
        navigation.navigate('Login');
      } else {
        dispatch(onPurchase([{ product: props, quantity }]));
        ref.current?.dismiss();
        navigation.navigate('PaymentInfo');
      }
    } else {
      dispatch(onPurchase([{ product: props, quantity }]));
      ref.current?.dismiss();
      navigation.navigate('PaymentInfo');
    }
  };

  return purchase;
};

const ProductInfoBottomSheet = forwardRef<BottomSheetModal, Props>(
  (props, ref) => {
    const { name, discount, price } = props;
    const insets = useSafeAreaInsets();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const methods = useForm<FormValues>();
    const quantity = methods.watch('quantity');
    const purchase = usePurchase(bottomSheetModalRef, props);

    return (
      <BottomSheet
        ref={mergeRefs([bottomSheetModalRef, ref])}
        backgroundStyle={styles.background}
        index={0}
        snapPoints={[266]}
        handleComponent={null}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.6}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
      >
        <FormProvider {...methods}>
          <View
            style={[
              styles.contentContainer,
              { marginBottom: 20 + insets.bottom },
            ]}
          >
            <QuantitySelectItem
              name={'quantity'}
              productName={name}
              discount={discount}
              price={price}
              style={styles.quantitySelect}
            />
            <View style={styles.totalAmounContainer}>
              <TextDemiLight>총 상품 금액</TextDemiLight>
              <TextBold style={styles.totalAmount} numeric>
                {price * (quantity || 1)}원
              </TextBold>
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                color="disabled"
                style={[styles.button, styles.firstButton]}
                onPress={methods.handleSubmit(purchase)}
              >
                정기 구독 구매
              </Button>
              <Button
                style={styles.button}
                onPress={methods.handleSubmit(purchase)}
              >
                제품 일괄 구매
              </Button>
            </View>
          </View>
        </FormProvider>
      </BottomSheet>
    );
  },
);

ProductInfoBottomSheet.displayName = 'ProductInfoBottomSheet';

const styles = StyleSheet.create({
  background: {
    borderRadius: 0,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: paddingHorizontal,
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  quantitySelect: {
    paddingTop: 10,
  },
  totalAmounContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  totalAmount: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
  firstButton: {
    marginRight: 10,
  },
});

export default ProductInfoBottomSheet;
