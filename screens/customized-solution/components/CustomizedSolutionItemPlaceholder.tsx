import React from 'react';
import { StyleSheet, View } from 'react-native';

import { paddingHorizontal } from '../../../utils/utils';
import Placeholder from '../../../components/Placeholder';

const CustomizedSolutionItemPlaceholder = () => {
  return (
    <Placeholder>
      <View style={styles.inner}>
        <View style={styles.image} />
        <View>
          <View style={{ width: 200, height: 14, borderRadius: 4 }} />
          <View
            style={{ marginTop: 11, width: 180, height: 14, borderRadius: 4 }}
          />
          <View
            style={{ marginTop: 11, width: 140, height: 14, borderRadius: 4 }}
          />
        </View>
      </View>
    </Placeholder>
  );
};

const styles = StyleSheet.create({
  inner: {
    paddingHorizontal: paddingHorizontal,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  image: {
    resizeMode: 'contain',
    width: 65,
    height: 65,
    marginRight: 20,
    
  },
});

export default CustomizedSolutionItemPlaceholder;
