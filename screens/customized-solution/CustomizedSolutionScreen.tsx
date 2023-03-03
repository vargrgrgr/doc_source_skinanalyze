import React, { useCallback, useRef} from 'react';
import { StyleSheet, View} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Source } from 'react-native-fast-image';
import { useQuery } from 'react-query';

import colors from '../../utils/colors';
import { paddingHorizontal } from '../../utils/utils';
import BottomBar from '../../components/BottomBar';
import Button from '../../components/Button';
import Container from '../../components/Container';
import {care} from '../../components/13cares';
import { CustomizedSolutionScreenNavigationProp,
  CustomizedSolutionScreenProp } from '../../navigators/navigation.types';
import CustomizedSolutionBottomSheet from './components/CustomizedSolutionBottomSheet';
import CustomizedSolutionItem from './components/CustomizedSolutionItem';
import CustomizedSolutionHeader from './components/CustomizedSolutionHeader';
import CustomizedSolutionPlaceHolder from './components/CustomizedSolutionPlaceHolder';

const mockedProducts = [
  {
    id: 0,
    pid: 'A2',
    picture: require('../../assets/images/solution/A2.jpg'),
    name: '닥터리진 A2 솔루션 토너',
    description: '토너',
    discount: 0,
    price: 5000,
  },
  {
    id: 1,
    pid: 'AA2',
    picture: require('../../assets/images/solution/AA2.jpg'),
    name: '닥터리진 AA2 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 2,
    pid: 'AA22',
    picture: require('../../assets/images/solution/AA22.jpg'),
    name: '닥터리진 AA22 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 3,
    pid: 'AC2',
    picture: require('../../assets/images/solution/AC2.jpg'),
    name: '닥터리진 AC2 솔루션 크림',
    description: '크림',
    discount: 0,
    price: 5000,
  },
  {
    id: 4,
    pid: 'M1',
    picture: require('../../assets/images/solution/M1.jpg'),
    name: '닥터리진 M1 솔루션 토너',
    description: '토너',
    discount: 0,
    price: 5000,
  },
  {
    id: 5,
    pid: 'MA1',
    picture: require('../../assets/images/solution/MA1.jpg'),
    name: '닥터리진 MA1 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 6,
    pid: 'MA11',
    picture: require('../../assets/images/solution/MA11.jpg'),
    name: '닥터리진 MA11 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id:7,
    pid: 'MC1',
    picture: require('../../assets/images/solution/MC1.jpg'),
    name: '닥터리진 MC1 솔루션 크림',
    description: '크림',
    discount: 10,
    price: 5000,
  },
  {
    id: 8,
    pid: 'M2',
    picture: require('../../assets/images/solution/M2.jpg'),
    name: '닥터리진 M2 솔루션 토너',
    description: '토너',
    discount: 0,
    price: 5000,
  },
  {
    id: 9,
    pid: 'MA2',
    picture: require('../../assets/images/solution/MA2.jpg'),
    name: '닥터리진 MA2 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 10,
    pid: 'MA22',
    picture: require('../../assets/images/solution/MA22.jpg'),
    name: '닥터리진 MA22 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 11,
    pid: 'MC2',
    picture: require('../../assets/images/solution/MC2.jpg'),
    name: '닥터리진 MC2 솔루션 크림',
    description: '크림',
    discount: 0,
    price: 5000,
  },
  {
    id: 12,
    pid: 'P2',
    picture: require('../../assets/images/solution/P2.jpg'),
    name: '닥터리진 P2 솔루션 토너',
    description: '토너',
    discount: 0,
    price: 5000,
  },
  {
    id: 13,
    pid: 'PA2',
    picture: require('../../assets/images/solution/PA2.jpg'),
    name: '닥터리진 PA2 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 14,
    pid: 'PA22',
    picture: require('../../assets/images/solution/PA22.jpg'),
    name: '닥터리진 PA22 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 15,
    pid: 'PC2',
    picture: require('../../assets/images/solution/PC2.jpg'),
    name: '닥터리진 PC2 솔루션 크림',
    description: '크림',
    discount: 0,
    price: 5000,
  },
  {
    id: 16,
    pid: 'P1',
    picture: require('../../assets/images/solution/P1.jpg'),
    name: '닥터리진 P1 솔루션 토너',
    description: '토너',
    discount: 0,
    price: 5000,
  },
  {
    id: 17,
    pid: 'PA1',
    picture: require('../../assets/images/solution/PA1.jpg'),
    name: '닥터리진 PA1 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 18,
    pid: 'PA11',
    picture: require('../../assets/images/solution/PA11.jpg'),
    name: '닥터리진 PA11 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 19,
    pid: 'PC1',
    picture: require('../../assets/images/solution/PC1.jpg'),
    name: '닥터리진 PC1 솔루션 크림',
    description: '크림',
    discount: 0,
    price: 5000,
  },
  {
    id: 20,
    pid: 'M1',
    picture: require('../../assets/images/solution/M1.jpg'),
    name: '닥터리진 M1 솔루션 토너',
    description: '토너',
    discount: 0,
    price: 5000,
  },
  {
    id: 21,
    pid: 'SA1',
    picture: require('../../assets/images/solution/SA1.jpg'),
    name: '닥터리진 SA1 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 22,
    pid: 'SA11',
    picture: require('../../assets/images/solution/SA11.jpg'),
    name: '닥터리진 SA11 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 23,
    pid: 'SC1',
    picture: require('../../assets/images/solution/SC1.jpg'),
    name: '닥터리진 SC1 솔루션 크림',
    description: '크림',
    discount: 10,
    price: 5000,
  },
  {
    id: 24,
    pid: 'S2',
    picture: require('../../assets/images/solution/S2.jpg'),
    name: '닥터리진 S2 솔루션 토너',
    description: '토너',
    discount: 0,
    price: 5000,
  },
  {
    id: 25,
    pid: 'SA2',
    picture: require('../../assets/images/solution/SA2.jpg'),
    name: '닥터리진 SA2 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 26,
    pid: 'SA22',
    picture: require('../../assets/images/solution/SA22.jpg'),
    name: '닥터리진 SA22 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 27,
    pid: 'SC2',
    picture: require('../../assets/images/solution/SC2.jpg'),
    name: '닥터리진 SC2 솔루션 크림',
    description: '크림',
    discount: 0,
    price: 5000,
  },
  {
  id: 28,
  pid: 'W2',
  picture: require('../../assets/images/solution/W2.jpg'),
  name: '닥터리진 W2 솔루션 토너',
  description: '토너',
  discount: 0,
  price: 5000,
  },
  {
    id: 29,
    pid: 'WA2',
    picture: require('../../assets/images/solution/WA2.jpg'),
    name: '닥터리진 WA2 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 30,
    pid: 'WA22',
    picture: require('../../assets/images/solution/WA22.jpg'),
    name: '닥터리진 WA22 솔루션 앰플',
    description: '앰플',
    discount: 0,
    price: 5000,
  },
  {
    id: 31,
    pid: 'WC2',
    picture: require('../../assets/images/solution/WC2.jpg'),
    name: '닥터리진 WC2 솔루션 크림',
    description: '크림',
    discount: 0,
    price: 5000,
  },
];

type Product = {
  id: number;
  pid?: string;
  picture: number | Source;
  name: string;
  description: string;
  discount?: number;
  price: number;
};

const useCustomizedSolution = (cnum: number) => {
  var solution = mockedProducts;
  console.log('cnum')
  if (cnum==null){
    console.log('cnum is null')  
    cnum=0;
  }
  console.log(cnum)
  const buff: Product = solution.filter(i => i.pid ==care[cnum-1].toner)[0];
  console.log(buff);
  const buff2: Product = solution.filter(i => i.pid ==care[cnum-1].amp1)[0];
  console.log(buff2);
  const buff3: Product = solution.filter(i => i.pid ==care[cnum-1].amp2)[0];
  console.log(buff3);
  const buff4: Product = solution.filter(i => i.pid ==care[cnum-1].cream)[0];
  console.log(buff4);
  var result = [buff, buff2, buff3, buff4];
  solution.pop();
  return useQuery(
    'customizedSolution',
    async () => {
      const { data } = await new Promise<{ data: Product[] }>((resolve) => {
        setTimeout(() => {
          resolve({ data: result });
        }, 1000);
      });
      return data;
    },
    { cacheTime: 0 },
  );
};

const CustomizedSolutionScreen = () => {
  const { carenum } = useRoute<CustomizedSolutionScreenProp>().params  || {};
  console.log('carenum: '+carenum);
  const { data: products, isLoading } = useCustomizedSolution(carenum);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const cnum = carenum;
  const onPurchaseButtonPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const keyExtractor = useCallback((item: Product) => `${item?.id}`, []);
  const renderItem = useCallback(
    ({ item }: { item: Product }) => <CustomizedSolutionItem {...item} />,
    [],
  );

  return (
    <>
      {isLoading ? (
        <CustomizedSolutionPlaceHolder carenum = {carenum}/>
      ) : (
        <Container
          flatList
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={
            <CustomizedSolutionHeader 
                carenum = {carenum}
            />
          }
          data={products}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
      <BottomBar>
        <Button onPress={onPurchaseButtonPress} loading={isLoading}>
          구매하기
        </Button>
      </BottomBar>
      <CustomizedSolutionBottomSheet ref={bottomSheetModalRef} />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30,
    paddingBottom: 5,
  },
  separator: {
    marginVertical: 5,
    marginHorizontal: paddingHorizontal,
    backgroundColor: colors.disabled,
    height: 1,
    width: '100%',
  },
});

export default CustomizedSolutionScreen;
