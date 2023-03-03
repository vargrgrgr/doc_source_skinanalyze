import React, { memo } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp  } from 'react-native';

import { paddingHorizontal } from '../../../utils/utils';
import TextBold from '../../../components/TextBold';
import TextLight from '../../../components/TextLight';
import {care} from '../../../components/13cares';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/user';

interface Props {
  style?: StyleProp<ViewStyle>;
  carenum: number;
}


//const user = useSelector(selectUser);
const CustomizedSolutionHeader = (props: Props) => {
  const user = useSelector(selectUser);
  var cnum = props.carenum;
  console.log('cnum')
  console.log(cnum)
  if (cnum==null){
    console.log('cnum is null')
    cnum=0;
  }
  const solution= care[cnum];
  console.log('solution')
  const carename = solution?.name || '기본';
  return (
    <View style={styles.header}>
      <TextLight style={styles.bigFont}>
        <TextBold style={styles.bigFont}> {user?.userName} 회원님</TextBold>
        에게는
      </TextLight>
      <TextLight style={styles.bigFont}>
        <TextBold style={styles.bigFont}> {carename} 솔루션</TextBold>을
        제안드립니다.
      </TextLight>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: paddingHorizontal,
    marginBottom: 15,
  },
  bigFont: {
    fontSize: 18,
  },
});

export default memo(CustomizedSolutionHeader);
