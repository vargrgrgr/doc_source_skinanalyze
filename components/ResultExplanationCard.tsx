import React, { memo } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

import colors from '../utils/colors';
import AppText from './AppText';
import TextDemiLight from './TextDemiLight';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const ResultExplanationCard = ({ style }: Props) => {
  return (
    <View style={[styles.card, style]}>
      <AppText style={styles.title}>피부나이 20대 후반</AppText>
      <TextDemiLight style={styles.content}>
        수분이 부족한 건성 피부타입이에요. 게다가 피부가 예민한 민감성을 갖고
        있어 색소침착이 드문 드문 보여요. 피부가 건조하면 피부 처짐이 생기기가
        쉬워요. 민감성/건성 피부는 항상 수분 보충에 신경을 쓰고 내 피부에 맞지
        않는 성분 및 알레르기를 잘 살펴봐야해요.
      </TextDemiLight>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 19,
    borderRadius: 10,
    backgroundColor: colors.backgroundSecondary,
  },
  title: {
    color: colors.textSecondary,
    marginBottom: 10,
  },
  content: {
    color: colors.textSecondary,
  },
});

export default memo(ResultExplanationCard);
