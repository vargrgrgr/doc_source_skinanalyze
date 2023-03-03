import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import colors from '../../../utils/colors';
import TextBold from '../../../components/TextBold';
import TextDemiLight from '../../../components/TextDemiLight';

const ResultsHeader = ({ data }: { data?: { [key: string]: number } }) => {
  const getAverageScore = () => {
    if (!data) {
      return 0;
    } else {
      let totalScore = 0;
      const keys = Object.keys(data);
      for (let i = 0; i < keys.length - 1; i++) {
        totalScore += data[keys[i]];
      }
      return Math.round(totalScore / keys.length);
    }
  };

  return (
    <>
      <TextBold style={styles.title}>
        오늘 피부 종합 점수는{' '}
        <TextBold style={styles.green}>{getAverageScore()}점</TextBold> 입니다.
      </TextBold>
      <TextDemiLight style={styles.description}>
        
      </TextDemiLight>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  green: {
    color: colors.green,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default memo(ResultsHeader);
