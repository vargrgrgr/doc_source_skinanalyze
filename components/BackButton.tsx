import React, { memo } from 'react';
import { PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useStyle } from 'react-native-style-utilities';

import colors from '../utils/colors';
import ChevronLeftIcon from '../assets/icons/chevron-left.svg';
import TouchableRipple from './TouchableRipple';

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

const BackButton = ({ onPress, style, ...rest }: Props) => {
  const backButtonStyle = useStyle(() => [styles.backButton, style], [style]);

  return (
    <TouchableRipple style={backButtonStyle} onPress={onPress} {...rest}>
      <ChevronLeftIcon fill={colors.text} />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    bottom: 0,
    left: -2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default memo(BackButton);
