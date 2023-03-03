import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import { selectUser } from '../../../store/user';
import TextBold from '../../../components/TextBold';
import TextDemiLight from '../../../components/TextDemiLight';
import TextLight from '../../../components/TextLight';

const MyPageHeader = () => {
  const user = useSelector(selectUser);

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <TextDemiLight style={styles.badgeText}>오늘의 지피지기</TextDemiLight>
      </View>
      <TextLight style={styles.intro}>
        <TextBold style={styles.welcome}>안녕하세요!</TextBold> {user?.userName}
        님
      </TextLight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontal,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.greenLight,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  badgeText: {
    color: colors.green,
    fontSize: 12,
  },
  intro: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 18,
  },
});

export default memo(MyPageHeader);
