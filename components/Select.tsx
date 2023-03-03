import React, { memo, useCallback, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import colors from '../utils/colors';
import { paddingHorizontal } from '../utils/utils';
import Hr from './Hr';
import KeyboarArrowDown from '../assets/icons/keyboard-arrow-down.svg';
import TextDemiLight from './TextDemiLight';
import TouchableRipple from './TouchableRipple';

interface Props<T> {
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  options: T[];
  keyExtractor?: (item: T, index: number) => string;
  renderOption?: ListRenderItem<T>;
  onExpand?: (isExpand: boolean) => void;
  onSelect?: (item: T) => void;
  disabled?: boolean;
  bottomSheet?: boolean;
}

const Select = <T,>({
  style,
  placeholder,
  options,
  keyExtractor,
  renderOption,
  onExpand = () => {},
  onSelect = () => {},
  disabled,
  bottomSheet,
}: Props<T>) => {
  const [isExpand, setIsExpand] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const rotate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  const toggleIsExpand = () =>
    setIsExpand((isExpand) => {
      Animated.timing(rotationAnim, {
        toValue: isExpand ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      onExpand(!isExpand);
      return !isExpand;
    });

  const selectItem = useCallback(
    (item: T) => {
      onSelect(item);
      setIsExpand(false);
      onExpand(false);
      Animated.timing(rotationAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    },
    [onExpand, onSelect],
  );

  const getKeyExtractor = useCallback(
    (item: T, index: number) =>
      keyExtractor
        ? keyExtractor(item, index)
        : (item as any as { value: 'string' })?.value,
    [keyExtractor],
  );

  const renderItem = useCallback(
    ({ item, index, ...rest }: ListRenderItemInfo<T>) =>
      renderOption ? (
        <TouchableRipple onPress={() => selectItem(item)}>
          {renderOption({ item, index, ...rest })}
        </TouchableRipple>
      ) : (
        <TouchableRipple style={styles.defaultOption}>
          <TextDemiLight>
            {(item as any as { label: string })?.label}
          </TextDemiLight>
        </TouchableRipple>
      ),
    [renderOption, selectItem],
  );

  const FlatListComponent = bottomSheet ? BottomSheetFlatList : FlatList;

  return (
    <View style={styles.zIndex}>
      <TouchableRipple
        style={[styles.container, disabled && styles.disabled, style]}
        onPress={toggleIsExpand}
        disabled={disabled}
      >
        <TextDemiLight>{placeholder}</TextDemiLight>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <KeyboarArrowDown />
        </Animated.View>
      </TouchableRipple>
      {isExpand && (
        <ScrollView
          nestedScrollEnabled
          horizontal
          contentContainerStyle={styles.scrollContainer}
        >
          <FlatListComponent
            style={styles.options}
            data={options}
            keyExtractor={getKeyExtractor}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <Hr style={styles.hr} />}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  zIndex: {
    zIndex: 1,
  },
  container: {
    borderWidth: 1,
    borderColor: colors.disabled,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
  scrollContainer: {
    width: '100%',
    maxHeight: 424,
  },
  options: {
    maxHeight: 424,
    backgroundColor: colors.select,
    borderWidth: 1,
    borderColor: colors.disabled,
  },
  defaultOption: {
    width: '100%',
    paddingTop: 23,
    paddingBottom: 20,
    paddingHorizontal: paddingHorizontal,
  },
  hr: {
    backgroundColor: '#F2E8C3',
    marginHorizontal: paddingHorizontal,
  },
});

const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(Select);
