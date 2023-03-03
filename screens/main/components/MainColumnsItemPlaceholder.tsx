import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { paddingHorizontal } from '../../../utils/utils';
import Placeholder from '../../../components/Placeholder';

const { width } = Dimensions.get('window');

const MainColumnsItemPlaceholder = () => {
  return (
    <Placeholder>
      <View style={styles.container}>
        <View style={styles.image} />
        <View style={styles.title} />
        <View style={styles.likeContainer} />
      </View>
    </Placeholder>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    width: width / 2 - paddingHorizontal + 4,
    marginTop: 20,
  },
  image: {
    aspectRatio: 1,
    borderRadius: 5,
  },
  title: {
    width: 150,
    height: 14,
    borderRadius: 4,
    marginTop: 7,
  },
  likeContainer: {
    marginTop: 7,
    width: 111,
    height: 14,
    borderRadius: 4,
  },
});

export default MainColumnsItemPlaceholder;
