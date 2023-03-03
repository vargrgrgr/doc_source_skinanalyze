import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import colors from '../utils/colors';
import FaceGoodScore from '../assets/icons/face-good-score.svg';
import FaceGood from '../assets/icons/face-good-score.svg';
import FaceBad from '../assets/icons/face-bad.svg';
import FaceReallyBad from '../assets/icons/face-really-bad.svg';
import TextBold from './TextBold';
import TextDemiLight from './TextDemiLight';

interface Props {
  style?: StyleProp<ViewStyle>;
  name: string;
  score: number;
}

const ResultScoreCard = ({ style, name, score }: Props) => {
  if(score==0){
    return(
    <View style={[styles.card, style]}>
      <TextBold style={styles.cardName}>집중 관리 솔루션</TextBold>
      <View style={styles.scoreContent}>
        <FaceBad />
        <View style={styles.descriptionContainer}>
          <TextBold style={styles.greenText}>
            미측정
          </TextBold>
          <TextDemiLight style={styles.description}>
            피부 진단을 진행해주세요.
          </TextDemiLight>
        </View>
      </View>
    </View>
    );
  }else{
  return (
    <View style={[styles.card, style]}>
      <TextBold style={styles.cardName}>관리가 필요한 영역</TextBold>
      <View style={styles.scoreContent}>
        <FaceGood />
        <View style={styles.descriptionContainer}>
          <TextBold style={styles.greenText}>
            {name}
          </TextBold>
          <TextDemiLight style={styles.description}>
            최근 측정점수는 {score}점 입니다. 집중 관리가 필요합니다.
          </TextDemiLight>
        </View>
      </View>
    </View>
  );
  }
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    paddingTop: 19,
  },
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  cardName: {
    color: '#525C22',
  },
  greenText: {
    color: colors.green,
  },
  descriptionContainer: {
    flex: 1,
    marginLeft: 20,
  },
  description: {
    color: colors.textSecondary,
    marginTop: 10,
  },
});

export default memo(ResultScoreCard);
