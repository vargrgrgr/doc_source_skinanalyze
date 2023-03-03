import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import colors from '../../utils/colors';
import { paddingHorizontal } from '../../utils/utils';
import { selectAverageScore, selectUser } from '../../store/user';
import { selectAverageRecentTestScore } from '../../store/test-results';
import { TestResultsSummaryScreenNavigationProp } from '../../navigators/navigation.types';
import BottomBar from '../../components/BottomBar';
import Button from '../../components/Button';
import Container from '../../components/Container';
import ResultsDetails from '../test-results/components/ResultsDetails';
import ResultExplanationCard from '../../components/ResultExplanationCard';
import ResultScoreCard from '../../components/ResultScoreCard';
import ResultStatCard from '../../components/ResultStatCard';
import TextLight from '../../components/TextLight';
import TextBold from '../../components/TextBold';

const mockedResults = {
  oil: Math.floor(Math.random() * 100),
  wrinkle: Math.floor(Math.random() * 100),
  pigment: Math.floor(Math.random() * 100),
  trouble: Math.floor(Math.random() * 100),
  pore: Math.floor(Math.random() * 100),
  flush: Math.floor(Math.random() * 100),
};

const TestResultsSummaryScreen = () => {
  const navigation = useNavigation<TestResultsSummaryScreenNavigationProp>();
  const user = useSelector(selectUser);
  const averageScore = useSelector(selectAverageScore);
  const averageRecentScore = useSelector(selectAverageRecentTestScore);

  const goToCustomizedSolution = () =>
    navigation.navigate('CustomizedSolution');

  return (
    <>
      <Container contentContainerStyle={styles.contentContainer} scrollEnabled>
        <TextBold style={styles.username}>{user?.userName} 회원님의</TextBold>
        <TextLight style={styles.welcome}>진단 결과입니다!</TextLight>
        <View style={styles.statsContainer}>
          <ResultStatCard
            style={styles.statsCard}
            title="종합점수"
            content={`${averageScore || averageRecentScore}점`}
          />
          <ResultStatCard
            style={styles.statsCard}
            title="피부나이"
            content={`${user?.skinAge || 0}세`}
          />
        </View>
        <ResultScoreCard name="모공" style={styles.card} />
        <View style={[styles.card, styles.detailsCard]}>
          <ResultsDetails data={mockedResults} />
        </View>
        <ResultExplanationCard />
      </Container>
      <BottomBar>
        <Button onPress={goToCustomizedSolution}>
          진단결과로 제품 추천받기
        </Button>
      </BottomBar>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal,
    paddingTop: 40,
    paddingBottom: 30,
  },
  username: {
    fontSize: 18,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 30,
  },
  card: {
    borderRadius: 10,
    backgroundColor: colors.backgroundSecondary,
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: -5,
    marginBottom: 10,
  },
  statsCard: {
    marginHorizontal: 5,
  },
  detailsCard: {
    padding: 24,
    paddingBottom: -20,
  },
});

export default TestResultsSummaryScreen;
