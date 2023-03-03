import React, { memo, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import ReadMore from 'react-native-read-more-text';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import KeyboardArrowDown from '../../../assets/icons/keyboard-arrow-down.svg';
import TextBold from '../../../components/TextBold';
import TextDemiLight from '../../../components/TextDemiLight';
import TouchableRipple from '../../../components/TouchableRipple';

interface Props {
  longDescription?: string;
}

const ProductInfoDescription = ({ longDescription }: Props) => {
  const renderTruncatedFooter = useCallback((handlePress: () => void) => {
    return (
      <TouchableRipple style={styles.more} onPress={handlePress}>
        <TextDemiLight style={styles.moreText}>더보기</TextDemiLight>
        <KeyboardArrowDown />
      </TouchableRipple>
    );
  }, []);

  return (
    <View style={styles.section}>
      <TextBold style={styles.sectionHeading}>상품정보</TextBold>
      {longDescription ? (
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={renderTruncatedFooter}
          renderRevealedFooter={() => null}
        >
          <TextDemiLight style={styles.sectionText}>
            {longDescription}
          </TextDemiLight>
        </ReadMore>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.green} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: paddingHorizontal,
  },
  sectionHeading: {
    marginBottom: 10,
  },
  sectionText: {
    color: colors.textSecondary,
  },
  more: {
    alignSelf: 'flex-start',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    color: colors.textSecondary,
  },
  loadingContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(ProductInfoDescription);
