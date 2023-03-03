import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { useStyle } from 'react-native-style-utilities';

import colors from '../../../utils/colors';
import TextBold from '../../../components/TextBold';

interface Props extends PressableProps {
  children: string;
  active: boolean;
  index: number;
  categoriesLength: number;
}

const ShoppingCategory = ({
  children,
  active,
  index,
  categoriesLength,
  ...rest
}: Props) => {
  const tabStyle = useStyle(
    () => [styles.shoppingTab, active && styles.active],
    [active],
  );

  return (
    <Pressable
      style={[
        styles.container,
        index === 0 && styles.firstTab,
        index === categoriesLength - 1 && styles.lastTab,
      ]}
      {...rest}
    >
      <TextBold style={tabStyle}>{children}</TextBold>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: -7,
  },
  shoppingTab: {
    color: colors.textLight,
  },
  active: {
    color: colors.text,
  },
  firstTab: {
    paddingLeft: 0,
  },
  lastTab: {
    paddingRight: 0,
  },
});

export default ShoppingCategory;
