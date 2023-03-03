import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ModalResultType } from 'react-native-use-modal';

import colors from '../../../utils/colors';
import usePostcodeModal from './PostcodeModal';
import AppText from '../../../components/AppText';
import ButtonSmall from '../../../components/ButtonSmall';
import TextBold from '../../../components/TextBold';
import TextField from '../../../components/TextField';

interface Props {
  globalStyles: {
    section: StyleProp<ViewStyle>;
    sectionHeading: StyleProp<ViewStyle>;
  };
}

const PaymentDeliveryInfo = ({ globalStyles }: Props) => {
  const postcodeModal = usePostcodeModal();
  const { setValue } = useFormContext();

  const onSearchPostcode = async () => {
    const result = await postcodeModal.show();
    if (result.type === ModalResultType.CONFIRM) {
      setValue('address', result.data.address);
    }
  };

  return (
    <View style={globalStyles.section}>
      <TextBold style={globalStyles.sectionHeading}>주문자 정보</TextBold>
      <View style={styles.fieldContainer}>
        <AppText style={styles.fieldLabel}>이름</AppText>
        <TextField
          style={styles.textField}
          placeholder="이름을 입력해주세요."
          name="name"
          required="이름이 빈값입니다."
          autoCapitalize="sentences"
        />
      </View>
      <View style={styles.fieldContainer}>
        <AppText style={styles.fieldLabel}>연락처</AppText>
        <TextField
          style={styles.textField}
          placeholder="연락처를 입력해주세요."
          name="phoneNumber"
          required="연락처가 빈값입니다."
        />
      </View>
      <View style={styles.fieldContainer}>
        <AppText style={styles.fieldLabel}>주소</AppText>
        <View style={styles.flexRow}>
          <TextField
            style={styles.textField}
            placeholder="주소를 입력해주세요."
            name="address"
            editable={false}
            required="주소가 빈값입니다."
          />
          <ButtonSmall
            style={styles.searchPostcodeButton}
            onPress={onSearchPostcode}
          >
            우편번호 찾기
          </ButtonSmall>
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <AppText style={styles.fieldLabel}>상세주소</AppText>
        <TextField
          style={styles.textField}
          placeholder="상세주소를 입력해주세요."
          name="adressDetails"
          required="상세주소가 빈값입니다."
        />
      </View>
      <View style={styles.fieldContainer}>
        <AppText style={styles.fieldLabel}>요청사항</AppText>
        <TextField
          style={styles.textField}
          placeholder="요청사항을 입력해주세요."
          name="request"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldLabel: {
    width: 72,
    color: colors.textSecondary,
  },
  textField: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    flex: 1,
  },
  searchPostcodeButton: {
    width: 100,
    marginLeft: 9,
  },
});

export default memo(PaymentDeliveryInfo);
