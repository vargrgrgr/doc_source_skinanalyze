import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ModalResultType } from 'react-native-use-modal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Source } from 'react-native-fast-image';
import { useQuery } from 'react-query';

import {
  ProductInfoScreenNavigationProp,
  ProductInfoScreenProp,
} from '../../navigators/navigation.types';
import { sleep } from '../../utils/utils';
import useSimpleModal from '../../hooks/useSimpleModal';
import Button from '../../components/Button';
import BottomBar from '../../components/BottomBar';
import Container from '../../components/Container';
import Hr from '../../components/Hr';
import ProductInfoDeliveryInfo from './components/ProductInfoDeliveryInfo';
import ProductInfoDescription from './components/ProductInfoDescription';
import ProductInfoHeader from './components/ProductInfoHeader';
import ProductInfoBottomSheet from './components/ProductInfoBottomSheet';

const mockedProduct = {
  name: '닥터리진 A2 솔루션 토너',
  description: '수분감이 대박 많은 토너',
  longDescription:
    '(임시 텍스트입니다) 수분이 부족한 건성 피부타입이에요. 게다가 피부가 예민한 민감성을 갖고있어 색소침착이 드문 드문 보여요. 피부가 건조하면 피부 처짐이 생기기가 쉬운데요... 수분이 부족한 건성 피부타입이에요. 게다가 피부가 예민한민감성을 갖고 있어 색소침착이 드문 드문 보여요. 피부가 건조하면 피부 처짐이 생기기가 쉬운데요…',
  discount: 10,
  price: 15000,
  category: '스킨케어',
  subCategory: '커스텀 솔루션',
};

type Product = {
  id: number;
  picture: number | Source;
  name: string;
  description: string;
  longDescription?: string;
  discount?: number;
  price?: number;
  category?: string;
  subCategory?: string;
};

const useProductInfo = () => {
  const { id, picture, name, description, discount, price } =
    useRoute<ProductInfoScreenProp>().params;
  const simpleModal = useSimpleModal();
  const navigation = useNavigation<ProductInfoScreenNavigationProp>();

  const query = useQuery(
    ['productInfo', id],
    async () => {
      const { data } = await new Promise<{ data: Product }>((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              id,
              picture,
              name: name || mockedProduct.name,
              description: description || mockedProduct.description,
              longDescription: mockedProduct.longDescription,
              discount: discount || mockedProduct.discount,
              price: price || mockedProduct.price,
              category: mockedProduct.category,
              subCategory: mockedProduct.subCategory,
            },
          });
        }, 500);
      });
      return data;
    },
    {
      cacheTime: 60 * 1000,
      retry: 1,
      placeholderData: {
        id,
        picture,
        name: name || mockedProduct.name,
        description: description || mockedProduct.description,
        discount,
        price,
        category: mockedProduct.category,
        subCategory: mockedProduct.subCategory,
      },
      onError: () => {
        const showErrorModal = async () => {
          await sleep(100);
          const result = await simpleModal.show({
            message: '오류가 발생했습니다.',
            cancelText: '뒤로가기',
            confirmText: '재시도',
          });

          if (result.type === ModalResultType.CANCEL) {
            navigation.goBack();
          } else {
            query.refetch().catch(() => {});
          }
        };
        showErrorModal().catch(() => {});
      },
    },
  );

  return query;
};

const ProductInfoScreen = () => {
  const params = useRoute<ProductInfoScreenProp>().params;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { isFetching, isError, data: product } = useProductInfo();

  const onPurchaseButtonPress = () => {
    if (isFetching) {
      return;
    }

    bottomSheetModalRef.current?.present();
  };

  return (
    <>
      <Container contentContainerStyle={styles.contentContainer} scrollEnabled>
        <ProductInfoHeader {...(product || params)} />
        <Hr style={styles.hr} big />
        <ProductInfoDescription longDescription={product?.longDescription} />
        <Hr style={styles.hr} />
        <ProductInfoDeliveryInfo />
      </Container>
      <BottomBar>
        <Button onPress={onPurchaseButtonPress} disabled={isError}>
          구매하기
        </Button>
      </BottomBar>
      {!isError && (
        <ProductInfoBottomSheet
          ref={bottomSheetModalRef}
          id={product!.id}
          picture={product!.picture}
          name={product!.name}
          discount={product!.discount}
          price={product!.price!}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30,
  },
  hr: {
    marginVertical: 20,
  },
});

export default ProductInfoScreen;
