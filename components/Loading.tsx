import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { useSelector } from 'react-redux';

import { selectIsLoading } from '../store/common';

const Loading = () => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <View style={[StyleSheet.absoluteFill, styles.loadingOverlay]}>
      <DotIndicator color="#fff" size={8} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
});

export default memo(Loading);
