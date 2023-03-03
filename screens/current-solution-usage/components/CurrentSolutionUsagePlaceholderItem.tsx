import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { paddingHorizontal } from '../../../utils/utils';
import Placeholder from '../../../components/Placeholder';

const CurrentSolutionUsagePlaceholderItem = () => {
  return (
    <Placeholder>
      <View style={styles.inner}>
        <View style={styles.image} />
        <View style={styles.content}>
          <View style={styles.name} />
          <View style={styles.resultBar} />
          <View style={styles.status} />
        </View>
      </View>
    </Placeholder>
  );
};

const styles = StyleSheet.create({
  inner: {
    paddingVertical: 10,
    paddingHorizontal,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  image: {
    width: 58,
    height: 58,
    marginRight: 20,
  },
  name: {
    width: 133,
    height: 14,
    borderRadius: 4,
  },
  status: {
    width: 41,
    height: 14,
    borderRadius: 4,
  },
  resultBar: {
    marginVertical: 10,
    height: 14,
    width: '100%',
    borderRadius: 4,
  },
});

export default memo(CurrentSolutionUsagePlaceholderItem);
