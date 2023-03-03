import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import colors from '../../../utils/colors';
import ButtonSmall from '../../../components/ButtonSmall';
import TextBold from '../../../components/TextBold';
import TextDemiLight from '../../../components/TextDemiLight';
import TextField from '../../../components/TextField';

interface Props {
  globalStyles: {
    section: StyleProp<ViewStyle>;
    sectionHeading: StyleProp<ViewStyle>;
  };
}

const PaymentUsePoints = ({ globalStyles }: Props) => {
  return (
    <View style={globalStyles.section}>
      <TextBold style={globalStyles.sectionHeading}>포인트 사용</TextBold>
      <View style={styles.usePointFieldContainer}>
        <TextField
          style={styles.textField}
          name="point"
          keyboardType="number-pad"
        />
        <ButtonSmall style={styles.pointButton} color="disabled" fontSize={14}>
          전액
        </ButtonSmall>
        <ButtonSmall style={styles.pointButton} color="disabled" fontSize={14}>
          적용
        </ButtonSmall>
      </View>
      <TextDemiLight style={styles.pointText}>
        사용가능 포인트{'  '}
        <TextBold style={styles.pointText} numeric>
          0
        </TextBold>
        {'  '}/{'  '}보유 포인트{'   '}
        <TextBold style={styles.pointText} numeric>
          0
        </TextBold>
      </TextDemiLight>
    </View>
  );
};

const styles = StyleSheet.create({
  textField: {
    flex: 1,
  },
  usePointFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  pointButton: {
    marginLeft: 10,
    width: 57,
  },
  pointText: {
    color: colors.textSecondary,
  },
});

export default memo(PaymentUsePoints);
