import React, {
  forwardRef,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ModalResultType } from 'react-native-use-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import mergeRefs from 'react-merge-refs';

import colors from '../../../utils/colors';
import { CustomizedSolutionScreenNavigationProp } from '../../../navigators/navigation.types';
import { onPurchase } from '../../../store/cart';
import { paddingHorizontal } from '../../../utils/utils';
import { selectIsLoggedIn } from '../../../store/user';
import useSimpleModal from '../../../hooks/useSimpleModal';
import Button from '../../../components/Button';
import BottomSheet from '../../../components/BottomSheet';
import CustomizedSolutionBottomSheetSelect from './CustomizedSolutionBottomSheetSelect';
import QuantitySelectItem from './QuantitySelectItem';
import TextDemiLight from '../../../components/TextDemiLight';
import TextBold from '../../../components/TextBold';

const usePurchase = (ref: RefObject<BottomSheetModalMethods>) => {
  const navigation = useNavigation<CustomizedSolutionScreenNavigationProp>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const simpleModal = useSimpleModal();
  const dispatch = useDispatch();

  const purchase = async (form: FormValues) => {
    if (!isLoggedIn) {
      const result = await simpleModal.show({
        message:
          '사진 송금과 피부 측정를 사용 하기 위해서 카메라 권한이 필요 합니다.\n설정에서 카메라 권한을 수락해주 세요.',
        confirmText: '설정',
      });
      if (result.type === ModalResultType.CONFIRM) {
        navigation.navigate('Login');
      }
    } else {
      if (form.cart?.length) {
        dispatch(
          onPurchase(
            form.cart.map(({ id, quantity }) => ({
              quantity,
              product: {
                id,
                ...optionsNormalized[id as keyof typeof optionsNormalized],
              },
            })),
          ),
        );
        ref.current?.dismiss();
        navigation.navigate('PaymentInfo');
      }
    }
  };

  return purchase;
};

const options = [
  { id: 1, name: '닥터리진 A2 솔루션 토너', discount: 10, price: 15000 },
  { id: 2, name: '닥터리진 AA2 솔루션 앰플', discount: 10, price: 15000 },
  { id: 3, name: '닥터리진 AC2 솔루션 크림', discount: 10, price: 15000 },
  { id: 4, name: '닥터리진 커스텀 솔루션 V3', discount: 10, price: 15000 },
  { id: 5, name: '닥터리진 커스텀 솔루션 V3', discount: 10, price: 15000 },
  { id: 6, name: '닥터리진 커스텀 솔루션 V3', discount: 10, price: 15000 },
];

const optionsNormalized = {
  1: {
    picture: require('../../../assets/images/productlarge1.png'),
    name: '닥터리진 A2 솔루션 토너',
    discount: 10,
    price: 15000,
  },
  2: {
    picture: require('../../../assets/images/product2.png'),
    name: '닥터리진 AA2 솔루션 앰플',
    discount: 10,
    price: 15000,
  },
  3: {
    picture: require('../../../assets/images/product3.png'),
    name: '닥터리진 AC2 솔루션 크림',
    discount: 10,
    price: 15000,
  },
  4: {
    picture: require('../../../assets/images/product2.png'),
    name: '닥터리진 커스텀 솔루션 V3',
    discount: 10,
    price: 15000,
  },
  5: {
    picture: require('../../../assets/images/product3.png'),
    name: '닥터리진 커스텀 솔루션 V3',
    discount: 10,
    price: 15000,
  },
  6: {
    picture: require('../../../assets/images/product3.png'),
    name: '닥터리진 커스텀 솔루션 V3',
    discount: 10,
    price: 15000,
  },
};

type FormValues = {
  cart: { id: number; quantity: number }[];
};

const CustomizedSolutionBottomSheet = forwardRef<BottomSheetModal>((_, ref) => {
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const methods = useForm<FormValues>({ reValidateMode: 'onChange' });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'cart',
    keyName: 'key',
  });
  const purchase = usePurchase(bottomSheetModalRef);
  const [isSelectExpand, setIsSelectExpand] = useState(false);

  const keyExtractor = useCallback(
    (item: Record<'key', string>, index: number) => `${item.key}`,
    [],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: { id: number }; index: number }) => {
      const { name, discount, price } =
        optionsNormalized[item.id as keyof typeof optionsNormalized];
      return (
        <QuantitySelectItem
          index={index}
          name={`cart.${index}.quantity`}
          productName={name}
          discount={discount}
          price={price}
          remove={remove}
        />
      );
    },
    [remove],
  );

  const onSelect = useCallback(
    (item: { id: number; name: string }) => {
      const isSelected = fields.findIndex((field) => {
        return field.id === item.id;
      });
      if (isSelected >= 0) {
        methods.setValue(
          `cart.${isSelected}.quantity`,
          methods.getValues().cart[isSelected].quantity + 1,
        );
      } else {
        append({ id: item.id, quantity: 1 });
      }
    },
    [fields, methods, append],
  );

  const onBottomSheetChange = (index: number) => {
    if (index === -1) {
      setIsSelectExpand(false);
    }
  };

  const getTotalAmount = useMemo(() => {
    let totalAmount = 0;
    for (let i = 0; i < fields?.length; i++) {
      const product =
        optionsNormalized[fields[i].id as keyof typeof optionsNormalized];
      totalAmount += product.price * (fields[i].quantity || 1);
    }
    return totalAmount;
  }, [fields]);

  return (
    <BottomSheet
      ref={mergeRefs([bottomSheetModalRef, ref])}
      backgroundStyle={styles.background}
      index={0}
      snapPoints={[
        162 +
          insets.bottom +
          (isSelectExpand
            ? 84 * 5 + 60
            : 86 * Math.min(fields.length, 5) + (fields.length ? 72 : 0)),
      ]}
      onChange={onBottomSheetChange}
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
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={[
              styles.contentContainer,
              { marginBottom: insets.bottom + 20 },
            ]}
          >
            <View style={styles.inner}>
              <CustomizedSolutionBottomSheetSelect
                onExpand={setIsSelectExpand}
                onSelect={onSelect}
                options={options}
              />
              {!isSelectExpand && (
                <View>
                  <View style={styles.quantityListContainer}>
                    <FlatList
                      data={fields}
                      keyExtractor={keyExtractor}
                      renderItem={renderItem}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                  {!!fields.length && (
                    <View style={styles.totalAmounContainer}>
                      <TextDemiLight>총 상품 금액</TextDemiLight>
                      <TextBold style={styles.totalAmount} numeric>
                        {getTotalAmount.toLocaleString()}원
                      </TextBold>
                    </View>
                  )}
                </View>
              )}
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
        </SafeAreaView>
      </FormProvider>
    </BottomSheet>
  );
});

CustomizedSolutionBottomSheet.displayName = 'CustomizedSolutionBottomSheet';

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
  inner: {
    flex: 1,
  },
  quantityListContainer: {
    maxHeight: 86 * 5,
  },
  totalAmounContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
  firstButton: {
    marginRight: 10,
  },
});

export default CustomizedSolutionBottomSheet;
