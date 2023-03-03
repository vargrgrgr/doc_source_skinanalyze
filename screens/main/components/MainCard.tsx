import React, { FC, memo } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';

import colors from '../../../utils/colors';
import ChevronRightIcon from '../../../assets/icons/chevron-right.svg';
import TextBold from '../../../components/TextBold';
import TextDemiLight from '../../../components/TextDemiLight';
import TouchableRipple from '../../../components/TouchableRipple';

interface Props {
  style?: StyleProp<ViewStyle>;
  title: string;
  textLink: string;
  icon: FC<SvgProps>;
  onPress: (event: GestureResponderEvent) => void;
}

const MainCard = ({ style, title, textLink, icon, onPress }: Props) => {
  const Icon = icon;

  return (
    <View style={[styles.container, style]}>
      <TouchableRipple style={styles.ripple} onPress={onPress}>
        <View style={styles.inner}>
          <Icon width="70%" height="70%" style={styles.icon} />
          <View>
            <TextBold>{title}</TextBold>
            <View style={styles.linkContainer}>
              <TextDemiLight style={styles.link}>{textLink}</TextDemiLight>
              <View style={styles.chevronContainer}>
                <ChevronRightIcon />
              </View>
            </View>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    paddingHorizontal: 5,
  },
  ripple: {
    borderRadius: 5,
    backgroundColor: colors.backgroundSecondary,
    aspectRatio: 1,
  },
  inner: {
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    padding: 20,
  },
  icon: {
    width: '100%',
    height: '100%',
  },

  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  link: {
    color: colors.textSecondary,
  },
  chevronContainer: {
    width: 20,
    height: 20,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EBE8DB',
  },
});

export default memo(MainCard);
