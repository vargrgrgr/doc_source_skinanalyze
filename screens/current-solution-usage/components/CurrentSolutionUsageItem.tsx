import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Source } from 'react-native-fast-image';
import { useStyle } from 'react-native-style-utilities';

import colors from '../../../utils/colors';
import { CustomizedSolutionScreenNavigationProp } from '../../../navigators/navigation.types';
import { paddingHorizontal } from '../../../utils/utils';
import useNavigation from '../../../hooks/useNavigation';
import AppText from '../../../components/AppText';
import Image from '../../../components/Image';
import ResultBar from '../../../components/ResultBar';
import TextRegular from '../../../components/TextRegular';
import TouchableRipple from '../../../components/TouchableRipple';

interface Props {
  id: number;
  name: string;
  picture: number | Source;
  value: number;
}

const CurrentSolutionUsageItem = ({ id, name, picture, value }: Props) => {
  const navigation = useNavigation<CustomizedSolutionScreenNavigationProp>({
    lock: true,
  });
  const statusStyle = useStyle(
    () => [
      styles.status,
      { color: value === 100 ? colors.green : colors.textSecondary },
    ],
    [value],
  );

  const goToProductInfo = () =>
    navigation.push('ProductInfo', { id, name, picture });

  return (
    <TouchableRipple style={styles.container} onPress={goToProductInfo}>
      <View style={styles.inner}>
        <Image source={picture} style={styles.image} />
        <View style={styles.content}>
          <AppText>{name}</AppText>
          <ResultBar
            style={styles.resultBar}
            color={colors.disabled}
            value={value}
          />
          <TextRegular style={statusStyle}>
            {value === 100 ? '사용완료' : '사용중'}
          </TextRegular>
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    paddingTop: 25,
  },
  inner: {
    paddingHorizontal,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  image: {
    width: 58,
    height: 58,
    marginRight: 20,
  },
  status: {
    fontSize: 12,
  },
  resultBar: {
    marginTop: 10,
    marginBottom: 6,
  },
});

export default memo(CurrentSolutionUsageItem);
