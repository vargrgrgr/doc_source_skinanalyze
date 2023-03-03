import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import colors from '../utils/colors';
import { paddingHorizontal } from '../utils/utils';

interface Props {
  children: ReactNode;
}

const BottomBar = ({ children }: Props) => (
  <SafeAreaView>
    <View style={styles.bottomBar}>{children}</View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: colors.background,
    paddingHorizontal: paddingHorizontal,
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: colors.disabled,
  },
});

export default BottomBar;
