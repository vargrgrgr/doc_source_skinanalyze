import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import TextBold from '../../../components/TextBold';

import colors from '../../../utils/colors';
import ShoppingCategory from './ShoppingCategory';

const categories = ['스킨케어', '메이크업', '바디케어', '헤어케어'];

const useAnimateInk = (categoryActive: number, categoryWidth: number) => {
  const translateAnim = useRef(new Animated.Value(0)).current;
  const translateInk = translateAnim.interpolate({
    inputRange: [0, categories.length],
    outputRange: [0, categories.length * (categoryWidth + 20)],
  });

  useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: categoryActive,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [categoryActive]);

  return translateInk;
};

interface Props {
  categoryActive: number;
  onCategoryChange: (tab: number) => void;
}

const ShoppingCategories = ({ categoryActive, onCategoryChange }: Props) => {
  const [categoryWidth, setCategoryWidth] = useState(0);
  const translateInk = useAnimateInk(categoryActive, categoryWidth);

  return (
    <View>
      <View style={styles.tabs}>
        {categories.map((category, index) => (
          <ShoppingCategory
            key={category}
            categoriesLength={categories.length}
            index={index}
            active={categoryActive === index}
            onPress={() => onCategoryChange(index)}
          >
            {category}
          </ShoppingCategory>
        ))}
      </View>
      <View style={styles.tabsBottombar}>
        <Animated.View
          style={[styles.inkBar, { transform: [{ translateX: translateInk }] }]}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setCategoryWidth(width);
          }}
        >
          <TextBold style={styles.hidden}>스킨케어</TextBold>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
  },
  tabsBottombar: {
    width: '100%',
    height: 1,
    backgroundColor: colors.disabled,
  },
  inkBar: {
    position: 'absolute',
    top: -1,
    height: 2,
    backgroundColor: colors.text,
  },
  hidden: {
    opacity: 0,
  },
});

export default ShoppingCategories;
