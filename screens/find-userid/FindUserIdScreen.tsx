import React from 'react';
import { StyleSheet } from 'react-native';
import Button from '../../components/Button';

import { paddingHorizontal } from '../../utils/utils';
import Container from '../../components/Container';
import TextField from '../../components/TextField';
import { FormProvider, useForm } from 'react-hook-form';
import RadioGroup from '../../components/RadioGroup';
import PhoneForm from '../../components/PhoneForm';
import useToastErrors from '../../hooks/useToastErrors';
import TextDemiLight from '../../components/TextDemiLight';

type FormValues = {
  searchType: 'email' | 'phone';
  userName: string;
  email?: string;
  phoneCode?: string;
  phonePrefix?: string;
  phoneSuffix?: string;
};

const FindUserIdScreen = () => {
  const methods = useForm<FormValues>({
    defaultValues: { searchType: 'email' },
  });
  const searchType = methods.watch('searchType');
  useToastErrors(methods);

  return (
    <Container scrollEnabled contentContainerStyle={styles.container}>
      <TextDemiLight style={styles.notice}>
        가입하신 방법에 따라 아이디 찾기가 가능합니다.
      </TextDemiLight>
      <FormProvider {...methods}>
        <RadioGroup
          name="searchType"
          options={[
            { label: '이메일로 찾기', value: 'email' },
            { label: '휴대폰번호로 찾기', value: 'phone' },
          ]}
          defaultValue="email"
          style={styles.radioGroup}
        />
        <TextField
          style={styles.input}
          placeholder="이름을 입력해주세요."
          required="이름이 빈값입니다."
          name="userName"
          autoCapitalize="sentences"
        />
        {searchType === 'email' ? (
          <TextField
            style={styles.input}
            placeholder="이메일을 입력해주세요."
            required="이메일이 빈값입니다."
            name="email"
          />
        ) : (
          <PhoneForm style={styles.input} />
        )}
        <Button style={styles.button} onPress={methods.handleSubmit(() => {})}>
          로그인정보찾기
        </Button>
      </FormProvider>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontal,
    paddingTop: 20,
  },
  notice: {
    marginBottom: 40,
  },
  radioGroup: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default FindUserIdScreen;
