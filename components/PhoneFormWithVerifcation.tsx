import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { useMutation } from 'react-query';

import colors from '../utils/colors';
import AppText from './AppText';
import ButtonSmall from './ButtonSmall';
import TextField from './TextField';

const useSendCode = () => {
  return useMutation((phoneNumber: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  });
};

const useVerifyCode = () => {
  return useMutation((verificationCode: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  });
};

const padLeft = (string: string, pad: string, length: number) => {
  return (new Array(length + 1).join(pad) + string).slice(-length);
};

const getMinutes = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return `${padLeft(`${minutes}`, '0', 2)}:${padLeft(
    `${seconds}` + '',
    '0',
    2,
  )}`;
};

const useTimer = () => {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [timeLeft, setTimeLeft] = useState<number>();

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  };

  useEffect(() => () => clearTimer(), []);

  const startTimer = () => {
    clearTimer();
    setTimeLeft(180);
    timer.current = setInterval(
      () =>
        setTimeLeft((timeLeft) => {
          if (timeLeft! <= 1) {
            clearTimer();
          }
          return timeLeft! - 1;
        }),
      1000,
    );
  };

  return { startTimer, timeLeft };
};

type FormValues = {
  userId: string;
  password: string;
  passwordConfirmation: string;
  userName: string;
  phoneNumber: string;
  email: string;
  refereeId: string;
  phoneVerification: string;
  phoneValidated: boolean;
};

const PhoneForm = () => {
  const { watch, setValue } = useFormContext<FormValues>();
  const phoneNumber = watch('phoneNumber');
  const phoneVerification = watch('phoneVerification');
  const { field } = useController({
    name: 'phoneValidated',
    rules: { required: '휴대폰 번호 인증이 이루어지지 않았습니다.' },
    defaultValue: false,
  });
  const sendCode = useSendCode();
  const verifyCode = useVerifyCode();
  const { timeLeft, startTimer } = useTimer();

  const onSendCode = () => {
    verifyCode.reset();
    sendCode.mutate(phoneNumber, {
      onSuccess: () => startTimer(),
    });
  };

  const onVerifyCode = () => {
    verifyCode.mutate(phoneVerification, {
      onSettled: () => {
        setValue('phoneVerification', '');
      },
      onSuccess: () => {
        field.onChange(true);
      },
    });
  };

  const getTimerComponent = useCallback(
    () => <AppText style={styles.timer}>{getMinutes(timeLeft || 0)}</AppText>,
    [timeLeft],
  );

  return (
    <>
      <View style={styles.fieldContainer}>
        <AppText style={styles.fieldLabel}>휴대폰</AppText>
        <TextField
          style={styles.textField}
          name="phoneNumber"
          ref={field.ref}
          required="휴대폰 값이 빈값입니다."
          placeholder="비밀번호를 입력해주세요."
          keyboardType="phone-pad"
          onChangeText={() => field.onChange(false)}
        />
        <ButtonSmall
          style={styles.buttonSmall}
          onPress={onSendCode}
          disabled={!phoneNumber || phoneNumber?.length < 8}
        >
          번호인증
        </ButtonSmall>
      </View>
      {sendCode.isSuccess && !verifyCode.isSuccess && (
        <>
          <AppText style={styles.messageSent}>
            인증문자 전송에 성공하였습니다.
          </AppText>
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldLabel}>인증확인</AppText>
            <TextField
              style={styles.textField}
              name="phoneVerification"
              placeholder="인증번호"
              keyboardType="number-pad"
              maxLength={4}
              suffixComponent={getTimerComponent()}
            />
            <ButtonSmall
              style={styles.buttonSmall}
              disabled={
                !phoneVerification ||
                !timeLeft ||
                phoneVerification.length !== 4
              }
              onPress={onVerifyCode}
            >
              번호확인
            </ButtonSmall>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textField: {
    flex: 1,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldLabel: {
    width: 72,
    color: colors.textSecondary,
  },
  buttonSmall: {
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  messageSent: {
    color: colors.text,
    marginBottom: 10,
  },
  timer: {
    fontSize: 12,
  },
});

export default PhoneForm;
