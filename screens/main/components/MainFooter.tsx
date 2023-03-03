import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../../utils/colors';
import Hr from '../../../components/Hr';
import LogoSmall from '../../../assets/icons/logo-small.svg';
import TextRegular from '../../../components/TextRegular';
import TouchableRipple from '../../../components/TouchableRipple';

const MainFooter = () => {
  return (
    <View style={styles.footer}>
      <Hr style={styles.hr} />
      <LogoSmall />
      <View style={styles.termsAndPolicyContainer}>
        <TouchableRipple>
          <TextRegular style={styles.termsAndPolicyFont}>이용약관</TextRegular>
        </TouchableRipple>
        <View style={styles.dot} />
        <TouchableRipple>
          <TextRegular style={styles.termsAndPolicyFont}>
            개인정보 처리방침
          </TextRegular>
        </TouchableRipple>
      </View>
      <TextRegular style={styles.copyright} numeric>
        Copyright 2021. DOCTORIGIN. All Rights Reserved.
      </TextRegular>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 40,
    marginBottom: 20,
  },
  hr: {
    marginBottom: 20,
    backgroundColor: '#F8EDC9',
  },
  termsAndPolicyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  termsAndPolicyFont: {
    fontSize: 10,
    color: colors.textTertiary,
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#CAD0B1',
    marginHorizontal: 6,
  },
  copyright: {
    fontSize: 10,
    color: colors.textTertiary,
  },
});

export default memo(MainFooter);
