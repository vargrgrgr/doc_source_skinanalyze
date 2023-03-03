import React, { memo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import colors from '../utils/colors';
import TextBold from './TextBold';

interface Props {
  style?: StyleProp<ViewStyle>;
  title: string;
  content: string;
}

const ResultStatCard = ({ style, title, content }: Props) => {
  return (
    <View style={[styles.card, style]}>
      <TextBold style={styles.cardName}>{title}</TextBold>
      <View style={styles.hr} />
      <TextBold style={styles.greenText}>{content}</TextBold>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  cardName: {
    color: '#525C22',
  },
  greenText: {
    color: colors.green,
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: colors.background,
    marginVertical: 10,
  },
});

export default memo(ResultStatCard);
