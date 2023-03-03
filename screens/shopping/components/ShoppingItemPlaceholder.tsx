import React from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { paddingHorizontal } from '../../../utils/utils';
import Placeholder from '../../../components/Placeholder';

const { width: windowWidth } = Dimensions.get('window');

interface Props {
  style?: StyleProp<ViewStyle>;
}

const ShoppingItemPlaceholder = ({ style }: Props) => {
  return (
    <Placeholder>
      <View style={[styles.container, style]}>
        <View style={styles.image} />
        <View style={{ width: 133, height: 14, borderRadius: 4 }} />
        <View
          style={{ marginTop: 7, width: 111, height: 14, borderRadius: 4 }}
        />
        <View
          style={{ marginTop: 7, width: 90, height: 14, borderRadius: 4 }}
        />
      </View>
    </Placeholder>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    marginBottom: 20,
  },
  image: {
    aspectRatio: 1,
    width: windowWidth / 2 - paddingHorizontal,
    marginBottom: 16,
  },
});

export default ShoppingItemPlaceholder;
