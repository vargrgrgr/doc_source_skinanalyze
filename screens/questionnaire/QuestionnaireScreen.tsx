import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View, StyleSheet, ScrollView, BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';

import colors from '../../utils/colors';
import { paddingHorizontal } from '../../utils/utils';
import { onLogout, onQuestionnaireDone, selectUser } from '../../store/user';
import { QuestionnaireScreenNavigationProp } from '../../navigators/navigation.types';
import { selectHasTestResults } from '../../store/test-results';
import steps from './steps';
import useLoading from '../../hooks/useLoading';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Checkboxes from '../../components/Checkboxes';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Hr from '../../components/Hr';
import NativeCheckbox from '../../components/NativeCheckbox';
import QuestionnaireRadioGroup from './components/QuestionnaireRadioGroup';
import StepBar from './components/StepBar';
import TextBold from '../../components/TextBold';
import TextDemiLight from '../../components/TextDemiLight';

const useSubmitQuestionnaire = () => {
  return useMutation((form: FormValues) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  });
};

const useQuestionnaireNavigationHandler = () => {
  const [stepActive, setStepActive] = useState(1);
  const navigation = useNavigation<QuestionnaireScreenNavigationProp>();
  const { onLoading, onLoadingEnd } = useLoading();
  const dispatch = useDispatch();
  const hasTestResults = useSelector(selectHasTestResults);
  const submitQuestionnaire = useSubmitQuestionnaire();

  const nextStep = (form: FormValues) => {
    const {
      gender,
      age,
      skinAfterSkincare,
      tZoneOil,
      pimple,
      dermatitis,
      acne,
      skinReaction,
      concern,
    } = form;

    if (stepActive < 10) {
      setStepActive((active) => active + 1);
    } else if (stepActive === 11) {
      if (hasTestResults) {
        navigation.replace('TestResultsDetails');
      } else {
        navigation.replace('BottomTabNavigator', { screen: 'MyPage' });
      }
      return true;
    } else {
      onLoading();
      submitQuestionnaire.mutate(form, {
        onSuccess: () => {
          dispatch(
            onQuestionnaireDone({
              gender,
              age,
              skinAfterSkincare,
              tZoneOil,
              pimple,
              dermatitis,
              acne,
              skinReaction,
              concern,
            }),
          );
          //\\const chkquestion = useSelector(selectUser);
          //console.log(chkquestion.questionnaire || "questionnaire is null")
          setStepActive((active) => active + 1);
          onLoadingEnd();
        },
        onError: () => {
          onLoadingEnd();
        },
      });
    }
  };

  const previousStep = () => setStepActive((active) => active - 1);

  useLayoutEffect(() => {
    const backAction = () => {
      if (stepActive === 1) {
        dispatch(onLogout());
      } else if (stepActive > 1 && stepActive < 10) {
        previousStep();
      } else if (stepActive === 11) {
        navigation.replace('TestResultsDetails');
      } else {
        navigation.goBack();
      }
    };

    const getHeader = (props: StackHeaderProps) => (
      <Header {...props} customGoBack={backAction} />
    );
    navigation.setOptions({ header: getHeader });
  }, [navigation, stepActive]);

  const useCustomBackHandler = useCallback(() => {
    const backAction = () => {
      if (stepActive === 1) {
        dispatch(onLogout());
        return true;
      }
      if (stepActive > 1 && stepActive < 10) {
        previousStep();
        return true;
      }
      if (stepActive === 11) {
        navigation.replace('TestResultsDetails');
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, [stepActive]);

  useFocusEffect(useCustomBackHandler);

  return { stepActive, nextStep };
};

type FormValues = {
  gender: 1 | 2;
  age: number;
  skinAfterSkincare: number;
  tZoneOil: number;
  pimple: number;
  dermatitis: number;
  acne: number;
  skinReaction: number;
  concern: number[];
  collectDataAgree: 1 | 0;
  thirdPartyAgree: 1 | 0;
  notificationAgree: 1 | 0;
};

const QuestionnaireScreen = () => {
  const { stepActive, nextStep } = useQuestionnaireNavigationHandler();
  const { question, name, options, column, direction, description } =
    steps[stepActive - 1];
  const methods = useForm<FormValues>({ mode: 'onChange' });
  const form = methods.watch();

  const getContent = () => {
    if (stepActive < 9) {
      return (
        <QuestionnaireRadioGroup
          style={styles.marginTop}
          key={name}
          name={name!}
          options={options!}
          column={column}
          required
          direction={direction as 'row' | 'column' | undefined}
        />
      );
    } else if (stepActive === 9) {
      return (
        <Checkboxes
          style={styles.marginTop}
          required
          options={options!}
          name={name!}
        />
      );
    } else if (stepActive >= 10) {
      return (
        <TextDemiLight style={styles.description}>{description}</TextDemiLight>
      );
    }
  };

  const disabled = useMemo(() => {
    if (stepActive < 9) {
      return !form[name as keyof FormValues];
    } else if (stepActive === 9) {
      return !(form[name as keyof FormValues] as number[] | undefined)?.length;
    } else if (stepActive === 10) {
      return !form.collectDataAgree;
    }
  }, [stepActive, form, name]);

  const getFooter = () => {
    if (stepActive <= 9) {
      return (
        <>
          <StepBar stepActive={stepActive} numberOfSteps={9} />
          <Button
            onPress={methods.handleSubmit(nextStep)}
            disabled={disabled}
            style={styles.nextButton}
          >
            다음
          </Button>
        </>
      );
    }
    if (stepActive === 10) {
      const { collectDataAgree, thirdPartyAgree, notificationAgree } = form;

      const onAllAgreeToggle = () => {
        if (collectDataAgree && thirdPartyAgree && notificationAgree) {
          methods.setValue('collectDataAgree', 0);
          methods.setValue('thirdPartyAgree', 0);
          methods.setValue('notificationAgree', 0);
        } else {
          methods.setValue('collectDataAgree', 1);
          methods.setValue('thirdPartyAgree', 1);
          methods.setValue('notificationAgree', 1);
        }
      };

      return (
        <>
          <Checkbox
            name="collectDataAgree"
            required
            label="개인정보 수집 제공 동의 (필수)"
            style={styles.agreeCheckbox}
            round
          />
          <Checkbox
            name="thirdPartyAgree"
            label="개인정보 제 3자 제공 (선택)"
            style={styles.agreeCheckbox}
            round
          />
          <Checkbox
            name="notificationAgree"
            label="이벤트 알림 수신 동의 (선택)"
            round
          />
          <Hr style={styles.hr} />
          <NativeCheckbox
            label="모두 확인 및 동의합니다."
            round
            bold
            active={
              !!(collectDataAgree && thirdPartyAgree && notificationAgree)
            }
            onPress={onAllAgreeToggle}
          />
          <Button
            onPress={methods.handleSubmit(nextStep)}
            disabled={disabled}
            style={styles.nextButton}
          >
            동의합니다
          </Button>
        </>
      );
    }
    return (
      <Button
        onPress={methods.handleSubmit(nextStep)}
        disabled={disabled}
        style={styles.nextButton}
      >
        내 피부 세부 진단 결과 보기
      </Button>
    );
  };

  return (
    <Container contentContainerStyle={styles.contentContainer}>
      <FormProvider {...methods}>
        <View style={styles.questionContainer}>
          <TextBold style={styles.question}>{question}</TextBold>
          <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
          >
            {getContent()}
          </ScrollView>
        </View>
        <View>{getFooter()}</View>
      </FormProvider>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal,
    justifyContent: 'space-between',
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  questionContainer: {
    marginTop: 50,
    flex: 1,
  },
  question: {
    marginBottom: 20,
  },
  marginTop: {
    marginTop: 20,
  },
  description: {
    color: colors.textSecondary,
  },
  nextButton: {
    marginTop: 40,
  },
  agreeCheckbox: {
    marginBottom: 24,
  },
  hr: {
    marginVertical: 22,
    backgroundColor: colors.disabled,
  },
});

export default QuestionnaireScreen;
