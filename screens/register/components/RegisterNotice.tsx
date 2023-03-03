import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../../utils/colors';
import AppText from '../../../components/AppText';
import TouchableRipple from '../../../components/TouchableRipple';

const RegisterNotice = () => {
  return (
    <View style={styles.noticeContainer}>
      <AppText style={styles.notice}>본인은 만14세이상이며 닥터리진의 </AppText>
      <TouchableRipple>
        <AppText style={styles.noticeLink}>이용약관</AppText>
      </TouchableRipple>
      <AppText style={styles.notice}>과 </AppText>
      <TouchableRipple>
        <AppText style={styles.noticeLink}>개인정보 수집</AppText>
      </TouchableRipple>
      <AppText style={styles.notice}>에 동의합니다.</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  notice: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  noticeLink: {
    fontSize: 10,
  },
});

export default memo(RegisterNotice);
