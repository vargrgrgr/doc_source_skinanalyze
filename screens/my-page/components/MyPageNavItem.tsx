import React, { memo } from 'react';
import { PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { paddingHorizontal } from '../../../utils/utils';
import ArrowRightIcon from '../../../assets/icons/arrow-right.svg';
import TextBold from '../../../components/TextBold';
import TouchableRipple from '../../../components/TouchableRipple';

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
  children: string;
}

const MyPageNavItem = ({ style, children, ...rest }: Props) => {
  return (
    <TouchableRipple style={[styles.container, style]} {...rest}>
      <TextBold>{children}</TextBold>
      <ArrowRightIcon />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: paddingHorizontal,
  },
});

export default memo(MyPageNavItem);
