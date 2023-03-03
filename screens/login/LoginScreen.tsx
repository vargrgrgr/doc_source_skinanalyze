import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import colors from '../../utils/colors';
import { paddingHorizontal } from '../../utils/utils';
import useToastErrors from '../../hooks/useToastErrors';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import LoginSns from './components/LoginSns';
import LoginUserId from './components/LoginUserId';
import TextField from '../../components/TextField';
import TextRegular from '../../components/TextRegular';

type FormValues = {
  userId: string;
  password: string;
  refereeId?: string;
};

const LoginScreen = () => {
  const methods = useForm<FormValues>();
  useToastErrors(methods);
  console.log("login screen")
  return (
    <Container scrollEnabled contentContainerStyle={styles.container}>
      <View>
        <FormProvider {...methods}>
          <LoginUserId />
          <LoginSns />
        </FormProvider>
      </View>
      <TextRegular style={styles.copyright}>
        © DOCTORIGIN. All Rights Reserved.
      </TextRegular>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal,
    paddingTop: 60,
    justifyContent: 'space-between',
  },
  referredLabel: {
    marginBottom: 10,
  },
  copyright: {
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default LoginScreen;
