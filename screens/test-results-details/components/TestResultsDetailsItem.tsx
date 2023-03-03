import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import ResultBar from '../../../components/ResultBar';
import { SvgProps } from 'react-native-svg';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import HappyFace from '../../../assets/icons/emoticon-happy.svg';
import NeutralFace from '../../../assets/icons/emoticon-neutral.svg';
import ResultExplanationCard from '../../../components/ResultExplanationCard';
import ResultScoreCard from '../../../components/ResultScoreCard';
import SadFace from '../../../assets/icons/emoticon-sad.svg';
import TextBold from '../../../components/TextBold';

interface Props {
  name: string;
  icon: FC<SvgProps>;
  value: number;
}

const TestResultsDetailsItem = ({ name, icon, value }: Props) => {
  const Icon = icon;

  return (
    <View style={styles.container}>
      <ResultScoreCard name={name} style={styles.marginBottom} score={value} />
      <View style={styles.resultContainer}>
        <View style={styles.resultNameContainer}>
          <Icon fill={colors.text} />
          <TextBold>{name}</TextBold>
        </View>
        <View style={styles.resultBarContainer}>
          <ResultBar value={value} />
          <View style={styles.facesContainer}>
            <SadFace fill={colors.icon} />
            <NeutralFace fill={colors.icon} />
            <HappyFace fill={colors.icon} />
          </View>
        </View>
      </View>
      <ResultExplanationCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    marginBottom: 10,
  },
  marginBottom: {
    marginBottom: 10,
  },
  resultContainer: {
    flexDirection: 'row',
    marginLeft: -8,
    paddingHorizontal: paddingHorizontal,
  },
  resultNameContainer: {
    width: 40,
    marginTop: -6,
    marginRight: 10,
    alignItems: 'center',
  },
  resultBarContainer: {
    flex: 1,
  },
  facesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default memo(TestResultsDetailsItem);
