import React, { FC, memo } from 'react';
import {StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import ResultBar from '../../../components/ResultBar';



import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';

import ResultExplanationCare from '../../../components/ResultExplanationCare';



interface Props {
  style?: StyleProp<ViewStyle>;
  carenum: number;
}

const TestResultsDetailsCare = (props:Props) => {


  return (
    <View style={styles.container}>
      <ResultExplanationCare
        carenum = {props.carenum}
      />
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

export default memo(TestResultsDetailsCare);
