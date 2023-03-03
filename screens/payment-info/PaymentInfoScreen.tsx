import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { paddingHorizontal } from '../../utils/utils';
import { PaymentInfoScreenNavigationProp } from '../../navigators/navigation.types';
import { selectCart } from '../../store/cart';
import { selectUser } from '../../store/user';
import useToastErrors from '../../hooks/useToastErrors';
import BottomBar from '../../components/BottomBar';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Hr from '../../components/Hr';
import PaymentProductItem from './components/PaymentProductItem';
import TextBold from '../../components/TextBold';
import PaymentReceipt from './components/PaymentReceipt';
import PaymentDeliveryInfo from './components/PaymentDeliveryInfo';
import PaymentPointsNotice from './components/PaymentPointsNotice';
import PaymentUseCoupon from './components/PaymentUseCoupon';
import PaymentUsePoints from './components/PaymentUsePoints';

type FormValues = {
  name: string;
  phoneNumber: string;
  address: string;
  addressDetails: string;
  request: string;
  point: number;
};

const PaymentInfoScreen = () => {
  const navigation = useNavigation<PaymentInfoScreenNavigationProp>();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const methods = useForm<FormValues>();
  const insets = useSafeAreaInsets();
  useToastErrors(methods, { bottomOffset: 96 + insets.bottom });

  const onPay = () => navigation.navigate('PaymentMethod');

  return (
    <FormProvider {...methods}>
      <Container contentContainerStyle={styles.contenContainer} scrollEnabled>
        <PaymentDeliveryInfo globalStyles={styles} />
        <Hr style={styles.hr} big />
        <View style={styles.section}>
          <TextBold style={styles.sectionHeading}>주문 내역</TextBold>
          {cart.map(({ product, quantity }) => (
            <PaymentProductItem
              key={product.id}
              {...product}
              quantity={quantity}
            />
          ))}
        </View>
        <Hr style={[styles.hr, styles.hr2]} big />
        {user && (
          <>
            <PaymentUseCoupon globalStyles={styles} />
            <Hr style={styles.hr} big />
            <PaymentUsePoints globalStyles={styles} />
            <PaymentPointsNotice />
          </>
        )}
        <PaymentReceipt globalStyles={styles} />
      </Container>
      <BottomBar>
        <Button onPress={methods.handleSubmit(onPay)}>결제하기</Button>
      </BottomBar>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  contenContainer: {
    paddingTop: 30,
  },
  section: {
    paddingHorizontal,
  },
  sectionHeading: {
    marginBottom: 20,
    fontSize: 16,
  },
  hr: {
    marginVertical: 20,
  },
  hr2: {
    marginTop: 10,
  },
});

export default PaymentInfoScreen;
