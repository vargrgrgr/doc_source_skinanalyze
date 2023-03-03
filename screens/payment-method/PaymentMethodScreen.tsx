import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { paddingHorizontal } from '../../utils/utils';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Container from '../../components/Container';
import Hr from '../../components/Hr';
import PaymentMethodRadioGroup from './components/PaymentMethodRadioGroup';
import PaymentAgreementNotice from './components/PaymentAgreementNotice';
import PaymentTotalAmount from './components/PaymentTotalAmount';
import useToastErrors from '../../hooks/useToastErrors';

type FormValues = {
  paymentMethod: 1 | 2 | 3 | 4;
  agree: boolean;
};

const PaymentMethodScreen = () => {
  const methods = useForm<FormValues>();
  const insets = useSafeAreaInsets();
  useToastErrors(methods, { bottomOffset: 96 + insets.bottom });

  return (
    <FormProvider {...methods}>
      <Container contentContainerStyle={styles.contentContainer}>
        <View>
          <PaymentTotalAmount />
          <Hr big style={styles.hr1} />
          <PaymentMethodRadioGroup />
          <Hr big style={styles.hr2} />
          <View style={styles.section}>
            <Checkbox
              name="agree"
              label="아래 내용에 동의 (필수)"
              bold
              round
              required="약관에 동의해 주세요."
            />
          </View>
          <PaymentAgreementNotice />
        </View>
        <View style={styles.section}>
          <Button
            onPress={methods.handleSubmit((form) => {
              console.log(form);
            })}
          >
            결제하기
          </Button>
        </View>
      </Container>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 35,
    justifyContent: 'space-between',
  },
  section: {
    paddingHorizontal,
  },
  hr1: {
    marginTop: 20,
    marginBottom: 25,
  },
  hr2: {
    marginVertical: 20,
  },
});

export default PaymentMethodScreen;
